import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SkyHeader from "./SkyHeader";
import "./MyBookings.css";

const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5050/airline/users/my-bookings",
          { withCredentials: true }
        );
        setBooking(res.data.bookings);
      } catch (error) {
        toast.error("Please login to view your bookings");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading your bookings…</div>;

  return (
    <div className="my-bookings-page">
      {/* HEADER */}
      <SkyHeader
        title="My Bookings"
        subtitle="Manage and review your flight journeys"
        onBack={() => navigate("/dashboard")}
      />

      {/* HERO */}
      <section className="bookings-hero">
        <h2>Your Trips ✈️</h2>
        <p>All your confirmed and past bookings in one place</p>
      </section>

      {/* CONTENT */}
      <main className="my-bookings">
        {!booking.length ? (
          <div className="empty">
            <h3>No bookings yet</h3>
            <p>Looks like you haven’t booked a flight.</p>
            <button onClick={() => navigate("/")}>
              Search Flights
            </button>
          </div>
        ) : (
          booking.map((b) => (
            <div key={b._id} className="booking-card">
              {/* Route */}
              <div className="route">
                <span className="city">{b.flight.from.code}</span>
                <span className="arrow">→</span>
                <span className="city">{b.flight.to.code}</span>
              </div>

              {/* Meta */}
              <div className="meta">
                <div>
                  <small>Departure</small>
                  <p>
                    {new Date(
                      b.flight.departureTime
                    ).toLocaleString()}
                  </p>
                </div>

                <div>
                  <small>Passengers</small>
                  <p>{b.passengers.length}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="footer">
                <div className="price">₹{b.totalPrice}</div>

                <div className={`status ${b.status}`}>
                  {b.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* FOOTER */}
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} SkyRoute Airways</p>
        <span>Fly smart. Fly safe.</span>
      </footer>
    </div>
  );
};

export default MyBookings;
