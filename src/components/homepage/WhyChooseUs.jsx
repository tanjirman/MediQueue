"use client";

import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import {
  FaChalkboardTeacher,
  FaClock,
  FaUserShield,
  FaLaptopCode,
} from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaChalkboardTeacher />,
    title: "Expert Tutors",
    description:
      "Learn from highly experienced and verified tutors across multiple subjects and skill levels.",
  },

  {
    id: 2,
    icon: <FaClock />,
    title: "Flexible Scheduling",
    description:
      "Book sessions based on your preferred time slots without worrying about schedule conflicts.",
  },

  {
    id: 3,
    icon: <FaUserShield />,
    title: "Secure Booking System",
    description:
      "Enjoy a safe and organized tutor booking experience with protected session management.",
  },

  {
    id: 4,
    icon: <FaLaptopCode />,
    title: "Online Learning",
    description:
      "Attend online tutoring sessions from anywhere with smooth and efficient learning support.",
  },
];

export default function WhyChooseUs() {
    const { ref, inView } = useInView({
  triggerOnce: true,
  threshold: 0.3,
});
  return (
    <section className="py-24 bg-linear-to-b from-white to-cyan-50 dark:from-black dark:to-slate-950">

      <div className="max-w-7xl mx-auto px-4 lg:px-8">

        {/* TOP SECTION */}
        <div className="text-center max-w-3xl mx-auto">

          <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-sm font-semibold mb-6">
            WHY STUDENTS LOVE MEDIQUEUE
          </div>

          <h2 className="text-4xl md:text-5xl font-black leading-tight text-black dark:text-white">
            A Smarter Way To Book & Manage Learning Sessions
          </h2>

          <p className="mt-6 text-lg text-default-600 leading-relaxed">
            MediQueue simplifies tutor booking by helping students connect with
            expert tutors, manage schedules efficiently, and enjoy a seamless
            learning experience from anywhere.
          </p>
        </div>

        {/* FEATURE GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {features.map((feature) => (
            <div
              key={feature.id}
              className="group relative overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl p-8 hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-cyan-500/10"
            >

              {/* GLOW */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

              {/* ICON */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 text-white text-2xl flex items-center justify-center shadow-lg">
                {feature.icon}
              </div>

              {/* TITLE */}
              <h3 className="relative z-10 mt-8 text-2xl font-bold text-black dark:text-white">
                {feature.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="relative z-10 mt-4 text-default-600 leading-relaxed">
                {feature.description}
              </p>

              {/* HOVER BAR */}
              <div className="relative z-10 mt-8 w-0 group-hover:w-full h-1 bg-linear-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* BOTTOM STATS */}
<div
  ref={ref}
  className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
>

  {/* CARD 1 */}
  <div className="rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">

    <h3 className="text-4xl font-black text-cyan-500">

      {inView && (
        <>
          <CountUp
            end={500}
            duration={3}
          />
          +
        </>
      )}
    </h3>

    <p className="mt-2 text-default-600">
      Active Tutors
    </p>
  </div>

  {/* CARD 2 */}
  <div className="rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">

    <h3 className="text-4xl font-black text-cyan-500">

      {inView && (
        <>
          <CountUp
            end={10000}
            duration={3}
          />
          +
        </>
      )}
    </h3>

    <p className="mt-2 text-default-600">
      Sessions Booked
    </p>
  </div>

  {/* CARD 3 */}
  <div className="rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">

    <h3 className="text-4xl font-black text-cyan-500">

      {inView && (
        <>
          <CountUp
            end={98}
            duration={3}
          />
          %
        </>
      )}
    </h3>

    <p className="mt-2 text-default-600">
      Satisfaction Rate
    </p>
  </div>

  {/* CARD 4 */}
  <div className="rounded-3xl bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">

    <h3 className="text-4xl font-black text-cyan-500">

      {inView && (
        <>
          <CountUp
            end={24}
            duration={3}
          />
          /7
        </>
      )}
    </h3>

    <p className="mt-2 text-default-600">
      Learning Access
    </p>
  </div>
</div>
      </div>
    </section>
  );
}