import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Calendar, Users, Search } from "lucide-react";
import { destinations } from "../../data/hotels";

export default function SearchBar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ destination: "", checkIn: "", checkOut: "", guests: 2 });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSearch = () => {
    const params = new URLSearchParams(form);
    navigate(`/hotels?${params.toString()}`);
  };

  return (
    <div className="glass rounded-2xl p-2 shadow-2xl shadow-black/40 w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">

        {/* Destination */}
        <div className="flex-1 flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3">
          <MapPin size={18} className="text-nepal-gold flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mb-0.5">Destination</p>
            <select
              name="destination"
              value={form.destination}
              onChange={handleChange}
              className="w-full bg-transparent text-white font-body text-sm outline-none cursor-pointer"
            >
              <option value="" className="bg-gray-900">Where in Nepal?</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.name} className="bg-gray-900">{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-white/10" />

        {/* Check In */}
        <div className="flex-1 flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3">
          <Calendar size={18} className="text-nepal-gold flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mb-0.5">Check In</p>
            <input
              type="date"
              name="checkIn"
              value={form.checkIn}
              onChange={handleChange}
              className="w-full bg-transparent text-white font-body text-sm outline-none [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-white/10" />

        {/* Check Out */}
        <div className="flex-1 flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3">
          <Calendar size={18} className="text-nepal-gold flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mb-0.5">Check Out</p>
            <input
              type="date"
              name="checkOut"
              value={form.checkOut}
              onChange={handleChange}
              className="w-full bg-transparent text-white font-body text-sm outline-none [color-scheme:dark]"
            />
          </div>
        </div>

        <div className="hidden md:block w-px h-10 bg-white/10" />

        {/* Guests */}
        <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-xl px-4 py-3">
          <Users size={18} className="text-nepal-gold flex-shrink-0" />
          <div>
            <p className="text-[10px] text-white/40 font-body uppercase tracking-widest mb-0.5">Guests</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-nepal-red text-white text-xs flex items-center justify-center transition-colors"
              >−</button>
              <span className="text-white font-body text-sm w-4 text-center">{form.guests}</span>
              <button
                onClick={() => setForm({ ...form, guests: Math.min(10, form.guests + 1) })}
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-nepal-red text-white text-xs flex items-center justify-center transition-colors"
              >+</button>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-nepal-red hover:bg-red-700 text-white rounded-xl px-6 py-3 flex items-center gap-2 font-body font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-nepal-red/40 hover:-translate-y-0.5 whitespace-nowrap"
        >
          <Search size={16} />
          Search Hotels
        </button>
      </div>
    </div>
  );
}