import { useEffect,useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "../home/TokenContext";

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

  if (!user) return <p>Loading...</p>;
console.log(user)
  return (
    <div >
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
    </div>
  );
}