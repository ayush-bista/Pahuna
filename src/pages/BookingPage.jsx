import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Check, ChevronRight, MapPin, Calendar, Users, Star,
  User, Mail, Phone, CreditCard, Lock, Shield, ArrowLeft
} from "lucide-react";
import { hotels } from "../data/hotels";

const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const STEPS = ["Guest details", "Review booking", "Confirmation"];

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === Number(id));

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    checkIn: "", checkOut: "", guests: 2,
    specialRequests: "",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState({});

  if (!hotel) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAFAF8", paddingTop: "80px" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: "28px", color: "#1A1A1A" }}>Hotel not found</p>
          <Link to="/hotels" style={{ color: "#B85C38", fontFamily: "Inter, sans-serif", fontSize: "14px" }}>← Back to hotels</Link>
        </div>
      </div>
    );
  }

  const nights = form.checkIn && form.checkOut
    ? Math.max(1, Math.round((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24)))
    : 1;

  const subtotal = hotel.pricePerNight * nights;
  const tax = Math.round(subtotal * 0.13);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + tax + serviceFee;

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.checkIn) e.checkIn = "Required";
    if (!form.checkOut) e.checkOut = "Required";
    return e;
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.cardName.trim()) e.cardName = "Required";
    if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Valid card number required";
    if (!form.expiry.trim()) e.expiry = "Required";
    if (!form.cvv.trim() || form.cvv.length < 3) e.cvv = "Required";
    return e;
  };

  const handleNext = () => {
    if (step === 0) {
      const e = validateStep0();
      if (Object.keys(e).length > 0) { setErrors(e); return; }
    }
    if (step === 1) {
      const e = validateStep1();
      if (Object.keys(e).length > 0) { setErrors(e); return; }
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCard = (val) => {
    return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
    return cleaned;
  };

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "24px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button
              onClick={() => step === 0 ? navigate(`/hotels/${hotel.id}`) : setStep((s) => s - 1)}
              style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            {/* Step indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%",
                      backgroundColor: i < step ? "#22C55E" : i === step ? "#B85C38" : "#E8E4DC",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "background-color 0.3s",
                    }}>
                      {i < step
                        ? <Check size={13} color="white" strokeWidth={3} />
                        : <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: i === step ? "white" : "#9CA3AF" }}>{i + 1}</span>
                      }
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: i === step ? 600 : 400, color: i === step ? "#1A1A1A" : "#9CA3AF" }}>
                      {s}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div style={{ width: "48px", height: "1px", backgroundColor: i < step ? "#22C55E" : "#E8E4DC", margin: "0 12px", transition: "background-color 0.3s" }} />
                  )}
                </div>
              ))}
            </div>

            <div style={{ width: "60px" }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 0 80px" }}>
        <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "1fr 380px", gap: "40px", alignItems: "start" }}>

          {/* Main content */}
          <div>
            {step === 0 && <StepGuest form={form} errors={errors} onChange={handleChange} />}
            {step === 1 && <StepPayment form={form} errors={errors} onChange={handleChange} formatCard={formatCard} formatExpiry={formatExpiry} />}
            {step === 2 && <StepConfirmation hotel={hotel} form={form} navigate={navigate} />}

            {step < 2 && (
              <button
                onClick={handleNext}
                style={{
                  marginTop: "32px", width: "100%", padding: "16px",
                  backgroundColor: "#1A1A1A", color: "white", border: "none",
                  borderRadius: "14px", fontFamily: "Inter, sans-serif",
                  fontSize: "15px", fontWeight: 600, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
              >
                {step === 0 ? "Continue to payment" : "Confirm booking"}
                <ChevronRight size={17} />
              </button>
            )}
          </div>

          {/* Booking summary sidebar */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", overflow: "hidden" }}>

              {/* Hotel image */}
              <div style={{ height: "180px", overflow: "hidden" }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              <div style={{ padding: "24px" }}>
                {/* Hotel info */}
                <div style={{ paddingBottom: "20px", borderBottom: "1px solid #E8E4DC", marginBottom: "20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "6px" }}>
                    <MapPin size={13} color="#9CA3AF" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{hotel.destination}, Nepal</span>
                  </div>
                  <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 400, color: "#1A1A1A", marginBottom: "6px" }}>{hotel.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", backgroundColor: "#1A1A1A", borderRadius: "5px", padding: "3px 8px" }}>
                      <Star size={11} fill="white" color="white" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "white" }}>{hotel.rating}</span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>{hotel.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>

                {/* Booking details */}
                <div style={{ paddingBottom: "20px", borderBottom: "1px solid #E8E4DC", marginBottom: "20px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "14px" }}>
                    Your stay
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { icon: <Calendar size={14} />, label: "Check in", value: form.checkIn || "Not selected" },
                      { icon: <Calendar size={14} />, label: "Check out", value: form.checkOut || "Not selected" },
                      { icon: <Users size={14} />, label: "Guests", value: `${form.guests} guest${form.guests > 1 ? "s" : ""}` },
                      { icon: <MapPin size={14} />, label: "Duration", value: `${nights} night${nights > 1 ? "s" : ""}` },
                    ].map((item) => (
                      <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6B6B6B" }}>
                          {item.icon}
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>{item.label}</span>
                        </div>
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A1A1A" }}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price breakdown */}
                <div style={{ paddingBottom: "16px", borderBottom: "1px solid #E8E4DC", marginBottom: "16px" }}>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", marginBottom: "14px" }}>
                    Price breakdown
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                        NPR {hotel.pricePerNight.toLocaleString()} × {nights} nights
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A" }}>
                        NPR {subtotal.toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>VAT (13%)</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A" }}>NPR {tax.toLocaleString()}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Service fee</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A" }}>NPR {serviceFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 700, color: "#1A1A1A" }}>Total</span>
                  <span style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 700, color: "#1A1A1A" }}>
                    NPR {total.toLocaleString()}
                  </span>
                </div>

                {/* Secure badge */}
                <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#F0F9F0", borderRadius: "10px", padding: "10px 14px" }}>
                  <Shield size={14} color="#22C55E" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#166534" }}>Secure checkout — SSL encrypted</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-0.5px", marginBottom: "24px" }}>
      {children}
    </h2>
  );
}

function FormRow({ children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      {children}
    </div>
  );
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={15} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />}
        {children}
      </div>
      {error && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>{error}</p>}
    </div>
  );
}

const inputStyle = (hasIcon, hasError) => ({
  width: "100%",
  padding: hasIcon ? "12px 14px 12px 40px" : "12px 14px",
  fontFamily: "Inter, sans-serif",
  fontSize: "14px",
  border: hasError ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC",
  borderRadius: "12px",
  outline: "none",
  backgroundColor: "#FAFAF8",
  color: "#1A1A1A",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
});

function StepGuest({ form, errors, onChange }) {
  return (
    <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", padding: "36px" }}>
      <SectionTitle>Guest details</SectionTitle>

      {/* Name row */}
      <div style={{ marginBottom: "20px" }}>
        <FormRow>
          <Field label="First name" icon={User} error={errors.firstName}>
            <input
              value={form.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              placeholder="Aayush"
              style={inputStyle(true, !!errors.firstName)}
              onFocus={(e) => { if (!errors.firstName) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.firstName) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
          <Field label="Last name" icon={User} error={errors.lastName}>
            <input
              value={form.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              placeholder="Bista"
              style={inputStyle(true, !!errors.lastName)}
              onFocus={(e) => { if (!errors.lastName) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.lastName) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
        </FormRow>
      </div>

      {/* Email + Phone */}
      <div style={{ marginBottom: "20px" }}>
        <FormRow>
          <Field label="Email address" icon={Mail} error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@example.com"
              style={inputStyle(true, !!errors.email)}
              onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.email) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
          <Field label="Phone number" icon={Phone} error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              placeholder="+977 98XXXXXXXX"
              style={inputStyle(true, !!errors.phone)}
              onFocus={(e) => { if (!errors.phone) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.phone) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
        </FormRow>
      </div>

      {/* Dates */}
      <div style={{ marginBottom: "20px" }}>
        <FormRow>
          <Field label="Check-in date" icon={Calendar} error={errors.checkIn}>
            <input
              type="date"
              value={form.checkIn}
              onChange={(e) => onChange("checkIn", e.target.value)}
              style={inputStyle(true, !!errors.checkIn)}
              onFocus={(e) => { if (!errors.checkIn) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.checkIn) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
          <Field label="Check-out date" icon={Calendar} error={errors.checkOut}>
            <input
              type="date"
              value={form.checkOut}
              onChange={(e) => onChange("checkOut", e.target.value)}
              style={inputStyle(true, !!errors.checkOut)}
              onFocus={(e) => { if (!errors.checkOut) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.checkOut) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
        </FormRow>
      </div>

      {/* Guests */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>
          Number of guests
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", padding: "12px 16px", border: "1.5px solid #E8E4DC", borderRadius: "12px", backgroundColor: "#FAFAF8", width: "fit-content" }}>
          <Users size={15} color="#9CA3AF" />
          <button onClick={() => onChange("guests", Math.max(1, form.guests - 1))} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #E8E4DC", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: "16px" }}>−</button>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", minWidth: "24px", textAlign: "center" }}>{form.guests}</span>
          <button onClick={() => onChange("guests", Math.min(10, form.guests + 1))} style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #E8E4DC", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif", fontSize: "16px" }}>+</button>
        </div>
      </div>

      {/* Special requests */}
      <div>
        <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>
          Special requests <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          value={form.specialRequests}
          onChange={(e) => onChange("specialRequests", e.target.value)}
          placeholder="Late check-in, dietary requirements, room preferences..."
          rows={3}
          style={{ width: "100%", padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", resize: "vertical", boxSizing: "border-box" }}
          onFocus={(e) => (e.target.style.borderColor = "#B85C38")}
          onBlur={(e) => (e.target.style.borderColor = "#E8E4DC")}
        />
      </div>
    </div>
  );
}

function StepPayment({ form, errors, onChange, formatCard, formatExpiry }) {
  return (
    <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", padding: "36px" }}>
      <SectionTitle>Payment details</SectionTitle>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "28px", padding: "12px 16px", backgroundColor: "#F0F9F0", borderRadius: "10px" }}>
        <Lock size={14} color="#22C55E" />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#166534" }}>
          Your payment info is encrypted and secure
        </span>
      </div>

      {/* Card name */}
      <div style={{ marginBottom: "20px" }}>
        <Field label="Name on card" icon={User} error={errors.cardName}>
          <input
            value={form.cardName}
            onChange={(e) => onChange("cardName", e.target.value)}
            placeholder="As it appears on your card"
            style={inputStyle(true, !!errors.cardName)}
            onFocus={(e) => { if (!errors.cardName) e.target.style.borderColor = "#B85C38"; }}
            onBlur={(e) => { if (!errors.cardName) e.target.style.borderColor = "#E8E4DC"; }}
          />
        </Field>
      </div>

      {/* Card number */}
      <div style={{ marginBottom: "20px" }}>
        <Field label="Card number" icon={CreditCard} error={errors.cardNumber}>
          <input
            value={form.cardNumber}
            onChange={(e) => onChange("cardNumber", formatCard(e.target.value))}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            style={inputStyle(true, !!errors.cardNumber)}
            onFocus={(e) => { if (!errors.cardNumber) e.target.style.borderColor = "#B85C38"; }}
            onBlur={(e) => { if (!errors.cardNumber) e.target.style.borderColor = "#E8E4DC"; }}
          />
        </Field>
      </div>

      {/* Expiry + CVV */}
      <div style={{ marginBottom: "28px" }}>
        <FormRow>
          <Field label="Expiry date" icon={Calendar} error={errors.expiry}>
            <input
              value={form.expiry}
              onChange={(e) => onChange("expiry", formatExpiry(e.target.value))}
              placeholder="MM/YY"
              maxLength={5}
              style={inputStyle(true, !!errors.expiry)}
              onFocus={(e) => { if (!errors.expiry) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.expiry) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
          <Field label="CVV" icon={Lock} error={errors.cvv}>
            <input
              value={form.cvv}
              onChange={(e) => onChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="•••"
              maxLength={4}
              type="password"
              style={inputStyle(true, !!errors.cvv)}
              onFocus={(e) => { if (!errors.cvv) e.target.style.borderColor = "#B85C38"; }}
              onBlur={(e) => { if (!errors.cvv) e.target.style.borderColor = "#E8E4DC"; }}
            />
          </Field>
        </FormRow>
      </div>

      {/* Accepted cards */}
      <div>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF", marginBottom: "10px" }}>Accepted cards</p>
        <div style={{ display: "flex", gap: "10px" }}>
          {["VISA", "MC", "AMEX", "eSewa"].map((card) => (
            <div key={card} style={{ padding: "6px 12px", border: "1px solid #E8E4DC", borderRadius: "6px", backgroundColor: "#FAFAF8" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, color: "#4B4B4B" }}>{card}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StepConfirmation({ hotel, form, navigate }) {
  const [confetti, setConfetti] = useState(false);

  useState(() => { setTimeout(() => setConfetti(true), 100); }, []);

  const bookingRef = "NS" + Math.random().toString(36).substring(2, 8).toUpperCase();

  return (
    <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", padding: "56px 36px", textAlign: "center" }}>
      <div style={{ width: "72px", height: "72px", borderRadius: "50%", backgroundColor: "#F0FDF4", border: "2px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
        <Check size={32} color="#22C55E" strokeWidth={2.5} />
      </div>

      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#22C55E", marginBottom: "12px" }}>
        Booking confirmed
      </p>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "36px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-0.8px", marginBottom: "12px" }}>
        You're all set, {form.firstName}!
      </h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "440px", margin: "0 auto 32px" }}>
        Your booking at <strong>{hotel.name}</strong> has been confirmed. A confirmation email has been sent to <strong>{form.email}</strong>.
      </p>

      {/* Booking reference */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", backgroundColor: "#FDF0EB", border: "1px solid #F0C9B8", borderRadius: "12px", padding: "14px 24px", marginBottom: "36px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Booking reference:</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 700, color: "#B85C38", letterSpacing: "2px" }}>{bookingRef}</span>
      </div>

      {/* Summary pills */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap", marginBottom: "40px" }}>
        {[
          { icon: <MapPin size={14} />, label: hotel.destination },
          { icon: <Calendar size={14} />, label: `${form.checkIn} → ${form.checkOut}` },
          { icon: <Users size={14} />, label: `${form.guests} guest${form.guests > 1 ? "s" : ""}` },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#FAFAF8", border: "1px solid #E8E4DC", borderRadius: "999px" }}>
            <span style={{ color: "#B85C38" }}>{item.icon}</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A" }}>{item.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{ padding: "13px 28px", backgroundColor: "#1A1A1A", color: "white", border: "none", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
        >
          View my bookings
        </button>
        <button
          onClick={() => navigate("/hotels")}
          style={{ padding: "13px 28px", backgroundColor: "white", color: "#1A1A1A", border: "1.5px solid #E8E4DC", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B85C38")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E4DC")}
        >
          Browse more hotels
        </button>
      </div>
    </div>
  );
}