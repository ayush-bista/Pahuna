import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Check, ChevronRight, MapPin, Calendar, Users, Star, User, Mail, Phone, CreditCard, Lock, Shield, ArrowLeft, Minus, Plus } from "lucide-react";
import { hotels } from "../data/hotels";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingsContext";

const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };
const STEPS = ["Guest details", "Payment", "Confirmation"];

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const hotel = hotels.find((h) => h.id === Number(id));

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ").slice(1).join(" ") || "",
    email: user?.email || "",
    phone: user?.phone || "",
    checkIn: "", checkOut: "", guests: 2,
    specialRequests: "",
    cardName: "", cardNumber: "", expiry: "", cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [bookingRef, setBookingRef] = useState("");

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
      // Save booking
      const ref = "NS" + Math.random().toString(36).substring(2, 8).toUpperCase();
      setBookingRef(ref);
      const booking = {
        id: ref,
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.image,
        destination: hotel.destination,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        nights,
        total,
        status: "upcoming",
        bookedAt: new Date().toISOString(),
      };
      addBooking(user.email, booking);
    }
    setErrors({});
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatCard = (val) => val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (val) => {
    const cleaned = val.replace(/\D/g, "").slice(0, 4);
    return cleaned.length >= 3 ? cleaned.slice(0, 2) + "/" + cleaned.slice(2) : cleaned;
  };

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "22px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => step === 0 ? navigate(`/hotels/${hotel.id}`) : setStep((s) => s - 1)} style={{ display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>
              <ArrowLeft size={16} /> Back
            </button>
            <div style={{ display: "flex", alignItems: "center" }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", backgroundColor: i < step ? "#22C55E" : i === step ? "#B85C38" : "#E8E4DC", display: "flex", alignItems: "center", justifyContent: "center", transition: "background-color 0.3s" }}>
                      {i < step ? <Check size={13} color="white" strokeWidth={3} /> : <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: i === step ? "white" : "#9CA3AF" }}>{i + 1}</span>}
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: i === step ? 600 : 400, color: i === step ? "#1A1A1A" : "#9CA3AF" }}>{s}</span>
                  </div>
                  {i < STEPS.length - 1 && <div style={{ width: "40px", height: "1px", backgroundColor: i < step ? "#22C55E" : "#E8E4DC", margin: "0 10px", transition: "background-color 0.3s" }} />}
                </div>
              ))}
            </div>
            <div style={{ width: "60px" }} />
          </div>
        </div>
      </div>

      <div style={{ padding: "40px 0 80px" }}>
        <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "1fr 360px", gap: "40px", alignItems: "start" }}>

          {/* Main */}
          <div>
            {step === 0 && <StepGuest form={form} errors={errors} onChange={handleChange} />}
            {step === 1 && <StepPayment form={form} errors={errors} onChange={handleChange} formatCard={formatCard} formatExpiry={formatExpiry} />}
            {step === 2 && <StepConfirmation hotel={hotel} form={form} bookingRef={bookingRef} navigate={navigate} />}

            {step < 2 && (
              <button
                onClick={handleNext}
                style={{ marginTop: "28px", width: "100%", padding: "16px", backgroundColor: "#1A1A1A", color: "white", border: "none", borderRadius: "14px", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background-color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
              >
                {step === 0 ? "Continue to payment" : "Confirm & pay"} <ChevronRight size={17} />
              </button>
            )}
          </div>

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", overflow: "hidden" }}>
              <div style={{ height: "170px", overflow: "hidden" }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "22px" }}>
                <div style={{ paddingBottom: "16px", borderBottom: "1px solid #E8E4DC", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                    <MapPin size={12} color="#9CA3AF" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{hotel.destination}, Nepal</span>
                  </div>
                  <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "18px", fontWeight: 400, color: "#1A1A1A", marginBottom: "5px" }}>{hotel.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", backgroundColor: "#1A1A1A", borderRadius: "5px", padding: "2px 7px" }}>
                      <Star size={10} fill="white" color="white" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "white" }}>{hotel.rating}</span>
                    </div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>{hotel.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>

                <div style={{ paddingBottom: "16px", borderBottom: "1px solid #E8E4DC", marginBottom: "16px" }}>
                  {[
                    { icon: <Calendar size={13} />, label: "Check in", value: form.checkIn || "Not set" },
                    { icon: <Calendar size={13} />, label: "Check out", value: form.checkOut || "Not set" },
                    { icon: <Users size={13} />, label: "Guests", value: `${form.guests} guest${form.guests > 1 ? "s" : ""}` },
                    { icon: <MapPin size={13} />, label: "Duration", value: `${nights} night${nights > 1 ? "s" : ""}` },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6B6B6B" }}>
                        {item.icon}
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{item.label}</span>
                      </div>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "#1A1A1A" }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ paddingBottom: "14px", borderBottom: "1px solid #E8E4DC", marginBottom: "14px" }}>
                  {[
                    { label: `NPR ${hotel.pricePerNight.toLocaleString()} × ${nights} nights`, value: `NPR ${subtotal.toLocaleString()}` },
                    { label: "VAT (13%)", value: `NPR ${tax.toLocaleString()}` },
                    { label: "Service fee", value: `NPR ${serviceFee.toLocaleString()}` },
                  ].map((row) => (
                    <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{row.label}</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#1A1A1A" }}>{row.value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A1A1A" }}>Total</span>
                  <span style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 700, color: "#1A1A1A" }}>NPR {total.toLocaleString()}</span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "#F0F9F0", borderRadius: "10px", padding: "10px 12px" }}>
                  <Shield size={13} color="#22C55E" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#166534" }}>SSL encrypted secure checkout</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function cardStyle(hasError) {
  return { backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", padding: "32px" };
}

function SectionTitle({ children }) {
  return <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-0.5px", marginBottom: "24px" }}>{children}</h2>;
}

function FieldLabel({ children }) {
  return <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>{children}</label>;
}

function Input({ value, onChange, placeholder, type = "text", icon: Icon, error, style: extraStyle = {} }) {
  return (
    <div>
      <div style={{ position: "relative" }}>
        {Icon && <Icon size={15} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} />}
        <input
          type={type} value={value} onChange={onChange} placeholder={placeholder}
          style={{ width: "100%", padding: Icon ? "12px 14px 12px 40px" : "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: error ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box", ...extraStyle }}
          onFocus={(e) => { if (!error) e.target.style.borderColor = "#B85C38"; }}
          onBlur={(e) => { if (!error) e.target.style.borderColor = "#E8E4DC"; }}
        />
      </div>
      {error && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>{error}</p>}
    </div>
  );
}

function StepGuest({ form, errors, onChange }) {
  return (
    <div style={cardStyle()}>
      <SectionTitle>Guest details</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div><FieldLabel>First name</FieldLabel><Input value={form.firstName} onChange={(e) => onChange("firstName", e.target.value)} placeholder="First name" icon={User} error={errors.firstName} /></div>
        <div><FieldLabel>Last name</FieldLabel><Input value={form.lastName} onChange={(e) => onChange("lastName", e.target.value)} placeholder="Last name" icon={User} error={errors.lastName} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div><FieldLabel>Email address</FieldLabel><Input type="email" value={form.email} onChange={(e) => onChange("email", e.target.value)} placeholder="you@example.com" icon={Mail} error={errors.email} /></div>
        <div><FieldLabel>Phone number</FieldLabel><Input type="tel" value={form.phone} onChange={(e) => onChange("phone", e.target.value)} placeholder="+977 98XXXXXXXX" icon={Phone} error={errors.phone} /></div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
        <div><FieldLabel>Check-in date</FieldLabel><Input type="date" value={form.checkIn} onChange={(e) => onChange("checkIn", e.target.value)} icon={Calendar} error={errors.checkIn} /></div>
        <div><FieldLabel>Check-out date</FieldLabel><Input type="date" value={form.checkOut} onChange={(e) => onChange("checkOut", e.target.value)} icon={Calendar} error={errors.checkOut} /></div>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <FieldLabel>Guests</FieldLabel>
        <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "12px 16px", border: "1.5px solid #E8E4DC", borderRadius: "12px", backgroundColor: "#FAFAF8", width: "fit-content" }}>
          <Users size={14} color="#9CA3AF" />
          <button onClick={() => onChange("guests", Math.max(1, form.guests - 1))} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1.5px solid #E8E4DC", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Minus size={12} /></button>
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", minWidth: "20px", textAlign: "center" }}>{form.guests}</span>
          <button onClick={() => onChange("guests", Math.min(10, form.guests + 1))} style={{ width: "26px", height: "26px", borderRadius: "50%", border: "1.5px solid #E8E4DC", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><Plus size={12} /></button>
        </div>
      </div>
      <div>
        <FieldLabel>Special requests <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span></FieldLabel>
        <textarea value={form.specialRequests} onChange={(e) => onChange("specialRequests", e.target.value)} placeholder="Late check-in, dietary requirements..." rows={3} style={{ width: "100%", padding: "12px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", resize: "vertical", boxSizing: "border-box" }}
          onFocus={(e) => (e.target.style.borderColor = "#B85C38")} onBlur={(e) => (e.target.style.borderColor = "#E8E4DC")} />
      </div>
    </div>
  );
}

function StepPayment({ form, errors, onChange, formatCard, formatExpiry }) {
  return (
    <div style={cardStyle()}>
      <SectionTitle>Payment details</SectionTitle>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px", padding: "12px 14px", backgroundColor: "#F0F9F0", borderRadius: "10px" }}>
        <Lock size={13} color="#22C55E" />
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#166534" }}>Your payment info is encrypted and secure</span>
      </div>
      <div style={{ marginBottom: "16px" }}><FieldLabel>Name on card</FieldLabel><Input value={form.cardName} onChange={(e) => onChange("cardName", e.target.value)} placeholder="As it appears on your card" icon={User} error={errors.cardName} /></div>
      <div style={{ marginBottom: "16px" }}><FieldLabel>Card number</FieldLabel><Input value={form.cardNumber} onChange={(e) => onChange("cardNumber", formatCard(e.target.value))} placeholder="1234 5678 9012 3456" icon={CreditCard} error={errors.cardNumber} /></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
        <div><FieldLabel>Expiry date</FieldLabel><Input value={form.expiry} onChange={(e) => onChange("expiry", formatExpiry(e.target.value))} placeholder="MM/YY" icon={Calendar} error={errors.expiry} /></div>
        <div><FieldLabel>CVV</FieldLabel><Input type="password" value={form.cvv} onChange={(e) => onChange("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))} placeholder="•••" icon={Lock} error={errors.cvv} /></div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        {["VISA", "Mastercard", "AMEX", "eSewa"].map((c) => (
          <div key={c} style={{ padding: "5px 12px", border: "1px solid #E8E4DC", borderRadius: "6px", backgroundColor: "#FAFAF8" }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 700, color: "#4B4B4B" }}>{c}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepConfirmation({ hotel, form, bookingRef, navigate }) {
  return (
    <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", padding: "56px 36px", textAlign: "center" }}>
      <div style={{ width: "68px", height: "68px", borderRadius: "50%", backgroundColor: "#F0FDF4", border: "2px solid #BBF7D0", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <Check size={30} color="#22C55E" strokeWidth={2.5} />
      </div>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#22C55E", marginBottom: "12px" }}>Booking confirmed</p>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "34px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-0.8px", marginBottom: "12px" }}>You're all set, {form.firstName}!</h2>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "420px", margin: "0 auto 28px" }}>
        Your booking at <strong>{hotel.name}</strong> has been confirmed. A confirmation email has been sent to <strong>{form.email}</strong>.
      </p>
      <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", backgroundColor: "#FDF0EB", border: "1px solid #F0C9B8", borderRadius: "12px", padding: "14px 24px", marginBottom: "32px" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Booking reference:</span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", fontWeight: 700, color: "#B85C38", letterSpacing: "2px" }}>{bookingRef}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        <button onClick={() => navigate("/dashboard")} style={{ padding: "13px 28px", backgroundColor: "#1A1A1A", color: "white", border: "none", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}>
          View my bookings
        </button>
        <button onClick={() => navigate("/hotels")} style={{ padding: "13px 28px", backgroundColor: "white", color: "#1A1A1A", border: "1.5px solid #E8E4DC", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B85C38")} onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E4DC")}>
          Browse more hotels
        </button>
      </div>
    </div>
  );
}