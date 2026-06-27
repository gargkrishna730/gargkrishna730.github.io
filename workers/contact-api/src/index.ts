interface Env {
  RESEND_API_KEY: string;
  RECIPIENT_EMAIL: string;
}

// --- Simple in-memory rate limiter (per-instance) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX_REQUESTS;
}

// --- CORS helpers ---
function corsHeaders(requestOrigin?: string | null) {
  // Allow any origin for a public portfolio contact form
  return {
    "Access-Control-Allow-Origin": requestOrigin || "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

// --- Validation ---
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateBody(body: Record<string, unknown>): string | null {
  const { name, email, message } = body;

  if (typeof name !== "string" || name.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  if (typeof email !== "string" || !isValidEmail(email.trim())) {
    return "A valid email address is required.";
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return "Message must be at least 10 characters.";
  }

  return null;
}

// --- HTML email template ---
function buildEmailHtml(name: string, email: string, message: string): string {
  const escapedName = escapeHtml(name.trim());
  const escapedEmail = escapeHtml(email.trim());
  const escapedMessage = escapeHtml(message.trim());

  return `<!DOCTYPE html>
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
                  <span style="color:#f3f4f6;font-size:16px;font-weight:600;">${escapedName}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br>
                  <a href="mailto:${escapedEmail}" style="color:#22d3ee;font-size:16px;text-decoration:none;">${escapedEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:20px 0;">
                  <span style="color:#9ca3af;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</span><br>
                  <p style="margin:12px 0 0;color:#e5e7eb;font-size:15px;line-height:1.7;white-space:pre-wrap;">${escapedMessage}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.05);text-align:center;">
            <p style="margin:0;color:#6b7280;font-size:12px;">Sent from Krishna Garg's Portfolio</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// --- JSON helper ---
function jsonResponse(data: unknown, status: number, extraHeaders: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...extraHeaders,
    },
  });
}

// --- Main handler ---
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders("*") });
    }

    // Health check
    if (request.method === "GET" && url.pathname === "/") {
      return jsonResponse(
        { status: "ok", service: "kg-portfolio-contact-api" },
        200,
        corsHeaders("*")
      );
    }

    // Only accept POST to /contact
    if (request.method !== "POST" || url.pathname !== "/contact") {
      return jsonResponse({ error: "Not Found" }, 404, corsHeaders(request.headers.get("Origin")));
    }

    const origin = request.headers.get("Origin");

    // Rate limiting by IP
    const clientIp = request.headers.get("CF-Connecting-IP") ?? "unknown";
    if (isRateLimited(clientIp)) {
      return jsonResponse(
        { error: "Too many requests. Please try again later." },
        429,
        corsHeaders(origin)
      );
    }

    // Parse body
    let body: Record<string, unknown>;
    try {
      body = (await request.json()) as Record<string, unknown>;
    } catch {
      return jsonResponse({ error: "Invalid JSON body." }, 400, corsHeaders(origin));
    }

    // Validate
    const validationError = validateBody(body);
    if (validationError) {
      return jsonResponse({ error: validationError }, 422, corsHeaders(origin));
    }

    const name = (body.name as string).trim();
    const email = (body.email as string).trim();
    const message = (body.message as string).trim();
    const recipientEmail = env.RECIPIENT_EMAIL;

    // Send email via Resend REST API (raw fetch, no npm package)
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [recipientEmail],
        subject: `New message from ${name} via Portfolio`,
        reply_to: email,
        html: buildEmailHtml(name, email, message),
      }),
    });

    const resendData = (await resendResponse.json()) as Record<string, unknown>;

    if (!resendResponse.ok) {
      console.error("Resend API error:", resendData);
      return jsonResponse(
        { error: "Failed to send email. Please try again later." },
        502,
        corsHeaders(origin)
      );
    }

    return jsonResponse(
      { success: true, message: "Message sent successfully!" },
      200,
      corsHeaders(origin)
    );
  },
};