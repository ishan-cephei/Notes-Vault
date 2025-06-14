import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";
import NoteCard from "../components/NoteCard";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import NoteDialog from "../components/NoteDialog";
import AppSidebar from "../components/ui/app-sidebar";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    content: "",
    file: "",
  });
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const userDetailsString = localStorage.getItem("user");
  const userDetails = userDetailsString
    ? JSON.parse(userDetailsString)
    : { name: "-", email: "-" };

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      setIsPageLoading(true);
      const response = await axios.get("/api/notes");
      setNotes(response.data.data);
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    } finally {
      setIsPageLoading(false);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await axios.delete(`/api/notes/${noteId}`);
      getNotes();
    } catch (error) {
      toast.error(err.response.data.message || "Something went wrong");
    }
  };

  const closeNoteDialog = () => {
    setIsNoteDialogOpen(false);
  };

  const openNoteDialog = () => {
    setIsNoteDialogOpen(true);
  };

  if (isPageLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader2 className="h-10 w-10 animate-spin text-#FFB5A7" />
      </div>
    );
  }

  return (
    <div className="p-4 ">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Hello, {userDetails.name} 👋</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back! Here are your latest notes.
        </p>
      </div>
      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            noteId={note._id}
            deleteNote={deleteNote}
          />
        ))}
      </div>
      <NoteDialog
        noteDetails={noteDetails}
        setNoteDetails={setNoteDetails}
        closeDialog={closeNoteDialog}
        open={isNoteDialogOpen}
        setOpen={setIsNoteDialogOpen}
      />
    </div>
  );
};

export default Home;
