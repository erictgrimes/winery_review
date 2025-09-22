import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import TokenContext from "../home/TokenContext";
import "../style/login-register.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if(!username.trim() || !password){
      setError("please enter both username and password");
      return;
    }

    try {
      const response = await fetch("/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username.trim(), password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      const { token } = await response.json();
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/account");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  }

  return (
    
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
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
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit">Login</button>
      <Link to="/register">Register</Link>
    </form>

  );
}
