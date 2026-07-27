import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Mountain } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Destinations", path: "/destinations" },
    { label: "Hotels", path: "/hotels" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-dark shadow-lg shadow-black/20 py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-nepal-red rounded-xl flex items-center justify-center shadow-lg shadow-nepal-red/30 group-hover:scale-110 transition-transform duration-300">
              <Mountain size={20} className="text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-nepal-gold rounded-full animate-pulse" />
          </div>
          <div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Nepal<span className="text-gradient">Stay</span>
            </span>
            <p className="text-[10px] text-white/40 font-body tracking-widest uppercase -mt-0.5">
              Himalayan Hotels
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-body text-sm font-medium transition-all duration-300 relative group ${
                location.pathname === link.path
                  ? "text-nepal-gold"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-nepal-gold transition-all duration-300 ${
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="btn-outline text-sm py-2 px-5">Sign In</Link>
          <Link to="/signup" className="btn-primary text-sm py-2 px-5">Join Free</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-white/10 px-6 py-6 mt-1">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-white/80 hover:text-white font-body py-2 border-b border-white/5"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2">
              <Link to="/login" className="btn-outline text-sm py-2 px-5 flex-1 text-center">Sign In</Link>
              <Link to="/signup" className="btn-primary text-sm py-2 px-5 flex-1 text-center">Join Free</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}