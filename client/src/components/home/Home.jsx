import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import TokenContext from "./TokenContext.jsx";
import RandomWineryCard from "../wineries/RandomWineries.jsx";
import WineryList from "../wineries/WineryList.jsx";
import "../style/home.css";

//landing page for the app
export default function Home() {
  return (
    <div className="home">
      <div className="hero-image">
      <RandomWineryCard />
      </div>
      <div className="divider"></div>
      <WineryList />
    </div>
  );
}
