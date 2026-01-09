import React from "react";
import { calculateProfit } from "../../utils/profitCalculator";
import "./Profit.css";

const Profit = ({ income, expenses }) => {
  const result = calculateProfit(
    income,
    expenses.fuel,
    expenses.insurance,
    expenses.service,
    expenses.tolls
  );

  return (
    <div className="profit">
      <h2>Monthly Profit & Sharing</h2>

      <div className="profit-card">
        <p><strong>Operating Balance:</strong> ${result.operatingBalance}</p>
        <p><strong>Driver Commission (10%):</strong> ${result.driverCommission}</p>
        <p><strong>Net Profit:</strong> ${result.netProfit}</p>
      </div>

      <div className="profit-split">
        <h3>Profit Distribution</h3>
        <p>Tapiwa Family: ${result.tapiwaFamily}</p>
        <p>Sunil Family: ${result.sunilFamily}</p>
        <p>Car EMI: ${result.carEMI}</p>
      </div>
    </div>
  );
};

export default Profit;
