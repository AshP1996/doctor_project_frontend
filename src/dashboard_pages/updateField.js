import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./updateField.css";

const UpdateField = () => {
  const { field, id } = useParams();
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:9000/api/doctors/${id}/`)
      .then((response) => {
        setValue(response.data[field]);
      })
      .catch((error) => {
        console.error(`Error fetching doctor ${field}:`, error);
      });
  }, [field, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://127.0.0.1:9000/api/doctors/${id}/`, { [field]: value })
      .then((response) => {
        console.log(`Doctor ${field} updated successfully:`, response.data);
        alert(`Doctor ${field} updated successfully!`);
        navigate(`/dashboard/${id}`);
      })
      .catch((error) => {
        console.error(`Error updating doctor ${field}:`, error);
        alert(`Error updating doctor ${field}.`);
      });
  };

  return (
    <div className="update-field-container">
      <h2>Update {field.replace("_", " ")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{field.replace("_", " ")}:</label>
          <input
            type="text"
            name={field}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn-submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateField;
