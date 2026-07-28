import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Search, Star, ArrowRight } from "lucide-react";
import { destinations } from "../../data/hotels";

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", checkIn: "", checkOut: "", guests: 2 });

  const handleSearch = () => {
    const params = new URLSearchParams(form);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>

      {/* HERO SPLIT */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: "80px" }}>

        {/* Left — text side */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 64px 80px 80px" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px" }}>
            <div style={{ width: "32px", height: "1px", backgroundColor: "#B85C38" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38" }}>
              Nepal's Hotel Platform
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(44px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.08, color: "#1A1A1A", letterSpacing: "-1.5px", marginBottom: "24px" }}>
            Stay somewhere<br />
            <em style={{ fontStyle: "italic", color: "#B85C38" }}>worth remembering</em>
          </h1>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.7, color: "#6B6B6B", maxWidth: "420px", marginBottom: "40px" }}>
            Handpicked hotels across Nepal's most remarkable destinations —
            from Kathmandu's ancient lanes to Mustang's canyon walls.
          </p>

          {/* Stats */}
          <div style={{ display: "flex", gap: "24px", marginBottom: "48px" }}>
            {[{ n: "150+", l: "Hotels" }, { n: "6", l: "Destinations" }, { n: "4.8★", l: "Avg rating" }].map((s) => (
              <div key={s.l}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 600, color: "#1A1A1A", lineHeight: 1 }}>{s.n}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", marginTop: "4px" }}>{s.l}</p>
              </div>
            ))}
          </div>

          {/* Search card */}
          <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "12px", alignItems: "end" }}>

              {/* Destination */}
              <div>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6B6B", display: "block", marginBottom: "8px" }}>
                  Where
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <MapPin size={15} color="#B85C38" />
                  <select
                    value={form.destination}
                    onChange={(e) => setForm({ ...form, destination: e.target.value })}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", border: "none", background: "none", outline: "none", width: "100%", cursor: "pointer" }}
                  >
                    <option value="">Any destination</option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Check in */}
              <div>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6B6B", display: "block", marginBottom: "8px" }}>
                  Check in
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar size={15} color="#B85C38" />
                  <input
                    type="date"
                    value={form.checkIn}
                    onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", border: "none", background: "none", outline: "none", width: "100%" }}
                  />
                </div>
              </div>

              {/* Check out */}
              <div>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#6B6B6B", display: "block", marginBottom: "8px" }}>
                  Check out
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Calendar size={15} color="#B85C38" />
                  <input
                    type="date"
                    value={form.checkOut}
                    onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", border: "none", background: "none", outline: "none", width: "100%" }}
                  />
                </div>
              </div>

              {/* Search button */}
              <button
                onClick={handleSearch}
                style={{ backgroundColor: "#B85C38", color: "white", border: "none", borderRadius: "10px", padding: "12px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}
              >
                <Search size={15} />
                Search
              </button>
            </div>

            {/* Guests row */}
            <div style={{ borderTop: "1px solid #E8E4DC", marginTop: "16px", paddingTop: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Users size={14} color="#6B6B6B" />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Guests:</span>
              <button
                onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid #E8E4DC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "#1A1A1A", cursor: "pointer", backgroundColor: "white" }}
              >−</button>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1A1A", minWidth: "20px", textAlign: "center" }}>{form.guests}</span>
              <button
                onClick={() => setForm({ ...form, guests: Math.min(12, form.guests + 1) })}
                style={{ width: "24px", height: "24px", borderRadius: "50%", border: "1px solid #E8E4DC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", color: "#1A1A1A", cursor: "pointer", backgroundColor: "white" }}
              >+</button>
            </div>
          </div>
        </div>

        {/* Right — photo side */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=900&q=85"
            alt="Pokhara lake"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 60%, rgba(26,26,26,0.35) 100%)" }} />

          {/* Floating review card */}
          <div style={{ position: "absolute", bottom: "40px", left: "32px", backgroundColor: "white", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", maxWidth: "240px" }}>
            <div style={{ display: "flex", gap: "3px", marginBottom: "8px" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={13} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A", lineHeight: 1.5, marginBottom: "10px" }}>
              "The most peaceful place I've ever stayed. Woke up to Annapurna in the clouds."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", overflow: "hidden", backgroundColor: "#E8E4DC" }}>
                <img src="https://i.pravatar.cc/28?img=47" alt="user" style={{ width: "100%", height: "100%" }} />
              </div>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#1A1A1A" }}>Sarah K.</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B6B6B" }}>Stayed in Pokhara</p>
              </div>
            </div>
          </div>

          {/* Floating location badge */}
          <div style={{ position: "absolute", top: "32px", right: "32px", backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderRadius: "10px", padding: "10px 16px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B6B6B", marginBottom: "2px" }}>Currently viewing</p>
            <p style={{ fontFamily: "Fraunces, serif", fontSize: "16px", fontWeight: 600, color: "#1A1A1A" }}>Pokhara, Nepal</p>
          </div>
        </div>
      </section>

      {/* DESTINATIONS PILL STRIP */}
      <section style={{ backgroundColor: "white", borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC", padding: "20px 80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "12px", overflowX: "auto" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", whiteSpace: "nowrap", marginRight: "8px" }}>Popular:</span>
          {destinations.map((d) => (
            <a
              key={d.id}
              href={`/hotels?destination=${d.name}`}
              style={{
                fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500,
                color: "#1A1A1A", whiteSpace: "nowrap", padding: "6px 16px",
                borderRadius: "999px", border: "1px solid #E8E4DC",
                backgroundColor: "#FAFAF8", transition: "border-color 0.2s",
              }}
            >
              {d.name}
            </a>
          ))}
        </div>
      </section>

      {/* DESTINATIONS GRID */}
      <section style={{ padding: "80px 80px", maxWidth: "1360px", margin: "0 auto" }}>

        {/* Section header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "10px" }}>
              Where to go
            </p>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "40px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Every corner<br />of Nepal
            </h2>
          </div>
          <a
            href="/hotels"
            style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", fontWeight: 500 }}
          >
            View all hotels <ArrowRight size={15} />
          </a>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {destinations.map((dest, i) => (
            <DestCard key={dest.id} dest={dest} tall={i === 0 || i === 3} />
          ))}
        </div>
      </section>

      {/* WHY NEPALSTAY */}
      <section style={{ backgroundColor: "#F2EDE8", padding: "80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "14px" }}>
                Why book with us
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "42px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "28px" }}>
                Built for travellers<br /><em>who care about detail</em>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.75, marginBottom: "36px" }}>
                Every hotel on NepalStay is reviewed by our team on the ground.
                No filler listings, no inflated ratings — just places we'd send our own family to.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {[
                  { title: "Hand-verified listings", desc: "Every property is physically visited and reviewed." },
                  { title: "Local knowledge", desc: "Tips and context from people who actually live here." },
                  { title: "No hidden fees", desc: "The price you see is the price you pay. Always." },
                ].map((f) => (
                  <div key={f.title} style={{ display: "flex", gap: "16px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#B85C38", marginTop: "7px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: "4px" }}>{f.title}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=700&q=85"
                alt="Kathmandu"
                style={{ width: "100%", height: "480px", objectFit: "cover", borderRadius: "16px" }}
              />
              <div style={{
                position: "absolute", bottom: "-24px", left: "-24px",
                backgroundColor: "white", borderRadius: "14px", padding: "20px 24px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              }}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 600, color: "#1A1A1A" }}>50,000+</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", marginTop: "4px" }}>Happy guests since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DestCard({ dest, tall }) {
  return (
    <a
      href={`/hotels?destination=${dest.name}`}
      style={{
        position: "relative", overflow: "hidden", borderRadius: "14px",
        display: "block", height: tall ? "380px" : "280px",
        cursor: "pointer",
      }}
    >
      <img
        src={dest.image}
        alt={dest.name}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transition: "transform 0.5s ease",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 35%, rgba(10,10,10,0.72) 100%)",
      }} />

      {/* Tag */}
      <div style={{
        position: "absolute", top: "16px", left: "16px",
        backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: "999px", padding: "4px 12px",
      }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, color: "white" }}>{dest.tag}</span>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px" }}>
        <p style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 400, color: "white", marginBottom: "4px" }}>{dest.name}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>{dest.hotelCount} hotels</p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>from NPR {dest.startingPrice.toLocaleString()}</p>
        </div>
      </div>
    </a>
  );
}