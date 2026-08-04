import { useState } from "react";
import { Link } from "react-router-dom";
import {
  User, MapPin, Star, Calendar, Heart, Settings,
  LogOut, Bell, ChevronRight, Edit2, Search
} from "lucide-react";
import { hotels } from "../data/hotels";

const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };

const TABS = [
  { id: "bookings", label: "My Bookings", icon: <Calendar size={16} /> },
  { id: "saved", label: "Saved Hotels", icon: <Heart size={16} /> },
  { id: "profile", label: "Profile", icon: <User size={16} /> },
  { id: "settings", label: "Settings", icon: <Settings size={16} /> },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("bookings");
  const mockUser = { name: "Aayush Bista", email: "aayush@example.com", joined: "August 2025", avatar: "https://i.pravatar.cc/80?img=11" };

  return (
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", paddingTop: "80px" }}>

      {/* Header */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "32px 0" }}>
        <div style={WRAP}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ position: "relative" }}>
                <img src={mockUser.avatar} alt="avatar" style={{ width: "52px", height: "52px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E8E4DC" }} />
                <div style={{ position: "absolute", bottom: "1px", right: "1px", width: "11px", height: "11px", borderRadius: "50%", backgroundColor: "#22C55E", border: "2px solid white" }} />
              </div>
              <div>
                <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 400, color: "#1A1A1A", marginBottom: "3px" }}>
                  Welcome, {mockUser.name.split(" ")[0]}
                </h1>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Member since {mockUser.joined}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              <button style={{ padding: "9px 16px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
                <Bell size={14} /> Notifications
              </button>
              <Link to="/login" style={{ padding: "9px 16px", border: "1px solid #FEE2E2", borderRadius: "10px", backgroundColor: "white", display: "flex", alignItems: "center", gap: "6px", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#EF4444", textDecoration: "none" }}>
                <LogOut size={14} /> Sign out
              </Link>
            </div>
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
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#B85C38" : "#4B4B4B" }}>
                      {tab.label}
                    </span>
                  </div>
                  <ChevronRight size={14} color={activeTab === tab.id ? "#B85C38" : "#9CA3AF"} />
                </button>
              ))}
            </div>
          </aside>

          {/* Main */}
          <main>
            {activeTab === "bookings" && <BookingsTab />}
            {activeTab === "saved" && <SavedTab />}
            {activeTab === "profile" && <ProfileTab user={mockUser} />}
            {activeTab === "settings" && <SettingsTab />}
          </main>
        </div>
      </div>
    </div>
  );
}

function BookingsTab() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "28px", fontWeight: 300, color: "#1A1A1A" }}>My Bookings</h2>
        <Link to="/hotels" style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>
          + Book a hotel
        </Link>
      </div>

      {/* Empty state */}
      <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "72px 40px", textAlign: "center" }}>
        <div style={{ width: "64px", height: "64px", backgroundColor: "#FDF0EB", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Calendar size={28} color="#B85C38" />
        </div>
        <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "24px", fontWeight: 300, color: "#1A1A1A", marginBottom: "10px" }}>
          No bookings yet
        </h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "340px", margin: "0 auto 28px" }}>
          When you book a hotel through NepalStay, your reservations will appear here.
        </p>
        <Link
          to="/hotels"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#1A1A1A", color: "white", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B85C38")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A1A1A")}
        >
          <Search size={15} /> Browse hotels
        </Link>
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
        <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "24px", fontWeight: 300, color: "#1A1A1A", marginBottom: "10px" }}>
          No saved hotels yet
        </h3>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", lineHeight: 1.7, maxWidth: "340px", margin: "0 auto 28px" }}>
          Tap the heart icon on any hotel to save it here for later.
        </p>
        <Link
          to="/hotels"
          style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", backgroundColor: "#1A1A1A", color: "white", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}
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
  const [form, setForm] = useState({ name: user.name, email: user.email, phone: "+977 9812345678", nationality: "Nepali" });

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
          <img src={user.avatar} alt="avatar" style={{ width: "68px", height: "68px", borderRadius: "50%", objectFit: "cover", border: "2px solid #E8E4DC" }} />
          <div>
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 400, color: "#1A1A1A", marginBottom: "3px" }}>{form.name}</h3>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>Member since {user.joined}</p>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          {[
            { label: "Full name", field: "name" },
            { label: "Email address", field: "email" },
            { label: "Phone number", field: "phone" },
            { label: "Nationality", field: "nationality" },
          ].map((item) => (
            <div key={item.field}>
              <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "#9CA3AF", display: "block", marginBottom: "8px" }}>{item.label}</label>
              {editing ? (
                <input value={form[item.field]} onChange={(e) => setForm({ ...form, [item.field]: e.target.value })} style={{ width: "100%", padding: "11px 14px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: "1.5px solid #B85C38", borderRadius: "10px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box" }} />
              ) : (
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "15px", color: "#1A1A1A" }}>{form[item.field]}</p>
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
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {[
            { key: "email", label: "Email notifications", desc: "Booking confirmations and updates" },
            { key: "sms", label: "SMS alerts", desc: "Text messages for check-in reminders" },
            { key: "offers", label: "Special offers", desc: "Deals and promotions from NepalStay" },
          ].map((item, i) => (
            <div key={item.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: i < 2 ? "1px solid #E8E4DC" : "none" }}>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "#1A1A1A", marginBottom: "3px" }}>{item.label}</p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>{item.desc}</p>
              </div>
              <Toggle on={notifications[item.key]} onToggle={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key] })} />
            </div>
          ))}
        </div>
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