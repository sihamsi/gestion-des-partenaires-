import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./Componenets/SignIn/Signin";
import Navbar from "./Componenets/Navbar/Navbar";
//import Ajouter from "./Componenets/Ajouter/Ajouter";
//import PrivateRoute from "./Componenets/PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    const storedToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const getToken = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:4307/login", {
        email,
        password,
      });
      if (response.data === "Success") {
        const storedToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        setToken(storedToken);
        setIsLoggedIn(true);
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const callApi = async () => {
    try {
      const response = await axios.get("http://localhost:4307/api", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApiResponse(response.data.data);
    } catch (error) {
      console.error("Error calling API", error);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn onLogin={getToken} />} />
          <Route
            path="/front-end/src/Componenets/Navbar"
            element={<Navbar />}
          />
        </Routes>
      </BrowserRouter>
      {isLoggedIn && (
        <div>
          <button onClick={callApi}>Call API</button>
          {apiResponse && <div>API Response: {apiResponse}</div>}
        </div>
      )}
    </div>
  );
}

export default App;
