import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";

const ComingSoon = ({ page }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <p className="section-label mb-2">Coming Soon</p>
      <h1 className="font-display text-white text-5xl">{page}</h1>
      <p className="text-white/40 font-body mt-3 text-sm">This page will be built in the coming days.</p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<ComingSoon page="Destinations" />} />
          <Route path="/hotels" element={<ComingSoon page="Hotels" />} />
          <Route path="/hotels/:id" element={<ComingSoon page="Hotel Detail" />} />
          <Route path="/login" element={<ComingSoon page="Sign In" />} />
          <Route path="/signup" element={<ComingSoon page="Join Free" />} />
          <Route path="/about" element={<ComingSoon page="About Us" />} />
          <Route path="/contact" element={<ComingSoon page="Contact" />} />
          <Route path="/dashboard" element={<ComingSoon page="My Dashboard" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}