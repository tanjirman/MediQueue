"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Spinner } from "@heroui/react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTimes,
} from "react-icons/fa";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sort) params.append("sort", sort);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/tutors?${params.toString()}`
        );

        const data = await res.json();
        setTutors(data);
      } catch (err) {
        console.error("Failed fetching tutor database collection stream:", err);
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(fetchTutors, 300);
    return () => clearTimeout(t);
  }, [search, sort]);

  const formatAvailability = (tutor) => {
    if (!tutor?.availability && !tutor?.availableDays) return "Flexible Hours";
    
    const targetDays = tutor.availableDays || tutor.availability;
    if (typeof targetDays === "object") {
      return `${targetDays.days?.join(", ") || ""} ${
        targetDays.time ? `(${targetDays.time})` : ""
      }`;
    }

    return String(targetDays);
  };

  return (
    <section className="min-h-screen py-24 bg-linear-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* CONTROLS BAR */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search matching fields or specialties..."
            className="border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-slate-900 rounded-xl w-full text-black dark:text-white placeholder-default-400 focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-black/10 dark:border-white/10 p-3 bg-white dark:bg-slate-900 rounded-xl text-black dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500 transition-all"
          >
            <option value="">Default Sorting</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>

          {(search || sort) && (
            <Button 
              isIconOnly
              color="danger" 
              variant="flat" 
              onClick={() => { setSearch(""); setSort(""); }}
              className="rounded-xl min-w-12 h-12 text-sm"
            >
              <FaTimes />
            </Button>
          )}
        </div>

        {/* LOADING HANDLER */}
        {loading ? (
          <div className="min-h-[40vh] flex justify-center items-center">
            <Spinner size="lg" color="cyan" label="Syncing platform teachers..." />
          </div>
        ) : tutors.length === 0 ? (
          <div className="min-h-[30vh] flex flex-col justify-center items-center text-center border border-dashed border-black/10 dark:border-white/10 rounded-[32px] p-12">
            <p className="text-default-500 text-sm font-medium">No professional profiles match your current filtering criteria.</p>
          </div>
        ) : (
          /* GRID PIPELINE */
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {tutors.map((tutor) => {
              // ================= EVALUATING STATUS BADGE DATA =================
              const totalSlot = Number(tutor?.totalSlot ?? 0);
              const sessionDateValue = tutor?.sessionDate || tutor?.sessionStartDate;
              const targetSessionDate = sessionDateValue ? new Date(sessionDateValue) : null;
              const currentDate = new Date();
              
              // Validation checklist
              const isBookingAvailableYet = targetSessionDate ? currentDate >= targetSessionDate : true;
              const hasSlotsAvailable = totalSlot > 0;
              const isTeacherAvailable = isBookingAvailableYet && hasSlotsAvailable;

              return (
                <div 
                  key={tutor._id} 
                  className="group rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-slate-900 overflow-hidden shadow-xs hover:shadow-xl dark:hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
                >
                  {/* IMAGE BASE HEADER WITH FLOATING STATUS BADGE */}
                  <div className="relative w-full h-56 bg-slate-100 dark:bg-slate-950 shrink-0">
                    {tutor.image ? (
                      <Image
                        src={tutor.image}
                        alt={tutor.name || "Tutor Profile"}
                        fill
                        sizes="(max-w-7xl) 33vw"
                        className="object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-black text-2xl uppercase bg-cyan-500/10 text-cyan-500">
                        {tutor.name?.charAt(0)}
                      </div>
                    )}
                    
                    {/* 🌟 STATUS BADGE - POSITIONED ABSOLUTE OVER IMAGE */}
                    <div className="absolute top-4 left-4 z-10">
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

                    {/* PRICE CHIP HOVER TAG */}
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="bg-black/70 backdrop-blur-xs text-white text-xs font-bold px-3 py-1 rounded-lg">
                        ${tutor.price || 0}/hr
                      </span>
                    </div>
                  </div>

                  {/* DETAILS BODY - FULLY RECONFIGURED FOR DARK THEME READABILITY */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-1">
                      <h2 className="text-xl font-black text-slate-900 dark:text-white truncate group-hover:text-cyan-500 transition-colors">
                        {tutor.name || "Anonymous Professor"}
                      </h2>
                      
                      {tutor.specialty && (
                        <p className="text-xs font-bold uppercase tracking-wide text-cyan-600 dark:text-cyan-400">
                          {tutor.specialty}
                        </p>
                      )}
                    </div>

                    {/* METRIC ROWS */}
                    <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-2.5 text-xs text-default-500 font-medium">
                        <FaClock className="text-cyan-500 shrink-0 text-sm" />
                        <span className="truncate">{formatAvailability(tutor)}</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs text-default-500 font-medium">
                        <FaMapMarkerAlt className="text-rose-500 shrink-0 text-sm" />
                        <span className="truncate">{tutor.location || "Remote/Digital"}</span>
                      </div>
                    </div>

                    {/* FOOTER INTERACTIVE BUTTON */}
                    <div className="pt-2">
                      <Link href={`/tutors/${tutor._id}`} className="block w-full">
                        <Button 
                          className="w-full font-bold rounded-xl text-xs bg-slate-100 hover:bg-cyan-500 dark:bg-white/5 dark:hover:bg-cyan-500 text-slate-900 dark:text-white hover:text-white transition-all shadow-xs"
                        >
                          View Profile Details
                        </Button>
                      </Link>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}