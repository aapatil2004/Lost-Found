import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import ReportLostItem from "./Components/Report/ReportLostItem";
import { AppProvider } from "./Components/Context/Context"; // Importing Context Provider
import LostItem from "./Components/LostItem/Lostitem";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginSignUp />} />
          <Route path="/report-lost-item" element={<ReportLostItem />} />
          <Route path="/report-found-item" element={<ReportLostItem />} />
          <Route path="/home" element={<Home />} />
          {/* <Route path="/lostItem" element={<LostItem />} /> */}
          <Route path="lostItem/:id" element={<LostItem />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
