"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStoreUser } from "@/hooks/use-store-user";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { BarLoader } from "react-spinners";
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard } from "lucide-react";
const Header = () => {
  const path = usePathname();
  const { isLoading } = useStoreUser();

  if (path.includes("/editor")) {
    return null; //hide header on editor page
  }

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-nowrap">
      <div className="backdrop-blur-md bg-white/10 border-white-20 rounded-full px-8 py-3 flex items-center justify-between gap-8">
        <Link href="/" className="mr-10 md:mr-20">
          <Image
            src="/logo1.png"
            alt="logo"
            width={40}
            height={40}
            className="object-contain"
          />
        </Link>
        {path === "/" && (
          <div className="hidden md:flex space-x-6">
            <Link
              href="#features"
              className="text-white font-medium transition-all duration-300 hover:text-purple-400 cursor-pointer"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-white font-medium transition-all duration-300 hover:text-yellow-300 cursor-pointer"
            >
              Pricing
            </Link>
            <Link
              href="#contact"
              className="text-white font-medium transition-all duration-300 hover:text-red-500 cursor-pointer"
            >
              Contact
            </Link>
          </div>
        )}

        <div className="flex items-center gap-3 ml-10 md:ml-20">
          <Unauthenticated>
            <SignInButton>
              <Button variant="glass" className="hidden sm:flex">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="primary">Sign Up</Button>
            </SignUpButton>
          </Unauthenticated>
          <Authenticated>
            <Link href="/dashboard">
              <button className="relative inline-flex h-9 mr-1 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Dashboard
                </span>
              </button>
            </Link>

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </Authenticated>
        </div>
        {isLoading && (
          <div className="absolute inset-x-0 -bottom-px h-px w-full bg-gradient-to-r from-transparent via-purple-600 to-transparent"></div>
        )}
      </div>
    </header>
  );
};

export default Header;
