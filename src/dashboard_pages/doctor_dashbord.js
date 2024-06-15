import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./doctor_dashbord.css";

const Dashboard = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [view, setView] = useState("profile"); // State to toggle between profile and update views
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:9000/api/doctors/${id}/`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctor details:", error);
      });
  }, [id]);

  const handleUpdate = (field) => {
    navigate(`/update_${field}/${id}`);
  };

  if (!doctor) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar">
        <h3>Navigation</h3>
        <ul>
          <li onClick={() => setView("profile")}>Profile</li>
          <li onClick={() => setView("update")}>Update</li>
        </ul>
      </div>
      <div className="dashboard-container">
        {view === "profile" ? (
          <div className="profile-section">
            <h2>Doctor Details</h2>
            <div className="profile-detail">
              <strong>Name:</strong> {doctor.name}
            </div>
            <div className="profile-detail">
              <strong>Profile Picture:</strong>
              <img
                src={doctor.profile_pic}
                alt={doctor.name}
                className="profile-pic"
              />
            </div>
            <div className="profile-detail">
              <strong>Degree:</strong> {doctor.degree}
            </div>
            <div className="profile-detail">
              <strong>Experience:</strong> {doctor.experience}
            </div>
            <div className="profile-detail">
              <strong>Top Expertise:</strong> {doctor.top_expertise}
            </div>
            <div className="profile-detail">
              <strong>Description:</strong> {doctor.description}
            </div>
            <div className="profile-detail">
              <strong>Page URL:</strong>
              <a href={doctor.page_url}>{doctor.page_url}</a>
            </div>
            <div className="profile-detail">
              <strong>Area:</strong> {doctor.area}
            </div>
            <div className="profile-detail">
              <strong>City:</strong> {doctor.city}
            </div>
            <div className="profile-detail">
              <strong>Address:</strong> {doctor.address}
            </div>
            <div className="profile-detail">
              <strong>Hospital:</strong> {doctor.hospital}
            </div>
            <div className="profile-detail">
              <strong>Fees:</strong> {doctor.fees}
            </div>
            <div className="profile-detail">
              <strong>Available Days:</strong> {doctor.available_days}
            </div>
            <div className="profile-detail">
              <strong>Available Timings:</strong> {doctor.available_timings}
            </div>
            <div className="profile-detail">
              <h3>Services</h3>
              {doctor.services && doctor.services.length > 0 ? (
                doctor.services.map((service, index) => (
                  <p key={index}>{service}</p>
                ))
              ) : (
                <p>No services listed</p>
              )}
            </div>
            <div className="profile-detail">
              <h3>Profile Entities</h3>
              {doctor.profileEntities && doctor.profileEntities.length > 0 ? (
                doctor.profileEntities.map((entity, entityIndex) => (
                  <div key={entityIndex}>
                    <strong>Type:</strong> {entity.type}
                    {entity.values.map((value, valueIndex) => (
                      <p key={valueIndex}>{value}</p>
                    ))}
                  </div>
                ))
              ) : (
                <p>No profile entities listed</p>
              )}
            </div>
          </div>
        ) : (
          <div className="update-section">
            <h2>Update Doctor Details</h2>
            <div className="update-buttons">
              <button onClick={() => handleUpdate("profile_pic")}>
                Update Profile Picture
              </button>
              <button onClick={() => handleUpdate("degree")}>
                Update Degree
              </button>
              <button onClick={() => handleUpdate("experience")}>
                Update Experience
              </button>
              <button onClick={() => handleUpdate("top_expertise")}>
                Update Top Expertise
              </button>
              <button onClick={() => handleUpdate("description")}>
                Update Description
              </button>
              <button onClick={() => handleUpdate("page_url")}>
                Update Page URL
              </button>
              <button onClick={() => handleUpdate("area")}>Update Area</button>
              <button onClick={() => handleUpdate("city")}>Update City</button>
              <button onClick={() => handleUpdate("address")}>
                Update Address
              </button>
              <button onClick={() => handleUpdate("hospital")}>
                Update Hospital
              </button>
              <button onClick={() => handleUpdate("fees")}>Update Fees</button>
              <button onClick={() => handleUpdate("available_days")}>
                Update Available Days
              </button>
              <button onClick={() => handleUpdate("available_timings")}>
                Update Available Timings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
