import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import TokenContext from "./TokenContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      const { token } = await response.json();
      setToken(token);
      localStorage.setItem("authToken", token);
      navigate("/Home");
    } catch (error) {
      setError("An unexpected error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
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
    </form>
  );
}
