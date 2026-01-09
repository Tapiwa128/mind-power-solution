import React from "react";
import { calculateProfit } from "../../utils/profitCalculator";
import "./Reports.css";

const Reports = () => {
  // Temporary static data (later from state / backend)
  const monthlyIncome = 4000;

  const expenses = {
    fuel: 500,
    service: 300,
    insurance: 100,
    tolls: 0,
  };

  const report = calculateProfit(
    monthlyIncome,
    expenses.fuel,
    expenses.insurance,
    expenses.service,
    expenses.tolls
  );

  return (
    <div className="reports">
      <h2>Monthly Financial Report</h2>

      {/* Income Section */}
      <div className="report-card">
        <h3>Income Summary</h3>
        <p>Total Monthly Income: <strong>${monthlyIncome}</strong></p>
      </div>

      {/* Expense Section */}
      <div className="report-card">
        <h3>Expense Summary</h3>
        <p>Fuel: ${expenses.fuel}</p>
        <p>Maintenance & Service: ${expenses.service}</p>
        <p>Insurance: ${expenses.insurance}</p>
        <p>Toll Fees: ${expenses.tolls}</p>
        <p className="total">
          Total Expenses: $
          {expenses.fuel +
            expenses.service +
            expenses.insurance +
            expenses.tolls}
        </p>
      </div>

      {/* Profit Section */}
      <div className="report-card highlight">
        <h3>Profit Calculation</h3>
        <p>Operating Balance: ${report.operatingBalance}</p>
        <p>Driver Commission (10%): ${report.driverCommission}</p>
        <p className="net">
          Net Profit: ${report.netProfit}
        </p>
      </div>

      {/* Profit Sharing */}
      <div className="report-card">
        <h3>Profit Distribution (33.33% Each)</h3>
        <p>Tapiwa Family: ${report.tapiwaFamily}</p>
        <p>Sunil Family: ${report.sunilFamily}</p>
        <p>Car EMI (Sunil): ${report.carEMI}</p>
      </div>
    </div>
  );
};

export default Reports;
