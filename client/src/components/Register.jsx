import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import TokenContext from "./TokenContext";
import "./index.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const { setToken } = useContext(TokenContext);
  const navigtate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch("/server/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }
      const { token } = await response.json();
      setToken(token);
      localStorage.setItem("authToken", token);
      navigtate("/home");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
        <h2><Link to="/login">Login</Link></h2>
        <h2>Register</h2>
      <div>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Register</button>
    </form>
  );
}