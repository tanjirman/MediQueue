"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Spinner } from "@heroui/react";
import {
  FaUserGraduate,
  FaImage,
  FaClock,
  FaDollarSign,
  FaMapMarkerAlt,
  FaBookOpen,
  FaLayerGroup,
  FaCalendarAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

// ✅ Import your Better Auth hook directly from your client configuration
import { useSession } from "@/lib/auth-client";

export default function AddTutorPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // ✅ Extract the real authenticated user session metadata
  const { data: session, isPending: isAuthPending } = useSession();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (!session?.user?.email) {
      toast.error("You must be logged in to list a tutor profile.");
      return;
    }

    setLoading(true);

    // Explicitly parse numbers and harmonize keys to match UpdateModal/Backend fields precisely
    const tutorData = {
      name: data.name,
      image: data.image,
      specialty: data.specialty,
      language: data.language || "English", // Clean baseline default
      availableDays: data.availableDays,    // Matches 'availableDays' across components
      price: parseInt(data.price) || 0,
      totalSlot: parseInt(data.totalSlot) || 0,
      sessionDate: data.sessionDate,        // Normalized field key naming
      experience: data.experience,
      location: data.location,
      teachingMode: data.teachingMode,      // Matches 'teachingMode' across components
      description: data.description,
      booked: 0,
      
      // ✅ Save it into 'email' so your My Tutors fetch matching filter can find it!
      email: session.user.email,
      
      // Keep your display meta properties intact for other sections of your site
      tutorEmail: session.user.email,
      tutorProvider: session.user.name || "Anonymous User",
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });

      if (res.ok) {
        toast.success("Tutor Profile Created Successfully! 🎉");
        reset();
        
        // Wait 1.5 seconds so the user can see the success toast before redirecting
        setTimeout(() => {
          router.push("/my-tutor"); // Redirect directly to your My Tutors panel to see it appear!
        }, 1500);
      } else {
        toast.error("Failed to save data. Please check your backend.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Is your server running?");
    } finally {
      setLoading(false);
    }
  };

  // Prevent form render flashing while Better Auth verifies cookies/tokens
  if (isAuthPending) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-3">
        <Spinner size="lg" color="cyan" />
        <p className="text-sm text-default-400 font-medium">Verifying authorization access...</p>
      </div>
    );
  }

  // Prevent unauthenticated submissions completely
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
        <h3 className="text-xl font-bold text-rose-500">Access Denied</h3>
        <p className="text-sm text-default-400 mt-1 max-w-xs">
          Please log into your MediQueue account to publish public tutoring profile records.
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
            CREATE TUTOR PROFILE
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white">
            Add New Tutor
          </h1>
          <p className="mt-6 text-lg text-default-600 leading-relaxed">
            Add your tutoring details and start teaching students online.
          </p>
        </div>

        {/* FORM */}
        <div className="mt-16 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-2xl rounded-[40px] p-8 md:p-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Tutor Name */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Tutor Name</label>
              <div className="relative mt-3">
                <FaUserGraduate className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  placeholder="Tutor Name"
                  required
                  {...register("name")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Image */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Photo URL</label>
              <div className="relative mt-3">
                <FaImage className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="url"
                  placeholder="Image URL"
                  required
                  {...register("image")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Subject Dropdown */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Subject</label>
              <div className="relative mt-3">
                <FaBookOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                <select
                  required
                  {...register("specialty")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none appearance-none text-black dark:text-white dark:bg-slate-900"
                >
                  <option value="" className="dark:bg-slate-900">Select Subject</option>
                  <option value="Mathematics" className="dark:bg-slate-900">Mathematics</option>
                  <option value="Physics" className="dark:bg-slate-900">Physics</option>
                  <option value="Chemistry" className="dark:bg-slate-900">Chemistry</option>
                  <option value="Biology" className="dark:bg-slate-900">Biology</option>
                  <option value="Programming" className="dark:bg-slate-900">Programming</option>
                  <option value="English" className="dark:bg-slate-900">English</option>
                </select>
              </div>
            </div>

            {/* Language */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Language</label>
              <div className="relative mt-3">
                <FaBookOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  placeholder="English, Bangla"
                  required
                  {...register("language")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Availability - FIXED KEY */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Available Days & Time</label>
              <div className="relative mt-3">
                <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  placeholder="Sun - Thu 5PM - 8PM"
                  required
                  {...register("availableDays")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Price */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Hourly Fee ($)</label>
              <div className="relative mt-3">
                <FaDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="number"
                  placeholder="Hourly Fee"
                  required
                  min="1"
                  {...register("price")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Total Slot */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Total Slots</label>
              <div className="relative mt-3">
                <FaLayerGroup className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="number"
                  placeholder="Total Slots"
                  required
                  min="1"
                  {...register("totalSlot")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Start Date - FIXED KEY */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Session Start Date</label>
              <div className="relative mt-3">
                <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="date"
                  required
                  {...register("sessionDate")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>

            {/* Experience */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Experience</label>
              <div className="relative mt-3">
                <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  placeholder="5 Years"
                  required
                  {...register("experience")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Location */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Location</label>
              <div className="relative mt-3">
                <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  placeholder="Area / City"
                  required
                  {...register("location")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Teaching Mode Dropdown - FIXED KEY */}
            <div className="text-left">
              <label className="font-semibold text-black dark:text-white">Teaching Mode</label>
              <div className="relative mt-3">
                <FaLayerGroup className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                <select
                  required
                  {...register("teachingMode")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none appearance-none text-black dark:text-white dark:bg-slate-900"
                >
                  <option value="" className="dark:bg-slate-900">Select Mode</option>
                  <option value="Online" className="dark:bg-slate-900">Online</option>
                  <option value="Offline" className="dark:bg-slate-900">Offline</option>
                  <option value="Both" className="dark:bg-slate-900">Both</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="md:col-span-2 text-left">
              <label className="font-semibold text-black dark:text-white">Description</label>
              <textarea
                rows={5}
                placeholder="Write tutor description..."
                required
                {...register("description")}
                className="w-full mt-3 p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none resize-none text-black dark:text-white"
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-semibold"
              >
                Add Tutor
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}