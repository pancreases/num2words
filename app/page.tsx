import Converter from "@/components/Converter";
import { toIndianWords } from "@/lib/converter";
import Link from "next/link";

const faqData = [
  {
    q: "How do you write 1 lakh in words?",
    a: "1 lakh (1,00,000) is written as 'One Lakh' in Indian format, or 'One Hundred Thousand' in international format. For cheques: 'Rupees One Lakh Only'.",
  },
  {
    q: "How do you write 50,000 in words?",
    a: "50,000 is written as 'Fifty Thousand' in both Indian and international formats. For cheques: 'Rupees Fifty Thousand Only'.",
  },
  {
    q: "How do you write 1 crore in words?",
    a: "1 crore (1,00,00,000) is written as 'One Crore' in Indian format, or 'Ten Million' in international format.",
  },
  {
    q: "How to write amount in words on a cheque?",
    a: "Write the full amount in words starting with 'Rupees' and ending with 'Only'. Example: ₹25,500 becomes 'Rupees Twenty Five Thousand Five Hundred Only'. Enable the Cheque format toggle above.",
  },
  {
    q: "What is the difference between lakh and million?",
    a: "1 million = 10 lakhs. So 1 lakh = 0.1 million. In the Indian numbering system, after thousands comes lakhs (1,00,000) and then crores (1,00,00,000). In the international system, it's thousands → millions → billions.",
  },
  {
    q: "How do you write 75,000 in words?",
    a: "75,000 is written as 'Seventy Five Thousand'. For invoices/cheques: 'Rupees Seventy Five Thousand Only'.",
  },
  {
    q: "How to write 2.5 lakh in words?",
    a: "2.5 lakh (2,50,000) is written as 'Two Lakh Fifty Thousand' in Indian format.",
  },
  {
    q: "Is this converter free to use?",
    a: "Yes — completely free, no signup required, and it works entirely in your browser. No data is sent to any server.",
  },
];

const popularLinks = [
  { n: 1000, label: "1,000 in words" },
  { n: 10000, label: "10,000 in words" },
  { n: 25000, label: "25,000 in words" },
  { n: 50000, label: "50,000 in words" },
  { n: 75000, label: "75,000 in words" },
  { n: 100000, label: "1 Lakh in words" },
  { n: 200000, label: "2 Lakh in words" },
  { n: 500000, label: "5 Lakh in words" },
  { n: 1000000, label: "10 Lakh in words" },
  { n: 10000000, label: "1 Crore in words" },
  { n: 50000000, label: "5 Crore in words" },
  { n: 100000000, label: "10 Crore in words" },
];

export default function Home() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "clamp(24px, 6vw, 64px) clamp(16px, 5vw, 32px)",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 40 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
              padding: "2px 8px",
              borderRadius: 2,
            }}
          >
            Free Tool
          </span>
        </div>
        <h1
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(1.6rem, 5vw, 2.4rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: 10,
          }}
        >
          Number to Words Converter
        </h1>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.85rem",
            color: "var(--muted)",
            lineHeight: 1.6,
          }}
        >
          Indian format (Lakh, Crore) · International format (Million, Billion) · Cheque &amp; Invoice ready
        </p>
      </header>

      {/* Converter */}
      <Converter />

      {/* Popular number pages */}
      <section style={{ marginTop: 56 }}>
        <h2
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.01em",
            marginBottom: 16,
            color: "var(--ink)",
          }}
        >
          Common Conversions
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 8,
          }}
        >
          {popularLinks.map(({ n, label }) => (
            <Link
              key={n}
              href={`/${n}`}
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.78rem",
                padding: "9px 12px",
                border: "1px solid var(--border)",
                borderRadius: 4,
                color: "var(--ink)",
                textDecoration: "none",
                background: "white",
                display: "block",
                transition: "border-color 0.12s",
              }}
            >
              {label}
              <span
                style={{
                  display: "block",
                  fontSize: "0.68rem",
                  color: "var(--muted)",
                  marginTop: 2,
                }}
              >
                {toIndianWords(n)}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ — SEO gold */}
      <section style={{ marginTop: 56 }}>
        <h2
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.01em",
            marginBottom: 24,
            color: "var(--ink)",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {faqData.map(({ q, a }) => (
            <div
              key={q}
              style={{
                borderLeft: "3px solid var(--accent)",
                paddingLeft: 18,
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--sans)",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  marginBottom: 6,
                  color: "var(--ink)",
                }}
              >
                {q}
              </h3>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.82rem",
                  color: "var(--muted)",
                  lineHeight: 1.65,
                }}
              >
                {a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--mono)",
          fontSize: "0.72rem",
          color: "var(--muted)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <span>Number to Words · Indian &amp; International</span>
        <span>Free · No signup · Works offline</span>
      </footer>
    </main>
  );
}
