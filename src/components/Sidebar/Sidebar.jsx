import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const nav = [
    { key: "dashboard", label: "Dashboard", icon: "📊" },
    { key: "fleet", label: "Fleet", icon: "🚗" },
    { key: "income", label: "Income", icon: "💰" },
    { key: "expenses", label: "Expenses", icon: "💸" },
    { key: "profit", label: "Profit", icon: "📈" },
    { key: "reports", label: "Reports", icon: "📋" },
  ];

  const getActivePage = () => {
    const path = location.pathname;
    if (path === "/" || path === "/dashboard") return "dashboard";
    return path.substring(1);
  };

  const activePage = getActivePage();

  const handleNavigation = (key) => {
    if (key === "dashboard") {
      navigate("/");
    } else {
      navigate(`/${key}`);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">Mind Power</h2>
        <span className="logo-subtitle">Car Rental</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {nav.map((item) => (
            <li
              key={item.key}
              className={activePage === item.key ? "active" : ""}
              onClick={() => handleNavigation(item.key)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
