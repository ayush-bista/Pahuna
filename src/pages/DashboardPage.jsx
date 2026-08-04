import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, MapPin, Star, Calendar, Heart, Settings, LogOut, Bell, ChevronRight, Edit2, Search, Clock } from "lucide-react";
import { hotels } from "../data/hotels";
import { useAuth } from "../context/AuthContext";
import { useBookings } from "../context/BookingsContext";
import { useNavigate } from "react-router-dom";

const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

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
  const location = useLocation();
  const defaultTab = location.state?.tab || "bookings";
  const [activeTab, setActiveTab] = useState(defaultTab);
  const { user, logout } = useAuth();
  const { getBookings } = useBookings();
  const navigate = useNavigate();

  const bookings = getBookings(user?.email);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = user
    ? (user.name || user.email || "U").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "32px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#B85C38", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #E8E4DC" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", fontWeight: 700, color: "white" }}>{initials}</span>
                </div>
                <div style={{ position: "absolute", bottom: "1px", right: "1px", width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#22C55E", border: "2px solid white" }} />
              </div>
              <div>
                <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 400, color: "#1A1A1A", marginBottom: "3px" }}>
                  Welcome, {user?.name?.split(" ")[0] || user?.email?.split("@")[0] || "there"}
                </h1>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                  Member since {user?.joinedDate || "2025"}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ padding: "9px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                <Bell size={14} /> Notifications
              </button>
              <button onClick={handleLogout} style={{ padding: "9px 16px", border: "1px solid #FEE2E2", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#EF4444" }}>
                <LogOut size={14} /> Sign out
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div style={{ display: "flex", gap: "32px", marginTop: "20px" }}>
            {[
              { label: "Total bookings", value: bookings.length },
              { label: "Upcoming stays", value: bookings.filter((b) => b.status === "upcoming").length },
              { label: "Nights stayed", value: bookings.filter((b) => b.status === "completed").reduce((a, b) => a + (b.nights || 0), 0) },
              { label: "Destinations visited", value: [...new Set(bookings.map((b) => b.destination))].length },
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

          {/* Sidebar */}
          <aside style={{ position: "sticky", top: "96px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", overflow: "hidden" }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "14px 18px", backgroundColor: activeTab === tab.id ? "#FDF0EB" : "white", border: "none", borderBottom: i < TABS.length - 1 ? "1px solid #E8E4DC" : "none", cursor: "pointer", transition: "background-color 0.15s" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ color: activeTab === tab.id ? "#B85C38" : "#6B6B6B" }}>{tab.icon}</span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#B85C38" : "#4B4B4B" }}>{tab.label}</span>
                  </div>
                  <ChevronRight size={14} color={activeTab === tab.id ? "#B85C38" : "#9CA3AF"} />
                </button>
              ))}
            </div>
          </aside>

          {/* Content */}
          <main>
            {activeTab === "bookings" && <BookingsTab bookings={bookings} />}
            {activeTab === "saved" && <SavedTab />}
            {activeTab === "profile" && <ProfileTab user={user} />}
            {activeTab === "settings" && <SettingsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}

function BookingsTab({ bookings }) {
  if (bookings.length === 0) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A" }}>My Bookings</h2>
          <Link to="/hotels" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>+ Book a hotel</Link>
        </div>
        <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "72px 40px", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", backgroundColor: "#FDF0EB", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Calendar size={28} color="#B85C38" />
          </div>
          <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "24px", fontWeight: 300, color: "#1A1A1A", marginBottom: "10px" }}>No bookings yet</h3>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "320px", margin: "0 auto 28px" }}>
            When you book a hotel through NepalStay, your reservations will appear here.
          </p>
          <Link to="/hotels" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#1A1A1A", color: "white", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
          >
            <Search size={15} /> Browse hotels
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A" }}>My Bookings</h2>
        <Link to="/hotels" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>+ Book another hotel</Link>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {bookings.map((booking) => {
          const hotel = hotels.find((h) => h.id === booking.hotelId);
          const s = statusStyle[booking.status] || statusStyle.upcoming;
          return (
            <div key={booking.id} style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", overflow: "hidden", display: "grid", gridTemplateColumns: "160px 1fr" }}>
              <div style={{ height: "100%", minHeight: "130px", overflow: "hidden" }}>
                <img src={booking.hotelImage || hotel?.image} alt={booking.hotelName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ padding: "18px 22px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                      <MapPin size={12} color="#9CA3AF" />
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{booking.destination}</span>
                    </div>
                    <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "18px", fontWeight: 400, color: "#1A1A1A" }}>{booking.hotelName}</h3>
                  </div>
                  <div style={{ backgroundColor: s.bg, color: s.color, padding: "4px 12px", borderRadius: "999px", fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
                  {[
                    { icon: <Calendar size={12} />, text: `${booking.checkIn} → ${booking.checkOut}` },
                    { icon: <Clock size={12} />, text: `${booking.nights} nights` },
                    { icon: <User size={12} />, text: `${booking.guests} guest${booking.guests > 1 ? "s" : ""}` },
                  ].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "5px", color: "#6B6B6B" }}>
                      {item.icon}
                      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px" }}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #E8E4DC" }}>
                  <div>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "10px", color: "#9CA3AF", letterSpacing: "1px" }}>REF: </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 700, color: "#B85C38" }}>{booking.id}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <span style={{ fontFamily: "Fraunces, serif", fontSize: "17px", fontWeight: 600, color: "#1A1A1A" }}>NPR {booking.total.toLocaleString()}</span>
                    {hotel && (
                      <Link to={`/hotels/${hotel.id}`} style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>
                        View hotel →
                      </Link>
                    )}
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

function SavedTab() {
  return (
    <div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A", marginBottom: "24px" }}>Saved Hotels</h2>
      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "72px 40px", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#FDF0EB", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Heart size={28} color="#B85C38" />
        </div>
        <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "24px", fontWeight: 300, color: "#1A1A1A", marginBottom: "10px" }}>No saved hotels yet</h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "320px", margin: "0 auto 28px" }}>
          Tap the heart icon on any hotel to save it here for later.
        </p>
        <Link to="/hotels" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#1A1A1A", color: "white", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
        >
          <Search size={15} /> Discover hotels
        </Link>
      </div>
    </div>
  );
}

function ProfileTab({ user }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    nationality: user?.nationality || "",
  });

  const initials = (user?.name || user?.email || "U").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A" }}>My Profile</h2>
        <button onClick={() => setEditing(!editing)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#4B4B4B" }}>
          <Edit2 size={14} /> {editing ? "Cancel" : "Edit profile"}
        </button>
      </div>
      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "32px", paddingBottom: "32px", borderBottom: "1px solid #E8E4DC" }}>
          <div style={{ width: "68px", height: "68px", borderRadius: "50%", backgroundColor: "#B85C38", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "24px", fontWeight: 700, color: "white" }}>{initials}</span>
          </div>
          <div>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 400, color: "#1A1A1A", marginBottom: "3px" }}>{form.name || "Your Name"}</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Member since {user?.joinedDate || "2025"}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[
            { label: "Full name", field: "name", placeholder: "Your full name" },
            { label: "Email address", field: "email", placeholder: "you@example.com" },
            { label: "Phone number", field: "phone", placeholder: "+977 98XXXXXXXX" },
            { label: "Nationality", field: "nationality", placeholder: "e.g. Nepali" },
          ].map((item) => (
            <div key={item.field}>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9CA3AF", display: "block", marginBottom: "8px" }}>{item.label}</label>
              {editing ? (
                <input value={form[item.field]} onChange={(e) => setForm({ ...form, [item.field]: e.target.value })} placeholder={item.placeholder} style={{ width: "100%", padding: "11px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: "1.5px solid #B85C38", borderRadius: "10px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box" }} />
              ) : (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: form[item.field] ? "#1A1A1A" : "#C4C4C4" }}>{form[item.field] || item.placeholder}</p>
              )}
            </div>
          ))}
        </div>
        {editing && (
          <button onClick={() => setEditing(false)} style={{ marginTop: "24px", padding: "12px 28px", backgroundColor: "#1A1A1A", color: "white", border: "none", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, cursor: "pointer" }}
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
    <div onClick={onToggle} style={{ width: "44px", height: "24px", borderRadius: "999px", backgroundColor: on ? "#B85C38" : "#E8E4DC", cursor: "pointer", position: "relative", transition: "background-color 0.2s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: "3px", left: on ? "23px" : "3px", width: "18px", height: "18px", borderRadius: "50%", backgroundColor: "white", transition: "left 0.2s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
    </div>
  );

  return (
    <div>
      <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A", marginBottom: "24px" }}>Settings</h2>
      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "28px", marginBottom: "16px" }}>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", marginBottom: "20px" }}>Notifications</h3>
        {[
          { key: "email", label: "Email notifications", desc: "Booking confirmations and updates" },
          { key: "sms", label: "SMS alerts", desc: "Text messages for check-in reminders" },
          { key: "offers", label: "Special offers", desc: "Deals and promotions from NepalStay" },
        ].map((item, i) => (
          <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", marginBottom: i < 2 ? "16px" : 0, borderBottom: i < 2 ? "1px solid #E8E4DC" : "none" }}>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1A1A", marginBottom: "3px" }}>{item.label}</p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>{item.desc}</p>
            </div>
            <Toggle on={notifications[item.key]} onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })} />
          </div>
        ))}
      </div>
      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "28px", marginBottom: "16px" }}>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#1A1A1A", marginBottom: "16px" }}>Currency</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          {["NPR", "USD", "EUR", "INR"].map((c) => (
            <button key={c} onClick={() => setCurrency(c)} style={{ padding: "8px 20px", borderRadius: "999px", border: currency === c ? "1.5px solid #B85C38" : "1.5px solid #E8E4DC", backgroundColor: currency === c ? "#FDF0EB" : "white", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: currency === c ? 600 : 400, color: currency === c ? "#B85C38" : "#4B4B4B", cursor: "pointer" }}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{ backgroundColor: "white", border: "1px solid #FEE2E2", borderRadius: "16px", padding: "28px" }}>
        <h3 style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, color: "#EF4444", marginBottom: "8px" }}>Danger zone</h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", marginBottom: "16px" }}>Once you delete your account, there is no going back.</p>
        <button style={{ padding: "10px 20px", backgroundColor: "white", color: "#EF4444", border: "1.5px solid #FCA5A5", borderRadius: "10px", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>
          Delete account
        </button>
      </div>
    </div>
  );
}