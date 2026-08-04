import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Search, ArrowRight, ChevronLeft, ChevronRight, Star, Shield, Clock } from "lucide-react";
import { destinations, stats } from "../../data/hotels";
import useReveal from "../../hooks/useReveal";

const OUTER = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const heroSlides = [
  { image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200&q=90", location: "Pokhara, Nepal", tagline: "Gateway to the Annapurnas" },
  { image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=1200&q=90", location: "Kathmandu, Nepal", tagline: "City of Temples" },
  { image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=90", location: "Nagarkot, Nepal", tagline: "Himalayan Panoramas" },
  { image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=90", location: "Chitwan, Nepal", tagline: "Jungle Safari Paradise" },
  { image: "https://images.unsplash.com/photo-1563514227147-6d2af38dce6f?w=1200&q=90", location: "Ilam, Nepal", tagline: "Nepal's Tea Capital" },
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

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", checkIn: "", checkOut: "" });
  const [slide, setSlide] = useState(0);
  const destRef = useReveal(0.05);
  const whyRef = useReveal(0.1);

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setSlide((s) => (s + 1) % heroSlides.length);

  const handleSearch = () => {
    const params = new URLSearchParams(form);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div style={{ backgroundColor: "#EEF2F7" }}>

      {/* ── HERO CARD ── */}
      <div style={{ ...OUTER, paddingTop: "84px", paddingBottom: "0" }}>
        <div style={{
          backgroundColor: "#DAE4EF",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "52% 48%",
          minHeight: "520px",
        }}>

          {/* Left — text */}
          <div style={{ padding: "64px 48px 148px 56px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 2 }}>

            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{ width: "28px", height: "2px", backgroundColor: "#B85C38", borderRadius: "2px" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38" }}>
                Nepal's Hotel Platform
              </span>
            </div>

            <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(38px, 4.5vw, 60px)", fontWeight: 700, lineHeight: 1.07, color: "#1A1A1A", letterSpacing: "-2px", marginBottom: "18px" }}>
              Find your{" "}
              <em style={{ color: "#B85C38", fontStyle: "italic" }}>perfect</em>
              <br />stay in Nepal
            </h1>

            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", lineHeight: 1.78, color: "#4B4B4B", maxWidth: "360px", marginBottom: "36px" }}>
              Handpicked hotels across 12 destinations — from Kathmandu's ancient temples to Ilam's misty tea gardens.
            </p>

            {/* Mini trust badges */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
              {[
                { icon: <Shield size={13} />, label: "Verified hotels" },
                { icon: <Clock size={13} />, label: "Instant confirmation" },
                { icon: <Star size={13} />, label: "4.8★ average" },
              ].map((t) => (
                <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ color: "#B85C38" }}>{t.icon}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{t.label}</span>
                </div>
              ))}
            </div>

            {/* Slide controls */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={prevSlide}
                style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1.5px solid #C0CDD8", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1A1A1A"; e.currentTarget.style.borderColor = "#1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.borderColor = "#C0CDD8"; }}
              >
                <ChevronLeft size={17} color="#1A1A1A" />
              </button>
              <button
                onClick={nextSlide}
                style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1.5px solid #C0CDD8", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1A1A1A"; e.currentTarget.style.borderColor = "#1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.borderColor = "#C0CDD8"; }}
              >
                <ChevronRight size={17} color="#1A1A1A" />
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginLeft: "6px" }}>
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    style={{ width: slide === i ? "22px" : "7px", height: "7px", borderRadius: "999px", border: "none", padding: 0, backgroundColor: slide === i ? "#B85C38" : "#B8C8D8", cursor: "pointer", transition: "all 0.3s" }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            {heroSlides.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt={s.location}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%", objectFit: "cover",
                  opacity: slide === i ? 1 : 0,
                  transition: "opacity 0.7s ease",
                }}
              />
            ))}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #DAE4EF 0%, transparent 18%)" }} />

            {/* Location pill */}
            <div style={{ position: "absolute", top: "24px", right: "24px", backgroundColor: "rgba(255,255,255,0.90)", backdropFilter: "blur(12px)", borderRadius: "10px", padding: "9px 14px", display: "flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 12px rgba(0,0,0,0.10)" }}>
              <MapPin size={13} color="#B85C38" />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#1A1A1A", lineHeight: 1 }}>{heroSlides[slide].location}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#6B6B6B", marginTop: "2px" }}>{heroSlides[slide].tagline}</p>
              </div>
            </div>

            {/* Slide counter */}
            <div style={{ position: "absolute", bottom: "24px", right: "24px", backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)", borderRadius: "8px", padding: "6px 12px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "white" }}>{slide + 1} / {heroSlides.length}</span>
            </div>
          </div>

          {/* ── SEARCH BAR floating at card bottom ── */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 48px", transform: "translateY(50%)", zIndex: 200 }}>
            <div style={{ backgroundColor: "white", borderRadius: "16px", boxShadow: "0 8px 48px rgba(0,0,0,0.13)", display: "grid", gridTemplateColumns: "1fr 1px 1fr 1px 1fr 1px auto", alignItems: "center", overflow: "hidden", border: "1px solid #E8E4DC" }}>

              {/* Destination */}
              <div style={{ padding: "18px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                  <MapPin size={13} color="#B85C38" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>Destination</span>
                </div>
                <select
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: form.destination ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%", cursor: "pointer", padding: 0 }}
                >
                  <option value="">Where to go?</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ height: "36px", backgroundColor: "#E8E4DC" }} />

              {/* Check In */}
              <div style={{ padding: "18px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                  <Calendar size={13} color="#B85C38" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>Check In</span>
                </div>
                <input
                  type="date"
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: form.checkIn ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%", padding: 0 }}
                />
              </div>

              <div style={{ height: "36px", backgroundColor: "#E8E4DC" }} />

              {/* Check Out */}
              <div style={{ padding: "18px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "5px" }}>
                  <Calendar size={13} color="#B85C38" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>Check Out</span>
                </div>
                <input
                  type="date"
                  value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: form.checkOut ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%", padding: 0 }}
                />
              </div>

              <div style={{ height: "36px", backgroundColor: "#E8E4DC" }} />

              {/* Search button */}
              <div style={{ padding: "10px" }}>
                <button
                  onClick={handleSearch}
                  style={{ backgroundColor: "#B85C38", color: "white", border: "none", borderRadius: "12px", padding: "15px 26px", cursor: "pointer", display: "flex", alignItems: "center", gap: "9px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700, whiteSpace: "nowrap", transition: "all 0.2s", boxShadow: "0 2px 8px rgba(184,92,56,0.35)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#9A4D2F"; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#B85C38"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <Search size={15} /> Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer for search bar */}
      <div style={{ height: "72px" }} />

      {/* ── STATS ── */}
      <div style={{ ...OUTER, paddingTop: "8px", paddingBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", marginTop: "4px" }}>{s.label}</p>
              </div>
              {i < stats.length - 1 && <div style={{ width: "1px", height: "32px", backgroundColor: "#E8E4DC", margin: "0 36px" }} />}
            </div>
          ))}
        </div>
      </div>

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
      <section style={{ backgroundColor: "#F2EDE8", padding: "80px 0" }}>
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
      </section>
    </div>
  );
}