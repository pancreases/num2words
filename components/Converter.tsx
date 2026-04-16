"use client";

import { useState, useCallback, useEffect } from "react";
import { toIndianWords, toInternationalWords, formatIndian, formatInternational } from "@/lib/converter";

type Mode = "indian" | "international";

export default function Converter() {
  const [raw, setRaw] = useState("");
  const [mode, setMode] = useState<Mode>("indian");
  const [copied, setCopied] = useState<string | null>(null);
  const [cheque, setCheque] = useState(false);

  const numVal = parseFloat(raw.replace(/,/g, "")) || 0;
  const isValid = raw !== "" && !isNaN(numVal);

  const indian = isValid ? toIndianWords(numVal, cheque) : "";
  const international = isValid ? toInternationalWords(numVal) : "";
  const result = mode === "indian" ? indian : international;
  const formatted =
    isValid
      ? mode === "indian"
        ? formatIndian(numVal)
        : formatInternational(numVal)
      : "";

  const copy = useCallback((text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 1500);
    });
  }, []);

  // Prevent extremely large numbers
  const handleInput = (val: string) => {
    if (val.length > 20) return;
    setRaw(val);
  };

  return (
    <div>
      {/* Mode Toggle */}
      <div
        style={{
          display: "inline-flex",
          border: "1px solid var(--border)",
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 28,
        }}
      >
        {(["indian", "international"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            style={{
              fontFamily: "var(--sans)",
              fontWeight: 600,
              fontSize: "0.78rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "8px 20px",
              background: mode === m ? "var(--ink)" : "transparent",
              color: mode === m ? "var(--paper)" : "var(--muted)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {m === "indian" ? "🇮🇳 Indian (Lakh/Crore)" : "🌍 International (Million/Billion)"}
          </button>
        ))}
      </div>

      {/* Input */}
      <div style={{ position: "relative", marginBottom: 8 }}>
        <input
          type="number"
          value={raw}
          onChange={(e) => handleInput(e.target.value)}
          placeholder="Type a number…"
          autoFocus
          style={{
            width: "100%",
            fontFamily: "var(--mono)",
            fontSize: "clamp(1.6rem, 5vw, 2.8rem)",
            fontWeight: 500,
            padding: "20px 24px",
            background: "white",
            border: "2px solid var(--ink)",
            borderRadius: 6,
            color: "var(--ink)",
            outline: "none",
            letterSpacing: "-0.01em",
          }}
        />
        {isValid && (
          <span
            style={{
              position: "absolute",
              right: 16,
              bottom: 10,
              fontFamily: "var(--mono)",
              fontSize: "0.72rem",
              color: "var(--muted)",
            }}
          >
            {mode === "indian" ? "₹ " : ""}
            {formatted}
          </span>
        )}
      </div>

      {/* Cheque mode toggle — only for Indian */}
      {mode === "indian" && (
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
            cursor: "pointer",
            fontFamily: "var(--mono)",
            fontSize: "0.8rem",
            color: "var(--muted)",
            userSelect: "none",
          }}
        >
          <input
            type="checkbox"
            checked={cheque}
            onChange={(e) => setCheque(e.target.checked)}
            style={{ accentColor: "var(--accent)", width: 14, height: 14 }}
          />
          Cheque / Invoice format &nbsp;
          <span className="tag">Rupees … Only</span>
        </label>
      )}

      {/* Result */}
      {isValid && result && (
        <div
          className="slide-up"
          key={result}
          style={{
            background: "white",
            border: "1.5px solid var(--border)",
            borderRadius: 6,
            padding: "24px 24px 20px",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "clamp(1rem, 2.8vw, 1.35rem)",
                lineHeight: 1.55,
                color: "var(--ink)",
                fontWeight: 500,
                flex: 1,
              }}
            >
              {result}
            </p>
            <button
              onClick={() => copy(result, "main")}
              title="Copy to clipboard"
              style={{
                flexShrink: 0,
                fontFamily: "var(--sans)",
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "7px 14px",
                border: "1.5px solid var(--border)",
                borderRadius: 4,
                background: copied === "main" ? "var(--ink)" : "transparent",
                color: copied === "main" ? "var(--paper)" : "var(--ink)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {copied === "main" ? "✓ Copied" : "Copy"}
            </button>
          </div>

          {/* Both formats when Indian mode */}
          {mode === "indian" && international && (
            <div
              style={{
                marginTop: 16,
                paddingTop: 14,
                borderTop: "1px solid var(--border)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                }}
              >
                <span className="tag" style={{ marginRight: 8 }}>Intl.</span>
                {international}
              </span>
              <button
                onClick={() => copy(international, "intl")}
                style={{
                  flexShrink: 0,
                  fontFamily: "var(--sans)",
                  fontWeight: 700,
                  fontSize: "0.65rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding: "4px 10px",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  background: copied === "intl" ? "var(--ink)" : "transparent",
                  color: copied === "intl" ? "var(--paper)" : "var(--muted)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {copied === "intl" ? "✓" : "Copy"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Quick picks */}
      <div style={{ marginTop: 24 }}>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 10,
          }}
        >
          Quick picks
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {[1000, 5000, 10000, 25000, 50000, 100000, 500000, 1000000, 10000000, 100000000].map(
            (n) => (
              <button
                key={n}
                onClick={() => setRaw(String(n))}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.78rem",
                  padding: "5px 12px",
                  border: "1px solid var(--border)",
                  borderRadius: 3,
                  background: numVal === n ? "var(--ink)" : "var(--paper-dim)",
                  color: numVal === n ? "var(--paper)" : "var(--ink)",
                  cursor: "pointer",
                  transition: "all 0.12s",
                }}
              >
                {n >= 10000000
                  ? n / 10000000 + " Cr"
                  : n >= 100000
                  ? n / 100000 + " L"
                  : n >= 1000
                  ? n / 1000 + "K"
                  : n}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
