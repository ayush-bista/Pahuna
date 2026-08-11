import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, Calendar, Settings, LogOut, Heart } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Hotels", to: "/hotels" },
    { label: "Destinations", to: "/destinations" },
    { label: "About", to: "/about" },
  ];

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const initials = user
    ? (user.name || user.firstName || user.email || "U")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
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
          {/* <div style={{ width: "36px", height: "36px", backgroundColor: "#B85C38", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(184,92,56,0.35)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 17l4-8 4 4 3-6 4 10" />
            </svg>
          </div> */}
          <div>
            <span style={{ fontFamily: "Fraunces, serif", fontSize: "19px", fontWeight: 600, color: "#1A1A1A", letterSpacing: "-0.3px" }}>
              Pahuna
            </span>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "9px", color: "#9CA3AF", letterSpacing: "2px", textTransform: "uppercase", lineHeight: 1, marginTop: "1px" }}>
              Himalayan Hotels
            </p>
          </div>
        </Link>

        {/* Center nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          {navLinks.map((l) => (
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
              onMouseEnter={(e) => { if (!isActive(l.to)) { e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.04)"; e.currentTarget.style.color = "#1A1A1A"; } }}
              onMouseLeave={(e) => { if (!isActive(l.to)) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#4B4B4B"; } }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
          {user ? (
            // ── LOGGED IN — profile dropdown ──
            <div ref={profileRef} style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "5px 12px 5px 5px",
                  backgroundColor: "white", border: "1.5px solid #E8E4DC",
                  borderRadius: "40px", cursor: "pointer",
                  transition: "all 0.18s", boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B85C38"; }}
                onMouseLeave={(e) => { if (!profileOpen) e.currentTarget.style.borderColor = "#E8E4DC"; }}
              >
                {/* Avatar circle */}
                <div style={{
                  width: "32px", height: "32px", borderRadius: "50%",
                  backgroundColor: "#B85C38", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 700, color: "white" }}>
                    {initials}
                  </span>
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1A1A", maxWidth: "100px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {(user.name || user.firstName || user.email.split("@")[0])}
                </span>
                <ChevronDown size={14} color="#6B6B6B" style={{ transform: profileOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }} />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 10px)", right: 0,
                  backgroundColor: "white", border: "1px solid #E8E4DC",
                  borderRadius: "16px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  minWidth: "220px", overflow: "hidden", zIndex: 200,
                  animation: "fadeIn 0.15s ease both",
                }}>
                  {/* User info header */}
                  <div style={{ padding: "16px 18px", borderBottom: "1px solid #E8E4DC", backgroundColor: "#FAFAF8" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#B85C38", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700, color: "white" }}>{initials}</span>
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {user.name || user.firstName || "User"}
                        </p>
                        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#9CA3AF", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  {[
                    { icon: <User size={15} />, label: "My Profile", to: "/dashboard", tab: "profile" },
                    { icon: <Calendar size={15} />, label: "Booking History", to: "/dashboard", tab: "bookings" },
                    { icon: <Heart size={15} />, label: "Saved Hotels", to: "/dashboard", tab: "saved" },
                    { icon: <Settings size={15} />, label: "Settings", to: "/dashboard", tab: "settings" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      state={{ tab: item.tab }}
                      style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 18px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", textDecoration: "none", transition: "background-color 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FAFAF8"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <span style={{ color: "#B85C38" }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  ))}

                  {/* Sign out */}
                  <div style={{ borderTop: "1px solid #E8E4DC" }}>
                    <button
                      onClick={handleLogout}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px 18px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#EF4444", border: "none", backgroundColor: "transparent", cursor: "pointer", textAlign: "left", transition: "background-color 0.15s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FEF2F2"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                    >
                      <LogOut size={15} />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ── LOGGED OUT — get started only ──
            <Link
              to="/signup"
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                color: "white", textDecoration: "none", padding: "9px 22px",
                backgroundColor: "#B85C38", borderRadius: "9px",
                boxShadow: "0 2px 8px rgba(184,92,56,0.30)",
                transition: "all 0.18s", display: "inline-block",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#9A4D2F"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#B85C38"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Get started
            </Link>
          )}

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
        </div>
      </div>
    </nav>
  );
}