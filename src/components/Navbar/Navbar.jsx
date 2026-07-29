import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", to: "/" },
    { label: "Hotels", to: "/hotels" },
    { label: "Destinations", to: "/destinations" },
    { label: "About", to: "/about" },
    { label: "Blog", to: "/blog" },
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: "#FAFAF8",
      borderBottom: scrolled ? "1px solid #E8E4DC" : "1px solid transparent",
      transition: "border-color 0.3s, box-shadow 0.3s",
      boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
      padding: "0",
    }}>
      <div style={{
        maxWidth: "1320px", margin: "0 auto",
        padding: "0 64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "72px",
      }}>

        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{
            width: "36px", height: "36px", backgroundColor: "#B85C38",
            borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l4-8 4 4 3-6 4 10" />
            </svg>
          </div>
          <span style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 600, color: "#1A1A1A", letterSpacing: "-0.3px" }}>
            Nepal<span style={{ color: "#B85C38" }}>Stay</span>
          </span>
        </Link>

        {/* Center nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 500,
                color: location.pathname === l.to ? "#1A1A1A" : "#6B6B6B",
                textDecoration: "none",
                transition: "color 0.2s",
                borderBottom: location.pathname === l.to ? "1.5px solid #1A1A1A" : "1.5px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right CTA */}
        <Link
          to="/contact"
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500,
            color: "#1A1A1A", textDecoration: "none",
            padding: "9px 24px",
            border: "1.5px solid #1A1A1A",
            borderRadius: "8px",
            backgroundColor: "transparent",
            transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1A1A1A"; e.currentTarget.style.color = "white"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#1A1A1A"; }}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}