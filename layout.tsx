import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

// Replace GA_MEASUREMENT_ID with your actual ID e.g. "G-XXXXXXXXXX"
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX";

export const metadata: Metadata = {
  title: "Number to Words Converter — Indian & International Format | Free",
  description:
    "Convert any number to words instantly. Supports Indian format (Lakh, Crore) and international format (Million, Billion). Free, no signup, works in browser.",
  keywords: [
    "number to words",
    "amount in words",
    "numbers to words converter",
    "rupees in words",
    "number to words in Indian system",
    "crore lakh in words",
    "amount in words for cheque",
  ],
  openGraph: {
    title: "Number to Words Converter — Indian & International Format",
    description:
      "Convert any number to words instantly. Indian (Lakh/Crore) and International (Million/Billion) formats.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
