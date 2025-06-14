import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const NoteDialog = ({
  noteDetails,
  setNoteDetails,
  closeDialog,
  open,
  setOpen,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create your note here</DialogTitle>
          <DialogDescription>
            You can also attach a file with it.
          </DialogDescription>
        </DialogHeader>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Label>Title</Label>
            <Input
              type="text"
              onChange={(e) =>
                setNoteDetails({ ...noteDetails, title: e.target.value })
              }
            ></Input>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Label>Content</Label>
            <Textarea
              style={{ height: "200px" }}
              onChange={(e) =>
                setNoteDetails({ ...noteDetails, content: e.target.value })
              }
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Label>Upload a file (Optional)</Label>
            <Input type="file"></Input>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => closeDialog()}
          >
            Cancel
          </Button>
          <Button type="button">Create Note</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
