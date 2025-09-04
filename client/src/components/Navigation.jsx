import { Link } from "react-router-dom";

// check for token

export default function Navigation({ token, setToken }) {

    const handleLogout = () => {
        setToken(null);

    }

    return (
        <nav>

            <ul>
                <>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/wineries">Wineries</Link></li>
                </>
                {!token && (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
                {token && (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={handleLogout}
                        className="logout-button">Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    )

}