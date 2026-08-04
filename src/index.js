import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./context/AuthContext";
import { BookingsProvider } from "./context/BookingsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <BookingsProvider>
          <App />
        </BookingsProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);