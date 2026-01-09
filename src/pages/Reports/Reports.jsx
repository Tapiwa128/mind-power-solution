import React from "react";
import { calculateProfit } from "../../utils/profitCalculator";
import "./Reports.css";

const Reports = () => {
  // Pull minimal data from storage for demo
  let monthlyIncome = 0;
  try {
    const income = JSON.parse(localStorage.getItem("incomeData") || "[]");
    monthlyIncome = income.reduce((s, x) => s + Number(x.amount || 0), 0);
  } catch {
    // Silently fail if income data is not available
  }

  const expenses = {
    fuel: 500,
    maintenance: 300,
    insurance: 100,
    tolls: 0,
  };

  const report = calculateProfit(
    monthlyIncome,
    expenses.fuel,
    expenses.insurance,
    expenses.maintenance,
    expenses.tolls
  );

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Monthly Financial Report</h2>

      {/* Income Section */}
      <div className="card" style={{ marginBottom: 12 }}>
        <h3>Income Summary</h3>
        <p>Total Monthly Income: <strong>${monthlyIncome.toFixed(2)}</strong></p>
      </div>

      {/* Expense Section */}
      <div className="card" style={{ marginBottom: 12 }}>
        <h3>Expense Summary</h3>
        <p>Fuel: ${expenses.fuel}</p>
        <p>Maintenance & Service: ${expenses.maintenance}</p>
        <p>Insurance: ${expenses.insurance}</p>
        <p>Toll Fees: ${expenses.tolls}</p>
        <p className="total">
          Total Expenses: $
          {expenses.fuel +
            expenses.maintenance +
            expenses.insurance +
            expenses.tolls}
        </p>
      </div>

      {/* Profit Section */}
      <div className="card" style={{ borderColor: "#14532d", background: "#052e16" }}>
        <h3>Profit Calculation</h3>
        <p>Operating Balance: ${report.operatingBalance.toFixed(2)}</p>
        <p>Driver Commission (10%): ${report.driverCommission.toFixed(2)}</p>
        <p>
          Net Profit: <strong>${report.netProfit.toFixed(2)}</strong>
        </p>
      </div>

      {/* Profit Sharing */}
      <div className="card" style={{ marginTop: 12 }}>
        <h3>Profit Distribution (33.33% Each)</h3>
        <p>Tapiwa Family: ${report.tapiwaFamily.toFixed(2)}</p>
        <p>Sunil Family: ${report.sunilFamily.toFixed(2)}</p>
        <p>Car EMI (Sunil): ${report.carEMI.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Reports;
