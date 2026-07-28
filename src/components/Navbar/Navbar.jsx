import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Destinations", to: "/destinations" },
    { label: "Hotels", to: "/hotels" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s ease", backgroundColor: scrolled ? "#FAFAF8" : "transparent", borderBottom: scrolled ? "1px solid #E8E4DC" : "1px solid transparent", padding: scrolled ? "12px 0" : "20px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{ width: "34px", height: "34px", backgroundColor: "#B85C38", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l4-8 4 4 3-6 4 10" />
            </svg>
          </div>
          <span style={{ fontFamily: "Fraunces, serif", fontSize: "19px", fontWeight: 600, color: "#1A1A1A", letterSpacing: "-0.3px" }}>
            Nepal<span style={{ color: "#B85C38" }}>Stay</span>
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: location.pathname === l.to ? "#B85C38" : "#1A1A1A", borderBottom: location.pathname === l.to ? "1.5px solid #B85C38" : "1.5px solid transparent", paddingBottom: "2px", transition: "color 0.2s", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link to="/login" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1A1A", padding: "8px 18px", border: "1px solid #E8E4DC", borderRadius: "8px", backgroundColor: "white", textDecoration: "none" }}>
            Sign in
          </Link>
          <Link to="/signup" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "white", padding: "8px 18px", backgroundColor: "#B85C38", borderRadius: "8px", textDecoration: "none" }}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}