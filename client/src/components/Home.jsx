import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./navigation.jsx";
import TokenContext from "./TokenContext.jsx";
import RandomWineryCard from "./randomWineries.jsx";
import WineryList from "./WineryList.jsx";

//landing page for the app
export default function Home() {
  return (
    <div>
      <h1>Welcome to Winery Review</h1>
      <RandomWineryCard />
    </div>
  );
}
