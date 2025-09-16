import react from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/randomWineries.css";


export default function RandomWineryCard() {
    const [wineries, setWineries] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0);

    
    useEffect(() => {
        async function fetchRandomWineries() {
            try {
                const response = await fetch('http://localhost:3000/wineries/random');
                const data = await response.json();
                setWineries(data);
            } catch (error) {
                console.error('Error fetching random wineries:', error);
            }
        }

        fetchRandomWineries();
    }, []);

    useEffect(() => {
        if (wineries.length === 0) return;
        const interval = setInterval(()=> {
            setCurrentIndex((prev)=> (prev + 1) % wineries.length);
    }, 10000);
    return () => clearInterval(interval);
}, [wineries]);

    return (
        <div className="carousel" 
        style ={{backgroundImage: `url(${wineries[currentIndex]?.photo})`,}}>
            <div className="overlay">
                <div key={wineries[currentIndex]?.id}>
                    <h2>{wineries[currentIndex]?.name}</h2>
                    <p>{wineries[currentIndex]?.address}</p>
                    
                    <Link to={`/wineries/${wineries[currentIndex]?.id}`}>View Details</Link>
                </div>
        </div>
        </div>
    );
}