"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import {
  Button,
  Chip,
  Spinner,
} from "@heroui/react";

import {
  FaStar,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

export default function AvailableTutors() {

  const [tutors, setTutors] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/featured-tutors`)
      .then((res) => res.json())
      .then((data) => {

        setTutors(data);

        setLoading(false);
      });

  }, []);

  if (loading) {

    return (
      <div className="py-24 flex justify-center">

        <Spinner
          size="lg"
          color="primary"
        />
      </div>
    );
  }

  return (
    <section className="py-24 bg-white dark:bg-black">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* TOP SECTION */}
        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">

            AVAILABLE TUTORS
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight">

            Learn From Top Rated Tutors
          </h2>

          <p className="mt-6 text-lg text-default-600 leading-relaxed">

            Explore highly experienced tutors and start your personalized learning journey today.
          </p>
        </div>

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

          {tutors.map((tutor) => (

            <div
              key={tutor._id}
              className="group relative overflow-hidden rounded-[32px] bg-linear-to-b from-white to-cyan-50 dark:from-white/5 dark:to-white/3 border border-black/5 dark:border-white/10 shadow-xl hover:-translate-y-3 transition-all duration-500"
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

                {/* SPECIALTY */}
                <div className="absolute top-5 left-5">

                  <Chip className="bg-cyan-500 text-white font-semibold">

                    {tutor.specialty}
                  </Chip>
                </div>

                {/* RATING */}
                <div className="absolute top-5 right-5 flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full text-sm font-bold text-black">

                  <FaStar className="text-yellow-500" />

                  {tutor.rating}
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

                <div className="space-y-4">

                  <div className="flex items-center gap-3 text-default-600">

                    <FaMapMarkerAlt className="text-cyan-500" />

                    <span>{tutor.location}</span>
                  </div>

                  <div className="flex items-center gap-3 text-default-600">

                    <FaClock className="text-cyan-500" />

                    <span>{tutor.availability}</span>
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

        {/* VIEW ALL BUTTON */}
        <div className="mt-16 text-center">

          <Link href="/tutors">

            <Button
              size="lg"
              radius="full"
              className="bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold px-10"
            >
              View All Tutors
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}