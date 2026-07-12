import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { db } from '@/lib/db';

const RECIPIENT_EMAIL = 'gargkrishna730@gmail.com';

function getResendClient() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

function buildHtmlEmail(name: string, email: string, message: string) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Segoe UI',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:16px;overflow:hidden;border:1px solid rgba(34,211,238,0.15);">

        <tr>
          <td style="background:linear-gradient(135deg,#0e1726,#162032);padding:32px 40px;border-bottom:1px solid rgba(34,211,238,0.1);">
            <h1 style="margin:0;font-size:22px;color:#22d3ee;font-weight:700;">📬 New Portfolio Message</h1>
            <p style="margin:8px 0 0;color:#9ca3af;font-size:14px;">Someone reached out through your contact form</p>
          </td>
        </tr>

        <tr>
          <td style="padding:32px 40px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">From</span><br>
                  <span style="color:#f3f4f6;font-size:16px;font-weight:600;">${escapeHtml(name)}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                  <a href="mailto:${escapeHtml(email)}" style="color:#22d3ee;font-size:16px;text-decoration:none;">${escapeHtml(email)}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 0;">
                  <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</span><br>
                  <p style="margin:12px 0 0;color:#e5e7eb;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapeHtml(message)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
            <p style="margin:0;color:#6b7280;font-size:12px;">Sent from Krishna Garg's Portfolio &mdash; ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if (name.trim().length < 2) {
      return NextResponse.json({ error: 'Name must be at least 2 characters.' }, { status: 400 });
    }

    if (message.trim().length < 10) {
      return NextResponse.json({ error: 'Message must be at least 10 characters.' }, { status: 400 });
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Attempt to send email via Resend
    let emailSent = false;

    const resend = getResendClient();
    if (resend) {
      try {
        const { error } = await resend.emails.send({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [RECIPIENT_EMAIL],
          replyTo: trimmedEmail,
          subject: `Portfolio Contact: New message from ${trimmedName}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\n\n${trimmedMessage}`,
          html: buildHtmlEmail(trimmedName, trimmedEmail, trimmedMessage),
        });

        if (!error) {
          emailSent = true;
        } else {
          console.error('Resend error:', error);
        }
      } catch (mailError) {
        console.error('Email send failed, message saved to DB:', mailError);
      }
    }

    // Always save submission to database
    await db.contactSubmission.create({
      data: {
        name: trimmedName,
        email: trimmedEmail,
        message: trimmedMessage,
        sent: emailSent,
      },
    });

    return NextResponse.json({
      success: true,
      message: emailSent
        ? 'Email sent successfully!'
        : 'Message received! (Email delivery requires SMTP configuration)',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}