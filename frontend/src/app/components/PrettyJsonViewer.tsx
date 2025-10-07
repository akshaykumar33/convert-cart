"use client";

import { useState } from "react";
import { PrismAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

export function PrettyJsonViewer({ data, lineLimit = 25 }: { data: any; lineLimit?: number }) {
  const [expanded, setExpanded] = useState(false);

  if (!data) return null;

  const jsonString = JSON.stringify(data, null, 2);
  const lines = jsonString.split("\n");
  const isTruncated = lines.length > lineLimit;
  const displayLines = expanded ? lines : lines.slice(0, lineLimit);
  const displayJson = displayLines.join("\n");

  return (
    <div className="mt-7 rounded-lg border border-gray-200 px-4 py-2 overflow-auto shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">Raw JSON Result</h2>
        {isTruncated && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-blue-600 hover:underline"
          >
            {expanded ? "Show Less" : `Show More (${lines.length - lineLimit} lines hidden)`}
          </button>
        )}
      </div>
      <SyntaxHighlighter
        language="json"
        style={oneLight}
        customStyle={{
          fontSize: 14,
          borderRadius: "8px",
          padding: "18px",
        }}
        showLineNumbers
        lineNumberStyle={{ color: "#606060", marginRight: 12 }}
      >
        {displayJson}
      </SyntaxHighlighter>
    </div>
  );
}
