import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "../../axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const NoteDialog = ({
  noteDetails,
  setNoteDetails,
  closeDialog,
  open,
  setOpen,
  getNotes,
}) => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const handleCreateNote = async () => {
    try {
      setIsButtonLoading(true);
      const response = await axios.post("/api/notes", noteDetails);
      closeDialog();
      getNotes();
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    } finally {
      setIsButtonLoading(false);
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          closeDialog();
        }
        setOpen(isOpen);
      }}
    >
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
              value={noteDetails.title}
            ></Input>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Label>Content</Label>
            <Textarea
              style={{ height: "200px" }}
              value={noteDetails.content}
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
          <Button
            disabled={
              isButtonLoading || !noteDetails.title || !noteDetails.content
            }
            onClick={handleCreateNote}
            type="button"
          >
            {isButtonLoading ? (
              <Loader2 className="h-10 w-10 animate-spin text-#FFB5A7" />
            ) : (
              "Create Note"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteDialog;
