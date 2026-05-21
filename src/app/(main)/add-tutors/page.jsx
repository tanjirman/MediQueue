"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Imported for automatic redirection
import { Button } from "@heroui/react";
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

export default function AddTutorPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize the router

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  // TEMP USER
  const user = {
    name: "Kashfia Meherin",
    email: "kashfia@gmail.com",
  };

  const onSubmit = async (data) => {
    setLoading(true);

    // Explicitly parse numbers so they store correctly in your DB and sort/display properly on your tutors page
    const tutorData = {
      ...data,
      price: parseInt(data.price) || 0,
      totalSlot: parseInt(data.totalSlot) || 0,
      booked: 0,
      tutorEmail: user.email,
      tutorProvider: user.name,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result);

        // ✅ Success Toast Notification
        toast.success("Tutor Profile Created Successfully!");
        
        reset();
        
        // Wait 1.5 seconds so the user can see the success toast before redirecting
        setTimeout(() => {
          router.push("/tutors");
        }, 1500);
      } else {
        // ❌ Error Toast for bad server responses (like 404 or 500)
        toast.error("Failed to save data. Please check your backend.");
      }
    } catch (error) {
      console.error(error);
      // ❌ Error Toast for network errors / server offline
      toast.error("Something went wrong. Is your server running?");
    } finally {
      setLoading(false);
    }
  };
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
            <div>
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
            <div>
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
            <div>
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

            {/* Availability */}
            <div>
              <label className="font-semibold text-black dark:text-white">Available Days & Time</label>
              <div className="relative mt-3">
                <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  placeholder="Sun - Thu 5PM - 8PM"
                  required
                  {...register("availability")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-black dark:text-white"
                />
              </div>
            </div>

            {/* Price */}
            <div>
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
            <div>
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

            {/* Start Date */}
            <div>
              <label className="font-semibold text-black dark:text-white">Session Start Date</label>
              <div className="relative mt-3">
                <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="date"
                  required
                  {...register("startDate")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none text-gray-500 dark:text-gray-400"
                />
              </div>
            </div>

            {/* Experience */}
            <div>
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
            <div>
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

            {/* Class Type Dropdown */}
            <div>
              <label className="font-semibold text-black dark:text-white">Teaching Mode</label>
              <div className="relative mt-3">
                <FaLayerGroup className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                <select
                  required
                  {...register("classType")}
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
            <div className="md:col-span-2">
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