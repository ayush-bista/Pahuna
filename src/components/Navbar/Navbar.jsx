import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const links = [
    { label: "Home", to: "/" },
    { label: "Hotels", to: "/hotels" },
    { label: "Destinations", to: "/destinations" },
    { label: "About", to: "/about" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        backgroundColor: scrolled ? "rgba(250,250,248,0.97)" : "rgba(238,242,247,0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid #E8E4DC" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.07)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: "1320px", margin: "0 auto", padding: "0 64px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "68px",
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: "36px", height: "36px", backgroundColor: "#B85C38",
              borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(184,92,56,0.35)",
              transition: "transform 0.2s",
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l4-8 4 4 3-6 4 10" />
              </svg>
            </div>
            <div>
              <span style={{ fontFamily: "Fraunces, serif", fontSize: "19px", fontWeight: 600, color: "#1A1A1A", letterSpacing: "-0.3px" }}>
                Nepal<span style={{ color: "#B85C38" }}>Stay</span>
              </span>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#9CA3AF", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1, marginTop: "1px" }}>
                Himalayan Hotels
              </p>
            </div>
          </Link>

          {/* Center links */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500,
                  color: isActive(l.to) ? "#B85C38" : "#4B4B4B",
                  textDecoration: "none", padding: "7px 14px", borderRadius: "8px",
                  backgroundColor: isActive(l.to) ? "rgba(184,92,56,0.08)" : "transparent",
                  transition: "all 0.18s",
                }}
                onMouseEnter={(e) => {
                  if (!isActive(l.to)) {
                    e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)";
                    e.currentTarget.style.color = "#1A1A1A";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(l.to)) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#4B4B4B";
                  }
                }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right — auth */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
            <Link
              to="/login"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500,
                color: "#4B4B4B", textDecoration: "none", padding: "7px 16px",
                borderRadius: "8px", transition: "all 0.18s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "#1A1A1A"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#4B4B4B"; }}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                color: "white", textDecoration: "none", padding: "8px 20px",
                backgroundColor: "#B85C38", borderRadius: "9px",
                boxShadow: "0 2px 8px rgba(184,92,56,0.30)",
                transition: "all 0.18s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#9A4D2F"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#B85C38"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get started
            </Link>
            <Link
              to="/contact"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500,
                color: "#1A1A1A", textDecoration: "none", padding: "7px 16px",
                border: "1.5px solid #E8E4DC", borderRadius: "9px",
                backgroundColor: "white", transition: "all 0.18s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B85C38"; e.currentTarget.style.color = "#B85C38"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E4DC"; e.currentTarget.style.color = "#1A1A1A"; }}
            >
              Contact
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{ display: "none", padding: "6px", borderRadius: "8px", color: "#1A1A1A" }}
              className="mobile-menu-btn"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ borderTop: "1px solid #E8E4DC", backgroundColor: "#FAFAF8", padding: "16px 32px 24px" }}>
            {[...links, { label: "Sign in", to: "/login" }, { label: "Contact", to: "/contact" }].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                style={{ display: "block", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 500, color: "#1A1A1A", padding: "12px 0", borderBottom: "1px solid #E8E4DC", textDecoration: "none" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}