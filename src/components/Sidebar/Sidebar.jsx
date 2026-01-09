import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setActivePage, activePage }) => {
  const nav = [
    { key: "dashboard", label: "Dashboard" },
    { key: "fleet", label: "Fleet" },
    { key: "income", label: "Income" },
    { key: "profit", label: "Profit" },
    { key: "expenses", label: "Expenses" },
    { key: "reports", label: "Reports" },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Mind Power</h2>

      <ul>
        {nav.map((item) => (
          <li
            key={item.key}
            className={activePage === item.key ? "active" : ""}
            onClick={() => setActivePage(item.key)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
