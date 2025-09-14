import { useState, useEffect } from "react";
import WineryCard from "./WineryCard";

export default function WineryList() {
  const [wineries, setWineries] = useState([]);

  useEffect(() => {
    async function fetchWineries() {
      try {
        const response = await fetch("http://localhost:3000/wineries");
        const data = await response.json();
        setWineries(data);
      } catch (error) {
        console.error("Error fetching wineries:", error);
      }
    }

    fetchWineries();
  }, []);

  return (
    <div className="winery-list">
      {wineries.map((winery) => (
        <WineryCard key={winery.id} winery={winery} />
      ))}
    </div>
  );
}
