import React from "react";
import "./Navbar.css";
import { useTheme } from "../../context/ThemeContext.jsx";

const Navbar = () => {
  const { theme, toggle } = useTheme();
  return (
    <div className="navbar">
      <h3>Mind Power Solutions Car Rental</h3>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button className="btn secondary" onClick={toggle} title="Toggle theme">
          {theme === "dark" ? "Light" : "Dark"} mode
        </button>
        <span className="badge info">Admin</span>
      </div>
    </div>
  );
};

export default Navbar;
