import React, { useState } from "react";
import axios from "axios";
import password_pic from "../Assets/password.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [ForgotPassword1, setForgotPassword1] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4308/forgot-password",
        { email }
      );
      setMessage("A password reset link has been sent to your email.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      if (error.response) {
        setMessage(
          `Error: ${
            error.response.data.error || "There was an error. Please try again."
          }`
        );
      } else {
        setMessage("An unknown error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5">
            <div className="card-body text-center">
              <img src={password_pic} alt="" />
              <h4 className="card-title">Problèmes de connexion ?</h4>
              <p className="card-text">
                Entrez votre adresse e-mail et nous vous enverrons un lien pour
                récupérer votre compte.
              </p>
              <form onSubmit={handleForgotPassword}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                  onClick={() => setForgotPassword1(true)}
                >
                  Envoyer un lien de connexion
                </button>
              </form>
              {message && <p className="mt-3">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
