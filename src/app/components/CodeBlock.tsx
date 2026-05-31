import React from "react";

interface CodeBlockProps {
  language?: string;
  code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
  return (
    <div className="code-block" style={{
      background: "var(--card-bg-elevated, #1a1b26)",
      borderRadius: "8px",
      padding: "16px",
      overflowX: "auto",
      fontFamily: "monospace",
      border: "1px solid var(--border, #333)",
      margin: "1.5rem 0",
      position: "relative"
    }}>
      {language && (
        <div style={{
          position: "absolute",
          top: "0",
          right: "0",
          background: "var(--border, #333)",
          color: "var(--text-muted, #aaa)",
          padding: "4px 8px",
          fontSize: "0.75rem",
          textTransform: "uppercase",
          borderBottomLeftRadius: "8px",
          borderTopRightRadius: "8px",
          fontWeight: "bold"
        }}>
          {language}
        </div>
      )}
      <pre style={{ margin: 0, marginTop: language ? "12px" : "0", color: "#a9b1d6" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
