import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const scrollLeft = (containerClass) => {
    document.querySelector(containerClass).scrollBy({
      top: 0,
      left: -200,
      behavior: "smooth",
    });
  };

  const scrollRight = (containerClass) => {
    document.querySelector(containerClass).scrollBy({
      top: 0,
      left: 200,
      behavior: "smooth",
    });
  };

  const redirectToDoctorPage = () => {
    navigate("/doctor");
  };

  return (
    <div className="home">
      <div className="hero-block">
        <h1>Welcome to Our Service</h1>
        <div>
          <p className="typing-animation">
            Your health is our top priority. Experience quality care and
            dedicated service.
          </p>
        </div>
        <div>
          <button className="find-doctor-button" onClick={redirectToDoctorPage}>
            Find Doctor
          </button>
        </div>
      </div>

      <div className="specification-block">
        <button
          className="scroll-button left"
          onClick={() => scrollLeft(".specification-container")}
        >
          {"<"}
        </button>
        <div className="cards-wrapper">
          <div className="cards-container specification-container">
            <div className="specification-card">Card 1</div>
            <div className="specification-card">Card 2</div>
            <div className="specification-card">Card 3</div>
            <div className="specification-card">Card 4</div>
            <div className="specification-card">Card 5</div>
            <div className="specification-card">Card 6</div>
            <div className="specification-card">Card 7</div>
          </div>
        </div>
        <button
          className="scroll-button right"
          onClick={() => scrollRight(".specification-container")}
        >
          {">"}
        </button>
      </div>
      <div className="common-health-concern">
        <button
          className="scroll-button left"
          onClick={() => scrollLeft(".concern-container")}
        >
          {"<"}
        </button>
        <div className="cards-wrapper">
          <div className="cards-container concern-container">
            <div className="concern-card">Concern 1</div>
            <div className="concern-card">Concern 2</div>
            <div className="concern-card">Concern 3</div>
            <div className="concern-card">Concern 4</div>
            <div className="concern-card">Concern 5</div>
            <div className="concern-card">Concern 6</div>
            <div className="concern-card">Concern 7</div>
          </div>
        </div>
        <button
          className="scroll-button right"
          onClick={() => scrollRight(".concern-container")}
        >
          {">"}
        </button>
      </div>
      <div className="content-info">
        <h2>Content Information</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          feugiat libero nec velit facilisis, non varius justo convallis. Donec
          volutpat justo a felis tincidunt, sit amet ullamcorper dolor
          venenatis. Curabitur at turpis a erat varius facilisis.
        </p>
      </div>
      <div className="services">
        <h2>Our Services</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          facilisis malesuada elit, at ultrices purus. In hac habitasse platea
          dictumst. Proin sit amet vestibulum nulla.
        </p>
      </div>
    </div>
  );
};

export default Home;
