'use client';

// ✅ React hooks
import { useState, useEffect } from "react";

// ✅ Shadcn UI components for styling and input controls
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// ✅ Utility to format the date (from date-fns)
import { format } from "date-fns";

// ✅ Supabase client import
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// 💡 Temporary type alias until proper Supabase types are generated
type Database = any;

export default function ExpenseFormV2() {
  const supabase = createClientComponentClient<Database>();

  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    subcategory: "",
    vendor_name: "",
    notes: "",
    expense_date: format(new Date(), "yyyy-MM-dd"),
    entry_method: "manual",
    is_deductible: false,
    ai_summary: "",
  });

  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_deductible: checked }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setReceiptFile(file);
    if (file) {
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let receiptUrl = null;

    if (receiptFile) {
      const fileExt = receiptFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("receipts")
        .upload(fileName, receiptFile);

      if (uploadError) {
        console.error("Receipt upload failed:", uploadError);
        setIsSubmitting(false);
        return;
      }

      receiptUrl = uploadData?.path;
    }

    const { error } = await supabase.from("expenses").insert({
      amount: parseFloat(formData.amount),
      category: formData.category,
      subcategory: formData.subcategory,
      vendor_name: formData.vendor_name,
      notes: formData.notes,
      expense_date: formData.expense_date,
      entry_method: formData.entry_method,
      is_deductible: formData.is_deductible,
      ai_summary: formData.ai_summary,
      receipt_url: receiptUrl,
    });

    if (error) {
      console.error("Failed to save expense:", error);
    } else {
      alert("Expense saved successfully!");
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto p-4 bg-white rounded-xl shadow-sm">
      <div className="space-y-2">
        <Label htmlFor="receipt">Upload Receipt</Label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {receiptPreview && <img src={receiptPreview} alt="Receipt Preview" className="w-full max-h-48 object-contain rounded" />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input type="number" name="amount" value={formData.amount} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="expense_date">Date</Label>
          <Input type="date" name="expense_date" value={formData.expense_date} onChange={handleChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Input name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Repairs" />
        </div>

        <div>
          <Label htmlFor="subcategory">Subcategory</Label>
          <Input name="subcategory" value={formData.subcategory} onChange={handleChange} placeholder="e.g. Plumbing" />
        </div>
      </div>

      <div>
        <Label htmlFor="vendor_name">Vendor Name</Label>
        <Input name="vendor_name" value={formData.vendor_name} onChange={handleChange} placeholder="Vendor or service provider" />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Optional notes..." />
      </div>

      <div>
        <Label htmlFor="entry_method">Entry Method</Label>
        <select
          name="entry_method"
          value={formData.entry_method}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="manual">Manual</option>
          <option value="ocr">OCR</option>
          <option value="voice">Voice</option>
          <option value="recurring">Recurring</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox id="deductible" checked={formData.is_deductible} onCheckedChange={handleCheckbox} />
        <Label htmlFor="deductible">Is this tax-deductible?</Label>
      </div>

      <div>
        <Label htmlFor="ai_summary">AI Summary</Label>
        <Textarea name="ai_summary" value={formData.ai_summary} onChange={handleChange} placeholder="Optional AI summary..." />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Expense"}
      </Button>
    </form>
  );
}