import { Link, useNavigate } from "react-router-dom";
import "../style/navigation.css";
import { useContext } from "react";
import TokenContext from "../home/TokenContext";


// check for token


export default function Navigation() {

  const { token, setToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");

  };


  return (
    <div className="navigation">
    <div className="logo" style={{width: "300px"}}>
      <img src="src/assets/wrLogo.png" alt="Winery Review Logo" style={{ width: "100px", height: "100px" }} />
    </div>
    <div className="app-title">
      <h1>Winery Review</h1>
    </div>
    <div className ="nav-links" style={{width: "300px"}}>
      <nav>
        <ul>
          <>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/wineries">Wineries</Link>
            </li>
          </>
          {!token && (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link to="/account">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                  </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
    </div>
  );
}
