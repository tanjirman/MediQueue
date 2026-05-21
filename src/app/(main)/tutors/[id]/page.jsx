"use client";

import { useEffect, useState, use } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaCalendarAlt, FaClock, FaDollarSign, FaMapMarkerAlt, FaChevronLeft } from "react-icons/fa";
import BookingModal from "@/components/BookingModal"; 
import { Button, useOverlayState } from "@heroui/react";

export default function TutorDetailsPage({ params: paramsPromise }) {
  const params = use(paramsPromise);
  const { id } = useParams();
  const router = useRouter();
  
  // HeroUI v3 State Controller for handling Modals
  const modalState = useOverlayState(); 
  
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated authenticated active user session data
  const currentUser = {
    name: "Kashfia Meherin",
    email: "kashfia@gmail.com",
  };

  useEffect(() => {
    fetch(`http://localhost:5000/tutors/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load tutor profiles.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-xl font-bold text-cyan-500 animate-pulse">Loading Tutor Details...</p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950">
        <p className="text-xl text-default-500 mb-4">Tutor record not found.</p>
        <Button onClick={() => router.push("/tutors")} className="bg-cyan-500 text-white rounded-xl">
          Go Back
        </Button>
      </div>
    );
  }

  // --- REQUIREMENT RULES EVALUATION ---
  const currentDate = new Date();
  const sessionStartDate = new Date(tutor.startDate);
  
  // 1. Session Date Restriction Check
  const isBookingDateValid = currentDate >= sessionStartDate;

  // 2. Total Slot Availability Check
  const isSlotsAvailable = tutor.totalSlot > 0;

  const handleBookingTrigger = () => {
    // If slots are empty, block booking entirely
    if (!isSlotsAvailable) {
      toast.error("This session is fully booked. You can't join at the moment.");
      return;
    }
    
    // Open the HeroUI dynamic form modal
    modalState.open(); 
  };

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        
        <Button 
          onClick={() => router.push("/tutors")}
          variant="light" 
          className="mb-8 text-default-600 font-medium rounded-xl gap-2 hover:text-cyan-500"
        >
          <FaChevronLeft size={12} /> Back to Tutors
        </Button>

        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-2xl rounded-[40px] overflow-hidden">
          {/* Header Image Banner */}
          <div className="relative h-64 md:h-80 w-full bg-slate-200 dark:bg-slate-800">
            <img src={tutor.image} alt={tutor.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 md:left-12 text-white">
              <span className="px-3 py-1 bg-cyan-500 text-xs font-bold rounded-full uppercase tracking-wider mb-3 inline-block">
                {tutor.specialty}
              </span>
              <h1 className="text-3xl md:text-5xl font-black">{tutor.name}</h1>
            </div>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-default-700 dark:text-default-300">
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
                <FaDollarSign className="text-cyan-500 text-2xl shrink-0" />
                <div>
                  <p className="text-xs text-default-400 font-semibold uppercase">Hourly Fee</p>
                  <p className="text-lg font-bold text-black dark:text-white">${tutor.price} / hr</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
                <FaClock className="text-cyan-500 text-2xl shrink-0" />
                <div>
                  <p className="text-xs text-default-400 font-semibold uppercase">Availability</p>
                  <p className="text-sm font-bold text-black dark:text-white">{tutor.availability}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
                <FaMapMarkerAlt className="text-cyan-500 text-2xl shrink-0" />
                <div>
                  <p className="text-xs text-default-400 font-semibold uppercase">Location Mode</p>
                  <p className="text-sm font-bold text-black dark:text-white">{tutor.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/50">
                <FaCalendarAlt className="text-cyan-500 text-2xl shrink-0" />
                <div>
                  <p className="text-xs text-default-400 font-semibold uppercase">Available Slots Left</p>
                  <p className={`text-lg font-black ${isSlotsAvailable ? "text-emerald-500" : "text-rose-500"}`}>
                    {isSlotsAvailable ? `${tutor.totalSlot} Slots` : "No available slots left."}
                  </p>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="border-t border-black/5 dark:border-white/10 pt-8">
              <h3 className="text-xl font-bold text-black dark:text-white mb-3">Tutor Description</h3>
              <p className="text-default-600 leading-relaxed whitespace-pre-line">{tutor.description}</p>
            </div>

            {/* Requirements Alerts Logic Blocks */}
            <div className="border-t border-black/5 dark:border-white/10 pt-8 flex flex-col gap-4">
              
              {/* Alert 1: Show message if date is earlier than session start date */}
              {!isBookingDateValid && isSlotsAvailable && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm font-semibold rounded-2xl text-center">
                  ⚠️ Booking is not available yet for this tutor. (Starts on: {tutor.startDate})
                </div>
              )}

              {/* Alert 2: Show message if totalSlot reaches 0 */}
              {!isSlotsAvailable && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-2xl text-center">
                  🚫 This session is fully booked. You can’t join at the moment.
                </div>
              )}

              {/* BOOK SESSION ACTION BUTTON */}
              <Button
                onClick={handleBookingTrigger}
                // Button is active if slots are available!
                disabled={!isSlotsAvailable}
                className={`w-full h-14 rounded-2xl text-lg font-bold text-white shadow-lg transition-all ${
                  isSlotsAvailable
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 cursor-pointer"
                    : "bg-default-300 dark:bg-neutral-800 cursor-not-allowed opacity-50"
                }`}
              >
                Book Session Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* HeroUI v3 Compound Props Modal Bridge */}
      <BookingModal 
        state={modalState} 
        tutor={tutor} 
        setTutor={setTutor}
        user={currentUser}
      />
    </section>
  );
}