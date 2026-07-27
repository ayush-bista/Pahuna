import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { destinations } from "../../data/hotels";

export default function Destinations() {
  return (
    <section id="destinations" className="py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#060c1a] to-black pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label mb-3">✦ Where to Go</p>
            <h2 className="font-display text-white text-5xl md:text-6xl font-bold leading-tight">
              Top Destinations
              <br />
              <span className="text-gradient italic">in Nepal</span>
            </h2>
          </div>
          <p className="font-body text-white/50 max-w-sm leading-relaxed">
            From snow-capped Himalayan peaks to lush jungle lowlands — Nepal offers
            experiences unlike anywhere else on earth.
          </p>
        </div>

        {/* Top row — large + 2 stacked */}
        <div className="grid grid-cols-12 gap-4 mb-4">
          <DestCard dest={destinations[0]} className="col-span-12 md:col-span-7 h-[520px]" large />
          <div className="col-span-12 md:col-span-5 grid grid-rows-2 gap-4">
            <DestCard dest={destinations[1]} className="h-[250px]" />
            <DestCard dest={destinations[2]} className="h-[250px]" />
          </div>
        </div>

        {/* Bottom row — 3 equal */}
        <div className="grid grid-cols-12 gap-4">
          {destinations.slice(3).map((dest) => (
            <DestCard key={dest.id} dest={dest} className="col-span-12 md:col-span-4 h-[300px]" />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link to="/hotels" className="inline-flex items-center gap-3 btn-outline group">
            View All Hotels
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function DestCard({ dest, className = "", large = false }) {
  return (
    <Link
      to={`/hotels?destination=${dest.name}`}
      className={`relative overflow-hidden rounded-2xl group cursor-pointer block ${className}`}
    >
      <img
        src={dest.image}
        alt={dest.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-card-gradient" />
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />

      {/* Hotel count badge */}
      <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 flex items-center gap-1.5">
        <MapPin size={11} className="text-nepal-gold" />
        <span className="font-body text-white text-xs">{dest.hotelCount} hotels</span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {large && (
          <p className="font-accent italic text-yellow-400/80 text-sm mb-1">{dest.tagline}</p>
        )}
        <h3 className={`font-display text-white font-bold mb-1 ${large ? "text-4xl" : "text-2xl"}`}>
          {dest.name}
        </h3>
        {large && (
          <p className="font-body text-white/60 text-sm mb-4 max-w-sm leading-relaxed">
            {dest.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-body text-white/60 text-xs">
            From <span className="text-nepal-gold font-medium">NPR {dest.startingPrice.toLocaleString()}</span>/night
          </span>
          <div className="flex items-center gap-1 text-white/60 group-hover:text-nepal-gold transition-colors">
            <span className="font-body text-xs">Explore</span>
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-yellow-600/30 transition-all duration-500 pointer-events-none" />
    </Link>
  );
}