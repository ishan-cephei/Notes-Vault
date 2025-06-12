import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../../axiosInstance";
const Home = () => {
  const userDetailsString = localStorage.getItem("user");
  const userDetails = userDetailsString
    ? JSON.parse(userDetailsString)
    : { name: "-", email: "-" };

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    }
  };
  return (
    <div>
      {`Welcome ${userDetails.name}. Your mail ID is ${userDetails.email}`}
    </div>
  );
};

export default Home;
