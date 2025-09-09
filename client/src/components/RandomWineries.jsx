import react from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getRandomWineries } from "@server/api/wineries.js";


export default function RandomWineryCard({ winery }) {
    const [wineries, setWineries] = useState([])
    useEffect(() => {
        async function fetchWineries() {
            try {
                const response = await fetch('@server/api/wineries/random');
                const data = await response.json();
                setWineries(data);
            } catch (error) {
                console.error('Error fetching random wineries:', error);
            }
        }

        fetchWineries();
    }, []);

    return (
        <div>
            {wineries.map((winery) => (
                <div key={winery.id}>
                    <h2>{winery.name}</h2>
                    <p>{winery.description}</p>
                    <Link to={`/wineries/${winery.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
}