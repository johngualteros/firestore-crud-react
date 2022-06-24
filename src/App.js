import "./App.css";
import Links from "./components/Links";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <div className="container my-5 p-4">
      <div className="row">
        <Links />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
