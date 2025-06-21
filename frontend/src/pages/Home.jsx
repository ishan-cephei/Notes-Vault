import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";
import NoteCard from "../components/NoteCard";
import { NotebookPen } from "lucide-react";
import CreateNoteDialog from "../components/CreateNoteDialog.jsx";
import ViewNoteDialog from "../components/ViewNoteDialog.jsx";
import Dropdown from "../components/DropDown.jsx";
import { Button } from "@/components/shadcn/button";

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [noteDetails, setNoteDetails] = useState({
    title: "",
    content: "",
    file: "",
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
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsPageLoading(false);
    }
  };

  const closeCreateNoteDialog = () => {
    setIsCreateNoteDialogOpen(false);
    setNoteDetails({
      title: "",
      content: "",
      file: "",
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

  return (
    <>
      {/* Modern Stylish Fixed Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-zinc-900/70 border-b border-border shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NotebookPen className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold text-primary tracking-tight text-foreground">
            Notes Vault
          </h1>
        </div>
        <Dropdown
          initials={userDetails.name?.charAt(0)?.toUpperCase() || "U"}
        />
      </header>

      {/* Main Content Below Header */}
      <div className="pt-10 px-4 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-indigo-950 dark:via-zinc-900 dark:to-indigo-900">
        <div className="content-header flex flex-row justify-between flex-wrap items-center mb-6">
          <div>
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
            className="mt-3 sm:mt-0"
          >
            Create New Note
          </Button>
        </div>

        {isPageLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[250px] w-[300px] bg-zinc-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        ) : notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10 text-center text-zinc-600">
            <NotebookPen className="w-12 h-12 mb-4 text-primary" />
            <h2 className="text-xl font-semibold text-zinc-700 mb-1">
              No Notes Yet
            </h2>
            <p className="text-sm text-zinc-500">
              You haven’t created any notes yet. Click “Create New Note” to get
              started!
            </p>
          </div>
        ) : (
          <div className="grid gap-x-4 gap-y-6 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        )}

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
    </>
  );
};

export default Home;
