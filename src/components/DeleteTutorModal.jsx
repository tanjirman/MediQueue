"use client";

import { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function DeleteTutorModal({ tutor, setTutors, onClose }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const { _id, name } = tutor || {};

  const handleDelete = async () => {
    setDeleting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/tutors/${_id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Tutor profile removed successfully! 🗑️");

        // Optimistically remove the deleted tutor from client-side state mapping arrays immediately
        if (setTutors) {
          setTutors((prev) => prev.filter((item) => item._id !== _id));
        }

        router.refresh();
        onClose(); // Shut down the modal view container safely
      } else {
        toast.error(data.message || "Deletion transaction refused by database.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network communication failure. Is the server online?");
    } finally {
      setDeleting(false);
    }
  };

  return (
    // Controlled warning overlay bound cleanly to parent tracking state toggles
    <AlertDialog isOpen={true} onOpenChange={onClose}>
      <AlertDialog.Backdrop className="backdrop-blur-sm">
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[420px] rounded-[32px] bg-white dark:bg-slate-900 border border-black/5 shadow-2xl">
            <AlertDialog.CloseTrigger />
            
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete profile permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            
            <AlertDialog.Body className="text-left">
              <p className="text-sm leading-relaxed text-default-500">
                This will permanently remove the tutor registration entry for{" "}
                <strong className="text-black dark:text-white font-bold">{name}</strong>{" "}
                and wipe its associated slot tracking configurations from the platform. 
                This action cannot be undone.
              </p>
            </AlertDialog.Body>
            
            <AlertDialog.Footer>
              <Button 
                type="button"
                variant="tertiary" 
                onClick={onClose} 
                disabled={deleting}
                className="rounded-xl font-bold"
              >
                Cancel
              </Button>
              
              <Button 
                type="button"
                variant="danger" 
                isLoading={deleting}
                onClick={handleDelete}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl px-5"
              >
                Delete Profile
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}