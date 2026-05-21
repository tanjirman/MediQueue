"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Avatar } from "@heroui/react";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Fetch active authentication context from Better-Auth
  const { data: session, isPending } = authClient.useSession();

  // Handle system logout action routine
  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully! 👋");
            router.push("/login"); 
          },
        },
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Something went wrong during logout.");
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg border-b border-black/5 dark:border-white/5">
      <header className="flex h-16 items-center justify-between px-6 max-w-7xl mx-auto">
        
        {/* Branding & Logo Layout Block */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">M</span>
            </div>

            <div>
              <h1 className="text-2xl font-black tracking-tight bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                MediQueue
              </h1>
              <p className="text-[10px] uppercase tracking-[4px] text-default-500">
                Smart Learning
              </p>
            </div>
          </Link>
        </div>

        {/* Global Navigation Links Route Map */}
        <ul className="flex items-center gap-6">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/tutors">Tutors</NavLink>
          </li>
          <li>
            <NavLink href="/add-tutors">Add Tutors</NavLink>
          </li>
          <li>
            <NavLink href="/my-tutor">My Tutor</NavLink>
          </li>
          <li>
            <NavLink href="/my-booking">My Booking</NavLink>
          </li>
        </ul>

        {/* Utility Controls & Interactive Auth State Blocks */}
        <div className="flex items-center gap-6">
          <ThemeSwitcher />
          
         <div className="flex items-center gap-4 justify-end">
  <div className="h-6 w-px bg-gray-200 dark:bg-neutral-800 mx-2" /> {/* Vertical Divider */}

  {isPending ? (
    // ⏳ SAFE PLACEHOLDER: Prevents structural layout movement while checking user session
    <div className="w-24 h-10 bg-slate-100 dark:bg-neutral-800 animate-pulse rounded-2xl" />
  ) : session?.user ? (
    // ✅ USER IS LOGGED IN: Render Profile Avatar & Red Logout Button (No list item tags)
    <div className="flex items-center gap-4">
      <Avatar>
        <Avatar.Image
          alt={session.user.name || "User Profile"}
          src={session.user.image || undefined}
        />
        <Avatar.Fallback>
          {session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"}
        </Avatar.Fallback>
      </Avatar>

      <Button
        onClick={handleLogout}
        className="rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold px-5 transition-all cursor-pointer"
      >
        Logout
      </Button>
    </div>
  ) : (
    // ❌ NO ACTIVE SESSION: Show Action Gateway Links
    <div className="flex items-center gap-3">
      <Link href="/login">
        <Button
          className="hover:border-cyan-600 hover:bg-cyan-50 rounded-2xl transition-all cursor-pointer"
          variant="ghost"
        >
          Log In
        </Button>
      </Link>

      <Link href="/signup">
        <Button className="bg-cyan-600 text-white hover:bg-cyan-700 rounded-2xl px-6 transition-all cursor-pointer">
          Sign Up
        </Button>
      </Link>
    </div>
  )}
</div>
        </div>

      </header>
    </nav>
  );
}