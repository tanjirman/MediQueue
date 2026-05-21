"use client";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">

      <div className="relative flex flex-col items-center">

        {/* OUTER SPINNER */}
        <div className="w-24 h-24 rounded-full border-4 border-cyan-200 dark:border-cyan-900 border-t-cyan-500 animate-spin" />

        {/* INNER SPINNER */}
        <div className="absolute top-3 left-3 w-18 h-18 rounded-full border-4 border-blue-200 dark:border-blue-900 border-b-blue-600 animate-spin" />

        {/* TEXT */}
        <h2 className="mt-10 text-2xl font-black text-black dark:text-white">

          MediQueue
        </h2>

        <p className="mt-2 text-default-500">

          Loading amazing tutors...
        </p>
      </div>
    </div>
  );
}