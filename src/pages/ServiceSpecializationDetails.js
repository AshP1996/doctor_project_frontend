import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ServiceSpecializationDetails.css";

const ServiceSpecializationDetails = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [services, setServices] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    // Fetch doctor details
    axios
      .get(`http://127.0.0.1:9000/api/doctors/${doctorId}`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });

    // Fetch services for the doctor
    axios
      .get("http://127.0.0.1:9000/api/services/")
      .then((response) => {
        setServices(
          response.data.filter(
            (service) => service.doctor === parseInt(doctorId)
          )
        );
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    // Fetch specializations for the doctor
    axios
      .get("http://127.0.0.1:9000/api/profile-entities/")
      .then((response) => {
        setSpecializations(
          response.data.filter((spec) => spec.doctor === parseInt(doctorId))
        );
      })
      .catch((error) => {
        console.error("Error fetching specializations:", error);
      });
  }, [doctorId]);

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-container">
      <div className="doctor-header">
        <img
          src={doctor.profile_pic}
          alt={doctor.name}
          className="profile-pic-large"
        />
        <div className="doctor-info">
          <h2>{doctor.name}</h2>
          <p>City: {doctor.city}</p>
          <p>Experience: {doctor.experience} years</p>
          <p>Top Expertise: {doctor.top_expertise}</p>
          <p>Degree: {doctor.degree}</p>
          <p>Description: {doctor.description}</p>
        </div>
      </div>
      <div className="doctor-details">
        <h3>Services</h3>
        <ul>
          {services.map((service) => (
            <li key={service.id}>{service.service_name}</li>
          ))}
        </ul>
        <h3>Specializations</h3>
        <ul>
          {specializations.map((spec) => (
            <li key={spec.id}>{spec.entity_value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ServiceSpecializationDetails;
