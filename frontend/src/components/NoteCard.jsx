import { useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import AlertPopUp from "../components/AlertDialog";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";

export default function NoteCard({ note, noteId, getNotes }) {
  const [isDeletePopUpOpen, setIsDeletePopUpOpen] = useState(false);

  const openDeletePopUp = () => {
    setIsDeletePopUpOpen(true);
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`/api/notes/${noteId}`);
      getNotes();
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <>
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all bg-white flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{note.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex-1 text-sm text-muted-foreground overflow-hidden break-words">
          <p className="overflow-y-auto h-20 pr-1 whitespace-pre-wrap">
            {note.content}
          </p>
        </CardContent>

        <CardFooter className="flex justify-between items-center gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 min-w-0 truncate"
          >
            <Eye className="w-4 h-4 " /> View
          </Button>

          <Button
            size="sm"
            variant="secondary"
            className="flex-1 min-w-0 truncate"
          >
            <Pencil className="w-4 h-4 " /> Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="flex-1 min-w-0 truncate"
            onClick={() => openDeletePopUp()}
          >
            <Trash className="w-4 h-4  " /> Delete
          </Button>
        </CardFooter>
      </Card>
      <AlertPopUp
        open={isDeletePopUpOpen}
        setOpen={setIsDeletePopUpOpen}
        noteId={noteId}
        deleteNote={deleteNote}
      />
    </>
  );
}
