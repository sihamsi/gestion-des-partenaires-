import React, { useState } from "react";
import axios from "axios";
import "./Signin.css"; // Import the CSS file
import password_icon from "../Assets/password.png"; // Import the password icon
import email_icon from "../Assets/mail.png"; // Import the email icon
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Print payload to verify it
    const payload = { email, password };
    console.log("Payload being sent:", payload);

    try {
      const response = await axios.post(
        "http://localhost:4308/login/user",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response data:", response.data);
      if (response.data === "Success") {
        navigate("/front-end/src/Componenets/Navbar"); // Navigate to the Navbar page after successful login
      } else {
        setError("No record existed");
      }
    } catch (error) {
      const errorMessage = error.response?.data || "Login failed";
      console.error("Login failed:", errorMessage);
      setError(errorMessage);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotpass"); // Navigate to forgot password page
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign In</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit} className="inputs">
        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="Remember-forgot-container">
          <div className="Remember-me">
            <label>
              <input
                className="Check-box"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
          </div>
          <div className="forgot-password">
            Forgot Password?{" "}
            <span className="click-here" onClick={handleForgotPassword}>
              Click Here
            </span>
          </div>
        </div>
        <button type="submit" className="submit-button">
          <div className="Sign-in">Sign In</div>
        </button>
      </form>
    </div>
  );
}
