import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteSignIn, type ProgramSignIn } from "@/lib/admin-store";

type DeleteStudentButtonProps = {
  student: ProgramSignIn;
  appearance?: "icon" | "button";
  onDeleted?: (remaining: ProgramSignIn[]) => void;
};

export function DeleteStudentButton({ student, appearance = "icon", onDeleted }: DeleteStudentButtonProps) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleDelete = async () => {
    setBusy(true);
    try {
      const remaining = await deleteSignIn(student.id);
      toast.success(`${student.studentName} a été retiré du registre.`);
      onDeleted?.(remaining);
      setOpen(false);
    } catch (err) {
      console.warn(err);
      toast.error("Impossible de supprimer cette inscription pour le moment.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        size={appearance === "icon" ? "sm" : "sm"}
        variant="ghost"
        disabled={busy}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setOpen(true);
        }}
        className={
          appearance === "icon"
            ? "h-8 w-8 p-0 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
            : "gap-1.5 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 border border-rose-500/20"
        }
        aria-label={`Supprimer ${student.studentName}`}
      >
        <Trash2 className="h-4 w-4" />
        {appearance === "button" ? "Supprimer l'élève" : null}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="bg-[#14171D] border-slate-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette inscription ?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              {student.studentName} ({student.id}) sera retiré du registre admin et supprimé de la base Supabase.
              Cette action ne peut pas être annulée.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={busy}
              onClick={(event) => {
                event.preventDefault();
                void handleDelete();
              }}
              className="bg-rose-600 text-white hover:bg-rose-500"
            >
              {busy ? "Suppression…" : "Supprimer"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
