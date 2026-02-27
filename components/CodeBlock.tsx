"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  className?: string; // e.g., "language-yaml:title=workflow.yml"
  children: string;
}

export default function CodeBlock({ className, children }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  let language = "text";
  let title: string | undefined = undefined;

  if (className) {
    const langMatch = className.match(/language-([\w-]+)/);
    if (langMatch) language = langMatch[1];

    const titleMatch = className.match(/:title=(.+)/);
    if (titleMatch) title = titleMatch[1];
  }

  // Detect inline (single backtick) snippets:
  const isSingleLine = !children.includes("\n");
  const isInline = !className && isSingleLine;

  // Normalize code content
  let cleanCode = children;
  if (isSingleLine) cleanCode = cleanCode.trim();
  else if (cleanCode.endsWith("\n")) cleanCode = cleanCode.slice(0, -1);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  // --- Inline render path: <code> only ---
  if (isInline) {
    return (
      <code className="rounded bg-gray-900/70 text-gray-100 px-1.5 py-0.5 text-[0.95em]">
        {cleanCode}
      </code>
    );
  }

  // --- Block render path: SyntaxHighlighter ---
  return (
    <div className="my-4 rounded-lg overflow-hidden shadow-md relative">
      {title && (
        <div className="flex justify-between items-center bg-gray-900 text-white px-4 py-1 text-sm font-medium border-b border-gray-700">
          <span>{title}</span>
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-xs bg-gray-800 rounded hover:bg-gray-700 transition"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        wrapLines
        showLineNumbers
        customStyle={{
          margin: 0,
          borderRadius: title ? "0 0 0.5rem 0.5rem" : "0.5rem",
        }}
      >
        {cleanCode}
      </SyntaxHighlighter>

      {!title && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 px-2 py-1 text-sm bg-gray-800 text-white rounded hover:bg-gray-700 transition"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}
``