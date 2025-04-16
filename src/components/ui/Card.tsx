// components/ui/Card.tsx

import React from "react";

// ✅ Props for the reusable DashboardCard
interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

// ✅ A simple, reusable card component for the dashboard
export default function DashboardCard({ title, children, className = "" }: DashboardCardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 border border-gray-200 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
