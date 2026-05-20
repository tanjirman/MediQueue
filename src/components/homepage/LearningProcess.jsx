"use client";

import {
  FaCalendarCheck,
  FaUserGraduate,
  FaVideo,
  FaCertificate,
} from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserGraduate />,
    title: "Find Your Tutor",
    description:
      "Browse expert tutors by subject, teaching style, and availability to match your learning goals.",
  },

  {
    id: 2,
    icon: <FaCalendarCheck />,
    title: "Book Your Session",
    description:
      "Choose your preferred schedule and instantly reserve a tutoring session without conflicts.",
  },

  {
    id: 3,
    icon: <FaVideo />,
    title: "Start Learning",
    description:
      "Attend interactive online sessions and learn directly from experienced mentors.",
  },

  {
    id: 4,
    icon: <FaCertificate />,
    title: "Track Progress",
    description:
      "Manage your booked sessions efficiently and continue improving your academic performance.",
  },
];

export default function LearningProcess() {
  return (
    <section className="py-24 bg-white dark:bg-black overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* TOP CONTENT */}
        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
            SIMPLE LEARNING PROCESS
          </div>

          <h2 className="text-4xl md:text-5xl font-black leading-tight text-black dark:text-white">
            How MediQueue Works
          </h2>

          <p className="mt-6 text-lg text-default-600 leading-relaxed">
            Our smart tutor booking platform helps students connect with expert
            tutors, schedule sessions smoothly, and enjoy a modern learning
            experience from anywhere.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative mt-24">

          {/* LINE */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-1 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">

            {steps.map((step) => (
              <div
                key={step.id}
                className="relative group"
              >

                {/* STEP NUMBER */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 lg:left-10 lg:translate-x-0 z-20">

                  <div className="w-12 h-12 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black shadow-2xl border-4 border-white dark:border-black">
                    {step.id}
                  </div>
                </div>

                {/* CARD */}
                <div className="pt-12 rounded-[32px] bg-linear-to-b from-cyan-50 to-white dark:from-white/5 dark:to-white/3 border border-black/5 dark:border-white/10 p-8 shadow-xl hover:-translate-y-3 transition-all duration-500">

                  {/* ICON */}
                  <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-cyan-500 to-blue-600 text-white text-3xl flex items-center justify-center shadow-2xl mx-auto">
                    {step.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="mt-8 text-2xl font-black text-center text-black dark:text-white">
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p className="mt-4 text-default-600 leading-relaxed text-center">
                    {step.description}
                  </p>

                  {/* HOVER GLOW */}
                  <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-500 bg-cyan-500/5 pointer-events-none" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24">

          <div className="relative overflow-hidden rounded-[40px] bg-linear-to-r from-cyan-500 to-blue-700 px-8 py-16 lg:px-16 text-center shadow-2xl">

            {/* BACKGROUND BLUR */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="absolute bottom-0 right-0 w-72 h-72 bg-black/10 rounded-full blur-3xl" />

            <div className="relative z-10">

              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Start Your Smart Learning Journey Today
              </h2>

              <p className="mt-6 text-lg text-cyan-100 max-w-2xl mx-auto leading-relaxed">
                Discover expert tutors, schedule personalized sessions, and
                achieve your learning goals with MediQueue.
              </p>

              <div className="mt-10 flex flex-wrap justify-center gap-4">

                <button className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-all duration-300 shadow-xl">
                  Explore Tutors
                </button>

                <button className="px-8 py-4 rounded-full border border-white text-white font-bold hover:bg-white hover:text-black transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}