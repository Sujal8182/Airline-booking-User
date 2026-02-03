import React from "react";
import SignIn from "./Component/SignIn";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./Component/Register";
import Home from "./Component/Home/Home";
import FlightResults from "./Component/FlightResults";
import Booking from "./Component/Booking";
import UserProtectedRoute from "./UserProtectedRoute";
import MyBookings from "./Component/MyBookings";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />

          <Route element={<UserProtectedRoute />}>
            <Route path="/flights" element={<FlightResults />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path='/my-bookings' element={<MyBookings />}/>
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
};

export default App;
