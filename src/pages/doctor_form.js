import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./doctor_form.css";

const DoctorForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profile_pic: "",
    name: "",
    degree: "",
    experience: "",
    top_expertise: "",
    description: "",
    page_url: "",
    area: "",
    city: "",
    address: "",
    hospital: "",
    fees: "",
    available_days: "",
    available_timings: "",
    services: [],
    profileEntities: {
      specializations: [""],
      awards: [""],
      education: [""],
      memberships: [""],
      registrations: [""],
    },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} to ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profile_pic: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceChange = (e, index) => {
    const { value } = e.target;
    console.log(`Updating service at index ${index} to ${value}`);
    setFormData((prevData) => {
      const services = [...prevData.services];
      services[index] = value;
      return {
        ...prevData,
        services,
      };
    });
  };

  const handleProfileEntityChange = (e, entityKey, valueIndex) => {
    const { value } = e.target;
    console.log(`Updating ${entityKey} at index ${valueIndex} to ${value}`);
    setFormData((prevData) => {
      const profileEntities = { ...prevData.profileEntities };
      profileEntities[entityKey][valueIndex] = value;
      return {
        ...prevData,
        profileEntities,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    // Validate formData before submitting
    if (!formData.name.trim()) {
      alert("Please fill out the name field.");
      return;
    }

    axios
      .post("http://127.0.0.1:9000/api/doctors/create/", formData)
      .then((response) => {
        console.log("Doctor added successfully:", response.data);
        alert("Doctor added successfully!");
        navigate(`/doctor_dashboard/${response.data.id}`);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error adding doctor:", error.response.data);
          alert(`Error adding doctor: ${JSON.stringify(error.response.data)}`);
        } else {
          console.error("Error adding doctor:", error.message);
          alert(
            "Error adding doctor. Please check the console for more details."
          );
        }
      });
  };

  const addServiceField = () => {
    console.log("Adding new service field");
    setFormData((prevData) => ({
      ...prevData,
      services: [...prevData.services, ""],
    }));
  };

  const addProfileEntityValueField = (entityKey) => {
    console.log(`Adding new value field for ${entityKey}`);
    setFormData((prevData) => {
      const profileEntities = { ...prevData.profileEntities };
      profileEntities[entityKey].push("");
      return {
        ...prevData,
        profileEntities,
      };
    });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderTimePicker = (name, value) => {
    return (
      <input
        type="time"
        name={name}
        value={value}
        onChange={handleChange}
        className="form-control"
      />
    );
  };

  return (
    <div className="doctor-form-container">
      <h2>Add Doctor</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <>
            <div className="form-group">
              <label>Profile Picture:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="form-control"
              />
              {formData.profile_pic && (
                <img
                  src={formData.profile_pic}
                  alt="Profile Preview"
                  className="img-preview"
                />
              )}
            </div>
            <div className="form-group">
              <label>
                Name: <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter doctor's name"
                required
              />
            </div>
            <div className="form-group">
              <label>Degree:</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter degree"
              />
            </div>
            <div className="form-group">
              <label>Experience:</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter years of experience"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Top Expertise:</label>
              <input
                type="text"
                name="top_expertise"
                value={formData.top_expertise}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter top expertise"
              />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter description"
              />
            </div>
            <div className="form-group">
              <label>Page URL:</label>
              <input
                type="text"
                name="page_url"
                value={formData.page_url}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter page URL"
              />
            </div>
            <div className="form-group">
              <label>Area:</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter area"
              />
            </div>
            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter city"
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter address"
              />
            </div>
            <div className="form-group">
              <label>Hospital:</label>
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter hospital name"
              />
            </div>
            <div className="form-group">
              <label>Fees:</label>
              <input
                type="number"
                name="fees"
                value={formData.fees}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter consultation fees"
                min="0"
              />
            </div>
            <div className="form-group">
              <label>Available Days:</label>
              <input
                type="text"
                name="available_days"
                value={formData.available_days}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter available days"
              />
            </div>
            <div className="form-group">
              <label>Available Timings:</label>
              {renderTimePicker(
                "available_timings",
                formData.available_timings
              )}
            </div>
            <button type="button" onClick={nextStep} className="btn-next">
              Next
            </button>
          </>
        )}

        {step === 2 && (
          <>
            {/* Services */}
            <div className="form-group">
              <h3>Services</h3>
              {formData.services.map((service, index) => (
                <input
                  key={index}
                  type="text"
                  value={service}
                  onChange={(e) => handleServiceChange(e, index)}
                  className="form-control"
                  placeholder="Enter service"
                />
              ))}
              <button type="button" onClick={addServiceField}>
                Add Service
              </button>
            </div>

            {/* Profile Entities */}
            <div className="form-group">
              <h3>Profile Entities</h3>
              {Object.keys(formData.profileEntities).map((entityKey) => (
                <div key={entityKey}>
                  <h4>
                    {entityKey.charAt(0).toUpperCase() + entityKey.slice(1)}
                  </h4>
                  {formData.profileEntities[entityKey].map(
                    (value, valueIndex) => (
                      <input
                        key={valueIndex}
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleProfileEntityChange(e, entityKey, valueIndex)
                        }
                        placeholder={`Enter ${entityKey}`}
                        className="form-control"
                      />
                    )
                  )}
                  <button
                    type="button"
                    onClick={() => addProfileEntityValueField(entityKey)}
                  >
                    Add {entityKey}
                  </button>
                </div>
              ))}
            </div>

            <button type="button" onClick={prevStep} className="btn-prev">
              Previous
            </button>
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default DoctorForm;
