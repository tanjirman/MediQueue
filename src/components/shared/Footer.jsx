"use client";
import React from "react";
import Link from "next/link";
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri"; // Modern X logo instead of old Twitter bird
import { FaGraduationCap } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Learning Services Directory Data
  const servicesLinks = [
    { label: "Mathematics & Calculus", href: "/tutors?subject=mathematics" },
    { label: "Physics & Core Sciences", href: "/tutors?subject=physics" },
    { label: "Chemistry & Molecular Tech", href: "/tutors?subject=chemistry" },
    { label: "Computer Science & Coding", href: "/tutors?subject=computer-science" },
    { label: "Language & Communications", href: "/tutors?subject=languages" },
  ];

  // Quick Platform Navigation Data
  const platformLinks = [
    { label: "Find Available Tutors", href: "/tutors" },
    { label: "Become a Tutor", href: "/add-tutors" },
    { label: "Student Dashboard", href: "/my-booking" },
    { label: "Privacy & Policy", href: "/" },
    { label: "Terms of Service", href: "/" },
  ];

  return (
    <footer className="w-full bg-default-50 border-t border-default-100/60 dark:bg-zinc-950/40 transition-colors duration-200">
      {/* Main Footer Directory Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Pitch & Presentation */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md">
              <FaGraduationCap className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight bg-linear-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                MediQueue
              </h2>
              <p className="text-[9px] uppercase tracking-[3px] text-default-400">
                Smart Learning
              </p>
            </div>
          </Link>
          <p className="text-sm text-default-500 leading-relaxed max-w-sm">
            Eliminating scheduling manual headaches, managing queue conflicts, and securing instantly verified session paths to optimize modern student schedules.
          </p>
        </div>

        {/* Column 2: Tutor Services / Learning Trackers */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-default-800 dark:text-default-200">
            Learning Services
          </h3>
          <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
            {servicesLinks.map((link, idx) => (
              <li key={idx}>
                <Link 
                  href={link.href} 
                  className="text-sm text-default-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Platform Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-default-800 dark:text-default-200">
            Explore Platform
          </h3>
          <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
            {platformLinks.map((link, idx) => (
              <li key={idx}>
                <Link 
                  href={link.href} 
                  className="text-sm text-default-500 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Physical Location Profiles */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-default-800 dark:text-default-200">
            Contact & Support
          </h3>
          <ul className="flex flex-col gap-3 list-none m-0 p-0 text-sm text-default-500">
            <li className="flex items-center gap-3">
              <FiMapPin className="text-cyan-500 text-lg shrink-0" />
              <span>Savar, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="text-cyan-500 text-lg shrink-0" />
              <a href="tel:+880123456789" className="hover:text-cyan-500 transition-colors">
                +880 1234-567890
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiMail className="text-cyan-500 text-lg shrink-0" />
              <a href="mailto:support@mediqueue.com" className="hover:text-cyan-500 transition-colors">
                support@mediqueue.com
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Decorative Isolation Rule */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="w-full h-px bg-default-200/40 dark:bg-default-100/10" />
      </div>

      {/* Secondary Bottom Area: Copyright & Social Matrices */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Copyright Attribution */}
        <p className="text-xs text-default-400 text-center sm:text-left">
          &copy; {currentYear} <span className="font-semibold text-default-500">MediQueue</span>. All rights reserved. Built for Smart Scheduling.
        </p>

        {/* Social Network Icon Matrix */}
        <div className="flex items-center gap-4">
          <a 
            href="https://x.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-8 h-8 rounded-xl bg-default-100 dark:bg-default-50/5 flex items-center justify-center text-default-500 hover:bg-cyan-500/10 hover:text-cyan-500 transition-all active:scale-90"
            aria-label="Follow MediQueue on X"
          >
            <RiTwitterXFill className="text-base" />
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-8 h-8 rounded-xl bg-default-100 dark:bg-default-50/5 flex items-center justify-center text-default-500 hover:bg-cyan-500/10 hover:text-cyan-500 transition-all active:scale-90"
            aria-label="Connect on LinkedIn"
          >
            <FiLinkedin className="text-base" />
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-8 h-8 rounded-xl bg-default-100 dark:bg-default-50/5 flex items-center justify-center text-default-500 hover:bg-cyan-500/10 hover:text-cyan-500 transition-all active:scale-90"
            aria-label="Explore GitHub Source"
          >
            <FiGithub className="text-base" />
          </a>
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-8 h-8 rounded-xl bg-default-100 dark:bg-default-50/5 flex items-center justify-center text-default-500 hover:bg-cyan-500/10 hover:text-cyan-500 transition-all active:scale-90"
            aria-label="Follow on Instagram"
          >
            <FiInstagram className="text-base" />
          </a>
        </div>

      </div>
    </footer>
  );
}