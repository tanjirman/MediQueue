"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Button, Modal, useOverlayState, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import toast from "react-hot-toast";
import { FaEdit, FaTrashAlt, FaGraduationCap } from "react-icons/fa";

export default function MyTutorsPage() {
  const { data: session, isPending: authLoading } = authClient.useSession();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const updateModalState = useOverlayState();
  const deleteModalState = useOverlayState();

  const [selectedTutor, setSelectedTutor] = useState(null);
  const [tutorToDelete, setTutorToDelete] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!authLoading && session?.user?.email) {
      fetch(`http://localhost:5000/tutors?email=${session.user.email}`)
        .then((res) => res.json())
        .then((data) => {
          // HeroUI Table collections require an 'id' or '_id' field per item
          setTutors(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch your tutor listings.");
          setLoading(false);
        });
    }
  }, [session, authLoading]);

  const openUpdateModal = (tutor) => {
    setSelectedTutor(tutor);
    reset({
      name: tutor.name,
      specialty: tutor.specialty,
      price: tutor.price,
      availability: tutor.availability,
      location: tutor.location,
      totalSlot: tutor.totalSlot,
      description: tutor.description,
    });
    updateModalState.open();
  };

  const onUpdateSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:5000/tutors/${selectedTutor._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Tutor profile updated successfully! 🎉");
        setTutors((prev) =>
          prev.map((item) => (item._id === selectedTutor._id ? { ...item, ...data } : item))
        );
        updateModalState.close();
      } else {
        toast.error("Failed to commit profile updates.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server update transmission error.");
    }
  };

  const handleDeleteExecute = async () => {
    try {
      const response = await fetch(`http://localhost:5000/tutors/${tutorToDelete._id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Tutor reference removed cleanly. 🗑️");
        setTutors((prev) => prev.filter((item) => item._id !== tutorToDelete._id));
        deleteModalState.close();
      } else {
        toast.error("Failed to delete the tutor entry.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server delete execution failure.");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-xl font-bold text-cyan-500 animate-pulse">Loading Your Tutors...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 min-h-[80vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-black dark:text-white">My Tutors</h1>
        <p className="text-default-400 text-sm mt-1">Manage and update classes or settings for tutors you have added.</p>
      </div>

      {tutors.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-black/5 dark:border-white/10 rounded-[32px] bg-slate-50/50 dark:bg-white/5 my-12">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-4 text-2xl">
            <FaGraduationCap />
          </div>
          <h3 className="text-xl font-bold text-black dark:text-white">No Tutors Found</h3>
          <p className="text-default-400 text-sm max-w-sm mt-1 mb-6">
            You have not listed any tutors yet. Add your first tutor profile to start managing classes!
          </p>
        </div>
      ) : (
        /* FIXED: HeroUI Dynamic Collection Table Structure */
        <div className="border border-black/5 dark:border-white/10 rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-slate-900">
          <Table aria-label="My Tutors Table Grid" className="w-full text-left">
            <TableHeader>
              <TableColumn className="font-bold py-4 px-6 text-xs uppercase bg-slate-50 dark:bg-slate-800">Avatar & Name</TableColumn>
              <TableColumn className="font-bold py-4 px-6 text-xs uppercase bg-slate-50 dark:bg-slate-800">Specialty</TableColumn>
              <TableColumn className="font-bold py-4 px-6 text-xs uppercase bg-slate-50 dark:bg-slate-800">Rate</TableColumn>
              <TableColumn className="font-bold py-4 px-6 text-xs uppercase bg-slate-50 dark:bg-slate-800">Remaining Slots</TableColumn>
              <TableColumn className="font-bold py-4 px-6 text-xs uppercase bg-slate-50 dark:bg-slate-800 text-right">Actions</TableColumn>
            </TableHeader>
            {/* ✅ FIXED: Use items prop and supply unique key identification */}
            <TableBody items={tutors}>
              {(tutor) => (
                <TableRow key={tutor._id} className="border-b border-black/5 dark:border-white/5 last:border-0">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={tutor.image} alt={tutor.name} className="w-10 h-10 rounded-xl object-cover shadow-xs border border-black/5" />
                      <span className="font-bold text-sm text-black dark:text-white">{tutor.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-6 font-medium text-default-600 text-sm">{tutor.specialty}</TableCell>
                  <TableCell className="py-4 px-6 font-bold text-sm text-black dark:text-white">${tutor.price}/hr</TableCell>
                  <TableCell className="py-4 px-6 font-black text-sm text-emerald-500">{tutor.totalSlot} Slots</TableCell>
                  <TableCell className="py-4 px-6 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button size="sm" isIconOnly onClick={() => openUpdateModal(tutor)} className="bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500 hover:text-white rounded-xl transition-all cursor-pointer">
                        <FaEdit size={14} />
                      </Button>
                      <Button size="sm" isIconOnly onClick={() => { setTutorToDelete(tutor); deleteModalState.open(); }} className="bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all cursor-pointer">
                        <FaTrashAlt size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* --- FEATURE 1: COMPOUND UPDATE PROFILE MODAL --- */}
      <Modal state={updateModalState}>
        <Modal.Backdrop className="backdrop-blur-md">
          <Modal.Container placement="center" className="max-w-xl mx-4">
            <Modal.Dialog className="rounded-[32px] p-6 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-2xl">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-black text-black dark:text-white">Modify Tutor Data Profile</Modal.Heading>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={handleSubmit(onUpdateSubmit)} className="space-y-4 mt-2 text-left">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-default-500 uppercase">Tutor Name</label>
                      <input type="text" {...register("name")} required className="w-full h-11 px-4 mt-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-cyan-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-default-500 uppercase">Subject Specialty</label>
                      <input type="text" {...register("specialty")} required className="w-full h-11 px-4 mt-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-cyan-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-default-500 uppercase">Hourly Rate ($)</label>
                      <input type="number" {...register("price")} required className="w-full h-11 px-4 mt-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-cyan-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-default-500 uppercase">Available Slots</label>
                      <input type="number" {...register("totalSlot")} required className="w-full h-11 px-4 mt-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-cyan-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-default-500 uppercase">Availability Timing</label>
                      <input type="text" {...register("availability")} required className="w-full h-11 px-4 mt-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-cyan-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-default-500 uppercase">Location Mode</label>
                      <input type="text" {...register("location")} required className="w-full h-11 px-4 mt-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-cyan-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-default-500 uppercase">Biography Description</label>
                    <textarea rows={3} {...register("description")} required className="w-full p-4 mt-1.5 text-sm rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-black dark:text-white focus:border-cyan-500 outline-none transition-all resize-none" />
                  </div>
                  <div className="flex gap-4 pt-4 border-t border-black/5 dark:border-white/5 mt-6">
                    <Button type="button" variant="secondary" onClick={() => updateModalState.close()} className="w-1/2 h-11 rounded-xl font-bold">Cancel</Button>
                    <Button type="submit" className="w-1/2 h-11 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold">Save Modifications</Button>
                  </div>
                </form>
              </Modal.Body>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>

      {/* --- FEATURE 2: CONFIRM DELETION MODAL --- */}
      <Modal state={deleteModalState}>
        <Modal.Backdrop className="backdrop-blur-md">
          <Modal.Container placement="center" className="max-w-md mx-4">
            <Modal.Dialog className="rounded-[32px] p-6 bg-white dark:bg-slate-900 border border-black/5 dark:border-white/10 shadow-2xl text-center">
              <Modal.CloseTrigger />
              <Modal.Header>
                <Modal.Heading className="text-xl font-black text-rose-500 w-full">Delete Tutor Listing?</Modal.Heading>
              </Modal.Header>
              <Modal.Body className="py-2">
                <p className="text-sm text-default-500">
                  Are you absolutely sure you want to remove <strong className="text-black dark:text-white">{tutorToDelete?.name}</strong>? This structural record purge cannot be undone.
                </p>
              </Modal.Body>
              <Modal.Footer className="flex gap-4 mt-4">
                <Button variant="secondary" onClick={() => deleteModalState.close()} className="w-1/2 h-11 rounded-xl font-bold">Keep Record</Button>
                <Button onClick={handleDeleteExecute} className="w-1/2 h-11 rounded-xl bg-rose-500 text-white font-bold shadow-md hover:bg-rose-600">Delete Entry</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}