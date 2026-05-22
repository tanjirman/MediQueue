"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { Spinner, Button, AlertDialog } from "@heroui/react";
import toast from "react-hot-toast";
import { FaBookmark, FaLock, FaBan } from "react-icons/fa";

export default function MyBookingPage() {
  const { data: session, isPending: isAuthPending } = useSession();
  const [bookings, setBookings] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false);
  
  // 🌟 Controlled modal state context pointers
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingIdToCancel, setBookingIdToCancel] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (isAuthPending) return;

    let isMounted = true;

    const loadBookings = async () => {
      if (!session?.user?.email) {
        if (isMounted) setFetchingData(false);
        return;
      }

      const loadToast = toast.loading("Syncing your personal bookings...");
      try {
        const targetUrl = `${apiUrl}/bookings?email=${encodeURIComponent(session.user.email.trim())}`;
        const bookingsRes = await fetch(targetUrl);
        
        if (!bookingsRes.ok) throw new Error("Server rejected data synchronization.");
        const bookingsData = await bookingsRes.json();
        
        if (!isMounted) return;

        setBookings(Array.isArray(bookingsData) ? bookingsData : []);
        toast.success("Appointments loaded successfully!", { id: loadToast });
      } catch (err) {
        console.error("Error fetching filtered bookings:", err);
        if (isMounted) {
          toast.error("Failed to load your personal booked sessions.", { id: loadToast });
        }
      } finally {
        if (isMounted) setFetchingData(false);
      }
    };

    loadBookings();

    return () => {
      isMounted = false;
    };
  }, [session, isAuthPending, apiUrl]);

  // 🎯 Trigger cancellation modal
  const triggerCancelDialog = (bookingId) => {
    setBookingIdToCancel(bookingId);
    setIsModalOpen(true);
  };

  // 🎯 Close cancellation modal safely
  const closeCancelDialog = () => {
    if (cancelLoading) return; 
    setIsModalOpen(false);
    setBookingIdToCancel(null);
  };

  // 🎯 Database operation confirmed callback hook
  const handleConfirmCancellation = async () => {
    if (!bookingIdToCancel) return;

    setCancelLoading(true);
    const cancelToast = toast.loading("Processing appointment cancellation...");
    
    try {
      const res = await fetch(`${apiUrl}/bookings/cancel/${bookingIdToCancel}`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Server rejected state transformation.");

      toast.success("Appointment slot cancelled successfully. 🗑️", { id: cancelToast });
      
      // ✨ INSTANT BADGE RE-RENDERING FROM "BOOKED" TO "CANCELLED"
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingIdToCancel ? { ...b, bookingStatus: "Cancelled" } : b
        )
      );
      
      setIsModalOpen(false);
      setBookingIdToCancel(null);
    } catch (err) {
      console.error("Cancellation transmission failure:", err);
      toast.error("Could not complete cancellation request.", { id: cancelToast });
    } finally {
      setCancelLoading(false);
    }
  };

  const currentlyLoading = isAuthPending || (session?.user?.email && fetchingData && bookings.length === 0);

  if (currentlyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <Spinner size="lg" color="cyan" />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950 px-4">
        <div className="text-center p-8 max-w-md border border-black/5 dark:border-white/10 rounded-[32px] bg-white dark:bg-white/5 shadow-xl">
          <div className="w-16 h-16 mx-auto bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-5">
            <FaLock />
          </div>
          <h2 className="text-2xl font-black text-black dark:text-white">Authentication Required</h2>
          <p className="mt-3 text-default-500 text-sm leading-relaxed">
            Please log into your account profile first to access and review your custom booked learning sessions.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-24 bg-gradient-to-b from-cyan-50 to-white dark:from-black dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        
        <div className="mb-10 text-left">
          <h1 className="text-4xl font-black text-black dark:text-white">My Booked Sessions</h1>
          <p className="mt-2 text-default-500">
            Welcome back, <span className="text-cyan-500 font-bold">{session.user.name}</span>. Review your registered appointments below.
          </p>
        </div>

        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center border border-dashed border-black/10 dark:border-white/10 rounded-[32px] p-16 bg-white dark:bg-white/5">
            <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 text-3xl mb-5">
              <FaBookmark />
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">No Bookings Found</h2>
            <p className="text-default-500 text-sm mt-2 max-w-xs">
              Only slots scheduled under your email profile address (<span className="underline">{session.user.email}</span>) will appear inside this overview window.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-black/5 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl text-left">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 dark:bg-slate-900">
                <tr>
                  <th className="p-5 text-black dark:text-white font-bold">Tutor Name</th>
                  <th className="p-5 text-black dark:text-white font-bold">Student Name</th>
                  <th className="p-5 text-black dark:text-white font-bold">Email Address</th>
                  <th className="p-5 text-center text-black dark:text-white font-bold">Status</th>
                  <th className="p-5 text-center text-black dark:text-white font-bold">Management Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const currentStatus = booking.bookingStatus || "Booked";
                  const isCancelled = String(currentStatus).toLowerCase() === "cancelled";
                  const isThisRowLoading = cancelLoading && bookingIdToCancel === booking._id;

                  return (
                    <tr 
                      key={booking._id} 
                      className="border-t border-black/5 dark:border-white/5 hover:bg-slate-50/50 dark:hover:bg-white/5 transition-all"
                    >
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 font-bold uppercase shrink-0">
                            {booking.tutorName?.charAt(0) || "T"}
                          </div>
                          <span className="font-bold text-black dark:text-white truncate max-w-[180px]">
                            {booking.tutorName || "Unknown Tutor"}
                          </span>
                        </div>
                      </td>
                      
                      <td className="p-5 text-default-700 dark:text-default-300 font-medium">
                        {booking.studentName}
                      </td>

                      <td className="p-5 text-default-500 font-mono text-sm">
                        {booking.studentEmail}
                      </td>

                      <td className="p-5 text-center">
                        <span 
                          className={`px-4 py-1.5 text-xs font-black rounded-full border uppercase tracking-wider transition-all duration-300 ${
                            isCancelled 
                              ? "bg-rose-500/10 text-rose-500 border-rose-500/20" 
                              : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          }`}
                        >
                          {currentStatus}
                        </span>
                      </td>

                      <td className="p-5 text-center">
                        <Button
                          size="sm"
                          color="danger"
                          variant="flat"
                          disabled={isCancelled}
                          isLoading={isThisRowLoading}
                          startContent={!isThisRowLoading && <FaBan />}
                          onPress={() => triggerCancelDialog(booking._id)}
                          className="font-bold rounded-xl px-4 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {isCancelled ? "Cancelled" : "Cancel"}
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* 🌟 FIXED HEROUI CONTROLLED DIALOG FLOW */}
        {isModalOpen && (
          <AlertDialog.Backdrop isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
            <AlertDialog.Container>
              <AlertDialog.Dialog className="sm:max-w-[420px] border border-black/5 dark:border-white/10 bg-white dark:bg-slate-950 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
                <AlertDialog.Header className="flex items-center gap-3 text-left">
                  <AlertDialog.Icon status="danger" className="shrink-0" />
                  <AlertDialog.Heading className="text-lg font-black text-slate-900 dark:text-white">
                    Cancel Booking Slot?
                    </AlertDialog.Heading>
                </AlertDialog.Header>
                <AlertDialog.Body className="py-2 text-left">
                  <p className="text-sm text-default-500 leading-relaxed">
                    Are you absolutely certain you want to cancel this booking appointment slot? This will update your enrollment status inside the system database securely.
                  </p>
                </AlertDialog.Body>
                <AlertDialog.Footer className="gap-2 pt-4">
                  <Button 
                    variant="flat" 
                    className="font-bold rounded-xl text-xs"
                    onPress={closeCancelDialog}
                    disabled={cancelLoading}
                  >
                    Keep Booking
                  </Button>
                  <Button 
                    variant="danger" 
                    className="font-bold rounded-xl text-xs bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-all"
                    isLoading={cancelLoading}
                    onClick={handleConfirmCancellation}
                  >
                    Confirm Cancellation
                  </Button>
                </AlertDialog.Footer>
              </AlertDialog.Dialog>
            </AlertDialog.Container>
          </AlertDialog.Backdrop>
        )}

      </div>
    </section>
  );
}