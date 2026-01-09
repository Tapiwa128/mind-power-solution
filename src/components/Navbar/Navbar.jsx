import React from "react";
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext.jsx";

const Navbar = () => {
  const { theme, toggle } = useTheme();
  return (
    <div className="navbar">
      <h3>Mind Power Car Rental</h3>
      <div className="navbar-actions">
        <button className="theme-toggle" onClick={toggle} title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {theme === "dark" ? (
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            ) : (
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            )}
          </svg>
        </button>
        <span className="badge info">Admin</span>
      </div>
    </div>
  );
};

export default Navbar;
