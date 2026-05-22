"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button, Chip, Spinner } from "@heroui/react";
import {
  FaSearch,
  FaStar,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaTimes,
  FaSortAmountDown,
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
      } finally {
        setLoading(false);
      }
    };

    const t = setTimeout(fetchTutors, 300);
    return () => clearTimeout(t);
  }, [search, sort]);

  const formatAvailability = (tutor) => {
    if (!tutor?.availability) return "Flexible";

    if (typeof tutor.availability === "object") {
      return `${tutor.availability.days?.join(", ") || ""} ${
        tutor.availability.time ? `(${tutor.availability.time})` : ""
      }`;
    }

    return tutor.availability;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* SEARCH */}
        <div className="flex gap-4 mb-10">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutors..."
            className="border p-3 rounded-xl w-full"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-3 rounded-xl"
          >
            <option value="">Default</option>
            <option value="low-to-high">Low</option>
            <option value="high-to-low">High</option>
          </select>

          {(search || sort) && (
            <Button onClick={() => { setSearch(""); setSort(""); }}>
              <FaTimes />
            </Button>
          )}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="rounded-2xl shadow bg-white p-4">

              <Image
                src={tutor.image}
                alt={tutor.name}
                width={400}
                height={300}
                className="rounded-xl object-cover h-56"
              />

              <h2 className="text-xl font-bold mt-3">{tutor.name}</h2>
              <p className="text-sm text-gray-500">{tutor.specialty}</p>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <FaClock />
                {formatAvailability(tutor)}
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm">
                <FaMapMarkerAlt />
                {tutor.location}
              </div>

              <Link href={`/tutors/${tutor._id}`}>
                <Button className="w-full mt-4 bg-blue-500 text-white">
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}