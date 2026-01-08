import React from "react";
import "./Sidebar.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <h2 className="logo">Mind Power</h2>

      <ul>
        <li onClick={() => setActivePage("dashboard")}>Dashboard</li>
        <li onClick={() => setActivePage("fleet")}>Fleet Management</li>
        <li onClick={() => setActivePage("income")}>Income</li>
        <li onClick={() => setActivePage("expenses")}>Expenses</li>
        <li onClick={() => setActivePage("reports")}>Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;
