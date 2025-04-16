// ✅ Enables Client-Side Interactivity for this page (required for Dialog, useState, etc.)
'use client';

// ✅ React hook for tracking local state (dialog open/closed)
import { useState } from "react";

// ✅ Shadcn/UI prebuilt button component (styled with Tailwind)
import { Button } from "@/components/ui/button";

// ✅ Shadcn/UI Dialog primitives for modal functionality
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// ✅ Custom ExpenseForm component that will show inside the dialog
import ExpenseForm from "@/components/ui/ExpenseForm";

// custom GetStarted button, if signed in leads to dashboard.
import { GetStartedButton } from "@/components/ui/GetStartedButton";

// ✅ This is the main component for the homepage
export default function Home() {
  // Local state to control whether the modal is open or not
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ---------- NAVBAR ---------- */}
      {/* Navbar contains brand title and navigation links including "New Expense" button */}
      <nav className="flex justify-between items-center px-10 py-6 text-sm font-medium text-gray-800 border-b">
        {/* 🔹 Brand Title */}
        <div className="text-xl font-bold text-indigo-600">RentPilot</div>

        {/* 🔹 Navigation links (right-aligned) */}
        <div className="space-x-6">
          {/* 🔹 Other navigation links */}
          <a href="#" className="hover:text-black transition">About</a>
          <a href="#" className="hover:text-black transition">Pricing</a>          
          <a href="#" className="hover:text-black transition">Features</a>
          <a href="#" className="hover:text-black transition">Contact</a>
          <a href="/signin" className="hover:text-black transition">Sign In</a>
          <a href="/signup" className="hover:text-black transition">Sign Up</a>
        </div>
      </nav>

      {/* ---------- HERO SECTION ---------- */}
      {/* Main marketing message (title, subtitle, CTA button) */}
      <section className="min-h-[80vh] flex flex-col justify-center items-start px-10 py-20 max-w-4xl mx-auto">
        {/* 🔹 Primary headline */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Rental Automation, Simplified
        </h1>

        {/* 🔹 Subtext to explain the product */}
        <p className="text-gray-600 text-lg mb-6 max-w-prose">
          Track expenses, collect rent, and automate landlord tasks — all from one AI-powered dashboard.
        </p>

        {/* 🔹 Primary CTA button */}
        <GetStartedButton />
      </section>
    </>
  );
}