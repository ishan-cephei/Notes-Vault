import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";
import NoteCard from "../components/NoteCard";
import { NotebookPen } from "lucide-react";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import CreateNoteDialog from "../components/CreateNoteDialog.jsx";
import ViewNoteDialog from "../components/ViewNoteDialog.jsx";
import Dropdown from "../components/DropDown.jsx";
import { Button } from "@/components/shadcn/button";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [isCreateNoteDialogOpen, setIsCreateNoteDialogOpen] = useState(false);
  const [isViewNoteDialogOpen, setIsViewNoteDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);
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

  const closeCreateNoteDialog = () => {
    setIsCreateNoteDialogOpen(false);
    setNoteDetails({
      title: "",
      content: "",
      image: "",
    });
  };

  const openCreateNoteDialog = () => {
    setIsCreateNoteDialogOpen(true);
  };

  const closeViewNoteDialog = () => {
    setIsViewNoteDialogOpen(false);
  };

  const openViewNoteDialog = () => {
    setIsViewNoteDialogOpen(true);
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
    <div className="p-4 min-h-screen " style={{ backgroundColor: "#FFF1ED" }}>
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
        <Button
          onClick={() => {
            setIsEditMode(false);
            openCreateNoteDialog();
          }}
          className="m-3"
        >
          Create New Note
        </Button>
      </div>

      <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
        {notes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            noteDetails={noteDetails}
            setNoteDetails={setNoteDetails}
            setCurrentNoteId={setCurrentNoteId}
            getNotes={getNotes}
            setIsEditMode={setIsEditMode}
            openCreateNoteDialog={openCreateNoteDialog}
            openViewNoteDialog={openViewNoteDialog}
            isCreateNoteDialogOpen={isCreateNoteDialogOpen}
            setIsCreateNoteDialogOpen={setIsCreateNoteDialogOpen}
            isEditMode={isEditMode}
          />
        ))}
      </div>
      <CreateNoteDialog
        noteDetails={noteDetails}
        setNoteDetails={setNoteDetails}
        getNotes={getNotes}
        setIsEditMode={setIsEditMode}
        openCreateNoteDialog={openCreateNoteDialog}
        closeDialog={closeCreateNoteDialog}
        open={isCreateNoteDialogOpen}
        setOpen={setIsCreateNoteDialogOpen}
        isEditMode={isEditMode}
        currentNoteId={currentNoteId}
      />
      <ViewNoteDialog
        notes={notes}
        currentNoteId={currentNoteId}
        open={isViewNoteDialogOpen}
        setOpen={setIsViewNoteDialogOpen}
      />
    </div>
  );
};

export default Home;
