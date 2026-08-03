import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero/Hero";
import useReveal from "../hooks/useReveal";

function RevealSection({ children, className = "reveal", delay = 0 }) {
  const ref = useReveal(0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>NepalStay — Find Hotels in Nepal</title>
        <meta name="description" content="Browse handpicked hotels across Nepal — Kathmandu, Pokhara, Chitwan, Ilam, Bhedetar, Basantapur, Tinjure, Mustang and more." />
      </Helmet>
      <main>
        <Hero />
      </main>
    </>
  );
}