import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";

const ComingSoon = ({ page }) => (
  <div
    className="min-h-screen flex items-center justify-center"
    style={{ background: "linear-gradient(150deg, #060818 0%, #0c1a3a 40%, #0a0a0a 100%)" }}
  >
    <div className="text-center">
      <p
        style={{
          color: "#D4AF37",
          fontFamily: "Cormorant Garamond, serif",
          fontStyle: "italic",
          fontSize: "1.1rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "8px",
        }}
      >
        Coming Soon
      </p>
      <h1
        style={{
          fontFamily: "Playfair Display, serif",
          color: "white",
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        {page}
      </h1>
      <p style={{ color: "rgba(255,255,255,0.4)", fontFamily: "DM Sans, sans-serif", marginTop: "12px", fontSize: "0.875rem" }}>
        This page will be built in the coming days.
      </p>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0a" }}>
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