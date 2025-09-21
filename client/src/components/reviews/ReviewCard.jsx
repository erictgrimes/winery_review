import { Star } from "lucide-react";
import "../style/reviewCard.css";

function StarRating({ rating }) {
  const numeric = Number(rating);
  const stars = Array.from({ length: 5 }, (_, i) => i < numeric);

  return (
    <div className="flex">
      {stars.map((filled, i) => (
        <Star
          key={i}
          size={16}
          className={filled ? "text-yellow-500" : "text-gray-300"}
          fill={filled ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

export default function ReviewCard({ review, user, onDelete }) {
  const {
    id,
    user_id,
    username,
    overall,
    staff,
    pricing,
    variety,
    venue,
    review_text,
    date,
    winery_name,
  } = review;

  console.log(review)
  const formattedDate = new Date(date).toLocaleDateString();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await fetch(`http://localhost:3000/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (onDelete) onDelete(id, user_id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className ="review-card">
      <div >
        <span className="username">{username}</span>
      </div>
      <div >
        <span className="wineryname">{winery_name}</span></div>

      <div >
        <div >
          <span>Overall:</span> <StarRating rating={overall} />
        </div>
        <div>
          <span>Staff:</span> <StarRating rating={staff} />
        </div>
        <div>
          <span>Pricing:</span> <StarRating rating={pricing} />
        </div>
        <div>
          <span>Variety:</span> <StarRating rating={variety} />
        </div>
        <div>
          <span>Venue:</span> <StarRating rating={venue} />
        </div>
      </div>
      <p >{review_text}</p>
      <span >{formattedDate}</span>
        {user?.id === user_id && (
          <button onClick={handleDelete} className="delete-button">
            Delete
          </button>)}
    </div>
  );
}