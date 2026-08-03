import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";



const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const contactDetails = [
  {
    icon: <MapPin size={20} />,
    label: "Visit us",
    lines: ["Thamel Marg, Kathmandu", "44600, Nepal"],
  },
  {
    icon: <Phone size={20} />,
    label: "Call us",
    lines: ["+977-1-4444-5555", "+977 98-0000-1111"],
  },
  {
    icon: <Mail size={20} />,
    label: "Email us",
    lines: ["hello@nepalstay.com", "support@nepalstay.com"],
  },
  {
    icon: <Clock size={20} />,
    label: "Working hours",
    lines: ["Sun – Fri: 9am – 6pm", "Saturday: 10am – 4pm"],
  },
];

const topics = [
  "General enquiry",
  "Booking support",
  "Hotel partnership",
  "Press & media",
  "Careers",
  "Other",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", topic: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.topic) e.topic = "Please select a topic";
    if (!form.message.trim() || form.message.length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div style={{ backgroundColor: "#FAFAF8", paddingTop: "80px" }}>


<Helmet>
  <title>Contact — NepalStay</title>
  <meta name="description" content="Get in touch with the NepalStay team for booking support, hotel partnerships, or general enquiries." />
</Helmet>



      {/* PAGE HEADER */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "56px 0" }}>
        <div style={{ ...WRAP, textAlign: "center" }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "12px" }}>
            Get in touch
          </p>
          <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1.5px", marginBottom: "16px" }}>
            We'd love to hear from you
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: "#6B6B6B", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
            Whether it's a booking question, a hotel you'd like to see listed, or just to say hello —
            our team is here.
          </p>
        </div>
      </div>

      {/* CONTACT CARDS */}
      <div style={{ padding: "56px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "64px" }}>
            {contactDetails.map((item) => (
              <div key={item.label} style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "24px" }}>
                <div style={{ width: "44px", height: "44px", backgroundColor: "#FDF0EB", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", color: "#B85C38", marginBottom: "16px" }}>
                  {item.icon}
                </div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "10px" }}>
                  {item.label}
                </p>
                {item.lines.map((line) => (
                  <p key={line} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A", lineHeight: 1.7 }}>{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* FORM + MAP */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", alignItems: "start" }}>

            {/* Form */}
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", padding: "40px" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#F0FDF4", border: "2px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <Check size={28} color="#22C55E" strokeWidth={2.5} />
                  </div>
                  <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A", marginBottom: "12px" }}>Message sent!</h3>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7 }}>
                    Thanks for reaching out. We'll get back to you within one business day.
                  </p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", topic: "", message: "" }); }}
                    style={{ marginTop: "24px", padding: "12px 24px", backgroundColor: "#1A1A1A", color: "white", border: "none", borderRadius: "10px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A", marginBottom: "28px" }}>
                    Send us a message
                  </h2>

                  {/* Name + Email */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>Your name</label>
                      <input
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Aayush Bista"
                        style={{ width: "100%", padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: errors.name ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box" }}
                        onFocus={(e) => { if (!errors.name) e.target.style.borderColor = "#B85C38"; }}
                        onBlur={(e) => { if (!errors.name) e.target.style.borderColor = "#E8E4DC"; }}
                      />
                      {errors.name && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>{errors.name}</p>}
                    </div>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>Email address</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="you@example.com"
                        style={{ width: "100%", padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: errors.email ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box" }}
                        onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "#B85C38"; }}
                        onBlur={(e) => { if (!errors.email) e.target.style.borderColor = "#E8E4DC"; }}
                      />
                      {errors.email && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>{errors.email}</p>}
                    </div>
                  </div>

                  {/* Topic */}
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>Topic</label>
                    <select
                      value={form.topic}
                      onChange={(e) => handleChange("topic", e.target.value)}
                      style={{ width: "100%", padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: errors.topic ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: form.topic ? "#1A1A1A" : "#9CA3AF", boxSizing: "border-box", cursor: "pointer" }}
                      onFocus={(e) => { if (!errors.topic) e.target.style.borderColor = "#B85C38"; }}
                      onBlur={(e) => { if (!errors.topic) e.target.style.borderColor = "#E8E4DC"; }}
                    >
                      <option value="">Select a topic...</option>
                      {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.topic && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>{errors.topic}</p>}
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: "28px" }}>
                    <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>Your message</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us how we can help..."
                      rows={5}
                      style={{ width: "100%", padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: errors.message ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
                      onFocus={(e) => { if (!errors.message) e.target.style.borderColor = "#B85C38"; }}
                      onBlur={(e) => { if (!errors.message) e.target.style.borderColor = "#E8E4DC"; }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "5px" }}>
                      {errors.message
                        ? <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444" }}>{errors.message}</p>
                        : <span />
                      }
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>{form.message.length} chars</p>
                    </div>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    style={{ width: "100%", padding: "15px", backgroundColor: loading ? "#9CA3AF" : "#1A1A1A", color: "white", border: "none", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background-color 0.2s" }}
                    onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#B85C38"; }}
                    onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1A1A1A"; }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                        Sending...
                      </>
                    ) : (
                      <><Send size={16} /> Send message</>
                    )}
                  </button>
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </>
              )}
            </div>

            {/* Right — map + FAQ */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* Map placeholder */}
              <div style={{ height: "280px", backgroundColor: "#E8E4DC", borderRadius: "16px", overflow: "hidden", position: "relative" }}>
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                  alt="map"
                  style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
                />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <div style={{ width: "44px", height: "44px", backgroundColor: "#B85C38", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 10px rgba(184,92,56,0.18)" }}>
                    <MapPin size={20} color="white" fill="white" />
                  </div>
                  <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "10px 16px", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A" }}>NepalStay HQ</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>Thamel, Kathmandu</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "28px" }}>
                <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 300, color: "#1A1A1A", marginBottom: "20px" }}>
                  Common questions
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {[
                    { q: "How quickly will you respond?", a: "Within one business day, usually faster." },
                    { q: "Can I modify my booking?", a: "Yes — contact us at least 48 hours before check-in." },
                    { q: "Do you list homestays?", a: "Yes, we have curated homestay options across Nepal." },
                    { q: "How do I list my hotel?", a: "Select 'Hotel partnership' above and we'll get in touch." },
                  ].map((faq, i) => (
                    <div key={faq.q} style={{ paddingBottom: i < 3 ? "16px" : "0", borderBottom: i < 3 ? "1px solid #E8E4DC" : "none" }}>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A", marginBottom: "5px" }}>{faq.q}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", lineHeight: 1.6 }}>{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}