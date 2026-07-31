import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User, MapPin, Star, Calendar, Heart, Settings,
  LogOut, Bell, ChevronRight, Clock, Check, Edit2
} from "lucide-react";
import { hotels } from "../data/hotels";

const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const mockBookings = [
  { id: "NS7X2K9A", hotelId: 201, checkIn: "2025-09-14", checkOut: "2025-09-17", guests: 2, status: "upcoming", total: 34215 },
  { id: "NS4M1P3B", hotelId: 101, checkIn: "2025-07-02", checkOut: "2025-07-04", guests: 1, status: "completed", total: 42180 },
  { id: "NS9R5Q7C", hotelId: 501, checkIn: "2025-05-20", checkOut: "2025-05-22", guests: 3, status: "completed", total: 18720 },
];

const savedHotelIds = [102, 202, 301, 601];

const TABS = [
  { id: "bookings", label: "My Bookings", icon: <Calendar size={16} /> },
  { id: "saved", label: "Saved Hotels", icon: <Heart size={16} /> },
  { id: "profile", label: "Profile", icon: <User size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
];

const statusStyle = {
  upcoming: { bg: "#EFF6FF", color: "#1D4ED8", label: "Upcoming" },
  completed: { bg: "#F0FDF4", color: "#166534", label: "Completed" },
  cancelled: { bg: "#FEF2F2", color: "#991B1B", label: "Cancelled" },
};

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookings");

  const mockUser = { name: "Aayush Bista", email: "aayush@example.com", joined: "March 2024", avatar: "https://i.pravatar.cc/80?img=11" };

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "32px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ position: "relative" }}>
                <img src={mockUser.avatar} alt="avatar" style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E8E4DC" }} />
                <div style={{ position: "absolute", bottom: "1px", right: "1px", width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#22C55E", border: "2px solid white" }} />
              </div>
              <div>
                <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "24px", fontWeight: 400, color: "#1A1A1A", marginBottom: "3px" }}>
                  Welcome back, {mockUser.name.split(" ")[0]}
                </h1>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                  Member since {mockUser.joined}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ padding: "9px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                <Bell size={15} /> Notifications
              </button>
              <Link to="/login" style={{ padding: "9px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#EF4444", textDecoration: "none" }}>
                <LogOut size={15} /> Sign out
              </Link>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: "32px", marginTop: "24px" }}>
            {[
              { label: "Total bookings", value: mockBookings.length },
              { label: "Countries visited", value: "1 🇳🇵" },
              { label: "Nights stayed", value: "7" },
              { label: "Saved hotels", value: savedHotelIds.length },
            ].map((s) => (
              <div key={s.label}>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 600, color: "#1A1A1A", lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B", marginTop: "4px" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "40px 0 80px" }}>
        <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "220px 1fr", gap: "32px", alignItems: "start" }}>

          {/* Sidebar tabs */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", overflow: "hidden" }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: "10px", padding: "14px 18px",
                    backgroundColor: activeTab === tab.id ? "#FDF0EB" : "white",
                    border: "none", borderBottom: i < TABS.length - 1 ? "1px solid #E8E4DC" : "none",
                    cursor: "pointer", transition: "background-color 0.15s",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: activeTab === tab.id ? "#B85C38" : "#6B6B6B" }}>{tab.icon}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#B85C38" : "#4B4B4B" }}>
                      {tab.label}
                    </span>
                  </div>
                  <ChevronRight size={14} color={activeTab === tab.id ? "#B85C38" : "#9CA3AF"} />
                </button>
              ))}
            </div>
          </aside>

          {/* Main panel */}
          <main>
            {activeTab === "bookings" && <BookingsTab bookings={mockBookings} />}
            {activeTab === "saved" && <SavedTab ids={savedHotelIds} />}
            {activeTab === "profile" && <ProfileTab user={{ name: "Aayush Bista", email: "aayush@example.com", phone: "+977 9812345678", nationality: "Nepali", joined: "March 2024" }} />}
            {activeTab === "settings" && <SettingsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}

function BookingsTab({ bookings }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A" }}>My Bookings</h2>
        <Link to="/hotels" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>
          + Book a new hotel
        </Link>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {bookings.map((booking) => {
          const hotel = hotels.find((h) => h.id === booking.hotelId);
          if (!hotel) return null;
          const s = statusStyle[booking.status];
          const nights = Math.round((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));

          return (
            <div key={booking.id} style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", overflow: "hidden", display: "grid", gridTemplateColumns: "180px 1fr" }}>
              <div style={{ height: "100%", minHeight: "140px", overflow: "hidden" }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "5px" }}>
                      <MapPin size={13} color="#9CA3AF" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{hotel.destination}</span>
                    </div>
                    <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 400, color: "#1A1A1A" }}>{hotel.name}</h3>
                  </div>
                  <div style={{ backgroundColor: s.bg, color: s.color, padding: "4px 12px", borderRadius: "999px", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "24px", marginTop: "12px" }}>
                  {[
                    { icon: <Calendar size={13} />, text: `${booking.checkIn} → ${booking.checkOut}` },
                    { icon: <Clock size={13} />, text: `${nights} nights` },
                    { icon: <User size={13} />, text: `${booking.guests} guest${booking.guests > 1 ? "s" : ""}` },
                  ].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "5px", color: "#6B6B6B" }}>
                      {item.icon}
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px" }}>{item.text}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid #E8E4DC" }}>
                  <div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#9CA3AF", letterSpacing: "1px" }}>REF: </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, color: "#B85C38" }}>{booking.id}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span style={{ fontFamily: "Fraunces, serif", fontSize: "18px", fontWeight: 600, color: "#1A1A1A" }}>NPR {booking.total.toLocaleString()}</span>
                    <Link to={`/hotels/${hotel.id}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>
                      View hotel →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SavedTab({ ids }) {
  const saved = hotels.filter((h) => ids.includes(h.id));
  return (
    <div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A", marginBottom: "24px" }}>Saved Hotels</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {saved.map((hotel) => (
          <Link key={hotel.id} to={`/hotels/${hotel.id}`} style={{ textDecoration: "none" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "14px", overflow: "hidden", transition: "box-shadow 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", top: "10px", right: "10px", backgroundColor: "rgba(184,92,56,0.9)", borderRadius: "999px", padding: "3px 10px" }}>
                  <Heart size={12} fill="white" color="white" />
                </div>
              </div>
              <div style={{ padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "5px" }}>
                  <MapPin size={12} color="#9CA3AF" />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{hotel.destination}</span>
                </div>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "17px", fontWeight: 400, color: "#1A1A1A", marginBottom: "8px" }}>{hotel.name}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#1A1A1A", borderRadius: "5px", padding: "3px 8px" }}>
                    <Star size={11} fill="white" color="white" />
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "white" }}>{hotel.rating}</span>
                  </div>
                  <p style={{ fontFamily: "Fraunces, serif", fontSize: "16px", fontWeight: 600, color: "#1A1A1A" }}>
                    NPR {hotel.pricePerNight.toLocaleString()}<span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 400, color: "#9CA3AF" }}>/night</span>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({ user }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A" }}>My Profile</h2>
        <button
          onClick={() => setEditing(!editing)}
          style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B4B4B" }}
        >
          <Edit2 size={14} /> {editing ? "Cancel" : "Edit profile"}
        </button>
      </div>

      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px", paddingBottom: "32px", borderBottom: "1px solid #E8E4DC" }}>
          <img src="https://i.pravatar.cc/80?img=11" alt="avatar" style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E8E4DC" }} />
          <div>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 400, color: "#1A1A1A", marginBottom: "4px" }}>{form.name}</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Member since {form.joined}</p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[
            { label: "Full name", field: "name", value: form.name },
            { label: "Email address", field: "email", value: form.email },
            { label: "Phone number", field: "phone", value: form.phone },
            { label: "Nationality", field: "nationality", value: form.nationality },
          ].map((item) => (
            <div key={item.field}>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9CA3AF", display: "block", marginBottom: "8px" }}>
                {item.label}
              </label>
              {editing ? (
                <input
                  value={form[item.field]}
                  onChange={(e) => setForm({ ...form, [item.field]: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: "1.5px solid #B85C38", borderRadius: "10px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box" }}
                />
              ) : (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A" }}>{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {editing && (
          <button
            onClick={() => setEditing(false)}
            style={{ marginTop: "24px", padding: "12px 28px", backgroundColor: "#1A1A1A", color: "white", border: "none", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
          >
            Save changes
          </button>
        )}
      </div>
    </div>
  );
}

function SettingsTab() {
  const [notifications, setNotifications] = useState({ email: true, sms: false, offers: true });
  const [currency, setCurrency] = useState("NPR");

  const Toggle = ({ on, onToggle }) => (
    <div
      onClick={onToggle}
      style={{ width: "44px", height: "24px", borderRadius: "999px", backgroundColor: on ? "#B85C38" : "#E8E4DC", cursor: "pointer", position: "relative", transition: "background-color 0.2s", flexShrink: 0 }}
    >
      <div style={{ position: "absolute", top: "3px", left: on ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "white", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
    </div>
  );

  return (
    <div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A", marginBottom: "24px" }}>Settings</h2>

      {/* Notifications */}
      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "28px", marginBottom: "16px" }}>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", marginBottom: "20px" }}>Notifications</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { key: "email", label: "Email notifications", desc: "Booking confirmations and updates" },
            { key: "sms", label: "SMS alerts", desc: "Text messages for check-in reminders" },
            { key: "offers", label: "Special offers", desc: "Deals and promotions from NepalStay" },
          ].map((item) => (
            <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: "1px solid #E8E4DC" }}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1A1A", marginBottom: "3px" }}>{item.label}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>{item.desc}</p>
              </div>
              <Toggle on={notifications[item.key]} onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })} />
            </div>
          ))}
        </div>
      </div>

      {/* Currency */}
      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "28px", marginBottom: "16px" }}>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", marginBottom: "16px" }}>Currency</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {["NPR", "USD", "EUR", "INR"].map((c) => (
            <button
              key={c}
              onClick={() => setCurrency(c)}
              style={{ padding: "8px 20px", borderRadius: "999px", border: currency === c ? "1.5px solid #B85C38" : "1.5px solid #E8E4DC", backgroundColor: currency === c ? "#FDF0EB" : "white", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: currency === c ? 600 : 400, color: currency === c ? "#B85C38" : "#4B4B4B", cursor: "pointer" }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div style={{ backgroundColor: "white", border: "1px solid #FEE2E2", borderRadius: "16px", padding: "28px" }}>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#EF4444", marginBottom: "8px" }}>Danger zone</h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", marginBottom: "16px" }}>
          Once you delete your account, there is no going back.
        </p>
        <button style={{ padding: "10px 20px", backgroundColor: "white", color: "#EF4444", border: "1.5px solid #FCA5A5", borderRadius: "10px", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          Delete account
        </button>
      </div>
    </div>
  );
}