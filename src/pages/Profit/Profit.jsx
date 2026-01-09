import React, { useMemo } from "react";
import { calculateProfit } from "../../utils/profitCalculator";
import "./Profit.css";

const Profit = ({ income, expenses }) => {
  const totalIncome = useMemo(() => {
    if (!income || !Array.isArray(income)) return 0;
    return income.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [income]);

  const totalExpenses = useMemo(() => {
    if (!expenses) return 0;
    return (expenses.fuel || 0) + (expenses.service || 0) + (expenses.insurance || 0) + (expenses.tolls || 0);
  }, [expenses]);

  const result = useMemo(() => {
    return calculateProfit(
      totalIncome,
      expenses?.fuel || 0,
      expenses?.insurance || 0,
      expenses?.service || 0,
      expenses?.tolls || 0
    );
  }, [totalIncome, expenses]);

  return (
    <div className="profit-page">
      <div className="page-header">
        <h1>Monthly Profit & Sharing</h1>
        <p className="page-subtitle">Financial breakdown and profit distribution</p>
      </div>

      <div className="profit-grid">
        <div className="card profit-overview-card">
          <h2 style={{ marginTop: 0, marginBottom: 24 }}>Financial Overview</h2>
          <div className="profit-metrics">
            <div className="metric-item">
              <div className="metric-label">Total Income</div>
              <div className="metric-value income">${totalIncome.toFixed(2)}</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Total Expenses</div>
              <div className="metric-value expense">${totalExpenses.toFixed(2)}</div>
            </div>
            <div className="metric-item highlight">
              <div className="metric-label">Operating Balance</div>
              <div className="metric-value">${result.operatingBalance.toFixed(2)}</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Driver Commission (10%)</div>
              <div className="metric-value">${result.driverCommission.toFixed(2)}</div>
            </div>
            <div className="metric-item highlight success">
              <div className="metric-label">Net Profit</div>
              <div className="metric-value">${result.netProfit.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="card profit-distribution-card">
          <h2 style={{ marginTop: 0, marginBottom: 24 }}>Profit Distribution</h2>
          <div className="distribution-info">
            <p className="distribution-note">Net profit is split equally (33.33% each)</p>
          </div>
          <div className="profit-split">
            <div className="split-item">
              <div className="split-icon">👨‍👩‍👧‍👦</div>
              <div className="split-details">
                <div className="split-label">Tapiwa Family</div>
                <div className="split-percentage">33.33%</div>
              </div>
              <div className="split-amount">${result.tapiwaFamily.toFixed(2)}</div>
            </div>
            <div className="split-item">
              <div className="split-icon">👨‍👩‍👧‍👦</div>
              <div className="split-details">
                <div className="split-label">Sunil Family</div>
                <div className="split-percentage">33.33%</div>
              </div>
              <div className="split-amount">${result.sunilFamily.toFixed(2)}</div>
            </div>
            <div className="split-item">
              <div className="split-icon">🚗</div>
              <div className="split-details">
                <div className="split-label">Car EMI (Sunil)</div>
                <div className="split-percentage">33.33%</div>
              </div>
              <div className="split-amount">${result.carEMI.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profit;
