export default function PageLoader() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      backgroundColor: "#FAFAF8",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: "20px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ width: "36px", height: "36px", backgroundColor: "#B85C38", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17l4-8 4 4 3-6 4 10" />
          </svg>
        </div>
        <span style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 600, color: "#1A1A1A" }}>
          Nepal<span style={{ color: "#B85C38" }}>Stay</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "7px", height: "7px", borderRadius: "50%",
              backgroundColor: "#B85C38",
              animation: `pulse 1.2s ease infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}