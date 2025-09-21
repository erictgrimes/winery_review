import { useEffect,useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../home/TokenContext";
import ReviewList from "../reviews/ReviewList";
import "../style/account.css"

export default function Account() {
  const {token, setToken } = useContext(TokenContext);
  const [user, setUser] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        

        if (!response.ok) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    }

    fetchUser();
  }, [navigate]);

   const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account? This cannot be undone.")) return;

    try {
      const response = await fetch("http://localhost:3000/users/me", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setToken(null);
        localStorage.removeItem("token");
        navigate("/"); // redirect after deletion
      } else {
        const error = await response.text();
        alert("Error deleting account: " + error);
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting account");
    }
  };

  if (!user) return <p>Loading...</p>;
console.log(user)
  return (
    <div className = "account">
    <div className ="userCard" >
      <h1>My Account</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
      >
        Logout
      </button>
      <button 
          onClick={handleDeleteAccount}
        >Delete Account</button>
    </div>
    <div className = "reviews">
        <ReviewList mode="user" user={user}/>
    </div>
    </div>
  );
}