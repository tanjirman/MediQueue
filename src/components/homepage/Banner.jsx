"use client";

import Link from "next/link";
import { Button } from "@heroui/react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export default function Banner() {
  const slides = [
    {
      id: 1,
      title: "Learn From Expert Tutors",
      description:
        "Book personalized online learning sessions with experienced tutors anytime.",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    },

    {
      id: 2,
      title: "Flexible Learning Schedule",
      description:
        "Choose tutors based on your preferred subject, time, and teaching style.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    },

    {
      id: 3,
      title: "Smart Tutor Booking System",
      description:
        "Avoid schedule conflicts and manage your sessions efficiently with MediQueue.",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  return (
    <>
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper h-[85vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            >
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/60" />

              {/* CONTENT */}
              <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 lg:px-8">
                <div className="max-w-3xl">
                  {/* BADGE */}
                  <div className="inline-block px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 mb-6 backdrop-blur-md">
                    Trusted Online Learning Platform
                  </div>

                  {/* TITLE */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                    {slide.title}
                  </h1>

                  {/* DESCRIPTION */}
                  <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed">
                    {slide.description}
                  </p>

                  {/* BUTTONS */}
                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link href="/tutors">
                      <Button
                        size="lg"
                        radius="full"
                        className="bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8"
                      >
                        Explore Tutors
                      </Button>
                    </Link>

                    <Link href="/signup">
                      <Button
                        size="lg"
                        radius="full"
                        variant="bordered"
                        className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 px-8"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* BOTTOM SHADOW */}
              <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black/70 to-transparent" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
