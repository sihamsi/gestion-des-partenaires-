import React, { useState } from "react";
import "./Signin.css";
import axios from "axios";
import password_icon from "../Assets/password.png";
import email_icon from "../Assets/mail.png";
import validation from "./SigninValidation";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const handleDeleSignin = () => {
    navigate("/front-end/src/Componenets/Navbar");
  };
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validation(values);
    setErrors(validationErrors);

    // Check if there are no errors
    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:4308/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/front-end/src/Componenets/Navbar");
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
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
            name="email"
            value={values.email}
            onChange={handleInput}
          />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            onChange={handleInput}
          />
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
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
            Forgot Password? <span className="click-here">Click Here</span>
          </div>
        </div>
        <button
          type="submit"
          className="submit-button"
          onClick={handleDeleSignin}
        >
          <div className="Sign-in">Sign In</div>
        </button>
      </form>
    </div>
  );
};
