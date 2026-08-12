import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Heart, Shield, Users, Award, Mountain } from "lucide-react";
import { Helmet } from "react-helmet-async";


const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const team = [
  {
    name: "Priya Shrestha",
    role: "Co-founder & CEO",
    location: "Kathmandu",
    image: "https://i.pravatar.cc/200?img=47",
    bio: "Born in Bhaktapur, Priya spent 10 years in hospitality before founding Pahuna to make Nepal's best hotels discoverable to the world.",
  },
  {
    name: "Rajan Tamang",
    role: "Co-founder & CTO",
    location: "Pokhara",
    image: "https://i.pravatar.cc/200?img=12",
    bio: "A trekking guide turned engineer, Rajan built the platform from scratch with a deep love for Nepal's landscapes and the people who call them home.",
  },
  {
    name: "Sita Rai",
    role: "Head of Hotel Partnerships",
    location: "Chitwan",
    image: "https://i.pravatar.cc/200?img=31",
    bio: "Sita personally visits every property on our platform. If she wouldn't stay there herself, it doesn't make the list.",
  },
  {
    name: "Bikash Limbu",
    role: "Head of Design",
    location: "Ilam",
    image: "https://i.pravatar.cc/200?img=15",
    bio: "Raised in the tea gardens of Ilam, Bikash brings an eye for beauty and detail that shapes every pixel of the Pahuna experience.",
  },
];

const values = [
  {
    icon: <Heart size={22} />,
    title: "Built with love for Nepal",
    desc: "Every decision we make starts with one question — does this help travellers fall in love with Nepal the way we have?",
  },
  {
    icon: <Shield size={22} />,
    title: "Honesty above all",
    desc: "No paid rankings, no hidden fees, no inflated ratings. We say what we mean and mean what we say.",
  },
  {
    icon: <Users size={22} />,
    title: "Community first",
    desc: "We partner directly with local hotels and lodges, ensuring money stays in the communities you visit.",
  },
  {
    icon: <Award size={22} />,
    title: "Quality over quantity",
    desc: "We'd rather list 85 extraordinary hotels than 850 mediocre ones. Every property earns its place.",
  },
];

const milestones = [
  { year: "2019", event: "Pahuna founded in Kathmandu with 12 hotels" },
  { year: "2020", event: "Survived the pandemic by pivoting to domestic tourism" },
  { year: "2021", event: "Expanded to 6 destinations and 50+ hotels" },
  { year: "2023", event: "Crossed 25,000 happy guests and launched mobile app" },
  { year: "2024", event: "Added eastern Nepal — Ilam, Bhedetar, Basantapur, Tinjure" },
  { year: "2025", event: "85+ hotels, 12 destinations, 50,000+ guests" },
];

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "#FAFAF8", paddingTop: "80px" }}>




<Helmet>
  <title>About Us — Pahuna</title>
  <meta name="description" content="Learn about Pahuna — built by Nepalis, for travellers who want to experience Nepal's finest hotels and hidden gems." />
</Helmet>





      {/* HERO */}
      <section style={{ backgroundColor: "#EEF2F7", padding: "80px 0 0" }}>
        <div style={WRAP}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", paddingBottom: "80px" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "16px" }}>
                Our story
              </p>
              <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(40px, 5vw, 60px)", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1.5px", lineHeight: 1.08, marginBottom: "24px" }}>
                We believe Nepal deserves<br />
                <em style={{ color: "#B85C38" }}>better storytelling</em>
              </h1>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#4B4B4B", lineHeight: 1.8, marginBottom: "16px" }}>
                Pahuna was born from a simple frustration — finding a truly great hotel in Nepal
                required knowing someone who knew someone. The best places were invisible online.
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#4B4B4B", lineHeight: 1.8, marginBottom: "36px" }}>
                So in 2019, a former trekking guide and a Bhaktapur-born hospitality veteran decided
                to fix that. We've been on the ground ever since.
              </p>
              <Link
                to="/hotels"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#1A1A1A", color: "white", padding: "14px 28px", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
              >
                Browse our hotels <ArrowRight size={16} />
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <img
                src="https://plus.unsplash.com/premium_photo-1691735665916-cf31006dffe3?q=80&w=2076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Kathmandu"
                style={{ width: "100%", height: "480px", objectFit: "cover", borderRadius: "20px" }}
              />
              <div style={{ position: "absolute", bottom: "-20px", right: "-20px", backgroundColor: "white", borderRadius: "16px", padding: "20px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 700, color: "#1A1A1A", marginBottom: "4px" }}>50,000+</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Happy guests since 2019</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ backgroundColor: "#1A1A1A", padding: "32px 0" }}>
          <div style={WRAP}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
              {[
                { value: "85+", label: "Verified hotels" },
                { value: "12", label: "Destinations" },
                { value: "50K+", label: "Happy guests" },
                { value: "4.8★", label: "Average rating" },
              ].map((s, i) => (
                <div key={s.label} style={{ textAlign: "center", padding: "0 24px", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none" }}>
                  <p style={{ fontFamily: "Fraunces, serif", fontSize: "36px", fontWeight: 700, color: "white", marginBottom: "6px" }}>{s.value}</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "80px 0" }}>
        <div style={WRAP}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "12px" }}>
              What we stand for
            </p>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "40px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px" }}>
              Our values
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {values.map((v) => (
              <div key={v.title} style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "28px" }}>
                <div style={{ width: "48px", height: "48px", backgroundColor: "#FDF0EB", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#B85C38", marginBottom: "18px" }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "19px", fontWeight: 400, color: "#1A1A1A", marginBottom: "10px", lineHeight: 1.3 }}>
                  {v.title}
                </h3>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ backgroundColor: "#F2EDE8", padding: "80px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "14px" }}>
                How we got here
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "40px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: "16px" }}>
                Six years of<br /><em>building Nepal's platform</em>
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.75 }}>
                From a shared Google Sheet of 12 hotels to Nepal's most trusted booking platform —
                here's the journey so far.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {milestones.map((m, i) => (
                <div key={m.year} style={{ display: "flex", gap: "24px", paddingBottom: i < milestones.length - 1 ? "28px" : "0" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#B85C38", flexShrink: 0, marginTop: "4px" }} />
                    {i < milestones.length - 1 && (
                      <div style={{ width: "1.5px", flex: 1, backgroundColor: "#D5C5B8", marginTop: "6px" }} />
                    )}
                  </div>
                  <div style={{ paddingBottom: i < milestones.length - 1 ? "0" : "0" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, color: "#B85C38", letterSpacing: "1px", marginBottom: "4px" }}>{m.year}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#4B4B4B", lineHeight: 1.6 }}>{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: "80px 0" }}>
        <div style={WRAP}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "12px" }}>
              The people behind it
            </p>
            <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "40px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px" }}>
              Meet the team
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {team.map((member) => (
              <div key={member.name} style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", overflow: "hidden" }}>
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "18px", fontWeight: 400, color: "#1A1A1A", marginBottom: "4px" }}>{member.name}</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#B85C38", marginBottom: "6px" }}>{member.role}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "12px" }}>
                    <MapPin size={12} color="#9CA3AF" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>{member.location}</span>
                  </div>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", lineHeight: 1.65 }}>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ backgroundColor: "#1A1A1A", padding: "72px 0" }}>
        <div style={{ ...WRAP, textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", backgroundColor: "#B85C38", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <Mountain size={22} color="white" />
          </div>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "42px", fontWeight: 300, color: "white", letterSpacing: "-1px", marginBottom: "16px" }}>
            Ready to explore Nepal?
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.55)", marginBottom: "36px", maxWidth: "440px", margin: "0 auto 36px" }}>
            Browse 85+ verified hotels across 12 of Nepal's most extraordinary destinations.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
            <Link to="/hotels" style={{ padding: "14px 32px", backgroundColor: "#B85C38", color: "white", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "8px" }}>
              Browse hotels <ArrowRight size={16} />
            </Link>
            <Link to="/contact" style={{ padding: "14px 32px", backgroundColor: "transparent", color: "white", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}