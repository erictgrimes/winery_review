import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./components/home.jsx";
import Navigation from "./components/navigation.jsx";
import Register from "./components/Register.jsx";
import "./index.css";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
