import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import Fleet from "../Fleet/Fleet";
import Income from "../Income/Income";
import Expenses from "../Expenses/Expenses";
import Reports from "../Reports/Reports";

import "./Dashboard.css";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "fleet":
        return <Fleet />;
      case "income":
        return <Income />;
      case "expenses":
        return <Expenses />;
      case "reports":
        return <Reports />;
      default:
        return (
          <div className="dashboard-overview">
            <h2>Dashboard Overview</h2>
            <p>Welcome to Mind Power Solutions ERP. Select a page from the sidebar.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-page">
      <Sidebar setActivePage={setActivePage} />

      <div className="main-content">
        <Navbar />

        <div className="content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
