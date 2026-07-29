import { Link } from "react-router-dom";

const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#1A1A1A", color: "white", padding: "64px 0 32px" }}>
      <div style={WRAP}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "56px" }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "32px", backgroundColor: "#B85C38", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 17l4-8 4 4 3-6 4 10" />
                </svg>
              </div>
              <span style={{ fontFamily: "Fraunces, serif", fontSize: "18px", fontWeight: 600, color: "white" }}>
                Pahuna
              </span>
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "240px" }}>
              Nepal's most trusted hotel booking platform — from Kathmandu to Tinjure.
            </p>
          </div>

          {/* Destinations */}
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "20px" }}>
              Destinations
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {["Kathmandu", "Pokhara", "Chitwan", "Ilam", "Bhedetar", "Basantapur", "Tinjure", "Dhankuta", "Bandipur"].map((d) => (
                <Link key={d} to={`/hotels?destination=${d}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", textDecoration: "none" }}>
                  {d}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "20px" }}>
              Company
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              {[{ l: "About", p: "/about" }, { l: "Contact", p: "/contact" }, { l: "Privacy", p: "/privacy" }, { l: "Terms", p: "/terms" }].map((i) => (
                <Link key={i.l} to={i.p} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", textDecoration: "none" }}>
                  {i.l}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "20px" }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "11px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>Thamel, Kathmandu</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>+977-1-4444-5555</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>hello@pahuna.com</p>
            </div>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #2D2D2D", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B5563" }}>
            © 2025 Pahuna. Made with care for Nepal's tourism.
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B5563" }}>
            🏔️ Kathmandu, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}