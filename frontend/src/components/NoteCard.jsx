import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { Button } from "@/components/shadcn/button";
import { Eye, Pencil, Trash } from "lucide-react";
import AlertPopUp from "../components/AlertDialog";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";

export default function NoteCard({
  note,
  setNoteDetails,
  setCurrentNoteId,
  getNotes,
  setIsEditMode,
  openCreateNoteDialog,
  openViewNoteDialog,
}) {
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);

  const openDeletePopUp = () => {
    setIsDeletePopUpOpen(true);
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`/api/notes/${noteId}`);
      getNotes();
      toast.success("Your note has been deleted successfully");
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <Card className="h-[250px] w-[300px] rounded-2xl border border-zinc-200 bg-card shadow-xl hover:shadow-2xl transition-shadow duration-300 rounded-2xl flex flex-col">
        {/* Header */}
        <CardHeader className="pb-1">
          <CardTitle className="text-base font-semibold text-zinc-800 truncate">
            {note.title}
          </CardTitle>
        </CardHeader>

        {/* Content */}
        <CardContent className="px-4 text-sm text-zinc-600 -mt-1 flex-1 overflow-hidden">
          <p className="line-clamp-3 whitespace-pre-wrap">{note.content}</p>
        </CardContent>

        {/* Footer - pinned to bottom */}
        <CardFooter className="px-4 flex justify-between items-center gap-2 mt-auto">
          <Button
            size="sm"
            variant="ghost"
            className="flex items-center gap-1 text-blue-600 hover:bg-blue-50"
            onClick={() => {
              openViewNoteDialog();
              setCurrentNoteId(note._id);
            }}
          >
            <Eye className="w-4 h-4" /> View
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-1 text-zinc-700 hover:bg-zinc-200"
            onClick={() => {
              setNoteDetails({
                title: note.title,
                content: note.content,
                file: note.file,
              });
              setIsEditMode(true);
              openCreateNoteDialog();
              setCurrentNoteId(note._id);
            }}
          >
            <Pencil className="w-4 h-4" /> Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            onClick={openDeletePopUp}
          >
            <Trash className="w-4 h-4" /> Delete
          </Button>
        </CardFooter>
      </Card>

      <AlertPopUp
        open={isDeletePopUpOpen}
        setOpen={setIsDeletePopUpOpen}
        noteId={note._id}
        deleteNote={deleteNote}
      />
    </>
  );
}
