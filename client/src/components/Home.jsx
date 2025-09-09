import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./navigation.jsx";
import TokenContext from "./TokenContext.jsx";
import RandomWineryCard from "./ReviewCard.jsx";
import { getRandomWineries } from "../api/wineries.js";

//landing page for the app
export default function Home() {
  return (
    <div>
        <Navigation />
        <>Welcome to Winery Review</>
        <div className="random-wineries">
            <RandomWineryCard />
        </div>


    </div>
  );
}