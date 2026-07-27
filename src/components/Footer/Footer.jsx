import { Link } from "react-router-dom";
import { Mountain, Mail, Phone, MapPin, Globe, Share2, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-8 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-nepal-red rounded-xl flex items-center justify-center">
                <Mountain size={18} className="text-white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                Nepal<span className="text-gradient">Stay</span>
              </span>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed mb-6">
              Connecting travellers with Nepal's finest hotels across every destination.
            </p>
            <div className="flex gap-3">
              {[Globe, Share2, MessageCircle].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-white/40 hover:text-nepal-gold transition-all duration-300"
                >
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm mb-4 tracking-wider uppercase">Destinations</h4>
            <ul className="space-y-2.5">
              {["Kathmandu", "Pokhara", "Chitwan", "Lumbini", "Nagarkot", "Mustang"].map((d) => (
                <li key={d}>
                  <Link to={`/hotels?destination=${d}`} className="font-body text-white/40 hover:text-nepal-gold text-sm transition-colors">
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm mb-4 tracking-wider uppercase">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", path: "/about" },
                { label: "Contact", path: "/contact" },
                { label: "Privacy Policy", path: "/privacy" },
                { label: "Terms of Service", path: "/terms" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="font-body text-white/40 hover:text-nepal-gold text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-semibold text-white text-sm mb-4 tracking-wider uppercase">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/40 text-sm font-body">
                <MapPin size={14} className="text-nepal-gold flex-shrink-0" />
                Thamel, Kathmandu, Nepal
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm font-body">
                <Phone size={14} className="text-nepal-gold flex-shrink-0" />
                +977-1-4444-5555
              </li>
              <li className="flex items-center gap-3 text-white/40 text-sm font-body">
                <Mail size={14} className="text-nepal-gold flex-shrink-0" />
                hello@nepalstay.com
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/20 text-xs">© 2025 NepalStay. All rights reserved. Made with ❤️ for Nepal.</p>
          <p className="font-body text-white/20 text-xs">🏔️ Proudly supporting Himalayan tourism</p>
        </div>
      </div>
    </footer>
  );
}