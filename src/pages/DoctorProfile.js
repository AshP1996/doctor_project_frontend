import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./DoctorProfile.css";

const DoctorProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [services, setServices] = useState([]);
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const profileResponse = await fetch(
          `http://127.0.0.1:9000/api/doctors/${id}`
        );
        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    const fetchServicesData = async () => {
      try {
        const servicesResponse = await fetch(
          `http://127.0.0.1:9000/api/services/${id}`
        );
        if (!servicesResponse.ok) {
          throw new Error("Failed to fetch services data");
        }
        const servicesData = await servicesResponse.json();
        setServices(servicesData);
      } catch (error) {
        console.error("Error fetching services data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    const fetchEntitiesData = async () => {
      try {
        const entitiesResponse = await fetch(
          `http://127.0.0.1:9000/api/profile-entities/${id}`
        );
        if (!entitiesResponse.ok) {
          throw new Error("Failed to fetch entities data");
        }
        const entitiesData = await entitiesResponse.json();
        setEntities(entitiesData);
      } catch (error) {
        console.error("Error fetching entities data:", error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetchProfileData();
      await fetchServicesData();
      await fetchEntitiesData();
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="no-profile">No profile found</div>;
  }

  const specializations = entities.filter(
    (entity) => entity.entity_type === "specializations"
  );
  const awards = entities.filter(
    (entity) => entity.entity_type === "awards and recognitions"
  );

  return (
    <div className="container">
      <div className="top-section">
        <div className="doctor-details">
          <div className="profile-pic-container">
            <img
              src={profile.profile_pic}
              alt={profile.name}
              className="profile-pic"
            />
          </div>
          <div className="profile-info">
            <h1>{profile.name}</h1>
            <p>
              <strong>Degree:</strong> {profile.degree}
            </p>
            <p>
              <strong>Experience:</strong> {profile.experience} years
            </p>
            <p>
              <strong>Top Expertise:</strong> {profile.top_expertise}
            </p>
            <p>
              <strong>Description:</strong> {profile.description}
            </p>
            <p>
              <strong>City:</strong> {profile.city}
            </p>
            <p>
              <strong>Address:</strong> {profile.address}
            </p>
            <p>
              <strong>Hospital:</strong> {profile.hospital}
            </p>
            <p>
              <strong>Fees:</strong> {profile.fees}
            </p>
            <p>
              <strong>Available Days:</strong> {profile.available_days}
            </p>
            <p>
              <strong>Available Timings:</strong> {profile.available_timings}
            </p>
          </div>
        </div>
        <div className="services-section">
          <h2>Services</h2>
          {services.length > 0 ? (
            <ul>
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href={service.service_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {service.service_name}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No services available</p>
          )}
        </div>
      </div>
      <div className="bottom-section">
        <div className="section">
          <h2>Specializations</h2>
          {specializations.length > 0 ? (
            <ul>
              {specializations.map((specialization) => (
                <li key={specialization.id}>{specialization.entity_value}</li>
              ))}
            </ul>
          ) : (
            <p>No specializations available</p>
          )}
        </div>
        <div className="section">
          <h2>Awards and Recognitions</h2>
          {awards.length > 0 ? (
            <ul>
              {awards.map((award) => (
                <li key={award.id}>{award.entity_value}</li>
              ))}
            </ul>
          ) : (
            <p>No awards or recognitions available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
