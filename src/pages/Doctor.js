import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Doctor.css";

const Doctor = () => {
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [experience, setExperience] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:9000/api/doctors/")
      .then((response) => response.json())
      .then((data) => {
        setDoctors(data);
        setFilteredDoctors(data);
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  useEffect(() => {
    if (city) {
      const filteredAreas = Array.from(
        new Set(
          doctors
            .filter(
              (doctor) => doctor.city.toLowerCase() === city.toLowerCase()
            )
            .map((doctor) => doctor.area)
        )
      );
      setAreas(filteredAreas);
    } else {
      setAreas([]);
    }
    setArea(""); // Reset area when city changes
  }, [city, doctors]);

  const handleCityChange = (e) => {
    const input = e.target.value;
    setCity(input);
    if (input) {
      const uniqueCities = new Set(
        doctors
          .map((doctor) => doctor.city)
          .filter((city) => city.toLowerCase().startsWith(input.toLowerCase()))
      );
      setFilteredCities(Array.from(uniqueCities));
    } else {
      setFilteredCities([]);
    }
  };

  const filterDoctors = () => {
    const filtered = doctors.filter((doctor) => {
      return (
        (city === "" || doctor.city.toLowerCase() === city.toLowerCase()) &&
        (area === "" || doctor.area.toLowerCase() === area.toLowerCase()) &&
        (experience === "" ||
          (experience === "1-3 years" &&
            doctor.experience >= 1 &&
            doctor.experience <= 3) ||
          (experience === "3-5 years" &&
            doctor.experience > 3 &&
            doctor.experience <= 5) ||
          (experience === "5+ years" && doctor.experience > 5))
      );
    });
    setFilteredDoctors(filtered);
    setIsFiltered(true); // Set to true after filtering
  };

  const handleCardClick = (id) => {
    navigate(`/doctor/${id}`);
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  return (
    <div className="doctor-container">
      <nav>{/* Your Navbar code here */}</nav>

      <div className="filter-block sticky">
        <label>
          City:
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Type to search city"
          />
          {filteredCities.length > 0 && (
            <ul className="city-suggestions">
              {filteredCities.map((suggestedCity, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setCity(suggestedCity);
                    setFilteredCities([]);
                  }}
                >
                  {suggestedCity}
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          Area:
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            disabled={!city}
          >
            <option value="">Select an area</option>
            {areas.map((area, index) => (
              <option key={index} value={area}>
                {area.charAt(0).toUpperCase() + area.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Experience:
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">Select experience</option>
            <option value="1-3 years">1-3 years</option>
            <option value="3-5 years">3-5 years</option>
            <option value="5+ years">5+ years</option>
          </select>
        </label>
        <button onClick={filterDoctors}>Filter</button>
      </div>

      <div className="doctor-cards">
        {!isFiltered && (
          <div className="intro-text fade-in">
            <h2>Welcome to the Doctor Finder</h2>
            <p>
              Please use the filters above to find the best doctors in your
              area.
            </p>
          </div>
        )}
        {isFiltered && filteredDoctors.length === 0 && (
          <div className="no-results fade-in">
            <h2>No doctors found</h2>
            <p>Please adjust your filters and try again.</p>
          </div>
        )}
        {isFiltered &&
          filteredDoctors.length > 0 &&
          filteredDoctors.map((doctor) => (
            <div
              className="card fade-in"
              key={doctor.id}
              onClick={() => handleCardClick(doctor.id)}
            >
              <img
                src={doctor.profile_pic}
                alt={doctor.name}
                className="profile-pic"
              />
              <div className="doctor-details">
                <h3>{doctor.name}</h3>
                <p>City: {doctor.city}</p>
                <p>Experience: {doctor.experience} years</p>
                <p>Degree: {doctor.degree}</p>
                <p>Top Expertise: {doctor.top_expertise}</p>
                <p className="description">
                  Description: {truncateDescription(doctor.description, 100)}
                </p>
              </div>
              <div className="fees">
                <p>Fees: {doctor.fees}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Doctor;
