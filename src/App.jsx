import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Footer from "./components/footer/footer";
import Hero from "./components/hero/hero";
import Navbar from "./components/navbar/navbar";
import SignNReg from "./components/hero/Sign-in_and_Registration";
import AdminPage from "./components/admin_log_in/admin_page";
import UserPage from "./components/user_log_in/user_page";

function App() {
  const [videos, setVideos] = useState([]); // 👈 Ortak video state

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<SignNReg />} />
        <Route path="/admin" element={<AdminPage videos={videos} setVideos={setVideos} />} />
        <Route path="/user" element={<UserPage videos={videos} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
