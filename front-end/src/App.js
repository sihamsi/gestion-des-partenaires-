import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn } from "./Componenets/SignIn/Signin";
import Navbar from "./Componenets/Navbar/Navbar";
import ForgotPassword from "./Componenets/ForgotPassword/ForgotPassword";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/front-end/src/Componenets/Navbar"
            element={<Navbar />}
          />
          <Route path="/forgotpass" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
