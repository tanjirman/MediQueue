"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button, Chip, Input, Spinner } from "@heroui/react";

import {
  FaSearch,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
} from "react-icons/fa";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`)
      .then((res) => res.json())
      .then((data) => {
        setTutors(data);
        setLoading(false);
      });
  }, []);

  // SEARCH FILTER
  const filteredTutors = tutors.filter((tutor) =>
  tutor.name?.toLowerCase().includes(search.toLowerCase())
);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-24 bg-linear-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* TOP SECTION */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
            FIND YOUR PERFECT TUTOR
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">
            Explore Professional Tutors
          </h1>

          <p className="mt-6 text-lg text-default-600 leading-relaxed">
            Browse expert tutors and book personalized learning sessions based
            on your preferred subject and schedule.
          </p>
        </div>

        <div className="mt-14 max-w-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            {/* CUSTOM INPUT */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

              <input
                type="text"
                placeholder="Search tutors by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-16 pl-14 pr-5 rounded-2xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 outline-none shadow-lg text-black dark:text-white placeholder:text-gray-400"
              />
            </div>

            {/* BUTTON */}
            <Button
              size="lg"
              className="h-16 px-8 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold"
            >
              Search
            </Button>
          </div>
        </div>

        {/* TUTORS GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="group relative overflow-hidden rounded-[32px] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl hover:-translate-y-3 transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={tutor.image}
                  alt={tutor.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />

                {/* SUBJECT */}
                <div className="absolute top-5 left-5">
                  <Chip className="bg-cyan-500 text-white font-semibold">
                    {tutor.specialty}
                  </Chip>
                </div>

                {/* EXPERIENCE */}
                <div className="absolute top-5 right-5 flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-black">
                  <FaStar className="text-yellow-500" />

                  {tutor.experience}
                </div>

                {/* NAME */}
                <div className="absolute bottom-5 left-5">
                  <h2 className="text-3xl font-black text-white">
                    {tutor.name}
                  </h2>

                  <p className="text-cyan-300 font-medium mt-1">
                    ${tutor.price} / Hour
                  </p>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-7">
                {/* INFO */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-default-600">
                    <FaMapMarkerAlt className="text-cyan-500" />

                    <span>{tutor.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-default-600">
                    <FaClock className="text-cyan-500" />

                    <span>{tutor.availability}</span>
                  </div>

                  <div className="flex items-center gap-3 text-default-600">
                    <FaGraduationCap className="text-cyan-500" />

                    <span>{tutor.classType}</span>
                  </div>
                </div>

                {/* BUTTON */}
                <div className="mt-8">
                  <Link href={`/tutors/${tutor._id}`}>
                    <Button
                      fullWidth
                      radius="full"
                      className="bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold h-12"
                    >
                      Book Session
                    </Button>
                  </Link>
                </div>
              </div>

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredTutors.length === 0 && (
          <div className="text-center mt-24">
            <h2 className="text-3xl font-black text-black dark:text-white">
              No Tutors Found
            </h2>

            <p className="mt-4 text-default-600">
              Try searching with another tutor name.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
