import React from "react";
import "./Home.css";
import { useState } from "react";
import AirlineLanding from "../AirlineLanding";
import Footer from "./Footer";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SkyHeader from "../SkyHeader";

const Home = () => {
  const navigate = useNavigate();
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  let [from, setFrom] = useState(null);
  let [to, setTo] = useState(null);
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [showPassengerBox, setShowPassengerBox] = useState(false);
  const [showDateBox, setShowDateBox] = useState(false);

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [cabin, setCabin] = useState("Economy");

  let Oneway = () => {
    setIsRoundTrip(false);
  };
  let Round = () => {
    setIsRoundTrip(true);
  };

  let SwapAirports = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  const fetchAirports = async (inputvalue) => {
    if (inputvalue.length < 2) return [];

    const res = await fetch(
      `http://localhost:5050/airline/users/search?city=${inputvalue}`,
    );

    const data = await res.json();

    return data.map((a) => ({
      label: `${a.city} (${a.code}), ${a.country}`,
      value: a.code,
      airport: a,
    }));
  };

  const handleSearch = async () => {
    if (!from || !to || !departDate) {
      toast("Please select From, To and Depart date");
      return;
    }
    const total = adults + children + infants;

    if (adults < 1) {
      toast("At least 1 adult is required");
      return;
    }

    if (infants > adults) {
      toast("Infants cannot exceed adults");
      return;
    }

    if (total > 9) {
      toast("Total passengers limit is 9");
      return;
    }

    try {
      navigate(
        `/flights?from=${from.value}&to=${to.value}&departDate=${departDate}&adults=${adults}&children=${children}&infants=${infants}&cabin=${cabin}`,
      );
    } catch (err) {
      console.error(err);

      if (err.response) {
        toast(err.response.data.message);
      } else {
        toast("Network error");
      }
      console.log("Flight search data:");
    }
    // navigate("/results")
  };

  return (
    <div className="home">
      <SkyHeader />


      {/* HERO */}
      <section className="hero-name">
        <h1>Millions of cheap flights. One simple search.</h1>

        {/* SEARCH BAR */}
        <div className="search-wrapper">
          <div className="trip-type">
            <button className={!isRoundTrip ? "active" : null} onClick={Oneway}>
              One way
            </button>
            <button className={!isRoundTrip ? null : "active"} onClick={Round}>
              Round trip
            </button>
          </div>

          <div className="search-bar">
            <div className="input-box">
              <label>From</label>
              <AsyncSelect
                className="flight-select"
                classNamePrefix="flight"
                placeholder="Ahmedabad (AMD)"
                loadOptions={fetchAirports}
                onChange={setFrom}
                value={from}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            </div>

            <div className="swap" onClick={SwapAirports}>
              ⇄
            </div>

            <div className="input-box">
              <label>To</label>
              <AsyncSelect
                className="flight-select"
                classNamePrefix="flight"
                placeholder="Country, city or airport"
                loadOptions={fetchAirports}
                onChange={setTo}
                value={to}
                menuPortalTarget={document.body}
                menuPosition="fixed"
              />
            </div>

            {/* <div className="input-box">
              <label>Depart</label>
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
              />
            </div>
            <div className={!isRoundTrip ? "hidden input-box" : "input-box"}>
              <label>Return</label>
              <input
                type="date"
                disabled={!isRoundTrip}
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </div> */}
            <div
              className="input-box date-box"
              onClick={() => setShowDateBox(true)}
            >
              <label>{isRoundTrip ? "Depart – Return" : "Depart"}</label>

              <input
                readOnly
                placeholder="Select date"
                value={
                  isRoundTrip
                    ? departDate && returnDate
                      ? `${departDate} → ${returnDate}`
                      : ""
                    : departDate
                }
                onClick={() => setShowDateBox(true)}
              />
            </div>
            {showDateBox && (
              <div className="date-popup">
                <h4>Select travel dates</h4>

                <div className="date-row">
                  <div>
                    <label>Depart</label>
                    <input
                      type="date"
                      value={departDate}
                      onChange={(e) => setDepartDate(e.target.value)}
                    />
                  </div>

                  {isRoundTrip && (
                    <div>
                      <label>Return</label>
                      <input
                        type="date"
                        value={returnDate}
                        min={departDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <button
                  className="done-btn"
                  onClick={() => setShowDateBox(false)}
                  disabled={!departDate || (isRoundTrip && !returnDate)}
                >
                  Done
                </button>
              </div>
            )}

            <div className="input-box passenger-box">
              <label>Travellers and cabin class</label>

              <input
                readOnly
                value={`${adults} Adult${adults > 1 ? "s" : ""}, ${
                  children ? children + " Children, " : ""
                }${infants ? infants + " Infants, " : ""}${cabin}`}
                onClick={() => setShowPassengerBox(true)}
              />
            </div>
            {showPassengerBox && (
              <div className="passenger-popup">
                <h4>Select Travellers</h4>

                <div className="row">
                  <span>Adults</span>
                  <div className="controls">
                    <button onClick={() => setAdults(Math.max(1, adults - 1))}>
                      −
                    </button>
                    <strong>{adults}</strong>
                    <button onClick={() => setAdults(adults + 1)}>+</button>
                  </div>
                </div>

                <div className="row">
                  <span>Children</span>
                  <div className="controls">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      −
                    </button>
                    <strong>{children}</strong>
                    <button onClick={() => setChildren(children + 1)}>+</button>
                  </div>
                </div>

                <div className="row">
                  <span>Infants</span>
                  <div className="controls">
                    <button
                      onClick={() => setInfants(Math.max(0, infants - 1))}
                    >
                      −
                    </button>
                    <strong>{infants}</strong>
                    <button onClick={() => setInfants(infants + 1)}>+</button>
                  </div>
                </div>

                <div className="cabin-select">
                  <h4>Cabin Class</h4>
                  {["Economy", "Premium Economy", "Business", "First"].map(
                    (c) => (
                      <button
                        key={c}
                        className={cabin === c ? "active-cabin" : ""}
                        onClick={() => setCabin(c)}
                      >
                        {c}
                      </button>
                    ),
                  )}
                </div>
                <button
                  className="done-btn"
                  onClick={() => setShowPassengerBox(false)}
                >
                  Done
                </button>
              </div>
            )}

            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Add nearby airports
            </label>
            <label>
              <input type="checkbox" /> Direct flights
            </label>
          </div>
        </div>
      </section>

      <AirlineLanding />
      <Footer />
    </div>
  );
};

export default Home;
