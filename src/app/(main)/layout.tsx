import React from "react";
import { Navbar } from "./navbar";
import { PremiumModal } from "@/components/premium/PremiumModal";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {children}
      <PremiumModal />
    </div>
  );
}
