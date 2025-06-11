import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Login /> <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
