import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import ReportLostItem from "./Components/Report/ReportLostItem";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/report-lost-item" element={<ReportLostItem />} />
      </Routes>
    </Router>
  );
}

export default App;
