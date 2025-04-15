'use client';

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ExpenseForm() {
  const [categories, setCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    notes: "",
  });

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://n8n-nova-u37847.vm.elestio.app/webhook-test/get-properties");
        const data = await res.json();
        // Adjust this based on the actual response shape
        const options = data.map((item: any) => item.name || item.category || item.label);
        setCategories(options);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted expense:", formData);
    // TODO: send to Supabase or webhook
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Amount</label>
        <Input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Enter amount"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Select a category</option>
          {categories.map((category, idx) => (
            <option key={idx} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes</label>
        <Input
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Optional notes..."
        />
      </div>

      <Button type="submit">Save Expense</Button>
    </form>
  );
}