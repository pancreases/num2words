import { toIndianWords, toInternationalWords, popularNumbers } from "@/lib/converter";
import type { Metadata } from "next";
import Converter from "@/components/Converter";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return popularNumbers.map((n) => ({ number: String(n) }));
}

export async function generateMetadata({
  params,
}: {
  params: { number: string };
}): Promise<Metadata> {
  const n = parseInt(params.number, 10);
  if (isNaN(n)) return {};
  const words = toIndianWords(n);
  return {
    title: `${n.toLocaleString("en-IN")} in Words — ${words} | Number to Words`,
    description: `${n.toLocaleString("en-IN")} in words is "${words}". For cheque: "Rupees ${words} Only". Supports Indian (Lakh/Crore) and International (Million/Billion) formats.`,
  };
}

function formatIndianNum(n: number) {
  const s = n.toString();
  if (s.length <= 3) return s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3;
}

export default function NumberPage({
  params,
}: {
  params: { number: string };
}) {
  const n = parseInt(params.number, 10);
  if (isNaN(n) || n < 0 || n > 999_999_999_999) notFound();

  const indian = toIndianWords(n);
  const chequeFormat = toIndianWords(n, true);
  const international = toInternationalWords(n);

  return (
    <main
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "clamp(24px, 6vw, 64px) clamp(16px, 5vw, 32px)",
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.75rem",
          color: "var(--muted)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          marginBottom: 32,
        }}
      >
        ← Converter
      </Link>

      <h1
        style={{
          fontFamily: "var(--sans)",
          fontWeight: 800,
          fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
          letterSpacing: "-0.03em",
          marginBottom: 8,
          lineHeight: 1.15,
        }}
      >
        {formatIndianNum(n)} in Words
      </h1>

      <p
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.82rem",
          color: "var(--muted)",
          marginBottom: 36,
        }}
      >
        How to write {n.toLocaleString("en-IN")} in words — Indian &amp; International format
      </p>

      {/* Answer cards */}
      {[
        {
          label: "Indian Format (Lakh / Crore)",
          tag: "🇮🇳 Indian",
          value: indian,
        },
        {
          label: "Cheque / Invoice",
          tag: "📋 Cheque",
          value: chequeFormat,
        },
        {
          label: "International Format (Million / Billion)",
          tag: "🌍 Intl.",
          value: international,
        },
      ].map(({ label, tag, value }) => (
        <div
          key={tag}
          style={{
            background: "white",
            border: "1.5px solid var(--border)",
            borderRadius: 6,
            padding: "18px 20px",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            <span className="tag">{tag}</span>
          </div>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "1.05rem",
              fontWeight: 500,
              color: "var(--ink)",
              lineHeight: 1.5,
            }}
          >
            {value}
          </p>
        </div>
      ))}

      {/* Live tool embedded */}
      <div style={{ marginTop: 48 }}>
        <h2
          style={{
            fontFamily: "var(--sans)",
            fontWeight: 700,
            fontSize: "1rem",
            marginBottom: 24,
          }}
        >
          Convert another number
        </h2>
        <Converter />
      </div>

      <footer
        style={{
          marginTop: 64,
          paddingTop: 24,
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--mono)",
          fontSize: "0.72rem",
          color: "var(--muted)",
        }}
      >
        <Link href="/" style={{ color: "var(--muted)" }}>
          ← Back to Number to Words Converter
        </Link>
      </footer>
    </main>
  );
}
