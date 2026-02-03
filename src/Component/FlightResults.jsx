import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import "./FlightResults.css";
import SkyHeader from "./SkyHeader";

const FlightResults = () => {
  const [params] = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nowdate, setNowdate] = useState(null);

  const query = {
    from: params.get("from"),
    to: params.get("to"),
    departDate: params.get("departDate"),
    adults: params.get("adults"),
    cabin: params.get("cabin"),
  };
  const handleDatechange = (date) => {
    setNowdate((prev) => {
      const params = new URLSearchParams(prev);
      params.set("departDate", date);
      return params;
    });

  };
  const getFromFixedDate = () => {
    const baseDate = new Date(query.departDate); // Jan = 0
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const result = [];

    for (let i = 0; i < 5; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      result.push(`${d.getDate()} ${months[d.getMonth()]}`);
    }

    return result;
  };
  const date = getFromFixedDate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5050/airline/users/searchflights",
          { params },
        );
        setFlights(res.data.flights || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);
  const today = new Date(query.departDate);
  const now = today.getDate();
  const month = today.toLocaleDateString("en-Us", { month: "short" });
  const formattedDate = `${now} ${month}`;

  if (loading) return <div className="loading">Searching flights…</div>;

  return (
    <div className="results-wrapper ">
      {/* TOP HEADER */}
      <SkyHeader
        summary={`${query.from} → ${query.to} · ${query.adults} adult · ${query.cabin}`}
      />

      {/* DATE STRIP */}
      <div className="date-strip pil">
        {date.map((d, i) => (
          <div
            key={i}
            className={`date-item pointer ${d === formattedDate ? "active" : ""}`}
            onClick={() => handleDatechange(d)}
          >
            <div>{d}</div>
            <strong>₹{9000 + i * 700}</strong>
          </div>
        ))}
      </div>

      {/* MAIN LAYOUT */}
      <div className="layout pil">
        {/* FILTERS */}
        <div className="filters">
          <h4>Stops</h4>
          <label>
            <input type="checkbox" /> Direct
          </label>
          <label>
            <input type="checkbox" /> 1 stop
          </label>
          <label>
            <input type="checkbox" /> 2+ stops
          </label>

          <h4>Baggage</h4>
          <label>
            <input type="checkbox" /> Cabin bag
          </label>
          <label>
            <input type="checkbox" /> Checked bag
          </label>
        </div>

        {/* RESULTS */}
        <div className="results">
          {flights.map((f) => (
            <Link
              to={`/booking/${f._id}?adults=${query.adults}&cabin=${query.cabin}&from=${query.from}&to=${query.to}&departDate=${query.departDate}`}
            >
              <div key={f._id} className="flight-card">
                <div className="flight-left">
                  <div className="airline">IndiGo</div>

                  <div className="time-row">
                    <div>
                      <strong>
                        {new Date(f.departureTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>
                      <div>{f.from.code}</div>
                    </div>

                    <div className="middle">
                      <span>1 stop BOM</span>
                    </div>

                    <div>
                      <strong>
                        {new Date(f.arrivalTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </strong>
                      <div>{f.to.code}</div>
                    </div>
                  </div>
                </div>

                <div className="price-box">
                  <div className="deal">7 deals from</div>
                  <div className="price">₹{f.price.economy}</div>
                  <button className="select-btn">Select →</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlightResults;
