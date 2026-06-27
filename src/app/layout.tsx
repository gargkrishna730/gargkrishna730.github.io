import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Krishna Garg | DevOps & Cloud Engineer",
  description: "DevOps Engineer specializing in CI/CD pipelines, Kubernetes, Infrastructure as Code, and multi-cloud deployments. Building robust, automated, and scalable infrastructure solutions.",
  keywords: ["DevOps", "Cloud Engineer", "Kubernetes", "Terraform", "AWS", "Azure", "CI/CD", "Docker", "Infrastructure as Code"],
  authors: [{ name: "Krishna Garg" }],
  openGraph: {
    title: "Krishna Garg | DevOps & Cloud Engineer",
    description: "DevOps Engineer specializing in CI/CD pipelines, Kubernetes, Infrastructure as Code, and multi-cloud deployments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-surface-0 text-foreground font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}