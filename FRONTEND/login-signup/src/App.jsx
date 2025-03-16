import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import ReportLostItem from "./Components/Report/ReportLostItem";
import { AppProvider } from "./Components/Context/Context"; // Importing Context Provider
import ReportFoundItem from "./Components/Report/ReportFoundItem";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/report-lost-item" element={<ReportLostItem />} />
          <Route path="report-found-item" element={<ReportFoundItem/>} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
