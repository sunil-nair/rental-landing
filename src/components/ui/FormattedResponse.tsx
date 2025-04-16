// components/ui/FormattedResponse.tsx
"use client";

import React from "react";

interface FormattedResponseProps {
  data: any;
}

export default function FormattedResponse({ data }: FormattedResponseProps) {
  let parsed: any;
  try {
    parsed = typeof data === "string" ? JSON.parse(data) : data;
  } catch (err) {
    return <pre className="text-sm whitespace-pre-wrap">{data}</pre>;
  }

  if (!parsed) return <p className="text-gray-500">No data</p>;

  if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object") {
    const headers = Object.keys(parsed[0]);
    return (
      <div className="overflow-x-auto border rounded-md text-sm">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((key) => (
                <th key={key} className="border px-4 py-2 text-left font-semibold">
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parsed.map((row: any, idx: number) => (
              <tr key={idx} className="even:bg-gray-50">
                {headers.map((key) => (
                  <td key={key} className="border px-4 py-2">
                    {row[key] === null || row[key] === undefined ? "—" : String(row[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(parsed, null, 2)}</pre>;
}
