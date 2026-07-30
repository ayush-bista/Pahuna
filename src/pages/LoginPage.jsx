import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Mountain } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Password must be at least 6 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate("/"); }, 1200);
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#EEF2F7", paddingTop: "72px", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
      <div style={{ width: "100%", maxWidth: "1100px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.12)" }}>

        {/* Left — image panel */}
        <div style={{ position: "relative", minHeight: "600px", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85"
            alt="Nepal hotel"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)" }} />

          <div style={{ position: "absolute", inset: 0, padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", backgroundColor: "#B85C38", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mountain size={18} color="white" />
              </div>
              <span style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 600, color: "white" }}>
                Nepal<span style={{ color: "#F0A882" }}>Stay</span>
              </span>
            </div>

            {/* Bottom text */}
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>
                Temple Tree Resort, Pokhara
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "36px", fontWeight: 300, color: "white", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
                Welcome back to<br />
                <em>beautiful Nepal</em>
              </h2>

              {/* Fake rating */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "20px", padding: "14px 18px", backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.2)", width: "fit-content" }}>
                <div>
                  <p style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 700, color: "white", lineHeight: 1 }}>4.8★</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "3px" }}>50,000+ happy guests</p>
                </div>
                <div style={{ width: "1px", height: "32px", backgroundColor: "rgba(255,255,255,0.2)" }} />
                <div>
                  <p style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 700, color: "white", lineHeight: 1 }}>12</p>
                  <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "rgba(255,255,255,0.65)", marginTop: "3px" }}>Destinations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — form panel */}
        <div style={{ backgroundColor: "white", padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>

          <div style={{ marginBottom: "36px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "10px" }}>
              Welcome back
            </p>
            <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "36px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-0.8px", marginBottom: "8px" }}>
              Sign in to your account
            </h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#B85C38", fontWeight: 600, textDecoration: "none" }}>
                Create one free
              </Link>
            </p>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>
              Email address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  width: "100%", padding: "13px 16px 13px 44px",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  border: errors.email ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC",
                  borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8",
                  color: "#1A1A1A", transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "#B85C38"; }}
                onBlur={(e) => { if (!errors.email) e.target.style.borderColor = "#E8E4DC"; }}
              />
            </div>
            {errors.email && (
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "6px" }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  width: "100%", padding: "13px 48px 13px 44px",
                  fontFamily: "Inter, sans-serif", fontSize: "14px",
                  border: errors.password ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC",
                  borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8",
                  color: "#1A1A1A", transition: "border-color 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { if (!errors.password) e.target.style.borderColor = "#B85C38"; }}
                onBlur={(e) => { if (!errors.password) e.target.style.borderColor = "#E8E4DC"; }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", alignItems: "center" }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "6px" }}>
                {errors.password}
              </p>
            )}
          </div>

          {/* Forgot password */}
          <div style={{ textAlign: "right", marginBottom: "28px" }}>
            <a href="#" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "15px",
              backgroundColor: loading ? "#9CA3AF" : "#1A1A1A",
              color: "white", border: "none", borderRadius: "12px",
              fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
              transition: "background-color 0.2s", marginBottom: "20px",
            }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#B85C38"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1A1A1A"; }}
          >
            {loading ? (
              <>
                <span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                Signing in...
              </>
            ) : (
              <>Sign in <ArrowRight size={16} /></>
            )}
          </button>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E4DC" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>or continue with</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E4DC" }} />
          </div>

          {/* Social login */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <button style={{ padding: "12px", border: "1.5px solid #E8E4DC", borderRadius: "12px", backgroundColor: "white", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B85C38")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E4DC")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button style={{ padding: "12px", border: "1.5px solid #E8E4DC", borderRadius: "12px", backgroundColor: "white", cursor: "pointer", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500, color: "#1A1A1A", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#B85C38")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E8E4DC")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </button>
          </div>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    </div>
  );
}