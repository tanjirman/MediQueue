"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaUser, FaPhone, FaUserTie, FaEnvelope, FaFingerprint } from "react-icons/fa";

export default function BookingModal({ state, tutor, setTutor, user }) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const handleFormSubmit = async (data) => {
    setSubmitting(true);

    // ✅ FIXED: Expanded payload properties to match Express and My Booking card layout expectations
    const bookingPayload = {
      studentName: user.name,
      studentEmail: user.email,
      phone: data.phone,
      tutorId: tutor._id, 
      tutorName: tutor.name,
      tutorImage: tutor.image,       // Added to render image thumbnails on booking screens
      price: tutor.price,             // Added to display price details in student tables
      specialty: tutor.specialty,     // Added to display tutor category tags
      bookingStatus: "Booked",        // Changed from bookStatus to match backend schema updates
      bookingDate: new Date(),
    };

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        toast.success("Session Scheduled Successfully! 🎉");
        
        // Optimistically update the local state slots count down by 1
        setTutor((prev) => ({
          ...prev,
          totalSlot: Math.max(0, prev.totalSlot - 1),
        }));

        reset();
        state.close(); 
        
        // ✅ REDIRECT: Seamlessly push the student to view their newly saved data row
        router.push("/my-booking");
      } else {
        toast.error(responseData.message || "Failed to finalize scheduling.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Database communication failure.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal state={state}>
      <Modal.Backdrop className="backdrop-blur-md">
        <Modal.Container placement="center" className="max-w-xl mx-4">
          <Modal.Dialog className="rounded-[32px] p-6 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-2xl">
            <Modal.CloseTrigger />
            
            <Modal.Header>
              <Modal.Heading className="text-2xl font-black text-black dark:text-white">
                Confirm Your Session
              </Modal.Heading>
              <p className="mt-1 text-sm text-default-400">
                Review information below to register your learning appointment.
              </p>
            </Modal.Header>

            <Modal.Body className="py-4">
              <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 text-left">
                
                {/* 1. Student Name Field */}
                <TextField className="w-full opacity-75" name="studentName">
                  <Label className="text-xs font-bold text-default-500 uppercase">Student Name</Label>
                  <div className="relative mt-1">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                    <Input 
                      value={user.name} 
                      readOnly 
                      className="pl-8 cursor-not-allowed text-black dark:text-white bg-slate-100 dark:bg-white/5 rounded-xl"
                    />
                  </div>
                </TextField>

                {/* 2. Student Email Field */}
                <TextField className="w-full opacity-75" name="studentEmail">
                  <Label className="text-xs font-bold text-default-500 uppercase">Student Email Address</Label>
                  <div className="relative mt-1">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                    <Input 
                      value={user.email} 
                      readOnly 
                      className="pl-8 cursor-not-allowed text-black dark:text-white bg-slate-100 dark:bg-white/5 rounded-xl"
                    />
                  </div>
                </TextField>

                {/* 3. Tutor Name Field */}
                <TextField className="w-full opacity-75" name="tutorName">
                  <Label className="text-xs font-bold text-default-500 uppercase">Selected Tutor</Label>
                  <div className="relative mt-1">
                    <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                    <Input 
                      value={tutor.name} 
                      readOnly 
                      className="pl-8 cursor-not-allowed text-black dark:text-white bg-slate-100 dark:bg-white/5 rounded-xl"
                    />
                  </div>
                </TextField>

                {/* 4. Tutor ID Field */}
                <TextField className="w-full opacity-75" name="tutorId">
                  <Label className="text-xs font-bold text-default-500 uppercase">Tutor Reference Key ID</Label>
                  <div className="relative mt-1">
                    <FaFingerprint className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                    <Input 
                      value={tutor._id} 
                      readOnly 
                      className="pl-8 font-mono text-xs cursor-not-allowed text-black dark:text-white bg-slate-100 dark:bg-white/5 rounded-xl"
                    />
                  </div>
                </TextField>

                {/* 5. Contact Phone Number Field */}
                <TextField className="w-full" name="phone">
                  <Label className="text-xs font-bold text-black dark:text-white uppercase">Contact Phone Number</Label>
                  <div className="relative mt-1">
                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 z-10" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      required
                      {...register("phone")}
                      className="w-full h-10 pl-11 pr-3 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent outline-none focus:border-cyan-500 text-black dark:text-white transition-all"
                    />
                  </div>
                </TextField>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-black/5 dark:border-white/5 mt-6">
                  <Button 
                    type="button"
                    variant="secondary" 
                    onClick={() => state.close()} 
                    className="w-1/2 h-12 rounded-xl font-bold border border-default-200"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-1/2 h-12 rounded-xl bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md hover:opacity-95"
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