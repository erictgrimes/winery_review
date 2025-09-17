import { Link } from "react-router-dom";
import "../style/wineryCard.css";
import { Star, StarHalf } from "lucide-react";

function StarRating({ rating }) {
  if (!rating) return null;

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

export default function WineryCard({ winery }) {
  return (
    <div className="winery-card">
      <h2>{winery.name}</h2>
      <img src={winery.photo} alt={winery.name} />

      {winery?.avg_rating ? (
        <div className="review-stats">
          <StarRating rating={winery.avg_rating} />
          <span>{winery.avg_rating} / 5</span>
          <span>({winery.review_count} reviews)</span>
        </div>
      ) : (
        <p>No reviews yet</p>
      )}
      <p>{winery.address}</p>
      <Link to={`/wineries/${winery.id}`}>View Details</Link>
    </div>
  );
}