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
import { useSession } from "@/lib/auth-client";

export default function AddTutorPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    if (!session?.user?.email) {
      toast.error("Please login first");
      return;
    }

    setLoading(true);

    const tutorData = {
      name: data.name,
      image: data.image,
      specialty: data.specialty,
      language: data.language || "English",
      availableDays: data.availableDays,
      price: Number(data.price),
      totalSlot: Number(data.totalSlot),
      sessionDate: data.sessionDate,
      experience: data.experience,
      location: data.location,
      teachingMode: data.teachingMode,
      description: data.description,
      booked: 0,
      rating: 5,
      
      // 🎯 THE FIX: Saving both keys so your dashboard page can read it flawlessly!
      tutorEmail: session.user.email, 
      creatorEmail: session.user.email,
      creatorName: session.user.name,
      createdAt: new Date(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(tutorData),
        }
      );

      // Simple guard check depending on your backend response shape
      const result = await res.json();

      if (res.ok) {
        toast.success("Tutor added successfully! 🎉");
        reset();
        router.push("/my-tutor");
      } else {
        toast.error(result.message || "Failed to add tutor");
      }
    } catch (err) {
      console.log(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-24 bg-linear-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950 text-left">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl font-black text-black dark:text-white">
            Add New Tutor
          </h1>
          <p className="mt-3 text-default-500">
            Publish your tutoring profile on the marketplace.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-2xl rounded-[40px] p-8 md:p-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* NAME */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Tutor Name
              </label>
              <div className="relative mt-2">
                <FaUserGraduate className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  {...register("name")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* IMAGE */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Image URL
              </label>
              <div className="relative mt-2">
                <FaImage className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  {...register("image")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* SPECIALTY */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Subject
              </label>
              <div className="relative mt-2">
                <FaBookOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                <select
                  required
                  {...register("specialty")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none appearance-none"
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Programming">Programming</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            {/* PRICE */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Hourly Fee
              </label>
              <div className="relative mt-2">
                <FaDollarSign className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="number"
                  required
                  placeholder="20"
                  {...register("price")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* DAYS */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Available Days & Time
              </label>
              <div className="relative mt-2">
                <FaClock className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  required
                  placeholder="Sun - Thu 5PM - 8PM"
                  {...register("availableDays")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* SLOT */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Total Slots
              </label>
              <div className="relative mt-2">
                <FaLayerGroup className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="number"
                  required
                  placeholder="5"
                  {...register("totalSlot")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* DATE */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Session Start Date
              </label>
              <div className="relative mt-2">
                <FaCalendarAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="date"
                  required
                  {...register("sessionDate")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Location
              </label>
              <div className="relative mt-2">
                <FaMapMarkerAlt className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-500" />
                <input
                  type="text"
                  required
                  placeholder="Dhaka"
                  {...register("location")}
                  className="w-full h-14 pl-14 pr-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
                />
              </div>
            </div>

            {/* MODE */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Teaching Mode
              </label>
              <select
                {...register("teachingMode")}
                className="w-full h-14 mt-2 px-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none appearance-none"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* EXPERIENCE */}
            <div>
              <label className="font-semibold text-black dark:text-white">
                Experience
              </label>
              <input
                type="text"
                placeholder="3 years"
                {...register("experience")}
                className="w-full h-14 mt-2 px-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="md:col-span-2">
              <label className="font-semibold text-black dark:text-white">
                Description
              </label>
              <textarea
                rows={5}
                required
                placeholder="Write tutor description..."
                {...register("description")}
                className="w-full mt-2 p-5 rounded-2xl border border-black/10 dark:border-white/10 bg-transparent outline-none resize-none"
              />
            </div>

            {/* BUTTON */}
            <div className="md:col-span-2">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full h-14 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold"
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