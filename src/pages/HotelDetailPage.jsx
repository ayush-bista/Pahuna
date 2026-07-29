import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Star, MapPin, Wifi, Waves, Coffee, Car, Dumbbell,
  Shield, Clock, ChevronLeft, ChevronRight, Check, Share2,
  Heart, Award, Users, Calendar, Minus, Plus
} from "lucide-react";
import { hotels } from "../data/hotels";

const WRAP = { maxWidth: "1200px", margin: "0 auto", padding: "0 48px" };

const amenityIcons = {
  "Free WiFi": <Wifi size={16} />,
  "Pool": <Waves size={16} />,
  "Spa": <Award size={16} />,
  "Restaurant": <Coffee size={16} />,
  "Fitness Center": <Dumbbell size={16} />,
  "Gym": <Dumbbell size={16} />,
  "Parking": <Car size={16} />,
  "Airport Transfer": <Car size={16} />,
};

const getAmenityIcon = (amenity) => {
  for (const key in amenityIcons) {
    if (amenity.toLowerCase().includes(key.toLowerCase())) return amenityIcons[key];
  }
  return <Check size={16} />;
};

// Fake extra images for gallery using unsplash
const galleryExtras = [
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=80",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=900&q=80",
  "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=900&q=80",
];

export default function HotelDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotels.find((h) => h.id === Number(id));

  const [activeImg, setActiveImg] = useState(0);
  const [guests, setGuests] = useState(2);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [saved, setSaved] = useState(false);

  if (!hotel) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#FAFAF8", paddingTop: "80px" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontFamily: "Fraunces, serif", fontSize: "32px", color: "#1A1A1A", marginBottom: "16px" }}>Hotel not found</p>
          <Link to="/hotels" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", textDecoration: "none" }}>
            ← Back to hotels
          </Link>
        </div>
      </div>
    );
  }

  const gallery = [hotel.image, ...galleryExtras].slice(0, 5);

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
    : 1;

  const total = hotel.pricePerNight * nights;

  const similar = hotels
    .filter((h) => h.destination === hotel.destination && h.id !== hotel.id)
    .slice(0, 3);

  const handleBook = () => navigate(`/booking/${hotel.id}`);

  return (
    <div style={{ backgroundColor: "#FAFAF8", paddingTop: "80px" }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "14px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link to="/" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", textDecoration: "none" }}>Home</Link>
            <span style={{ color: "#E8E4DC" }}>/</span>
            <Link to="/hotels" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", textDecoration: "none" }}>Hotels</Link>
            <span style={{ color: "#E8E4DC" }}>/</span>
            <Link to={`/hotels?destination=${hotel.destination}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", textDecoration: "none" }}>{hotel.destination}</Link>
            <span style={{ color: "#E8E4DC" }}>/</span>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A", fontWeight: 500 }}>{hotel.name}</span>
          </div>
        </div>
      </div>

      {/* ── HOTEL HEADER ── */}
      <div style={{ padding: "32px 0 0" }}>
        <div style={WRAP}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
            <div>
              {hotel.badge && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "#FDF0EB", border: "1px solid #F0C9B8", borderRadius: "6px", padding: "4px 10px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#B85C38", letterSpacing: "0.5px" }}>{hotel.badge}</span>
                </div>
              )}
              <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-0.8px", marginBottom: "10px" }}>
                {hotel.name}
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <MapPin size={14} color="#B85C38" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>{hotel.destination}, Nepal</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={13} fill={i <= Math.round(hotel.rating) ? "#F59E0B" : "#E8E4DC"} color={i <= Math.round(hotel.rating) ? "#F59E0B" : "#E8E4DC"} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}>{hotel.rating}</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>({hotel.reviews.toLocaleString()} reviews)</span>
                </div>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#4A6741", backgroundColor: "#EEF4EC", padding: "3px 10px", borderRadius: "999px" }}>
                  {hotel.category}
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
              <button
                onClick={() => setSaved(!saved)}
                style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", color: saved ? "#B85C38" : "#6B6B6B" }}
              >
                <Heart size={15} fill={saved ? "#B85C38" : "none"} color={saved ? "#B85C38" : "#6B6B6B"} />
                {saved ? "Saved" : "Save"}
              </button>
              <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                <Share2 size={15} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── IMAGE GALLERY ── */}
      <div style={{ padding: "0 0 40px" }}>
        <div style={WRAP}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", borderRadius: "16px", overflow: "hidden", height: "480px" }}>

            {/* Main image */}
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img
                src={gallery[activeImg]}
                alt={hotel.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }}
              />
              {/* Nav arrows */}
              <button
                onClick={() => setActiveImg((p) => (p - 1 + gallery.length) % gallery.length)}
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
              >
                <ChevronLeft size={18} color="#1A1A1A" />
              </button>
              <button
                onClick={() => setActiveImg((p) => (p + 1) % gallery.length)}
                style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
              >
                <ChevronRight size={18} color="#1A1A1A" />
              </button>
            </div>

            {/* Thumbnail grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "8px" }}>
              {gallery.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(i + 1)}
                  style={{ position: "relative", overflow: "hidden", cursor: "pointer" }}
                >
                  <img
                    src={img}
                    alt={`${hotel.name} ${i + 2}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", opacity: activeImg === i + 1 ? 0.75 : 1 }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  {i === 3 && (
                    <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "white" }}>+{gallery.length - 5} photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail dots */}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginTop: "12px" }}>
            {gallery.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{ width: activeImg === i ? "24px" : "8px", height: "8px", borderRadius: "999px", backgroundColor: activeImg === i ? "#B85C38" : "#E8E4DC", border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT + SIDEBAR ── */}
      <div style={{ padding: "0 0 80px" }}>
        <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "1fr 360px", gap: "48px", alignItems: "start" }}>

          {/* ── LEFT CONTENT ── */}
          <div>

            {/* Description */}
            <section style={{ marginBottom: "40px", paddingBottom: "40px", borderBottom: "1px solid #E8E4DC" }}>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 400, color: "#1A1A1A", marginBottom: "16px" }}>
                About this property
              </h2>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#4B4B4B", lineHeight: 1.8 }}>
                {hotel.description}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#4B4B4B", lineHeight: 1.8, marginTop: "16px" }}>
                Located in {hotel.destination}, this {hotel.category.toLowerCase()} property offers an exceptional experience for travellers seeking comfort and authenticity in Nepal.
                Whether you are here to explore local culture, embark on a trek, or simply unwind — {hotel.name} provides the perfect base.
              </p>
            </section>

            {/* Amenities */}
            <section style={{ marginBottom: "40px", paddingBottom: "40px", borderBottom: "1px solid #E8E4DC" }}>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 400, color: "#1A1A1A", marginBottom: "20px" }}>
                What's included
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {hotel.amenities.map((a) => (
                  <div key={a} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "10px" }}>
                    <span style={{ color: "#B85C38", flexShrink: 0 }}>{getAmenityIcon(a)}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A", fontWeight: 500 }}>{a}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location */}
            <section style={{ marginBottom: "40px", paddingBottom: "40px", borderBottom: "1px solid #E8E4DC" }}>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 400, color: "#1A1A1A", marginBottom: "16px" }}>
                Location
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <MapPin size={15} color="#B85C38" />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>{hotel.destination}, Nepal</span>
              </div>
              {/* Map placeholder */}
              <div style={{ width: "100%", height: "280px", backgroundColor: "#E8E4DC", borderRadius: "14px", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.5 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <div style={{ width: "40px", height: "40px", backgroundColor: "#B85C38", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 8px rgba(184,92,56,0.2)" }}>
                    <MapPin size={18} color="white" fill="white" />
                  </div>
                  <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "8px 14px", boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A" }}>{hotel.name}</p>
                    <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B6B6B" }}>{hotel.destination}, Nepal</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Policies */}
            <section style={{ marginBottom: "40px" }}>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 400, color: "#1A1A1A", marginBottom: "20px" }}>
                Policies
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { icon: <Clock size={16} />, label: "Check-in", value: "2:00 PM onwards" },
                  { icon: <Clock size={16} />, label: "Check-out", value: "Before 12:00 PM" },
                  { icon: <Shield size={16} />, label: "Cancellation", value: "Free up to 48 hrs before" },
                  { icon: <Users size={16} />, label: "Children", value: "Welcome, all ages" },
                ].map((p) => (
                  <div key={p.label} style={{ display: "flex", gap: "14px", padding: "16px", backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "10px" }}>
                    <span style={{ color: "#B85C38", flexShrink: 0, marginTop: "2px" }}>{p.icon}</span>
                    <div>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#6B6B6B", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>{p.label}</p>
                      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#1A1A1A" }}>{p.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── BOOKING SIDEBAR ── */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "20px", overflow: "hidden", boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>

              {/* Price header */}
              <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid #E8E4DC" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontFamily: "Fraunces, serif", fontSize: "32px", fontWeight: 600, color: "#1A1A1A" }}>
                    NPR {hotel.pricePerNight.toLocaleString()}
                  </span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>/ night</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "6px" }}>
                  <div style={{ display: "flex", gap: "2px" }}>
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} size={12} fill={i <= Math.round(hotel.rating) ? "#F59E0B" : "#E8E4DC"} color={i <= Math.round(hotel.rating) ? "#F59E0B" : "#E8E4DC"} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>{hotel.rating} · {hotel.reviews.toLocaleString()} reviews</span>
                </div>
              </div>

              {/* Booking form */}
              <div style={{ padding: "20px 24px" }}>

                {/* Dates */}
                <div style={{ border: "1px solid #E8E4DC", borderRadius: "12px", overflow: "hidden", marginBottom: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                    <div style={{ padding: "12px 14px", borderRight: "1px solid #E8E4DC" }}>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38", display: "block", marginBottom: "5px" }}>Check in</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={13} color="#9CA3AF" />
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: checkIn ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%" }}
                        />
                      </div>
                    </div>
                    <div style={{ padding: "12px 14px" }}>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38", display: "block", marginBottom: "5px" }}>Check out</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Calendar size={13} color="#9CA3AF" />
                        <input
                          type="date"
                          value={checkOut}
                          onChange={(e) => setCheckOut(e.target.value)}
                          style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: checkOut ? "#1A1A1A" : "#9CA3AF", border: "none", background: "none", outline: "none", width: "100%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Guests */}
                  <div style={{ borderTop: "1px solid #E8E4DC", padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <label style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "#B85C38", display: "block", marginBottom: "5px" }}>Guests</label>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Users size={13} color="#9CA3AF" />
                        <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A" }}>{guests} {guests === 1 ? "guest" : "guests"}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <button
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #E8E4DC", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", minWidth: "20px", textAlign: "center" }}>{guests}</span>
                      <button
                        onClick={() => setGuests(Math.min(10, guests + 1))}
                        style={{ width: "28px", height: "28px", borderRadius: "50%", border: "1.5px solid #E8E4DC", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Price breakdown */}
                {checkIn && checkOut && nights > 0 && (
                  <div style={{ backgroundColor: "#FAFAF8", borderRadius: "10px", padding: "14px 16px", marginBottom: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                        NPR {hotel.pricePerNight.toLocaleString()} × {nights} {nights === 1 ? "night" : "nights"}
                      </span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A" }}>
                        NPR {(hotel.pricePerNight * nights).toLocaleString()}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Service fee</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A" }}>NPR {Math.round(total * 0.05).toLocaleString()}</span>
                    </div>
                    <div style={{ borderTop: "1px solid #E8E4DC", marginTop: "10px", paddingTop: "10px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}>Total</span>
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, color: "#1A1A1A" }}>
                        NPR {Math.round(total * 1.05).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Book button */}
                <button
                  onClick={handleBook}
                  style={{ width: "100%", backgroundColor: "#B85C38", color: "white", border: "none", borderRadius: "12px", padding: "15px", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, cursor: "pointer", marginBottom: "12px" }}
                >
                  Reserve now
                </button>

                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", textAlign: "center" }}>
                  You won't be charged yet
                </p>
              </div>

              {/* Trust signals */}
              <div style={{ borderTop: "1px solid #E8E4DC", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { icon: <Shield size={14} />, text: "Free cancellation up to 48 hours before" },
                  { icon: <Award size={14} />, text: "Verified hotel, reviewed by our team" },
                  { icon: <Clock size={14} />, text: "Instant booking confirmation" },
                ].map((t) => (
                  <div key={t.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <span style={{ color: "#4A6741", flexShrink: 0, marginTop: "1px" }}>{t.icon}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", lineHeight: 1.5 }}>{t.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Help card */}
            <div style={{ marginTop: "16px", backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "20px 24px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", marginBottom: "6px" }}>Need help booking?</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", lineHeight: 1.5, marginBottom: "14px" }}>Our Nepal team is available 7 days a week.</p>
              <a href="/contact" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#B85C38", textDecoration: "none" }}>
                Contact us →
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ── SIMILAR HOTELS ── */}
      {similar.length > 0 && (
        <section style={{ backgroundColor: "white", borderTop: "1px solid #E8E4DC", padding: "56px 0" }}>
          <div style={WRAP}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A" }}>
                More in {hotel.destination}
              </h2>
              <Link to={`/hotels?destination=${hotel.destination}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>
                View all →
              </Link>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
              {similar.map((h) => (
                <Link key={h.id} to={`/hotels/${h.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div
                    style={{ backgroundColor: "#FAFAF8", border: "1px solid #E8E4DC", borderRadius: "14px", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ height: "180px", overflow: "hidden" }}>
                      <img src={h.image} alt={h.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                      />
                    </div>
                    <div style={{ padding: "16px" }}>
                      <p style={{ fontFamily: "Fraunces, serif", fontSize: "18px", fontWeight: 400, color: "#1A1A1A", marginBottom: "6px" }}>{h.name}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Star size={12} fill="#F59E0B" color="#F59E0B" />
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A" }}>{h.rating}</span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>({h.reviews})</span>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontFamily: "Fraunces, serif", fontSize: "17px", fontWeight: 600, color: "#1A1A1A" }}>NPR {h.pricePerNight.toLocaleString()}</span>
                          <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#6B6B6B" }}>/night</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}