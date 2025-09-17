import { useState, useEffect } from "react";
import WineryCard from "./WineryCard";
import "../style/wineryList.css";

export default function WineryList() {
  const [wineries, setWineries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWineries, setFilteredWineries] = useState([]);

  useEffect(() => {
    async function fetchWineries() {
      try {
        const response = await fetch("http://localhost:3000/wineries");
        const data = await response.json();
        setWineries(data);
        setFilteredWineries(data);
      } catch (error) {
        console.error("Error fetching wineries:", error);
      }
    }

    fetchWineries();
  }, []);

  useEffect(() => {
    const filtered = wineries.filter((winery) =>
      winery.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredWineries(filtered);
  }, [searchTerm, wineries]);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="winery-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search wineries..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {filteredWineries.length === 0 && (
        <p>No wineries found matching "{searchTerm}"</p>
      )}
      {filteredWineries.map((winery) => (
        <WineryCard key={winery.id} winery={winery}  />
      ))}
    </div>
  );
}

