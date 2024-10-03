import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import logo from "../Assets/cashplus.png";
import hero from "../Assets/HEEERO.png";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optionally clear any cookies if using cookies for authentication
    // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Redirect to the login page
    navigate("/"); // Redirects to login page
  };

  const handleServices = () => {
    navigate("/front-end/src/Componenets/Navbar");
  };

  const handleHome = () => {
    navigate("/front-end/src/Componenets/HomePage");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-secondary">
        <div className="container-fluid">
          <img src={logo} alt="Logo" className="logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleHome}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#" onClick={handleServices}>
                  Services
                </a>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header
        className="hero-section"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          backgroundColor: "#F7FBFC",
        }}
      >
        {/* Left Section: Text */}
        <div className="text-section" style={{ flex: "1", textAlign: "left" }}>
          <button
            style={{
              border: "2px dashed #C7E0E9",
              backgroundColor: "#F7FBFC",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            Bonjour!
          </button>
          <h1 style={{ fontSize: "3rem", marginTop: "10px" }}>
            BIENVENUE DANS VOTRE ESPACE <br />
            <span style={{ color: "#008F95", fontWeight: "bold" }}>
              UTILISATEUR
            </span>{" "}
          </h1>
          <button
            className="btn btn-primary"
            style={{
              marginTop: "20px",
              backgroundColor: "#008F95",
              padding: "10px 20px",
              fontSize: "18px",
            }}
            onClick={handleServices}
          >
            SERVICES
          </button>
        </div>

        {/* Right Section: Image */}
        <div
          className="image-section"
          style={{ flex: "1", display: "flex", justifyContent: "center" }}
        >
          <img
            src={hero}
            alt="Cash Plus Partners"
            style={{
              width: "90%",
              maxWidth: "500px",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default HomePage;
