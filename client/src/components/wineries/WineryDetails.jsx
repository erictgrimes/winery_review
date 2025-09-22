import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Star, StarHalf } from "lucide-react";
import TokenContext from "../home/TokenContext";
import "../style/wineryDetails.css";
import ReviewList from "../reviews/ReviewList";

function StarRating({ rating }) {
  if (rating === null || rating === undefined) return null;
  const numericRating = Number(rating);
  const fullStars = Math.floor(numericRating);
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

export default function WineryDetails() {
  const { id } = useParams();
  const [winery, setWinery] = useState(null);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const { token } = useContext(TokenContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      const res = await fetch(`/wineries/${id}/reviews`);
      const data = await res.json();
      setReviews(data);
    }
    fetchReviews();
  }, [id]);

  useEffect(() => {
    async function fetchWinery() {
      try {
        const response = await fetch(`/wineries/${id}`);
        const data = await response.json();
        console.log("Winery data:", data);
        setWinery(data);
      } catch (err) {
        console.log("Error fetching winery details:", err);
      }
    }
    fetchWinery();
  }, [id]);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setUser(data); // now we have user.id
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
    fetchUser();
  }, [token]);


  if (!winery) {
    return <div>Loading...</div>;
  }



  return (
    <div className="details">
      <h2>{winery[0].name}</h2>
      <div className="details-card">
        <div className="details-image">
          <img src={winery[0].photo} alt={winery[0].name} />
        </div>
        <div className="star-ratings">
          <span>
            Venue
            <StarRating rating={winery[0].avg_venue} />
          </span>
          <span>
            Variety
            <StarRating rating={winery[0].avg_variety} />
          </span>
          <span>
            Pricing
            <StarRating rating={winery[0].avg_pricing} />
          </span>
          <span>
            Staff
            <StarRating rating={winery[0].avg_staff} />
          </span>
          <span className="overall">
            Overall
            <StarRating rating={winery[0].avg_overall} />
          </span>
        </div>
    <div className = "winery-address">
        <p>{winery[0].address}</p>
        <p>
          {winery[0].city}, {winery[0].state}
        </p>
        </div>
        <div className="add-review">
        {token && (<button
          onClick={() => navigate(`/wineries/${winery[0].id}/addreview`)}
          disabled={!token}
        >
          Add Review
        </button>)}
        </div>
      </div>

      <ReviewList mode="winery" user={user}/>
    </div>
  );
}
