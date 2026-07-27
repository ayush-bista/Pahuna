import { Shield, Clock, Star, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { stats } from "../../data/hotels";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(150deg, #060818 0%, #0c1a3a 40%, #1a0a0e 70%, #0a0a0a 100%)" }}
    >
      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">

        {/* Mountain SVG silhouette */}
        <svg className="absolute bottom-0 left-0 right-0 w-full opacity-20" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path
            d="M0,400 L0,280 L120,180 L200,220 L320,100 L440,160 L520,80 L640,140 L720,40 L800,120 L880,60 L960,130 L1080,200 L1160,140 L1280,220 L1360,160 L1440,200 L1440,400 Z"
            fill="url(#mountainGrad)"
          />
          <defs>
            <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#003893" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-900/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-yellow-900/10 rounded-full blur-[80px] animate-pulse" />

        {/* Floating particles */}
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            style={{
              left: `${(i * 37 + 5) % 100}%`,
              top: `${(i * 23 + 10) % 100}%`,
              animation: `float ${4 + (i % 4)}s ease-in-out infinite`,
              animationDelay: `${(i * 0.4) % 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 pt-28 pb-12 max-w-6xl mx-auto w-full">

        {/* Top badge */}
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
          <Star size={12} className="text-nepal-gold fill-nepal-gold" />
          <span className="text-white/80 font-body text-xs tracking-widest uppercase">
            Nepal's #1 Hotel Booking Platform
          </span>
          <Star size={12} className="text-nepal-gold fill-nepal-gold" />
        </div>

        {/* Headline */}
        <h1
          className="font-display text-white mb-4 leading-none"
          style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
        >
          Discover Nepal's
          <br />
          <span className="text-gradient italic"> Finest Stays</span>
        </h1>

        <p className="font-body text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          From Himalayan luxury lodges to lakeside retreats — book your perfect escape
          across Nepal's most breathtaking destinations.
        </p>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar />
        </div>

        {/* Quick destination filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {["Kathmandu", "Pokhara", "Chitwan", "Nagarkot", "Mustang"].map((dest) => (
            <Link
              key={dest}
              to={`/hotels?destination=${dest}`}
              className="glass hover:bg-white/15 text-white/70 hover:text-white font-body text-xs px-4 py-2 rounded-full transition-all duration-300 border border-white/10 hover:border-yellow-600/50"
            >
              {dest}
            </Link>
          ))}
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          <div className="flex items-center gap-2 text-white/50 text-xs font-body">
            <Shield size={14} className="text-nepal-gold" />
            Secure Booking
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs font-body">
            <Clock size={14} className="text-nepal-gold" />
            Instant Confirmation
          </div>
          <div className="flex items-center gap-2 text-white/50 text-xs font-body">
            <Star size={14} className="text-nepal-gold fill-nepal-gold" />
            Verified Reviews
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="font-body text-white/40 text-xs mt-1 tracking-wider uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      
       <a> href="#destinations"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
      
        <span className="font-body text-xs tracking-widest uppercase">Explore</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}