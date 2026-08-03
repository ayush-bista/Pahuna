import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) return null;

  return (
    <button
      onClick={scrollUp}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 200,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: "#1A1A1A",
        color: "white",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.20)",
        transition: "background-color 0.2s, transform 0.2s",
        animation: "fadeIn 0.3s ease both",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#B85C38";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#1A1A1A";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}