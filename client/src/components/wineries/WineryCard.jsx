import { Link } from "react-router-dom";
import "../style/wineryCard.css";

export default function WineryCard({ winery }) {
  return (
    <div className="winery-card">
      <h2>{winery.name}</h2>
      <p>{winery.address}</p>
      <img src={winery.photo} alt={winery.name} />
      <Link to={`/wineries/${winery.id}`}>View Details</Link>
    </div>
  );
}