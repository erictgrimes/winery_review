import react from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../style/randomWineries.css";
import { Star, StarHalf } from "lucide-react";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="stars flex">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={`full-${i}`} size={20} fill="gold" stroke="gold" />
      ))}
      {hasHalfStar && <StarHalf size={20} fill="gold" stroke="gold" />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <Star key={`empty-${i}`} size={20} fill="none" stroke="gold" />
      ))}
    </div>
  );
}

export default function RandomWineryCard() {
  const [wineries, setWineries] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchRandomWineries() {
      try {
        const response = await fetch("http://localhost:3000/wineries/random");
        const data = await response.json();
        setWineries(data);
      } catch (error) {
        console.error("Error fetching random wineries:", error);
      }
    }

    fetchRandomWineries();
  }, []);

  useEffect(() => {
    if (wineries.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wineries.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [wineries]);

  return (
    <div
      className="carousel"
      style={{ backgroundImage: `url(${wineries[currentIndex]?.photo})` }}
    >
      <div className="overlay">
        <div key={wineries[currentIndex]?.id}>
          <h2>{wineries[currentIndex]?.name}</h2>
          <p>{wineries[currentIndex]?.city}</p>

          {wineries[currentIndex]?.avg_rating ? (
            <div className="review-stats">
              <StarRating rating={wineries[currentIndex].avg_rating} />
              <p>{wineries[currentIndex].avg_rating} / 5</p>
              <p>({wineries[currentIndex].review_count} reviews)</p>
            </div>
          ) : (
            <p>No reviews yet</p>
          )}

          <Link to={`/wineries/${wineries[currentIndex]?.id}`}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
