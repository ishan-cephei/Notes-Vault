import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";
import NoteCard from "../components/NoteCard";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import NoteDialog from "../components/NoteDialog";
import Dropdown from "../components/DropDown.jsx";
import { Button } from "@/components/ui/button";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    content: "",
    image: "",
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

  const closeNoteDialog = () => {
    setIsNoteDialogOpen(false);
    setNoteDetails({
      title: "",
      content: "",
      image: "",
    });
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
    <div className="p-4 h-screen" style={{ backgroundColor: "#FFF1ED" }}>
      <div className="home-header flex flex-row justify-between mb-8">
        <div className="flex flex-row items-center  gap-1 ">
          <NotebookPen
            className="w-10 h-10 mb-2"
            style={{ color: "#FFB5A7" }}
          />
          <h1
            className="text-2xl font-semibold text-center"
            style={{ color: "#FFB5A7" }}
          >
            Notes Vault
          </h1>
        </div>
        <Dropdown
          initials={userDetails.name?.charAt(0)?.toUpperCase() || "U"}
        />
      </div>
      <div className="content-header flex flex-row  gap-1">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">
            Hello, {userDetails.name} 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            Welcome back! Here are your latest notes.
          </p>
        </div>
        <Button onClick={() => openNoteDialog()} className="m-3">
          Create New Note
        </Button>
      </div>

      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            noteId={note._id}
            getNotes={getNotes}
          />
        ))}
      </div>
      <NoteDialog
        noteDetails={noteDetails}
        setNoteDetails={setNoteDetails}
        closeDialog={closeNoteDialog}
        open={isNoteDialogOpen}
        setOpen={setIsNoteDialogOpen}
        getNotes={getNotes}
      />
    </div>
  );
};

export default Home;
