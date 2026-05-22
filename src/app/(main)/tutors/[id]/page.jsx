"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import BookingModal from "@/components/BookingModal";
import { useOverlayState, Button } from "@heroui/react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const modal = useOverlayState();

  const { data: session, isPending } = useSession();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setTutor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load tutor details");
        setLoading(false);
      });
  }, [id]);

  if (loading || isPending) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm font-medium text-default-500">
        Loading tutor profile details...
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-sm font-medium text-red-500">
        Tutor profile not found.
      </div>
    );
  }

  // ================= ASSIGNMENT VALIDATION RULES =================
  const totalSlot = Number(tutor?.totalSlot ?? 0);
  
  // Checking both potential database naming structures safely
  const sessionDateValue = tutor?.sessionDate || tutor?.sessionStartDate;
  const targetSessionDate = sessionDateValue ? new Date(sessionDateValue) : null;
  const currentDate = new Date();
  
  // Rule 1: Date evaluation check (Has current date reached/crossed the session date?)
  const isBookingAvailableYet = targetSessionDate ? currentDate >= targetSessionDate : true;
  
  // Rule 2: Slots availability check
  const hasSlotsAvailable = totalSlot > 0;

  // 🎯 DYNAMIC STATUS BADGE LOGIC: Available only if current date crossed session date AND slots exist
  const isTeacherAvailable = isBookingAvailableYet && hasSlotsAvailable;

  // Handle formatted availability text string safely
  const availability =
    typeof tutor.availableDays === "string"
      ? tutor.availableDays
      : "Flexible hours";

  // ================= BOOKING SUBMIT TRIGGER =================
  const handleBookingPress = () => {
    if (!hasSlotsAvailable) {
      toast.error("No available slots left. This session is fully booked!");
      return;
    }

    if (!isBookingAvailableYet) {
      toast.error("Booking is not available yet for this tutor.");
      return;
    }

    modal.open();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {tutor.image && (
        <div className="relative w-full h-[320px] md:h-[400px] overflow-hidden rounded-2xl border border-black/5">
          <Image
            src={tutor.image}
            fill
            priority
            className="object-cover"
            alt={tutor.name || "Tutor"}
          />
        </div>
      )}

      <div className="text-left space-y-3">
        {/* TITLE AND STATUS BADGE ROW */}
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {tutor.name}
          </h1>
          
          {/* 🌟 STATUS BADGE */}
          <span 
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              isTeacherAvailable 
                ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" 
                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
            }`}
          >
            {isTeacherAvailable ? "● Available" : "● Not Available"}
          </span>
        </div>

        {tutor.specialty && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            {tutor.specialty}
          </span>
        )}
        <p className="text-sm leading-relaxed text-default-500 mt-2">
          {tutor.description || "No descriptions overview details published yet."}
        </p>
      </div>

      {/* CORE DETAILS MATRIX METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-default-100 py-4 text-left">
        <div>
          <span className="text-xs font-semibold text-default-400 block uppercase tracking-wider">Hourly Rate</span>
          <span className="text-xl font-bold text-slate-800 dark:text-white">${tutor.price}/hr</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-default-400 block uppercase tracking-wider">Hours & Availability</span>
          <span className="text-sm font-medium text-slate-700 dark:text-default-300">{availability}</span>
        </div>
        <div>
          <span className="text-xs font-semibold text-default-400 block uppercase tracking-wider">Available Capacity</span>
          <span className={`text-sm font-bold ${hasSlotsAvailable ? "text-emerald-600" : "text-rose-500"}`}>
            {hasSlotsAvailable ? `${totalSlot} slots left` : "No available slots left"}
          </span>
        </div>
      </div>

      {/* REQUIREMENTS WARNING FEEDBACK FLAGS */}
      <div className="space-y-2 text-left">
        {!isBookingAvailableYet && sessionDateValue && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-xl text-xs font-medium">
            ⚠️ Booking is not available yet for this tutor. (Starts: {new Date(sessionDateValue).toLocaleDateString()})
          </div>
        )}

        {!hasSlotsAvailable && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-xs font-medium">
            🚫 This session is fully booked. You can not join at the moment.
          </div>
        )}
      </div>

      {/* ACTION BOOKING BUTTON */}
      <Button
        onPress={handleBookingPress}
        isDisabled={!isTeacherAvailable}
        className={`w-full font-bold h-12 rounded-xl text-sm transition-all shadow-md ${
          isTeacherAvailable
            ? "bg-linear-to-r from-emerald-500 to-teal-600 text-white hover:opacity-90"
            : "bg-default-200 text-default-400 cursor-not-allowed"
        }`}
      >
        {!hasSlotsAvailable 
          ? "Fully Booked" 
          : !isBookingAvailableYet 
            ? "Booking Not Available Yet" 
            : "Book Session"}
      </Button>

      {/* BOOKING MODAL */}
      <BookingModal
        state={modal}
        tutor={tutor}
        setTutor={setTutor}
        user={session?.user || { name: "Kashfia Meherin", email: "kashfia@gmail.com" }}
      />
    </div>
  );
}