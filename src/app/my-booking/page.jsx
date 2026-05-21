"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import toast from "react-hot-toast";
import { FaBookmark } from "react-icons/fa";

// Ensure this is exactly "export default function"
export default function MyBookingPage() {
  // Static context profile for your current test user session
  const currentUser = {
    name: "Kashfia Meherin",
    email: "kashfia@gmail.com",
  };

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser.email) {
      fetch(`http://localhost:5000/bookings?email=${currentUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load your booked sessions.");
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-black dark:text-white">My Booked Sessions</h1>
          <p className="mt-2 text-default-500">Review your registered learning appointments.</p>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center border border-dashed border-black/10 dark:border-white/10 rounded-[32px] p-16 bg-white dark:bg-white/5">
            <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 text-3xl mb-5">
              <FaBookmark />
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">No Bookings Found</h2>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="p-5 text-black dark:text-white font-bold">Tutor Name</th>
                  <th className="p-5 text-black dark:text-white font-bold">Tutor ID Reference</th>
                  <th className="p-5 text-black dark:text-white font-bold">Hourly Fee</th>
                  <th className="p-5 text-center text-black dark:text-white font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-t border-black/5 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all">
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold uppercase">
                          {booking.tutorName?.charAt(0) || "T"}
                        </div>
                        <span className="font-bold text-black dark:text-white">{booking.tutorName}</span>
                      </div>
                    </td>
                    
                    <td className="p-5 font-mono text-xs text-default-500">
                      {booking.tutorId}
                    </td>

                    <td className="p-5 text-black dark:text-white font-semibold">
                      {booking.price ? `$${booking.price} / hr` : "$22 / hr"}
                    </td>

                    <td className="p-5 text-center">
                      <span className="px-4 py-1.5 text-xs font-black rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase">
                        {booking.bookStatus || "Booked"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}