import { Home, AddUser, AddRelation } from "./pages/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<AddUser />} />
        <Route path="/relation" element={<AddRelation />} />
      </Routes>
    </Router>
  );
}

export default App;
