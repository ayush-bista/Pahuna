import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Search, Star, ArrowRight, Shield, Clock, Award } from "lucide-react";
import { destinations, stats } from "../../data/hotels";

const WRAP = { maxWidth: "1200px", margin: "0 auto", padding: "0 48px" };

export default function Hero() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", checkIn: "", checkOut: "", guests: 2 });
  const [activeTab, setActiveTab] = useState("hotels");

  const handleSearch = () => {
    const params = new URLSearchParams(form);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div style={{ backgroundColor: "#FAFAF8" }}>

      {/* ── HERO SPLIT ── */}
      <section style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "55% 45%", paddingTop: "80px" }}>

        {/* Left — text + search */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px 56px 72px 48px" }}>

          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "32px" }}>
            <div style={{ width: "28px", height: "1.5px", backgroundColor: "#B85C38" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38" }}>
              Nepal's Hotel Platform
            </span>
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(44px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.06, color: "#1A1A1A", letterSpacing: "-2px", marginBottom: "20px" }}>
            Find your stay<br />
            in <em style={{ fontStyle: "italic", color: "#B85C38" }}>beautiful Nepal</em>
          </h1>

          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", lineHeight: 1.75, color: "#6B6B6B", maxWidth: "400px", marginBottom: "40px" }}>
            From Kathmandu's ancient temples to Ilam's misty tea gardens —
            handpicked hotels across 12 destinations.
          </p>

          {/* Search card */}
          <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #E8E4DC" }}>
              {[{ id: "hotels", label: "Hotels" }, { id: "packages", label: "Packages" }, { id: "trekking", label: "Trekking" }].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  style={{ flex: 1, padding: "14px", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: activeTab === t.id ? 600 : 400, color: activeTab === t.id ? "#B85C38" : "#6B6B6B", backgroundColor: "transparent", border: "none", borderBottom: activeTab === t.id ? "2px solid #B85C38" : "2px solid transparent", cursor: "pointer", transition: "all 0.2s", marginBottom: "-1px" }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Form fields */}
            <div style={{ padding: "20px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0", border: "1px solid #E8E4DC", borderRadius: "12px", overflow: "hidden", marginBottom: "16px" }}>

                {/* Destination */}
                <div style={{ padding: "14px 16px", borderRight: "1px solid #E8E4DC" }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38", display: "block", marginBottom: "6px" }}>
                    Where
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <MapPin size={14} color="#9CA3AF" />
                    <select
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: form.destination ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%", cursor: "pointer" }}
                    >
                      <option value="">Any destination</option>
                      {destinations.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Check in */}
                <div style={{ padding: "14px 16px", borderRight: "1px solid #E8E4DC" }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38", display: "block", marginBottom: "6px" }}>
                    Check in
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Calendar size={14} color="#9CA3AF" />
                    <input
                      type="date"
                      value={form.checkIn}
                      onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: form.checkIn ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%" }}
                    />
                  </div>
                </div>

                {/* Check out */}
                <div style={{ padding: "14px 16px" }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38", display: "block", marginBottom: "6px" }}>
                    Check out
                  </label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Calendar size={14} color="#9CA3AF" />
                    <input
                      type="date"
                      value={form.checkOut}
                      onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
                      style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: form.checkOut ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%" }}
                    />
                  </div>
                </div>
              </div>

              {/* Guests + Search button row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Users size={15} color="#6B6B6B" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Guests</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <button onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #E8E4DC", background: "white", fontSize: "16px", color: "#1A1A1A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", minWidth: "24px", textAlign: "center" }}>{form.guests}</span>
                    <button onClick={() => setForm({ ...form, guests: Math.min(12, form.guests + 1) })} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #E8E4DC", background: "white", fontSize: "16px", color: "#1A1A1A", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                  </div>
                </div>
                <button
                  onClick={handleSearch}
                  style={{ backgroundColor: "#B85C38", color: "white", border: "none", borderRadius: "12px", padding: "13px 28px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600 }}
                >
                  <Search size={15} />
                  Search hotels
                </button>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ display: "flex", gap: "24px", marginTop: "28px" }}>
            {[
              { icon: <Shield size={14} />, label: "Secure booking" },
              { icon: <Clock size={14} />, label: "Instant confirmation" },
              { icon: <Award size={14} />, label: "Verified hotels" },
            ].map((t) => (
              <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#B85C38" }}>{t.icon}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo side */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1000&q=90"
            alt="Pokhara Annapurna"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(250,250,248,0.15) 0%, transparent 30%), linear-gradient(to bottom, transparent 55%, rgba(20,20,20,0.5) 100%)" }} />

          {/* Stats row at bottom */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {stats.map((s) => (
              <div key={s.label} style={{ backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "12px", padding: "14px 16px" }}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 600, color: "white", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.75)", marginTop: "4px" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Floating review card */}
          <div style={{ position: "absolute", top: "32px", right: "32px", backgroundColor: "white", borderRadius: "16px", padding: "16px 20px", boxShadow: "0 8px 32px rgba(0,0,0,0.14)", maxWidth: "220px" }}>
            <div style={{ display: "flex", gap: "2px", marginBottom: "8px" }}>
              {[1,2,3,4,5].map((i) => <Star key={i} size={12} fill="#F59E0B" color="#F59E0B" />)}
            </div>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A", lineHeight: 1.55, marginBottom: "10px" }}>
              "Woke up to Annapurna in the clouds. Nothing compares to Nepal."
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img src="https://i.pravatar.cc/28?img=47" alt="user" style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#1A1A1A" }}>Sarah K.</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#6B6B6B" }}>Pokhara · 2 nights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── POPULAR DESTINATION PILLS ── */}
      <div style={{ backgroundColor: "white", borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC" }}>
        <div style={{ ...WRAP, display: "flex", alignItems: "center", gap: "12px", padding: "16px 48px", overflowX: "auto" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF", whiteSpace: "nowrap", flexShrink: 0 }}>
            Popular:
          </span>
          {destinations.map((d) => (
            <a
              key={d.id}
              href={`/hotels?destination=${d.name}`}
              style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A1A1A", whiteSpace: "nowrap", padding: "6px 16px", borderRadius: "999px", border: "1px solid #E8E4DC", backgroundColor: "#FAFAF8", textDecoration: "none", flexShrink: 0, transition: "border-color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#B85C38"; e.currentTarget.style.color = "#B85C38"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#E8E4DC"; e.currentTarget.style.color = "#1A1A1A"; }}
            >
              {d.name}
            </a>
          ))}
        </div>
      </div>

      {/* ── DESTINATIONS GRID ── */}
      <section style={{ padding: "80px 0" }}>
        <div style={WRAP}>

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "10px" }}>
                Where to go
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "38px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Every corner<br />of Nepal
              </h2>
            </div>
            <a href="/hotels" style={{ display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", fontWeight: 500, textDecoration: "none" }}>
              View all hotels <ArrowRight size={15} />
            </a>
          </div>

          {/* Featured row — 1 large + 2 stacked */}
          <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <DestCard dest={destinations[0]} height="440px" large />
            <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "16px" }}>
              <DestCard dest={destinations[1]} height="212px" />
              <DestCard dest={destinations[2]} height="212px" />
            </div>
          </div>

          {/* Second row — 3 equal */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "16px" }}>
            <DestCard dest={destinations[3]} height="260px" />
            <DestCard dest={destinations[4]} height="260px" />
            <DestCard dest={destinations[5]} height="260px" />
          </div>

          {/* Third row — new eastern destinations, 4 equal */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "1px", backgroundColor: "#B85C38" }} />
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#B85C38" }}>
                Eastern Nepal — Hidden Gems
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
              {destinations.slice(6, 9).map((dest) => (
                <DestCard key={dest.id} dest={dest} height="220px" />
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginTop: "16px" }}>
              {destinations.slice(9, 12).map((dest) => (
                <DestCard key={dest.id} dest={dest} height="220px" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY PAHUNA ── */}
      <section style={{ backgroundColor: "#F2EDE8", padding: "80px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "14px" }}>
                Why book with us
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "40px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "24px" }}>
                Built for travellers<br /><em>who care about detail</em>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.75, marginBottom: "32px" }}>
                Every hotel on Pahuna is reviewed by our team on the ground.
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
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 600, color: "#1A1A1A" }}>50,000+</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", marginTop: "3px" }}>Happy guests since 2019</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DestCard({ dest, height = "280px", large = false }) {
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
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 20%, rgba(10,10,10,0.70) 100%)" }} />

      {/* Tag pill */}
      <div style={{ position: "absolute", top: "14px", left: "14px", backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "999px", padding: "4px 12px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 500, color: "white" }}>{dest.tag}</span>
      </div>

      {/* Hotel count */}
      <div style={{ position: "absolute", top: "14px", right: "14px", backgroundColor: "rgba(0,0,0,0.35)", backdropFilter: "blur(8px)", borderRadius: "999px", padding: "4px 10px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>{dest.hotelCount} hotels</span>
      </div>

      {/* Content */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: large ? "24px" : "18px" }}>
        {large && (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)", marginBottom: "4px", letterSpacing: "0.5px" }}>{dest.tagline}</p>
        )}
        <p style={{ fontFamily: "Fraunces, serif", fontSize: large ? "28px" : "20px", fontWeight: 400, color: "white", marginBottom: "6px" }}>{dest.name}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
            from <span style={{ color: "white", fontWeight: 500 }}>NPR {dest.startingPrice.toLocaleString()}</span>
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