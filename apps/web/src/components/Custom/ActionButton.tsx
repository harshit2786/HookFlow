import { Action } from "@/models/zap";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import AddAction from "./AddAction";
import { useState } from "react";

const ActionButton = ({
  index,
  addAction,
}: {
  index: number;
  addAction: (a: Action) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="icon"
        className="mt-1 rounded-full"
      >
        <Plus />
      </Button>
      <Dialog open={isOpen} onOpenChange={(e: boolean) => setIsOpen(e)}>
        <DialogContent>
          <DialogTitle>Add Action</DialogTitle>
          <AddAction
            callback={setIsOpen}
            type="add"
            addAction={addAction}
            index={index}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ActionButton;
