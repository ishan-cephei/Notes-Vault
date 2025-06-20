import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";

const ViewNoteDialog = ({ open, setOpen, notes, currentNoteId }) => {
  const findNote = (noteId) => {
    const note = notes.find((val) => val._id === noteId);
    return note;
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl text-zinc-800">
            {findNote(currentNoteId)?.title}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Created {getCreatedAtLabel(findNote(currentNoteId)?.createdAt)}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 max-h-[300px] overflow-y-auto whitespace-pre-wrap text-sm text-zinc-700 leading-relaxed">
          {findNote(currentNoteId)?.content}
        </div>

        {findNote(currentNoteId)?.file && (
          <a
            href={findNote(currentNoteId)?.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-blue-800 transition-colors duration-200"
          >
            View Attached File
          </a>
        )}

        <DialogFooter className="mt-6">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewNoteDialog;

const getCreatedAtLabel = (createdAt) => {
  const createdDate = new Date(createdAt);
  const now = new Date();

  const created = new Date(
    createdDate.getFullYear(),
    createdDate.getMonth(),
    createdDate.getDate()
  );
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = today - created;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};
