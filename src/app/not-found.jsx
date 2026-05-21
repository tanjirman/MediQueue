"use client";

import Link from "next/link";

import { Button } from "@heroui/react";

import {
  FaHome,
  FaSearch,
} from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950 px-4">

      <div className="max-w-3xl mx-auto text-center">

        {/* 404 */}
        <h1 className="text-[120px] md:text-[180px] font-black leading-none bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">

          404
        </h1>

        {/* TITLE */}
        <h2 className="mt-4 text-4xl md:text-5xl font-black text-black dark:text-white">

          Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="mt-6 text-lg text-default-600 leading-relaxed max-w-2xl mx-auto">

          Oops! The page you are looking for doesn’t exist or may have been moved.
          Let’s get you back to exploring expert tutors and learning sessions.
        </p>

        {/* BUTTONS */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

          <Link href="/">
            <Button
              size="lg"
              radius="full"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8"
            >

              <FaHome />

              Back To Home
            </Button>
          </Link>

          <Link href="/tutors">
            <Button
              size="lg"
              radius="full"
              variant="bordered"
              className="border-black dark:border-white text-black dark:text-white px-8"
            >

              <FaSearch />

              Explore Tutors
            </Button>
          </Link>
        </div>

        {/* DECORATION */}
        <div className="mt-20 flex justify-center">

          <div className="w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />
        </div>
      </div>
    </section>
  );
}