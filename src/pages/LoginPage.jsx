import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Mountain } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const from = location.state?.from || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

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
    setAuthError("");
    setLoading(true);

    setTimeout(() => {
      // Check if user exists in localStorage
      const allKeys = Object.keys(localStorage).filter((k) => k.startsWith("pahuna_registered_"));
      const match = allKeys.find((k) => {
        try {
          const u = JSON.parse(localStorage.getItem(k));
          return u.email === form.email && u.password === form.password;
        } catch { return false; }
      });

      if (match) {
        const userData = JSON.parse(localStorage.getItem(match));
        login(userData);
        setLoading(false);
        navigate(from, { replace: true });
      } else {
        setLoading(false);
        setAuthError("Invalid email or password. Please try again.");
      }
    }, 900);
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: "" });
    if (authError) setAuthError("");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#EEF2F7", paddingTop: "72px", display: "flex", alignItems: "center", justifyContent: "center", padding: "120px 24px 60px" }}>
      <div style={{ width: "100%", maxWidth: "1100px", display: "grid", gridTemplateColumns: "1fr 1fr", borderRadius: "24px", overflow: "hidden", boxShadow: "0 24px 80px rgba(0,0,0,0.12)" }}>

        {/* Left — image */}
        <div style={{ position: "relative", minHeight: "600px", overflow: "hidden" }}>
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=900&q=85" alt="Nepal hotel" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, padding: "48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", backgroundColor: "#B85C38", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mountain size={18} color="white" />
              </div>
              <span style={{ fontFamily: "Fraunces, serif", fontSize: "20px", fontWeight: 600, color: "white" }}>Pahuna</span>
            </div>
            <div>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "12px" }}>
                Temple Tree Resort, Pokhara
              </p>
              <h2 style={{ fontFamily: "Fraunces, serif", fontSize: "36px", fontWeight: 300, color: "white", lineHeight: 1.2, letterSpacing: "-0.5px" }}>
                Welcome back to<br /><em>beautiful Nepal</em>
              </h2>
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

        {/* Right — form */}
        <div style={{ backgroundColor: "white", padding: "56px 52px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ marginBottom: "32px" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "10px" }}>Welcome back</p>
            <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "34px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-0.8px", marginBottom: "8px" }}>Sign in to your account</h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#B85C38", fontWeight: 600, textDecoration: "none" }}>Create one free</Link>
            </p>
          </div>

          {/* Auth error */}
          {authError && (
            <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: "10px", padding: "12px 16px", marginBottom: "20px" }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#DC2626" }}>{authError}</p>
            </div>
          )}

          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>Email address</label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{ width: "100%", padding: "13px 16px 13px 44px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: errors.email ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box" }}
                onFocus={(e) => { if (!errors.email) e.target.style.borderColor = "#B85C38"; }}
                onBlur={(e) => { if (!errors.email) e.target.style.borderColor = "#E8E4DC"; }}
              />
            </div>
            {errors.email && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>{errors.email}</p>}
          </div>

          {/* Password */}
          <div style={{ marginBottom: "10px" }}>
            <label style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 600, color: "#1A1A1A", display: "block", marginBottom: "8px" }}>Password</label>
            <div style={{ position: "relative" }}>
              <Lock size={16} color="#9CA3AF" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{ width: "100%", padding: "13px 48px 13px 44px", fontFamily: "Inter, sans-serif", fontSize: "14px", border: errors.password ? "1.5px solid #EF4444" : "1.5px solid #E8E4DC", borderRadius: "12px", outline: "none", backgroundColor: "#FAFAF8", color: "#1A1A1A", boxSizing: "border-box" }}
                onFocus={(e) => { if (!errors.password) e.target.style.borderColor = "#B85C38"; }}
                onBlur={(e) => { if (!errors.password) e.target.style.borderColor = "#E8E4DC"; }}
              />
              <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex" }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#EF4444", marginTop: "5px" }}>{errors.password}</p>}
          </div>

          <div style={{ textAlign: "right", marginBottom: "24px" }}>
            <Link to="/signup" style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#B85C38", textDecoration: "none", fontWeight: 500 }}>Don't have an account? Sign up</Link>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ width: "100%", padding: "15px", backgroundColor: loading ? "#9CA3AF" : "#1A1A1A", color: "white", border: "none", borderRadius: "12px", fontFamily: "Inter, sans-serif", fontSize: "15px", fontWeight: 600, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "background-color 0.2s", marginBottom: "20px" }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#B85C38"; }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1A1A1A"; }}
          >
            {loading ? (
              <><span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />Signing in...</>
            ) : (
              <>Sign in <ArrowRight size={16} /></>
            )}
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E4DC" }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>or</span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#E8E4DC" }} />
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>
              New to Pahuna?{" "}
              <Link to="/signup" style={{ color: "#B85C38", fontWeight: 600, textDecoration: "none" }}>Create a free account</Link>
            </p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    </div>
  );
}