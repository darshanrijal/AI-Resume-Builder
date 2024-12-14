"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { CreditCard } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeToggle } from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

export const Navbar = () => {
  const { resolvedTheme: theme } = useTheme();
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
        <Link href="/resumes" className="flex items-center gap-3">
          <Image
            src={logo}
            alt="app logo"
            width={35}
            height={35}
            className="rounded-full"
          />
          <span className="text-xl font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  height: 35,
                  width: 35,
                },
              },
              baseTheme: theme === "dark" ? dark : undefined,
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                href="/billing"
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
              />
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
};
