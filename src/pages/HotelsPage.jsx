import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  SlidersHorizontal, Star, MapPin, Wifi, Waves,
  Coffee, Car, X, ChevronDown, Search, ArrowRight
} from "lucide-react";
import { hotels, destinations } from "../data/hotels";
import { Helmet } from "react-helmet-async";


const WRAP = { maxWidth: "1320px", margin: "0 auto", padding: "0 64px" };
const CATEGORIES = ["All", "Luxury", "Boutique", "Business"];
const SORT_OPTIONS = [
  { label: "Recommended", value: "recommended" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

const getAmenityIcon = (amenity) => {
  const a = amenity.toLowerCase();
  if (a.includes("wifi")) return <Wifi size={12} />;
  if (a.includes("pool")) return <Waves size={12} />;
  if (a.includes("restaurant") || a.includes("breakfast") || a.includes("meal")) return <Coffee size={12} />;
  if (a.includes("transfer") || a.includes("parking")) return <Car size={12} />;
  return null;
};

export default function HotelsPage() {
  const [searchParams] = useSearchParams();
  const [selectedDest, setSelectedDest] = useState(searchParams.get("destination") || "All");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const dest = searchParams.get("destination");
    if (dest) setSelectedDest(dest);
  }, [searchParams]);

  // Filter
  let filtered = hotels.filter((h) => {
    const matchDest = selectedDest === "All" || h.destination === selectedDest;
    const matchCat = selectedCat === "All" || h.category === selectedCat;
    const matchPrice = h.pricePerNight <= maxPrice;
    const matchSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.destination.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDest && matchCat && matchPrice && matchSearch;
  });

  // Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "price_asc") return a.pricePerNight - b.pricePerNight;
    if (sortBy === "price_desc") return b.pricePerNight - a.pricePerNight;
    if (sortBy === "rating") return b.rating - a.rating;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const clearFilters = () => {
    setSelectedDest("All");
    setSelectedCat("All");
    setSortBy("recommended");
    setMaxPrice(30000);
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedDest !== "All" || selectedCat !== "All" || maxPrice < 30000 || searchQuery;

  return (
    
    <div style={{ backgroundColor: "#FAFAF8", minHeight: "100vh", paddingTop: "80px" }}>




<Helmet>
  <title>Browse Hotels — Pahuna</title>
  <meta name="description" content="Filter and browse 85+ verified hotels across 12 Nepal destinations. Luxury, boutique, safari lodges and more." />
</Helmet>







      {/* ── PAGE HEADER ── */}
      <div style={{ backgroundColor: "white", borderBottom: "1px solid #E8E4DC", padding: "36px 0" }}>
        <div style={WRAP}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", color: "#B85C38", marginBottom: "8px" }}>
            Browse
          </p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
            <h1 style={{ fontFamily: "Fraunces, serif", fontSize: "42px", fontWeight: 300, color: "#1A1A1A", letterSpacing: "-1px", lineHeight: 1.1 }}>
              Hotels across Nepal
            </h1>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B" }}>
              {filtered.length} {filtered.length === 1 ? "property" : "properties"} found
            </p>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: "40px 0 80px" }}>
        <div style={{ ...WRAP, display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }}>

          {/* ── SIDEBAR ── */}
          <aside style={{ position: "sticky", top: "100px" }}>
            <div style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "28px", marginBottom: "12px" }}>

              {/* Search */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", display: "block", marginBottom: "10px" }}>
                  Search
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #E8E4DC", borderRadius: "10px", padding: "10px 14px" }}>
                  <Search size={14} color="#9CA3AF" />
                  <input
                    type="text"
                    placeholder="Hotel or destination..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A", border: "none", outline: "none", background: "none", width: "100%" }}
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex" }}>
                      <X size={13} />
                    </button>
                  )}
                </div>
              </div>

              {/* Destination */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", display: "block", marginBottom: "10px" }}>
                  Destination
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", maxHeight: "280px", overflowY: "auto" }}>
                  {["All", ...destinations.map((d) => d.name)].map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setSelectedDest(dest)}
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: "14px", textAlign: "left",
                        padding: "8px 12px", borderRadius: "8px", border: "none", cursor: "pointer",
                        backgroundColor: selectedDest === dest ? "#FDF0EB" : "transparent",
                        color: selectedDest === dest ? "#B85C38" : "#4B4B4B",
                        fontWeight: selectedDest === dest ? 600 : 400,
                        transition: "all 0.15s",
                      }}
                    >
                      {dest}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div style={{ marginBottom: "28px" }}>
                <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B", display: "block", marginBottom: "10px" }}>
                  Category
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCat(cat)}
                      style={{
                        fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500,
                        padding: "6px 14px", borderRadius: "999px", cursor: "pointer",
                        border: selectedCat === cat ? "1.5px solid #B85C38" : "1.5px solid #E8E4DC",
                        backgroundColor: selectedCat === cat ? "#B85C38" : "white",
                        color: selectedCat === cat ? "white" : "#4B4B4B",
                        transition: "all 0.15s",
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price range */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <label style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#6B6B6B" }}>
                    Max price / night
                  </label>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "#B85C38" }}>
                    NPR {maxPrice.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={30000}
                  step={500}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: "100%", accentColor: "#B85C38", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#9CA3AF" }}>NPR 1,000</span>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#9CA3AF" }}>NPR 30,000</span>
                </div>
              </div>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                style={{ width: "100%", fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", padding: "10px", border: "1px solid #E8E4DC", borderRadius: "10px", backgroundColor: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}
              >
                <X size={13} />
                Clear all filters
              </button>
            )}
          </aside>

          {/* ── MAIN CONTENT ── */}
          <main>

            {/* Sort bar + active chips */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {selectedDest !== "All" && <ActiveChip label={selectedDest} onRemove={() => setSelectedDest("All")} />}
                {selectedCat !== "All" && <ActiveChip label={selectedCat} onRemove={() => setSelectedCat("All")} />}
                {maxPrice < 30000 && <ActiveChip label={`Under NPR ${maxPrice.toLocaleString()}`} onRemove={() => setMaxPrice(30000)} />}
                {searchQuery && <ActiveChip label={`"${searchQuery}"`} onRemove={() => setSearchQuery("")} />}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #E8E4DC", borderRadius: "10px", padding: "8px 14px", backgroundColor: "white", flexShrink: 0 }}>
                <SlidersHorizontal size={14} color="#6B6B6B" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#1A1A1A", border: "none", outline: "none", background: "none", cursor: "pointer" }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                <ChevronDown size={13} color="#6B6B6B" />
              </div>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <EmptyState onClear={clearFilters} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {filtered.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function ActiveChip({ label, onRemove }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#FDF0EB", border: "1px solid #F0C9B8", borderRadius: "999px", padding: "4px 12px" }}>
      <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 500, color: "#B85C38" }}>{label}</span>
      <button onClick={onRemove} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", color: "#B85C38", padding: 0 }}>
        <X size={12} />
      </button>
    </div>
  );
}

function HotelCard({ hotel }) {
  return (
    <Link to={`/hotels/${hotel.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div
        style={{ backgroundColor: "white", border: "1px solid #E8E4DC", borderRadius: "16px", overflow: "hidden", display: "grid", gridTemplateColumns: "300px 1fr", transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer" }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "240px", overflow: "hidden" }}>
          <img
            src={hotel.image}
            alt={hotel.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          {hotel.badge && (
            <div style={{ position: "absolute", top: "12px", left: "12px", backgroundColor: "#B85C38", borderRadius: "6px", padding: "4px 10px" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "white" }}>
                {hotel.badge}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            {/* Location + category row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <MapPin size={13} color="#9CA3AF" />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B" }}>{hotel.destination}</span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", fontWeight: 600, color: "#4A6741", backgroundColor: "#EEF4EC", padding: "3px 10px", borderRadius: "999px", letterSpacing: "0.5px" }}>
                {hotel.category}
              </span>
            </div>

            {/* Name */}
            <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "22px", fontWeight: 400, color: "#1A1A1A", letterSpacing: "-0.3px", marginBottom: "8px", lineHeight: 1.2 }}>
              {hotel.name}
            </h3>

            {/* Description */}
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "13px", color: "#6B6B6B", lineHeight: 1.65, marginBottom: "14px" }}>
              {hotel.description}
            </p>

            {/* Amenity tags */}
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {hotel.amenities.slice(0, 5).map((a) => {
                const icon = getAmenityIcon(a);
                return (
                  <div key={a} style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "#FAFAF8", border: "1px solid #E8E4DC", borderRadius: "6px", padding: "4px 10px" }}>
                    {icon && <span style={{ color: "#9CA3AF" }}>{icon}</span>}
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#6B6B6B" }}>{a}</span>
                  </div>
                );
              })}
              {hotel.amenities.length > 5 && (
                <div style={{ display: "flex", alignItems: "center", backgroundColor: "#FAFAF8", border: "1px solid #E8E4DC", borderRadius: "6px", padding: "4px 10px" }}>
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>+{hotel.amenities.length - 5} more</span>
                </div>
              )}
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #E8E4DC", paddingTop: "16px", marginTop: "16px" }}>
            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#1A1A1A", borderRadius: "6px", padding: "4px 10px" }}>
                <Star size={11} fill="white" color="white" />
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", fontWeight: 600, color: "white" }}>{hotel.rating}</span>
              </div>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "12px", color: "#9CA3AF" }}>
                {hotel.reviews.toLocaleString()} reviews
              </span>
            </div>

            {/* Price + CTA */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "11px", color: "#9CA3AF", marginBottom: "2px" }}>per night</p>
                <p style={{ fontFamily: "Fraunces, serif", fontSize: "24px", fontWeight: 600, color: "#1A1A1A", lineHeight: 1 }}>
                  NPR {hotel.pricePerNight.toLocaleString()}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", backgroundColor: "#B85C38", color: "white", padding: "9px 16px", borderRadius: "10px", fontFamily: "Inter, sans-serif", fontSize: "13px", fontWeight: 500 }}>
                View <ArrowRight size={13} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ onClear }) {
  return (
    <div style={{ textAlign: "center", padding: "72px 40px", backgroundColor: "white", borderRadius: "16px", border: "1px solid #E8E4DC" }}>
      <p style={{ fontSize: "40px", marginBottom: "16px" }}>🏔️</p>
      <h3 style={{ fontFamily: "Fraunces, serif", fontSize: "26px", fontWeight: 300, color: "#1A1A1A", marginBottom: "10px" }}>
        No hotels match your filters
      </h3>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", color: "#6B6B6B", marginBottom: "24px" }}>
        Try adjusting your destination, category or price range.
      </p>
      <button
        onClick={onClear}
        style={{ fontFamily: "Inter, sans-serif", fontSize: "14px", fontWeight: 500, color: "white", backgroundColor: "#B85C38", border: "none", borderRadius: "10px", padding: "12px 28px", cursor: "pointer" }}
      >
        Clear all filters
      </button>
    </div>
  );
}