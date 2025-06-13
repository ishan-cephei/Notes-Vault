import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function NoteCard({ note, noteId, deleteNote }) {
  return (
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
        <Button size="sm" variant="outline" className="flex-1 min-w-0 truncate">
          <Eye className="w-4 h-4 " /> View
        </Button>

        <Button
          size="sm"
          variant="secondary"
          className="flex-1 min-w-0 truncate"
        >
          <Pencil className="w-4 h-4 " /> Edit
        </Button>

        {/* Delete with confirmation */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="destructive"
              className="flex-1 min-w-0 truncate"
            >
              <Trash className="w-4 h-4  " /> Delete
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This note will be permanently deleted and cannot be recovered.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteNote(noteId)}>
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
