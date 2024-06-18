import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import List from "./pages/List";
import City from "./pages/City";
import DoctorForm from "./pages/doctor_form";
import DoctorProfile from "./pages/DoctorProfile";
import Dashboard from "./dashboard_pages/doctor_dashbord"; // Corrected import

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/list" element={<List />} />
            <Route path="/city" element={<City />} />
            <Route path="/doctor_form" element={<DoctorForm />} />
            <Route path="/doctor/:id" element={<DoctorProfile />} />
            <Route path="/doctor_dashboard/:id" element={<Dashboard />} /> //
            vdfdfdf Ensure this route matches the path in the form submission
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
