"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  FaUser,
  FaPhone,
  FaUserTie,
  FaEnvelope,
  FaFingerprint,
} from "react-icons/fa";

export default function BookingModal({ state, tutor, setTutor, user }) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const handleFormSubmit = async (data) => {
    if (!user || !tutor) {
      toast.error("Missing user or tutor data");
      return;
    }

    setSubmitting(true);

    const bookingPayload = {
      studentName: user?.name || "Unknown",
      
      // ✨ FIX: Saves to 'email' directly so the /my-booking page filter reads it instantly!
      email: user?.email || "", 
      studentEmail: user?.email || "", // Kept as fallback for other backend paths
      
      phone: data.phone,
      tutorId: tutor._id,
      tutorName: tutor.name,
      tutorImage: tutor.image,
      price: tutor.price,
      specialty: tutor.specialty,
      bookingStatus: "Booked", // Matches requirements specifications tracking string
      bookingDate: new Date(),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(bookingPayload),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Booked successfully! 🎉");

        // SAFE slot decrease logic update
        if (typeof setTutor === "function") {
          setTutor((prev) => ({
            ...prev,
            totalSlot: Math.max(0, Number(prev.totalSlot || 0) - 1),
          }));
        }

        reset();
        state.close();
        
        // Refresh routing context layers and navigate to listings board
        router.refresh();
        router.push("/my-booking");
      } else {
        toast.error(result.message || "Booking failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal state={state}>
      <Modal.Backdrop className="backdrop-blur-md">
        <Modal.Container placement="center" className="max-w-xl mx-4">
          <Modal.Dialog className="rounded-[32px] p-6 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-2xl">
            
            <Modal.Header>
              <Modal.Heading className="text-2xl font-black text-black dark:text-white">
                Confirm Your Session
              </Modal.Heading>
              <p className="mt-1 text-sm text-default-400">
                Please confirm your booking details before proceeding.
              </p>
            </Modal.Header>

            <Modal.Body className="py-4">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

                {/* Student Name */}
                <TextField>
                  <Label className="text-xs font-bold uppercase text-default-500">
                    Student Name
                  </Label>
                  <div className="relative mt-1">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <Input
                      value={user?.name || ""}
                      readOnly
                      className="pl-10 bg-slate-100 dark:bg-white/5"
                    />
                  </div>
                </TextField>

                {/* Email */}
                <TextField>
                  <Label className="text-xs font-bold uppercase text-default-500">
                    Email Address
                  </Label>
                  <div className="relative mt-1">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <Input
                      value={user?.email || ""}
                      readOnly
                      className="pl-10 bg-slate-100 dark:bg-white/5"
                    />
                  </div>
                </TextField>

                {/* Tutor */}
                <TextField>
                  <Label className="text-xs font-bold uppercase text-default-500">
                    Tutor Name
                  </Label>
                  <div className="relative mt-1">
                    <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <Input
                      value={tutor?.name || ""}
                      readOnly
                      className="pl-10 bg-slate-100 dark:bg-white/5"
                    />
                  </div>
                </TextField>

                {/* Tutor ID */}
                <TextField>
                  <Label className="text-xs font-bold uppercase text-default-500">
                    Tutor ID
                  </Label>
                  <div className="relative mt-1">
                    <FaFingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <Input
                      value={tutor?._id || ""}
                      readOnly
                      className="pl-10 font-mono text-xs bg-slate-100 dark:bg-white/5"
                    />
                  </div>
                </TextField>

                {/* Phone */}
                <TextField>
                  <Label className="text-xs font-bold uppercase text-default-500">
                    Phone Number
                  </Label>
                  <div className="relative mt-1">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500" />
                    <input
                      {...register("phone")}
                      required
                      placeholder="Enter phone number"
                      className="w-full h-10 pl-10 rounded-xl border border-black/10 dark:border-white/10 bg-transparent outline-none focus:border-cyan-500 text-black dark:text-white"
                    />
                  </div>
                </TextField>

                {/* Buttons */}
                <div className="flex gap-4 pt-4 border-t border-black/5 dark:border-white/10">
                  <Button
                    type="button"
                    onClick={() => state.close()}
                    className="w-1/2 h-12 rounded-xl border border-default-200"
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-1/2 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold"
                  >
                    {submitting ? "Processing..." : "Confirm Booking"}
                  </Button>
                </div>

              </form>
            </Modal.Body>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}