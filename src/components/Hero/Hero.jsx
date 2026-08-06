import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Search, ArrowRight, ChevronLeft, ChevronRight, Star, Shield, Clock } from "lucide-react";
import { destinations, stats } from "../../data/hotels";
import useReveal from "../../hooks/useReveal";

const OUTER = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const heroSlides = [
  { image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&q=90", location: "Pokhara", tagline: "Gateway to the Annapurnas" },
  { image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1920&q=90", location: "Kathmandu", tagline: "City of Temples" },
  { image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1920&q=90", location: "Nagarkot", tagline: "Himalayan Panoramas" },
  { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=90", location: "Chitwan", tagline: "Jungle Safari Paradise" },
  { image: "https://images.unsplash.com/photo-1563514227147-6d2af38dce6f?w=1920&q=90", location: "Ilam", tagline: "Nepal's Tea Capital" },
];

function DestCard({ dest, height = "260px", large = false }) {
  return (
    <a
      href={`/hotels?destination=${dest.name}`}
      style={{ position: "relative", overflow: "hidden", borderRadius: "14px", display: "block", height, cursor: "pointer", textDecoration: "none" }}
    >
      <img
        src={dest.image}
        alt={dest.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 20%, rgba(10,10,10,0.72) 100%)" }} />
      <div style={{ position: "absolute", top: "14px", left: "14px", backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "4px 12px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, color: "white" }}>{dest.tag}</span>
      </div>
      <div style={{ position: "absolute", top: "14px", right: "14px", backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", borderRadius: "999px", padding: "4px 10px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>{dest.hotelCount} hotels</span>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: large ? "24px" : "16px" }}>
        {large && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", marginBottom: "4px" }}>{dest.tagline}</p>}
        <p style={{ fontFamily: "Fraunces, serif", fontSize: large ? "28px" : "19px", fontWeight: 600, color: "white", marginBottom: "5px" }}>{dest.name}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
            from <span style={{ color: "white", fontWeight: 600 }}>NPR {dest.startingPrice.toLocaleString()}</span>
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.7)" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px" }}>Explore</span>
            <ArrowRight size={11} />
          </div>
        </div>
      </div>
    </a>
  );
}

/* ── Minimal CSS injected once ── */
const heroCSS = `
@keyframes heroEnter {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroSearchEnter {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroSlowZoom {
  from { transform: scale(1); }
  to   { transform: scale(1.06); }
}
@keyframes heroAccentLine {
  from { width: 0; opacity: 0; }
  to   { width: 28px; opacity: 1; }
}
@keyframes heroBadgeFadeIn {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
.hero-arrow:hover {
  background-color: rgba(255,255,255,0.95) !important;
  color: #1A1A1A !important;
  border-color: rgba(255,255,255,0.95) !important;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15) !important;
}
.hero-search-section select:focus,
.hero-search-section input:focus {
  outline: none !important;
}
.hero-search-go:hover {
  background-color: #9A4D2F !important;
  box-shadow: 0 4px 16px rgba(184,92,56,0.45) !important;
}
`;

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", checkIn: "", checkOut: "" });
  const [slide, setSlide] = useState(0);
  const timerRef = useRef(null);
  const destRef = useReveal(0.05);
  const whyRef = useReveal(0.1);

  // Inject CSS once
  useEffect(() => {
    const id = "hero-injected-css";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = heroCSS;
      document.head.appendChild(style);
    }
  }, []);

  // Auto-advance
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 5500);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  const go = (i) => { setSlide(i); resetTimer(); };
  const prev = () => { setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length); resetTimer(); };
  const next = () => { setSlide((s) => (s + 1) % heroSlides.length); resetTimer(); };

  const handleSearch = () => {
    const params = new URLSearchParams(form);
    navigate(`/hotels?${params.toString()}`);
  };

  const current = heroSlides[slide];

  return (
    <div style={{ backgroundColor: "#EEF2F7" }}>

      {/* ══════════ HERO ══════════ */}
      <section style={{
        position: "relative",
        height: "92vh",
        minHeight: "620px",
        maxHeight: "920px",
        overflow: "hidden",
      }}>

        {/* ── Background images (crossfade) ── */}
        {heroSlides.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              opacity: slide === i ? 1 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: 0,
            }}
          >
            <img
              src={s.image}
              alt={s.location}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                animation: slide === i ? "heroSlowZoom 12s ease-out forwards" : "none",
              }}
            />
          </div>
        ))}

        {/* ── Overlay — multi-layer for consistent text legibility ── */}
        {/* Base darkening overlay */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(170deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.22) 35%, rgba(0,0,0,0.62) 100%)",
        }} />
        {/* Left-side scrim for text area */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)",
        }} />
        {/* Bottom-area scrim for search bar and badges readability */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.20) 35%, transparent 60%)",
        }} />

        {/* ── Content ── */}
        <div style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 64px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "140px",
        }}>

          {/* Tag line */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "18px",
            animation: "heroEnter 0.7s ease both 0.2s",
          }}>
            <div style={{ width: "28px", height: "2px", backgroundColor: "#D4764E", animation: "heroAccentLine 0.6s ease both 0.4s" }} />
            <span style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.95)",
              textShadow: "0 1px 6px rgba(0,0,0,0.5), 0 0px 2px rgba(0,0,0,0.3)",
            }}>
              Nepal's Hotel Platform
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(42px, 5.5vw, 74px)",
            fontWeight: 700,
            lineHeight: 1.06,
            color: "white",
            letterSpacing: "-2.5px",
            marginBottom: "20px",
            maxWidth: "680px",
            textShadow: "0 2px 20px rgba(0,0,0,0.45), 0 1px 3px rgba(0,0,0,0.25)",
            animation: "heroEnter 0.8s ease both 0.35s",
          }}>
            Find your{" "}
            <em style={{ color: "#E8956C", fontStyle: "italic", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>perfect</em>
            <br />stay in Nepal
          </h1>

          <div style={{
            maxWidth: "560px",
            marginBottom: "28px",
            padding: "18px 20px",
            borderRadius: "22px",
            backgroundColor: "rgba(0,0,0,0.18)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 14px 36px rgba(0,0,0,0.14)",
            animation: "heroEnter 0.8s ease both 0.5s",
          }}>
            {/* Sub text */}
            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.93)",
              maxWidth: "490px",
              marginBottom: "16px",
              textShadow: "0 1px 10px rgba(0,0,0,0.5), 0 0px 3px rgba(0,0,0,0.3)",
            }}>
              Handpicked hotels across 12 destinations from Kathmandu's ancient temples to Ilam's misty tea gardens.
            </p>

            {/* Quick info row */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}>
              {[
                { icon: <Shield size={13} />, text: "Verified hotels" },
                { icon: <Star size={13} />, text: "4.8★ avg rating" },
                { icon: <Clock size={13} />, text: "Instant booking" },
              ].map((item, idx) => (
                <div
                  key={item.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    borderRadius: "999px",
                    padding: "7px 14px",
                    border: "1px solid rgba(255,255,255,0.12)",
                    animation: `heroBadgeFadeIn 0.5s ease both ${0.8 + idx * 0.1}s`,
                  }}
                >
                  <span style={{ color: "#E8956C" }}>{item.icon}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.95)", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          </div>

        {/* ── Slide arrows (left edge) ── */}
        <div style={{
          position: "absolute",
          right: "32px",
          bottom: "180px",
          zIndex: 15,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}>
          <button
            className="hero-arrow"
            onClick={prev}
            aria-label="Previous"
            style={{
              width: "42px", height: "42px", borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.30)",
              backgroundColor: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(6px)",
              color: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.25s ease",
            }}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="hero-arrow"
            onClick={next}
            aria-label="Next"
            style={{
              width: "42px", height: "42px", borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.30)",
              backgroundColor: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(6px)",
              color: "white",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.25s ease",
            }}
          >
            <ChevronRight size={18} />
          </button>

          {/* Location label */}
          <div style={{ marginTop: "6px", textAlign: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "white", lineHeight: 1, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
              {current.location}
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "rgba(255,255,255,0.7)", marginTop: "3px", textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
              {current.tagline}
            </p>
          </div>

          {/* Slide dots */}
          <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: slide === i ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "999px",
                  border: "none",
                  padding: 0,
                  backgroundColor: slide === i ? "white" : "rgba(255,255,255,0.35)",
                  cursor: "pointer",
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>
          {/* Counter */}
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.55)", marginTop: "2px", textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}>
            {String(slide + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
          </span>
        </div>

        {/* ══════ SEARCH BAR ══════ */}
        <div className="hero-search-section" style={{
          position: "absolute",
          bottom: "48px",
          left: "64px",
          right: "64px",
          zIndex: 20,
          maxWidth: "1000px",
          animation: "heroSearchEnter 0.7s ease both 0.8s",
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "18px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)",
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr 1px 1fr auto",
            alignItems: "center",
          }}>
            {/* Destination */}
            <div style={{ padding: "16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <MapPin size={12} color="#B85C38" />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>Destination</span>
              </div>
              <select
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                  color: form.destination ? "#1A1A1A" : "#9CA3AF",
                  border: "none", background: "none", outline: "none", width: "100%",
                  cursor: "pointer", padding: 0,
                }}
              >
                <option value="">Where to go?</option>
                {destinations.map((d) => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            <div style={{ height: "36px", backgroundColor: "#E8E4DC" }} />

            {/* Check In */}
            <div style={{ padding: "16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <Calendar size={12} color="#B85C38" />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>Check In</span>
              </div>
              <input
                type="date"
                value={form.checkIn}
                onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                  color: form.checkIn ? "#1A1A1A" : "#9CA3AF",
                  border: "none", background: "none", outline: "none", width: "100%", padding: 0,
                }}
              />
            </div>

            <div style={{ height: "36px", backgroundColor: "#E8E4DC" }} />

            {/* Check Out */}
            <div style={{ padding: "16px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <Calendar size={12} color="#B85C38" />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>Check Out</span>
              </div>
              <input
                type="date"
                value={form.checkOut}
                onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                style={{
                  fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600,
                  color: form.checkOut ? "#1A1A1A" : "#9CA3AF",
                  border: "none", background: "none", outline: "none", width: "100%", padding: 0,
                }}
              />
            </div>

            {/* Button */}
            <div style={{ padding: "8px 8px 8px 0" }}>
              <button
                className="hero-search-go"
                onClick={handleSearch}
                style={{
                  backgroundColor: "#B85C38",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "15px 26px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  transition: "background-color 0.2s",
                  boxShadow: "0 2px 8px rgba(184,92,56,0.30)",
                }}
              >
                <Search size={15} /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bleed — clean subtle edge, no washed-out band */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "80px",
          background: "linear-gradient(to top, rgba(238,242,247,0.95) 0%, rgba(238,242,247,0.4) 50%, transparent 100%)",
          zIndex: 5, pointerEvents: "none",
        }} />
        {/* Warm accent line at the very bottom of the hero */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: "3px",
          background: "linear-gradient(90deg, transparent 0%, #D4764E 20%, #B85C38 50%, #D4764E 80%, transparent 100%)",
          zIndex: 6, pointerEvents: "none",
          opacity: 0.5,
        }} />
      </section>

      {/* ── DESTINATION PILLS ── */}
      <div style={{ backgroundColor: "white", borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "13px 64px", display: "flex", alignItems: "center", gap: "10px", overflowX: "auto" }} className="no-scrollbar">
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF", whiteSpace: "nowrap", flexShrink: 0 }}>Popular:</span>
          {destinations.map((d) => (
            <a key={d.id} href={`/hotels?destination=${d.name}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#4B4B4B", whiteSpace: "nowrap", padding: "6px 16px", borderRadius: "999px", border: "1px solid #E8E4DC", backgroundColor: "#FAFAF8", textDecoration: "none", flexShrink: 0, transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B85C38"; e.currentTarget.style.color = "#B85C38"; e.currentTarget.style.backgroundColor = "#FDF5F2"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E4DC"; e.currentTarget.style.color = "#4B4B4B"; e.currentTarget.style.backgroundColor = "#FAFAF8"; }}
            >
              {d.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── DESTINATIONS GRID ── */}
      <section style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 64px" }}>
          <div ref={destRef} className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "10px" }}>Where to go</p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "36px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1 }}>Every corner of Nepal</h2>
            </div>
            <a href="/hotels" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", fontWeight: 500, textDecoration: "none" }}>
              View all <ArrowRight size={15} />
            </a>
          </div>

          {/* Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "14px", marginBottom: "14px" }}>
            <DestCard dest={destinations[0]} height="420px" large />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "14px" }}>
              <DestCard dest={destinations[1]} height="203px" />
              <DestCard dest={destinations[2]} height="203px" />
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "14px" }}>
            {destinations.slice(3, 6).map((dest) => (
              <DestCard key={dest.id} dest={dest} height="240px" />
            ))}
          </div>

          {/* Row 3 — Eastern Nepal */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "32px 0 14px" }}>
              <div style={{ width: "20px", height: "1.5px", backgroundColor: "#B85C38" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#B85C38" }}>Eastern Nepal — Hidden Gems</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "14px" }}>
              {destinations.slice(6, 9).map((dest) => (
                <DestCard key={dest.id} dest={dest} height="210px" />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {destinations.slice(9, 12).map((dest) => (
                <DestCard key={dest.id} dest={dest} height="210px" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY NEPALSTAY ── */}
      {/* <section style={{ backgroundColor: "#F2EDE8", padding: "80px 0" }}>
        <div ref={whyRef} className="reveal" style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "14px" }}>
                Why book with us
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "40px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "24px" }}>
                Built for travellers<br /><em style={{ fontWeight: 300 }}>who care about detail</em>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.78, marginBottom: "32px" }}>
                Every hotel on NepalStay is reviewed by our team on the ground.
                No filler listings — just places we'd send our own family to.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {[
                  { title: "Hand-verified listings", desc: "Every property physically visited and reviewed by our Nepal team." },
                  { title: "Local knowledge included", desc: "Tips and context from people who actually live here." },
                  { title: "No hidden fees", desc: "The price you see is the price you pay. Always." },
                ].map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#B85C38", marginTop: "6px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: "2px" }}>{f.title}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", lineHeight: 1.6 }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=700&q=85"
                alt="Kathmandu"
                style={{ width: "100%", height: "460px", objectFit: "cover", borderRadius: "16px" }}
              />
              <div style={{ position: "absolute", bottom: "-20px", left: "-20px", backgroundColor: "white", borderRadius: "14px", padding: "18px 22px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 700, color: "#1A1A1A" }}>50,000+</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", marginTop: "3px" }}>Happy guests since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}