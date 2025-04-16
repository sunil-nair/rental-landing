'use client'; // ✅ Required for using React hooks and interactivity in Next.js App Router

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ Props accepted by the SearchBar component
type SearchBarProps = {
  // Optional placeholder for the input field
  placeholder?: string;

  // Optional array of clickable suggested prompts
  suggestions?: string[];

  // Callback function to handle search query (via Enter key or button click)
  onSearch: (query: string) => void;
};

// ✅ Reusable SearchBar component for dashboards, filtering, or assistant interfaces
export function SearchBar({
  placeholder = "Ask a question…", // Default placeholder if none is provided
  suggestions = [], // Default to no suggestions
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState(""); // Local state for the input field

  // 🔍 Handle when user submits search (via Enter key or "Go" button)
  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim()); // Trigger the callback
      setQuery(""); // Optionally clear the input after submission
    }
  };

  return (
    <div className="space-y-4">
      {/* 🔹 Input Field and Submit Button */}
      <div className="flex gap-2">
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSubmit(); // Submit on Enter
          }}
        />
        <Button onClick={handleSubmit}>Go</Button>
      </div>

      {/* 🔹 Optional Suggestion Chips */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((text, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => onSearch(text)} // Use suggestion as query directly
            >
              {text}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}