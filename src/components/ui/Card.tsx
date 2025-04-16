import React from "react";
import { cn } from "@/lib/utils"; // Optional helper for merging Tailwind classes

// ✅ Props accepted by the DashboardCard component
type CardProps = {
  // Title displayed at the top of the card
  title: string;

  // Content inside the card body
  children: React.ReactNode;

  // Optional: extra CSS classes to customize card layout or spacing
  className?: string;
};

// ✅ Reusable Card component for all dashboard widgets
export function DashboardCard({ title, children, className }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm p-5 border border-gray-200",
        className
      )}
    >
      {/* 🔹 Card Header: Title (section label) */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>

      {/* 🔹 Card Body: Flexible content passed as children */}
      <div>{children}</div>
    </div>
  );
}