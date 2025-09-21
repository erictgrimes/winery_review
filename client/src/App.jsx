import React, { useState, useEffect} from "react";
import { Link, Route, Routes } from "react-router-dom";
import TokenContext from "./components/home/TokenContext.jsx";


import Login from "./components/user/Login.jsx";
import Home from "./components/home/Home.jsx";
import Navigation from "./components/home/Navigation.jsx";
import Register from "./components/user/Register.jsx";
import WineryList from "./components/wineries/WineryList.jsx";
import WineryDetails from "./components/wineries/WineryDetails.jsx";
import Account from "./components/user/Account.jsx";
import AddReview from "./components/reviews/AddReview.jsx";
import "./index.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  
  useEffect(()=> {
    if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
  }, [token]);


  return (
    <div>
      <TokenContext.Provider value={{ token, setToken }}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wineries" element={<WineryList />} />
        <Route path="/wineries/:id" element={<WineryDetails />} />
        <Route path="/wineries/:id/addreview" element = {<AddReview />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />}/>
      </Routes>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
