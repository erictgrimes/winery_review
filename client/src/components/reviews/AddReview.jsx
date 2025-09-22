import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TokenContext from "../home/TokenContext";
import "../style/addReview.css"

export default function AddReview() {
  const { id: wineryId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(TokenContext);


  const [review, setReview] = useState({
    venue: "",
    variety: "",
    pricing: "",
    staff: "",
    overall: "",
    review_text: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review,
        [name]: name === "review_text" ? value : Number(value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch(`/wineries/${wineryId}/addreview`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${token}` },
      body: JSON.stringify(review),
      credentials: "include",
    });

    if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "failed to submit review")
    
    }
      navigate(`/wineries/${wineryId}`);
    } catch {
      alert("Failed to submit review" );

    }
  };

  console.log(review)

  return (
    <div className = "addReview">
    <form onSubmit={handleSubmit}>
      <h2>Add Review</h2>
      {["venue", "variety", "pricing", "staff", "overall"].map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}:
          <select
  name={field}
  value={review[field]}
  onChange={handleChange}
  required
>
  <option value="">Select</option>
  {[1,2,3,4,5].map(num => (
    <option key={num} value={num}>{num}</option>
  ))}
</select>
        </label>
      ))}
      <label>
        Comment:
        <textarea
          name="review_text"
          value={review.review_text}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit Review</button>
    </form>
    </div>
  );
}
