// ✅ Tells Next.js this component uses client-side interactivity (required for useState, onClick, etc.)
'use client';

// ✅ React hook for managing local state
import { useState } from "react";

// ✅ Initialized Supabase client (configured via lib/supabase.ts)
import { supabase } from "@/lib/supabase";

// ✅ UI components from shadcn/ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// ✅ Sign Up Page Component
export default function SignUpPage() {
  // 🔹 Store all form fields in a single state object for simplicity
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "Landlord", // default role selected
  });

  // 🔹 Display status messages to user
  const [message, setMessage] = useState("");

  // 🔹 Handle changes in any input/select field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Called when user clicks "Sign Up"
  const handleSubmit = async () => {
    // 🚫 Block if passwords don’t match
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    // ✅ Create user in Supabase auth.users table
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // ✅ If auth creation succeeded, create corresponding entry in `profiles` table
    if (data.user) {
      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: data.user.id, // FK to auth.users
          first_name: formData.firstName,
          last_name: formData.lastName,
          role: formData.role,
        },
      ]);

      if (profileError) {
        setMessage("User created, but failed to save profile info.");
      } else {
        setMessage("✅ Account created! Check your email to confirm.");
      }
    }
  };

  return (
    <main className="max-w-md mx-auto py-20 px-4">
      <h1 className="text-2xl font-bold mb-6">Create an Account</h1>

      {/* 🔹 Form starts here */}
      <div className="space-y-4">

        {/* First Name Field */}
        <div>
          <Label>First Name</Label>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>

        {/* Last Name Field */}
        <div>
          <Label>Last Name</Label>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>

        {/* Role Dropdown */}
        <div>
          <Label>Role</Label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md text-sm"
          >
            <option value="Landlord">Landlord</option>
            <option value="Tenant">Tenant</option>
            <option value="Agent">Agent</option>
          </select>
        </div>

        {/* Email Field */}
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Password Field */}
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        {/* Sign Up Button */}
        <Button className="w-full mt-4" onClick={handleSubmit}>Sign Up</Button>

        {/* Status Message (errors or success) */}
        {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
      </div>
    </main>
  );
}