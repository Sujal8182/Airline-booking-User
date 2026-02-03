import { useState } from "react";
import "./AirlineLanding.css";

const faqs = [
  {
    q: "How does flight search work?",
    a: "We compare millions of flights from airlines and travel partners to help you find the best deals in one place."
  },
  {
    q: "How can I find the cheapest flights?",
    a: "Use flexible dates, nearby airports, and set up price alerts to track fare changes."
  },
  {
    q: "Where should I fly right now?",
    a: "Explore trending destinations with the lowest fares based on current demand."
  },
  {
    q: "Do I book my flight here?",
    a: "We redirect you to the airline or travel partner to complete your booking securely."
  },
  {
    q: "What happens after booking?",
    a: "You’ll receive confirmation directly from the airline or booking provider."
  },
  {
    q: "Do you offer hotels or car rentals?",
    a: "Yes, you can also compare hotels and car rentals for your trip."
  },
  {
    q: "What is a price alert?",
    a: "A notification that tells you when flight prices go up or down."
  },
  {
    q: "Can I book flexible tickets?",
    a: "Yes, filter results to show flights with flexible change or cancellation policies."
  },
  {
    q: "Can I choose eco-friendly flights?",
    a: "Yes, we highlight flights with lower CO₂ emissions where available."
  }
];

export default function AirlineLanding() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="airline-page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Find cheaper flights worldwide</h1>
            <p>
              Compare airlines, track prices, and book the best flight deals
              — all in one place.
            </p>
            <button>Search flights</button>
          </div>

          <div className="badge">
            ✈ up to <strong>30% off</strong>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Booking flights with us</h2>

        <div className="faq-grid">
          {faqs.map((item, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question" onClick={() => toggle(i)}>
                <span>{item.q}</span>
                <span className={`arrow ${openIndex === i ? "open" : ""}`}>
                  ▾
                </span>
              </button>

              {openIndex === i && (
                <div className="faq-answer">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

