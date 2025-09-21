import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";
import TokenContext from "../home/TokenContext";

export default function ReviewList({ mode, user }) {
  const { id } = useParams(); 
  const { token } = useContext(TokenContext);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        let url = "";
        let headers = {};

        if (mode === "winery") {
          url = `http://localhost:3000/wineries/${id}/reviews`;

        } else if (mode === "user" && user?.id) {
          url = `http://localhost:3000/users/${user.id}/reviews`;
          headers = { Authorization: `Bearer ${localStorage.getItem("token")}` };
        }
        if (!url) return;

        const res = await fetch(url, {  headers });
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    }
    fetchReviews();
  }, [id, user, mode]);

  if (!reviews.length) {
    return <p>No reviews yet.</p>;
  }

  const handleDelete = (deletedId) => {
    setReviews((prev) => prev.filter((r) => r.id !== deletedId));
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
         <ReviewCard
          key={review.id}
          review={review}
          user={user} 
          onDelete={handleDelete} 
        />
      ))}
    </div>
  );
}