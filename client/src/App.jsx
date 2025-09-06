import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";

function App() {
  return (
    <div>
      <h1>Welcome to Winery Review</h1>
      <Login />
    </div>
  );
}

export default App;
