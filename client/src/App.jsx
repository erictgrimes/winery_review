import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/user/Login.jsx";
import Home from "./components/home/Home.jsx";
import Navigation from "./components/home/Navigation.jsx";
import Register from "./components/user/Register.jsx";
import WineryList from "./components/wineries/WineryList.jsx";
import "./index.css";

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wineries" element={<WineryList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
