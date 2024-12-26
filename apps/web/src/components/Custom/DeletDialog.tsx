import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  hookName: string;
}

export function DeleteDialog({ isOpen, onClose, onConfirm, hookName }: DeleteDialogProps) {
  const [input, setInput] = useState("");
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Hook</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Type <span className="font-mono">DELETE</span> to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input
            placeholder="Type DELETE to confirm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={input !== "DELETE"}
          >
            Delete {hookName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}