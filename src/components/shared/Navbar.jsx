"use client";
import { useState } from "react";
import { Button } from "@heroui/react";

import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";
import NavLink from "./NavLink";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
    <nav className="sticky top-0 z-40 w-full bg-background/70 backdrop-blur-lg">
      <header className="flex h-16 items-center justify-between px-6">
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

        <ul className="flex items-center gap-4">
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

       
        <div className="flex gap-6">
          <ThemeSwitcher />
          <div className="flex gap-3">
            <Link href="/signUp">
              <Button className="bg-linear-to-br from-cyan-500 to-blue-600 text-white hover:bg-cyan-700 rounded-2xl px-6 transition-all">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button className="bg-linear-to-br from-cyan-500 to-blue-600 text-white hover:bg-cyan-700 rounded-2xl px-6 transition-all">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </nav>
  );
}
