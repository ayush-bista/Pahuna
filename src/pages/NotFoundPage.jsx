import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mountain, Search, MapPin } from "lucide-react";

const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const suggestions = [
  { label: "Browse all hotels", to: "/hotels", icon: <Search size={16} /> },
  { label: "Kathmandu hotels", to: "/hotels?destination=Kathmandu", icon: <MapPin size={16} /> },
  { label: "Pokhara hotels", to: "/hotels?destination=Pokhara", icon: <MapPin size={16} /> },
  { label: "About Pahuna", to: "/about", icon: <Mountain size={16} /> },
];

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Background image section */}
      <div style={{ position: "relative", height: "420px", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&q=85"
          alt="Nepal mountains"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(250,250,248,1) 100%)" }} />

        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", textAlign: "center" }}>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: "120px", fontWeight: 700, color: "white", lineHeight: 1, opacity: 0.25, letterSpacing: "-4px" }}>404</p>
        </div>
      </div>

      {/* Content */}
      <div style={{ ...WRAP, textAlign: "center", marginTop: "-80px", position: "relative", zIndex: 10, paddingBottom: "80px" }}>

        <div style={{ width: "56px", height: "56px", backgroundColor: "#FDF0EB", border: "2px solid #F0C9B8", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <Mountain size={24} color="#B85C38" />
        </div>

        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "14px" }}>
          Lost in the mountains
        </p>

        <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1.5px", marginBottom: "16px" }}>
          This page doesn't exist
        </h1>

        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 40px" }}>
          The page you're looking for may have moved, been deleted, or never existed.
          Let's get you back on the trail.
        </p>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "56px" }}>
          <button
            onClick={() => navigate(-1)}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "13px 24px", border: "1.5px solid #E8E4DC", borderRadius: "12px", backgroundColor: "white", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#4B4B4B", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B85C38")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E4DC")}
          >
            <ArrowLeft size={16} /> Go back
          </button>
          <Link
            to="/"
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "13px 24px", backgroundColor: "#1A1A1A", color: "white", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
          >
            Go to homepage
          </Link>
        </div>

        {/* Suggestions */}
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#9CA3AF", marginBottom: "16px" }}>
            Or try one of these
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            {suggestions.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 18px", backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", textDecoration: "none", transition: "border-color 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B85C38"; e.currentTarget.style.color = "#B85C38"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E4DC"; e.currentTarget.style.color = "#1A1A1A"; }}
              >
                <span style={{ color: "#B85C38", flexShrink: 0 }}>{s.icon}</span>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}