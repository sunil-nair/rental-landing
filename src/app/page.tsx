'use client'; // ✅ Enables Client-Side Interactivity for this page (required for Dialog, useState, etc.)

// ✅ React hook for tracking local state (dialog open/closed)
import { useState } from "react";

// ✅ Shadcn/UI prebuilt button component (styled with Tailwind)
import { Button } from "@/components/ui/button";

// ✅ Shadcn/UI Dialog primitives for modal functionality
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// ✅ Custom ExpenseForm component that will show inside the dialog
import ExpenseForm from "@/components/ui/ExpenseForm";

// ✅ Custom GetStarted CTA button that leads user to dashboard if signed in
import { GetStartedButton } from "@/components/ui/GetStartedButton";

// ✅ This is the main component for the homepage
export default function Home() {
  // Local state to control whether the modal is open or not
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ---------- NAVBAR ---------- */}
      {/* Top navigation bar with logo, brand name, and navigation links */}
      <nav className="flex justify-between items-center px-10 py-6 text-sm font-medium text-gray-800 border-b">

        {/* 🔹 Brand section (left-aligned) includes logo image and brand name */}
        <div className="flex items-center space-x-3">
          {/* ✅ Logo image loaded from public/Logo.png — update filename if needed */}
          {/* ✅ alt text is essential for accessibility */}
          {/* ✅ Tailwind classes control dimensions and alignment */}
          <img 
            src="/Logo.png"           // Path relative to public folder
            alt="RentPilot Logo"      // Accessibility alt text
            className="w-30 h-30"       // Tailwind: width and height set to 2rem (32px)
          />

          {/* ✅ Brand Name in black color with font styling */}
          <span className="text-4xl font-extrabold text-gray-900 mb-4">
            nesterli
          </span>
        </div>

        {/* 🔹 Navigation links (right-aligned) */}
        {/* ✅ Each link is styled to change color on hover with transition */}
        <div className="space-x-6">
          <a href="#" className="hover:text-black transition">About</a> 
          <a href="#" className="hover:text-black transition">Pricing</a>          
          <a href="#" className="hover:text-black transition">Features</a>
          <a href="#" className="hover:text-black transition">Contact</a>
          <a href="/signin" className="hover:text-black transition">Sign In</a>
          <a href="/signup" className="hover:text-black transition">Sign Up</a>   
        </div>
      </nav>

      {/* ---------- HERO SECTION ---------- */}
      {/* Central marketing message and CTA that explains the app’s value */}
      <section className="min-h-[80vh] flex flex-col justify-center items-start px-10 py-20 max-w-4xl mx-auto">
        
        {/* 🔹 Primary headline */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Rental Automation, Simplified
        </h1>

        {/* 🔹 Subheadline: briefly explains what your product does */}
        <p className="text-gray-600 text-lg mb-6 max-w-prose">
          Track expenses, collect rent, and automate landlord tasks — all from one AI-powered dashboard.
        </p>

        {/* 🔹 Call-to-action button that routes user to sign up or dashboard */}
        <GetStartedButton />
      </section>
    </>
  );
}