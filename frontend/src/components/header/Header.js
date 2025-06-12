import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

function Header() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNav, setShowNav] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const shouldShowNav = isAuthenticated && !["/login", "/register"].includes(location.pathname);
    setShowNav(shouldShowNav);
    setShowLogout(isAuthenticated);
  }, [location.pathname, isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left" role="banner" onClick={() => navigate("/home")}>
        <h1 aria-label="Encryption App">EncryptionApp</h1>
      </div>

      {showNav && (
        <nav className="header-nav" aria-label="Main navigation">
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/encryption">Szyfrowanie</Link></li>
            <li><Link to="/messages">Wiadomości</Link></li>
          </ul>
        </nav>
      )}

      {showLogout && (
        <div className="header-right">
          <button onClick={handleLogout} aria-label="Wyloguj się">Wyloguj</button>
        </div>
      )}
    </header>
  );
}

export default Header;
