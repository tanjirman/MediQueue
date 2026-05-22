"use client";

import { useState } from "react";
import { Button, Input, Label, Modal, TextField, Select, ListBox } from "@heroui/react";
import { useRouter } from "next/navigation";
import { BsPencilSquare } from "react-icons/bs";
import toast from "react-hot-toast";

export function UpdateTutorModal({ tutor, setTutors, onClose }) {
  const [updating, setUpdating] = useState(false);
  const router = useRouter();

  // Destructure tutor profile values safely
  const {
    _id,
    name,
    image,
    specialty,
    language,
    availableDays,
    price,
    totalSlot,
    sessionDate,
    experience,
    location,
    teachingMode,
    description,
  } = tutor || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    // Sanitize values into clean numeric signatures for MongoDB processing
    updatedData.price = Number(updatedData.price) || 0;
    updatedData.totalSlot = Number(updatedData.totalSlot) || 0;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL }/tutors/${_id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Tutor profile updated successfully! 📝");
        
        // Optimistically patch client-side state dynamically
        if (setTutors) {
          setTutors((prev) =>
            prev.map((item) => (item._id === _id ? { ...item, ...updatedData } : item))
          );
        }
        
        router.refresh();
        onClose(); // Shut down modal window container
      } else {
        toast.error(data.message || "Update transaction failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication failure.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    // Controlled modal element bound to parent state engine switches
    <Modal isOpen={true} onOpenChange={onClose}>
      <Modal.Backdrop className="backdrop-blur-sm">
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-2xl rounded-[32px] bg-white dark:bg-slate-900 border border-black/5 shadow-2xl overflow-hidden">
            <Modal.CloseTrigger />
            
            <Modal.Header>
              <Modal.Icon className="bg-cyan-500/10 text-cyan-600 dark:bg-cyan-950/50 dark:text-cyan-400">
                <BsPencilSquare className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Tutor Profile</Modal.Heading>
              <p className="mt-1.5 text-xs text-default-400">
                Modifying details for tracking entry: <span className="font-bold text-cyan-600">{name}</span>
              </p>
            </Modal.Header>

            <Modal.Body className="p-0 max-h-[65vh] overflow-y-auto">
              {/* Submission block containing input grids */}
              <form id="update-tutor-form" onSubmit={handleSubmit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                
                <TextField className="w-full" name="name" isRequired variant="secondary" defaultValue={name} isDisabled={updating}>
                  <Label>Tutor Name</Label>
                  <Input placeholder="Enter tutor name" />
                </TextField>

                <TextField className="w-full" name="image" isRequired variant="secondary" defaultValue={image} isDisabled={updating}>
                  <Label>Photo URL</Label>
                  <Input type="url" placeholder="Image link layout location" />
                </TextField>

                <TextField className="w-full" name="specialty" isRequired variant="secondary" defaultValue={specialty} isDisabled={updating}>
                  <Label>Subject / Specialty</Label>
                  <Input placeholder="Mathematics, Programming, etc." />
                </TextField>

                <TextField className="w-full" name="language" isRequired variant="secondary" defaultValue={language || "English"} isDisabled={updating}>
                  <Label>Language</Label>
                  <Input placeholder="English, Bangla" />
                </TextField>

                <TextField className="w-full" name="availableDays" isRequired variant="secondary" defaultValue={availableDays} isDisabled={updating}>
                  <Label>Available Days & Time</Label>
                  <Input placeholder="Sat - Wed 4PM - 7PM" />
                </TextField>

                <TextField className="w-full" name="price" isRequired type="number" variant="secondary" defaultValue={price} isDisabled={updating}>
                  <Label>Hourly Fee ($)</Label>
                  <Input min="1" placeholder="Rate cost fee integer" />
                </TextField>

                <TextField className="w-full" name="totalSlot" isRequired type="number" variant="secondary" defaultValue={totalSlot} isDisabled={updating}>
                  <Label>Total Slots Available</Label>
                  <Input min="1" placeholder="Maximum classroom seats count" />
                </TextField>

                <TextField className="w-full" name="sessionDate" isRequired type="date" variant="secondary" defaultValue={sessionDate} isDisabled={updating}>
                  <Label>Session Start Date</Label>
                  <Input className="text-gray-500 dark:text-gray-400" />
                </TextField>

                <TextField className="w-full" name="experience" isRequired variant="secondary" defaultValue={experience} isDisabled={updating}>
                  <Label>Years of Experience</Label>
                  <Input placeholder="e.g. 3 Years" />
                </TextField>

                <TextField className="w-full" name="location" isRequired variant="secondary" defaultValue={location} isDisabled={updating}>
                  <Label>Location / Base City</Label>
                  <Input placeholder="Dhaka, Remote, etc." />
                </TextField>

                {/* Harmonized Native Native Select Box matching WithForm design aesthetics */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-default-700">Teaching Mode</label>
                  <select
                    name="teachingMode"
                    required
                    defaultValue={teachingMode || "Online"}
                    disabled={updating}
                    className="w-full h-10 px-3 rounded-lg border border-black/10 dark:border-white/10 bg-transparent outline-none appearance-none text-sm text-black dark:text-white dark:bg-slate-900"
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <TextField className="w-full" name="description" isRequired variant="secondary" defaultValue={description} isDisabled={updating}>
                    <Label>Profile Description</Label>
                    <Input placeholder="Write professional context description overview summaries..." />
                  </TextField>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={onClose} disabled={updating}>
                Cancel
              </Button>
              <Button form="update-tutor-form" type="submit" isLoading={updating} className="bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold">
                Save Profile Changes
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}