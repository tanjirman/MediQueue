"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Chip, Spinner } from "@heroui/react";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function AvailableTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`)
      .then((res) => {
        if (!res.ok) throw new Error("Network collection query rejected");
        return res.json();
      })
      .then((data) => {
        // Ensuring safety by limiting to max 6 elements locally if aggregation pipelines differ
        setTutors(Array.isArray(data) ? data.slice(0, 6) : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Aggregation stream loader failure:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex justify-center bg-white dark:bg-black">
        <Spinner size="lg" color="cyan" label="Streaming premium featured slots..." />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* TOP SECTION */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
            AVAILABLE TUTORS
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
            Learn From Top Rated Tutors
          </h2>

          <p className="mt-6 text-lg text-default-600 dark:text-default-400 leading-relaxed">
            Explore highly experienced tutors and start your personalized learning journey today.
          </p>
        </div>

        {/* GRID PIPELINE LIMIT 6 */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-left">
          {tutors.map((tutor) => {
            // ================= EVALUATING DYNAMIC STATUS BADGE DATA =================
            const totalSlot = Number(tutor?.totalSlot ?? 0);
            const sessionDateValue = tutor?.sessionDate || tutor?.sessionStartDate;
            const targetSessionDate = sessionDateValue ? new Date(sessionDateValue) : null;
            const currentDate = new Date();
            
            const isBookingAvailableYet = targetSessionDate ? currentDate >= targetSessionDate : true;
            const hasSlotsAvailable = totalSlot > 0;
            const isTeacherAvailable = isBookingAvailableYet && hasSlotsAvailable;

            return (
              <div
                key={tutor._id}
                className="group relative overflow-hidden rounded-[32px] bg-linear-to-b from-white to-cyan-50/30 dark:from-slate-900 dark:to-slate-950 border border-black/5 dark:border-white/10 shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
              >
                {/* IMAGE FRAME UPSTAIRS */}
                <div className="relative h-80 overflow-hidden shrink-0">
                  <Image
                    src={tutor.image || "/fallback-avatar.png"}
                    alt={tutor.name || "Tutor Profile"}
                    fill
                    sizes="(max-w-7xl) 33vw"
                    className="object-cover group-hover:scale-105 transition-all duration-700"
                  />

                  {/* GRADIENT DIMMING LAYER OVER IMAGE FOR BETTER CARD READABILITY */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                  {/* FLOATING SPECIALTY TAG */}
                  <div className="absolute top-5 left-5 z-10">
                    <Chip className="bg-cyan-500 text-white font-black text-xs uppercase tracking-wider">
                      {tutor.specialty || "General Medicine"}
                    </Chip>
                  </div>

                  {/* 🌟 FLOATING STATUS BADGE */}
                  <div className="absolute top-5 right-5 z-10">
                    <span 
                      className={`shadow-md px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border backdrop-blur-md ${
                        isTeacherAvailable 
                          ? "bg-emerald-500/90 text-white border-emerald-400/20" 
                          : "bg-rose-500/90 text-white border-rose-400/20"
                      }`}
                    >
                      {isTeacherAvailable ? "● Available" : "● Not Available"}
                    </span>
                  </div>

                  {/* RATING FLOATING TAG BOTTOM RIGHT OVER IMAGE */}
                  <div className="absolute bottom-14 right-5 flex items-center gap-1 bg-amber-500 text-white px-2.5 py-0.5 rounded-md text-xs font-black shadow-md">
                    <FaStar />
                    {tutor.rating || "4.9"}
                  </div>

                  {/* OVERLAY HEADER: NAME AND HOURLY RATE BASE CONTROLS */}
                  <div className="absolute bottom-5 left-5 right-5 z-10">
                    <h2 className="text-2xl font-black text-white truncate drop-shadow-sm">
                      {tutor.name}
                    </h2>
                    <p className="text-cyan-400 font-bold mt-0.5 drop-shadow-xs">
                      ${tutor.price || 0} <span className="text-xs text-white/70 font-normal">/ Hour</span>
                    </p>
                  </div>
                </div>

                {/* CONTENT AREA - COMPLIANT DARK THEME VISIBILITY ADJUSTMENTS */}
                <div className="p-7 flex flex-col justify-between flex-1 space-y-6">
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-3 text-default-700 dark:text-default-300 font-medium text-sm">
                      <FaMapMarkerAlt className="text-cyan-500 text-base shrink-0" />
                      <span className="truncate">{tutor.location || "Online Remote Session"}</span>
                    </div>

                    <div className="flex items-center gap-3 text-default-700 dark:text-default-300 font-medium text-sm">
                      <FaClock className="text-cyan-500 text-base shrink-0" />
                      <span className="truncate">
                        {typeof tutor.availability === "string" ? tutor.availability : tutor.availableDays || "Flexible schedules"}
                      </span>
                    </div>
                  </div>

                  {/* MANAGEMENT CALL TO ACTION ACTION ROUTER BUTTON */}
                  <div>
                    <Link href={`/tutors/${tutor._id}`} className="block w-full">
                      <Button
                        fullWidth
                        radius="full"
                        className="bg-linear-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-bold h-12 shadow-md transition-all duration-300 text-xs uppercase tracking-wider"
                      >
                        Book Session
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* HOVER GLOW EFFECT CONTEXT CONTAINER */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* BOTTOM SELECTION DEEP CONTAINER VIEW ALL ACCESS FOOTER */}
        <div className="mt-16 text-center">
          <Link href="/tutors">
            <Button
              size="lg"
              radius="full"
              className="bg-linear-to-r from-cyan-500 to-blue-600 hover:opacity-95 text-white font-bold px-10 shadow-lg tracking-wide"
            >
              View All Tutors
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}