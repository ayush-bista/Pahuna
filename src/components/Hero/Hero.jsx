import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { destinations, stats } from "../../data/hotels";

const OUTER = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const heroSlides = [
  {
    image: "https://i.pinimg.com/1200x/97/93/e5/9793e530eb5ab6dce404538049f6927e.jpg",
    location: "Pokhara, Nepal",
  },
  {
    image: "https://gotripzi.com/_astro/kathmandu-np-city.Db7RXDmf.webp",
    location: "Kathmandu, Nepal",
  },
  {
    image: "https://cdn.kimkim.com/files/a/content_articles/featured_photos/b04d6fe32a18d15c8f2ccf170a3e2b83c9af1c55/big-a9a20530ac77e5af349e6b67777a4549.jpg",
    location: "Bandipur, Nepal",
  },
  {
    image: "https://i.pinimg.com/736x/2a/b5/d0/2ab5d03cf53714d584d7de6cdb376f4f.jpg",
    location: "Chitwan, Nepal",
  },
];

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", checkIn: "", checkOut: "" });
  const [slide, setSlide] = useState(0);

  const prevSlide = () => setSlide((s) => (s - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => setSlide((s) => (s + 1) % heroSlides.length);

  const handleSearch = () => {
    const params = new URLSearchParams(form);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div style={{ backgroundColor: "#EEF2F7", minHeight: "100vh", paddingTop: "72px" }}>

      {/* HERO CARD */}
      <div style={{ ...OUTER, paddingTop: "36px", paddingBottom: "40px" }}>
        <div style={{
          backgroundColor: "#DDE6F0",
          borderRadius: "28px",
          overflow: "visible",
          position: "relative",
          minHeight: "500px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}>

          {/* Left — text */}
          <div style={{
            padding: "60px 48px 140px 56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 2,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
              {/* <div style={{ width: "24px", height: "2px", backgroundColor: "#B85C38", borderRadius: "2px" }} /> */}
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "#B85C38" }}>
                Explore Nepal
              </span>
            </div>

            <h1 style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(40px, 5vw, 62px)",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#1A1A1A",
              letterSpacing: "-1.5px",
              marginBottom: "20px",
            }}>
              Find your{" "}
              <span style={{ color: "#B85C38", fontStyle: "italic" }}>perfect</span>
              <br />
              stay in Nepal
            </h1>

            <p style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "#4B4B4B",
              maxWidth: "380px",
            }}>
              Pick your destination and we'll find you the most remarkable hotels,
              lodges, resorts and retreats across Nepal.
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "40px" }}>
              <button
                onClick={prevSlide}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: "1.5px solid #C8D5E3", backgroundColor: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1A1A1A"; e.currentTarget.style.borderColor = "#1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.borderColor = "#C8D5E3"; }}
              >
                <ChevronLeft size={18} color="#1A1A1A" />
              </button>
              <button
                onClick={nextSlide}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%",
                  border: "1.5px solid #C8D5E3", backgroundColor: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1A1A1A"; e.currentTarget.style.borderColor = "#1A1A1A"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; e.currentTarget.style.borderColor = "#C8D5E3"; }}
              >
                <ChevronRight size={18} color="#1A1A1A" />
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginLeft: "8px" }}>
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    style={{
                      width: slide === i ? "20px" : "7px",
                      height: "7px",
                      borderRadius: "999px",
                      border: "none",
                      padding: 0,
                      backgroundColor: slide === i ? "#B85C38" : "#B8C8D8",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <img
              key={slide}
              src={heroSlides[slide].image}
              alt={heroSlides[slide].location}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.5s ease" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #DDE6F0 0%, transparent 20%)" }} />

            <div style={{
              position: "absolute", top: "24px", right: "24px",
              backgroundColor: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}>
              <MapPin size={13} color="#B85C38" />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A1A1A" }}>
                {heroSlides[slide].location}
              </span>
            </div>
          </div>

          {/* SEARCH BAR floating at bottom */}
          <div style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "0 40px",
            transform: "translateY(50%)",
            zIndex: 110,
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "16px",
              boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
              display: "grid",
              gridTemplateColumns: "1fr 1px 1fr 1px 1fr 1px auto",
              alignItems: "center",
              overflow: "hidden",
            }}>
              {/* Destination */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <MapPin size={14} color="#B85C38" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>
                    Destination
                  </span>
                </div>
                <select
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: form.destination ? "#1A1A1A" : "#9CA3AF",
                    border: "none",
                    background: "none",
                    outline: "none",
                    width: "100%",
                    cursor: "pointer",
                    padding: 0,
                  }}
                >
                  <option value="">Where to go?</option>
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div style={{ height: "40px", backgroundColor: "#E8E4DC" }} />

              {/* Check In */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <Calendar size={14} color="#B85C38" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>
                    Check In
                  </span>
                </div>
                <input
                  type="date"
                  value={form.checkIn}
                  onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: form.checkIn ? "#1A1A1A" : "#9CA3AF",
                    border: "none",
                    background: "none",
                    outline: "none",
                    width: "100%",
                    padding: 0,
                  }}
                />
              </div>

              <div style={{ height: "40px", backgroundColor: "#E8E4DC" }} />

              {/* Check Out */}
              <div style={{ padding: "20px 24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <Calendar size={14} color="#B85C38" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38" }}>
                    Check Out
                  </span>
                </div>
                <input
                  type="date"
                  value={form.checkOut}
                  onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: form.checkOut ? "#1A1A1A" : "#9CA3AF",
                    border: "none",
                    background: "none",
                    outline: "none",
                    width: "100%",
                    padding: 0,
                  }}
                />
              </div>

              <div style={{ height: "40px", backgroundColor: "#E8E4DC" }} />

              {/* Search button */}
              <div style={{ padding: "12px" }}>
                <button
                  onClick={handleSearch}
                  style={{
                    backgroundColor: "#1A1A1A",
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "16px 28px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
                >
                  <Search size={16} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPACER for search bar overflow */}
      <div style={{ height: "64px" }} />

      {/* STATS ROW */}
      <div style={{ ...OUTER, paddingTop: "12px", paddingBottom: "48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center" }}>
              <div>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "30px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", marginTop: "4px" }}>{s.label}</p>
              </div>
              {i < stats.length - 1 && (
                <div style={{ width: "1px", height: "36px", backgroundColor: "#E8E4DC", margin: "0 40px" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DESTINATIONS PILLS */}
      <div style={{ backgroundColor: "white", borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "14px 64px", display: "flex", alignItems: "center", gap: "12px", overflowX: "auto" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF", whiteSpace: "nowrap", flexShrink: 0 }}>Popular:</span>
          {destinations.map((d) => (
            <a key={d.id} href={`/hotels?destination=${d.name}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#4B4B4B", whiteSpace: "nowrap", padding: "6px 16px", borderRadius: "999px", border: "1px solid #E8E4DC", backgroundColor: "#FAFAF8", textDecoration: "none", flexShrink: 0, transition: "all 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B85C38"; e.currentTarget.style.color = "#B85C38"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E4DC"; e.currentTarget.style.color = "#4B4B4B"; }}
            >
              {d.name}
            </a>
          ))}
        </div>
      </div>

      {/* DESTINATIONS GRID */}
      <section style={{ padding: "72px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 64px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "10px" }}>
                Where to go
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "36px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Every corner of Nepal
              </h2>
            </div>
            <a href="/hotels" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", fontWeight: 500, textDecoration: "none" }}>
              View all <ArrowRight size={15} />
            </a>
          </div>

          {/* Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <DestCard dest={destinations[0]} height="420px" large />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "16px" }}>
              <DestCard dest={destinations[1]} height="202px" />
              <DestCard dest={destinations[2]} height="202px" />
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
            <DestCard dest={destinations[3]} height="240px" />
            <DestCard dest={destinations[4]} height="240px" />
            <DestCard dest={destinations[5]} height="240px" />
          </div>

          {/* Row 3 — Eastern Nepal */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "20px", height: "1.5px", backgroundColor: "#B85C38" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#B85C38" }}>
                Eastern Nepal — Hidden Gems
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
              {destinations.slice(6, 9).map((dest) => (
                <DestCard key={dest.id} dest={dest} height="210px" />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {destinations.slice(9, 12).map((dest) => (
                <DestCard key={dest.id} dest={dest} height="210px" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY NEPALSTAY */}
      <section style={{ backgroundColor: "#F2EDE8", padding: "80px 0" }}>
        <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 64px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "14px" }}>
                Why book with us
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "40px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "24px" }}>
                Built for travellers<br />
                <em style={{ fontWeight: 300 }}>who care about detail</em>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.75, marginBottom: "32px" }}>
                Every hotel on NepalStay is reviewed by our team on the ground.
                No filler listings — just places we'd send our own family to.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { title: "Hand-verified listings", desc: "Every property is physically visited and reviewed by our Nepal team." },
                  { title: "Local knowledge, included", desc: "Tips, context and insider advice from people who actually live here." },
                  { title: "No hidden fees", desc: "The price you see is the price you pay. No surprises at checkout." },
                ].map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#B85C38", marginTop: "6px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: "3px" }}>{f.title}</p>
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

function DestCard({ dest, height = "260px", large = false }) {
  return (
    <a href={`/hotels?destination=${dest.name}`} style={{ position: "relative", overflow: "hidden", borderRadius: "14px", display: "block", height, cursor: "pointer", textDecoration: "none" }}>
      <img
        src={dest.image}
        alt={dest.name}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.04) 20%, rgba(10,10,10,0.68) 100%)" }} />

      <div style={{ position: "absolute", top: "14px", left: "14px", backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "4px 12px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, color: "white" }}>{dest.tag}</span>
      </div>

      <div style={{ position: "absolute", top: "14px", right: "14px", backgroundColor: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", borderRadius: "999px", padding: "4px 10px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>{dest.hotelCount} hotels</span>
      </div>

      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: large ? "24px" : "16px" }}>
        {large && (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", marginBottom: "4px" }}>{dest.tagline}</p>
        )}
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