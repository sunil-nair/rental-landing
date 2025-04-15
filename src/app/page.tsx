'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ExpenseForm from "@/components/ui/ExpenseForm";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* --- Navbar --- */}
      <nav className="flex justify-between items-center px-10 py-6 text-sm font-medium text-gray-800 border-b">
        <div className="text-xl font-bold text-indigo-600">RentPilot</div>
        <div className="space-x-6">
          {/* ✅ New Expense Button as a Dialog Trigger */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="hover:text-black transition">New Expense</button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
              <ExpenseForm />
            </DialogContent>
          </Dialog>

          {/* Other nav links */}
          <a href="#" className="hover:text-black transition">Pricing</a>
          <a href="#" className="hover:text-black transition">Features</a>
          <a href="#" className="hover:text-black transition">Contact</a>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="min-h-[80vh] flex flex-col justify-center items-start px-10 py-20 max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Rental Automation, Simplified
        </h1>
        <p className="text-gray-600 text-lg mb-6 max-w-prose">
          Track expenses, collect rent, and automate landlord tasks — all from one AI-powered dashboard.
        </p>
        <Button size="lg">Get Started</Button>
      </section>
    </>
  );
}