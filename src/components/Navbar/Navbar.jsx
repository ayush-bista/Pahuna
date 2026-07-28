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
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s ease", backgroundColor: scrolled ? "rgba(250,250,248,0.92)" : "transparent", backdropFilter: scrolled ? "blur(14px)" : "none", borderBottom: scrolled ? "1px solid #E8E4DC" : "1px solid transparent", padding: scrolled ? "10px 0" : "18px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none", flexShrink: 0 }}>
          <div style={{ width: "36px", height: "36px", backgroundColor: "#B85C38", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(184,92,56,0.18)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l4-8 4 4 3-6 4 10" />
            </svg>
          </div>
          <span style={{ fontFamily: '"Noto Serif Devanagari", Mangal, "Hind Siliguri", serif', fontSize: "20px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "0.2px", lineHeight: 1 }}>
            पाहुना
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap", justifyContent: "center" }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: location.pathname === l.to ? "#B85C38" : "#1A1A1A", borderBottom: location.pathname === l.to ? "1.5px solid #B85C38" : "1.5px solid transparent", paddingBottom: "3px", transition: "color 0.2s, border-color 0.2s", textDecoration: "none", letterSpacing: "0.1px" }}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <Link to="/login" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1A1A", padding: "9px 18px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", textDecoration: "none", transition: "transform 0.2s, border-color 0.2s, box-shadow 0.2s" }}>
            Sign in
          </Link>
          <Link to="/signup" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "white", padding: "9px 18px", backgroundColor: "#B85C38", borderRadius: "10px", textDecoration: "none", boxShadow: "0 8px 20px rgba(184,92,56,0.22)", transition: "transform 0.2s, box-shadow 0.2s" }}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}