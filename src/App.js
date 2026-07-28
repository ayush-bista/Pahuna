import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";

const ComingSoon = ({ page }) => (
  <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAFAF8" }}>
    <div style={{ textAlign: "center" }}>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "12px" }}>
        Coming in next update
      </p>
      <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "3rem", color: "#1A1A1A", fontWeight: 300 }}>{page}</h1>
    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<ComingSoon page="Destinations" />} />
        <Route path="/hotels" element={<ComingSoon page="Hotels" />} />
        <Route path="/hotels/:id" element={<ComingSoon page="Hotel Detail" />} />
        <Route path="/login" element={<ComingSoon page="Sign In" />} />
        <Route path="/signup" element={<ComingSoon page="Sign Up" />} />
        <Route path="/about" element={<ComingSoon page="About" />} />
        <Route path="/contact" element={<ComingSoon page="Contact" />} />
      </Routes>
      <Footer />
    </Router>
  );
}