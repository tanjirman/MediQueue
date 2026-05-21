"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button, Input, Label, Modal, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaUserTie, FaEnvelope, FaFingerprint } from "react-icons/fa";

export default function BookingModal({ state, tutor, setTutor, user }) {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const handleFormSubmit = async (data) => {
    setSubmitting(true);

    const bookingPayload = {
      studentName: user.name,
      studentEmail: user.email,
      phone: data.phone,
      tutorId: tutor._id,
      tutorName: tutor.name,
      bookStatus: "Booked", 
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        toast.success("Session Scheduled Successfully! 🎉");
        
        setTutor((prev) => ({
          ...prev,
          totalSlot: Math.max(0, prev.totalSlot - 1),
        }));

        reset();
        state.close(); 
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to finalize scheduling.");
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
                
                {/* 1. Student Name Field (Changed defaultValue to value) */}
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

                {/* 2. Student Email Field (Changed defaultValue to value) */}
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

                {/* 3. Tutor Name Field (Changed defaultValue to value) */}
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

                {/* 4. Tutor ID Field (Changed defaultValue to value) */}
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

                {/* 5. Contact Phone Number Field (Stays uncontrolled for react-hook-form entry) */}
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