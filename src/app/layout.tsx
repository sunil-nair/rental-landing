import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rental Landing",
  description: "Simple landing page for rental automation platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}