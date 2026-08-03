import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import BackToTop from "./components/BackToTop/BackToTop";
import HomePage from "./pages/HomePage";
import HotelsPage from "./pages/HotelsPage";
import HotelDetailPage from "./pages/HotelDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import BookingPage from "./pages/BookingPage";
import DashboardPage from "./pages/DashboardPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFoundPage from "./pages/NotFoundPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/hotels/:id" element={<HotelDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Helmet>
        <title>NepalStay — Nepal's Hotel Booking Platform</title>
        <meta name="description" content="Discover and book handpicked hotels across Nepal's most extraordinary destinations — Kathmandu, Pokhara, Chitwan, Ilam, Mustang and more." />
        <meta name="keywords" content="Nepal hotels, hotel booking Nepal, Kathmandu hotels, Pokhara hotels, Chitwan safari, Ilam tea garden hotels" />
        <meta property="og:title" content="NepalStay — Nepal's Hotel Booking Platform" />
        <meta property="og:description" content="Book verified hotels across 12 Nepal destinations. 85+ properties, instant confirmation, no hidden fees." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <BackToTop />
    </Router>
  );
}