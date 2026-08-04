import { createContext, useContext, useState } from "react";

const BookingsContext = createContext(null);

const getKey = (email) => `nepalstay_bookings_${email}`;

export function BookingsProvider({ children }) {
  const [, forceUpdate] = useState(0);

  const getBookings = (email) => {
    if (!email) return [];
    try {
      const stored = localStorage.getItem(getKey(email));
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const addBooking = (email, booking) => {
    if (!email) return;
    const existing = getBookings(email);
    const updated = [booking, ...existing];
    localStorage.setItem(getKey(email), JSON.stringify(updated));
    forceUpdate((n) => n + 1);
  };

  return (
    <BookingsContext.Provider value={{ getBookings, addBooking }}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingsContext);
}