import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./Navigation.jsx";
import TokenContext from "./TokenContext.jsx";
import RandomWineryCard from "./RandomWineries.jsx";
import WineryList from "../wineries/WineryList.jsx";
import "../style/home.css";

//landing page for the app
export default function Home() {
  return (
    <div>
      <h1>Welcome to Winery Review</h1>
      <RandomWineryCard />
      <div className="divider"></div>
      <WineryList />
    </div>
  );
}
