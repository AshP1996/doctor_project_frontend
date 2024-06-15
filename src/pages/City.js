import React, { useState, useEffect } from "react";
import axios from "axios";
import "./City.css";

const City = () => {
  const [services, setServices] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showServiceSuggestions, setShowServiceSuggestions] = useState(false);
  const [showSpecializationSuggestions, setShowSpecializationSuggestions] =
    useState(false);

  useEffect(() => {
    // Fetch services
    axios
      .get("http://127.0.0.1:9000/api/services/")
      .then((response) => {
        const uniqueServices = Array.from(
          new Set(response.data.map((service) => service.service_name))
        ).map((name) => {
          return response.data.find((service) => service.service_name === name);
        });
        setServices(uniqueServices);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });

    // Fetch specializations
    axios
      .get("http://127.0.0.1:9000/api/profile-entities/")
      .then((response) => {
        // Filter only specializations
        const specializations = response.data.filter(
          (item) => item.entity_type === "specializations"
        );
        const uniqueSpecializations = Array.from(
          new Set(specializations.map((spec) => spec.entity_value))
        ).map((value) => {
          return specializations.find((spec) => spec.entity_value === value);
        });
        setSpecializations(uniqueSpecializations);
      })
      .catch((error) => {
        console.error("Error fetching specializations:", error);
      });

    // Fetch doctors data
    axios
      .get("http://127.0.0.1:9000/api/doctors/")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
    setShowServiceSuggestions(true);
  };

  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
    setShowSpecializationSuggestions(true);
  };

  const handleDoctorClick = (doctorId) => {
    // Fetch additional details for the selected doctor
    axios
      .get(`http://127.0.0.1:9000/api/doctors/${doctorId}`)
      .then((response) => {
        setSelectedDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  };

  const filteredDoctors = doctors.filter(
    (doctor) =>
      (selectedService
        ? services.find(
            (service) =>
              service.service_name
                .toLowerCase()
                .includes(selectedService.toLowerCase()) &&
              service.doctor === doctor.id
          )
        : true) &&
      (selectedSpecialization
        ? specializations.find(
            (spec) =>
              spec.entity_value
                .toLowerCase()
                .includes(selectedSpecialization.toLowerCase()) &&
              spec.doctor === doctor.id
          )
        : true)
  );

  const filteredServices = services.filter((service) =>
    service.service_name.toLowerCase().includes(selectedService.toLowerCase())
  );

  const filteredSpecializations = specializations.filter((spec) =>
    spec.entity_value
      .toLowerCase()
      .includes(selectedSpecialization.toLowerCase())
  );

  const handleApplyFilters = () => {
    setShowResults(true);
    setShowServiceSuggestions(false);
    setShowSpecializationSuggestions(false);
  };

  const handleServiceSelect = (serviceName) => {
    setSelectedService(serviceName);
    setShowServiceSuggestions(false);
  };

  const handleSpecializationSelect = (specializationValue) => {
    setSelectedSpecialization(specializationValue);
    setShowSpecializationSuggestions(false);
  };

  return (
    <div className="city-container">
      <div className="filters">
        <div className="filter-group">
          <label>
            Filter by Service:
            <input
              type="text"
              value={selectedService}
              onChange={handleServiceChange}
              placeholder="Type to search services"
            />
            {showServiceSuggestions &&
              selectedService &&
              filteredServices.length > 0 && (
                <div className="suggestions">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="suggestion"
                      onClick={() => handleServiceSelect(service.service_name)}
                    >
                      {service.service_name}
                    </div>
                  ))}
                </div>
              )}
          </label>
          <label>
            Filter by Specialization:
            <input
              type="text"
              value={selectedSpecialization}
              onChange={handleSpecializationChange}
              placeholder="Type to search specializations"
            />
            {showSpecializationSuggestions &&
              selectedSpecialization &&
              filteredSpecializations.length > 0 && (
                <div className="suggestions">
                  {filteredSpecializations.map((spec) => (
                    <div
                      key={spec.id}
                      className="suggestion"
                      onClick={() =>
                        handleSpecializationSelect(spec.entity_value)
                      }
                    >
                      {spec.entity_value}
                    </div>
                  ))}
                </div>
              )}
          </label>
          <button className="apply-filters-button" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
      <div className="welcome-page">
        <h1>Welcome to the City Page</h1>
        <p>Use the filters above to find the best doctors in your area.</p>
      </div>
      {showResults && (
        <div className="filtered-doctors">
          <h2>Filtered Doctors</h2>
          <ul>
            {filteredDoctors.map((doctor) => (
              <li
                key={doctor.id}
                className="doctor-card"
                onClick={() => handleDoctorClick(doctor.id)}
              >
                <img
                  src={doctor.profile_pic}
                  alt={doctor.name}
                  className="profile-pic"
                />
                <div className="doctor-info">
                  <h3>{doctor.name}</h3>
                  <p>City: {doctor.city}</p>
                  <p>Experience: {doctor.experience} years</p>
                  <p>Top Expertise: {doctor.top_expertise}</p>
                  <p>Degree: {doctor.degree}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedDoctor && (
        <div className="doctor-details">
          <h2>Doctor Details</h2>
          <p>Name: {selectedDoctor.name}</p>
          <p>City: {selectedDoctor.city}</p>
          <p>Experience: {selectedDoctor.experience} years</p>
          <p>Top Expertise: {selectedDoctor.top_expertise}</p>
          <p>Degree: {selectedDoctor.degree}</p>
          <p>Description: {selectedDoctor.description}</p>
          <h3>Services</h3>
          <ul>
            {services
              .filter((service) => service.doctor === selectedDoctor.id)
              .map((service) => (
                <li key={service.id}>{service.service_name}</li>
              ))}
          </ul>
          <h3>Specializations</h3>
          <ul>
            {specializations
              .filter((spec) => spec.doctor === selectedDoctor.id)
              .map((spec) => (
                <li key={spec.id}>{spec.entity_value}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default City;
