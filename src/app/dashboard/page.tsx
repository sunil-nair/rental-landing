// ✅ app/dashboard/page.tsx
// Main Dashboard page for authenticated users
// Displays: smart search bar + modular dashboard cards
// Cards include Rent Collected, Late Payments, and Recent Expenses

'use client'; // Enables client-side React features in Next.js App Router

import { DashboardCard } from "@/components/ui/Card"; // Standardized Card component
import { SearchBar } from "@/components/ui/SearchBar"; // Reusable search + prompt assistant
import { useState } from "react";

export default function DashboardPage() {
  // 🔹 Stores the query from the SearchBar (not wired to backend yet)
  const [query, setQuery] = useState("");

  return (
    <main className="p-6 space-y-8">
      {/* 🔍 Smart Assistant Search Bar */}
      <SearchBar
        placeholder="Ask about rent, expenses, or tenants..."
        suggestions={[
          "How much rent did I collect this month?",
          "Which units are vacant?",
          "Show last 10 expenses",
        ]}
        onSearch={(q) => setQuery(q)} // Logs or handles the submitted query
      />

      {/* 🧾 Dashboard Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 💸 Rent Collected + Unit Summary Card */}
        <DashboardCard title="Rent Collected">
          <p className="text-3xl font-bold">$4,200</p>
          <p className="text-sm text-gray-500 mt-1">
            2 vacant units · Agent: Sarah Lee
          </p>
        </DashboardCard> 

        {/* ⏰ Late Payments Card */}
        <DashboardCard title="Late Payments">
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>John Doe · (555) 123-4567</span>
              <button className="text-sm text-blue-600 hover:underline">Send Email</button>
            </li>
            <li className="flex justify-between">
              <span>Mary Smith · (555) 987-6543</span>
              <button className="text-sm text-blue-600 hover:underline">Send Email</button>
            </li>
          </ul>
        </DashboardCard>

        {/* 🧾 Recent Expenses Card */}
        <DashboardCard title="Recent Expenses">
          <ul className="text-sm space-y-1">
            <li>🧰 Plumbing - $120 · Elm St</li>
            <li>🔧 HVAC Repair - $340 · Pine Ave</li>
            <li>🧹 Cleaning - $75 · Maple Blvd</li>
            <li>🛠️ Painting - $500 · Cedar Ct</li>
            <li>🚿 Shower Install - $600 · Oak Ln</li>
          </ul>
        </DashboardCard>
      </div>
    </main>
  );
}
