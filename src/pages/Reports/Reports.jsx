import React from "react";
import { calculateProfit } from "../../utils/profitCalculator";
import "./Reports.css";

const Reports = ({ income, expenses }) => {
  const monthlyIncome = React.useMemo(() => {
    if (!income || !Array.isArray(income)) return 0;
    return income.reduce((s, x) => s + Number(x.amount || 0), 0);
  }, [income]);

  const totalExpenses = React.useMemo(() => {
    if (!expenses) return 0;
    return (expenses.fuel || 0) + (expenses.service || 0) + (expenses.insurance || 0) + (expenses.tolls || 0);
  }, [expenses]);

  const report = React.useMemo(() => {
    return calculateProfit(
      monthlyIncome,
      expenses?.fuel || 0,
      expenses?.insurance || 0,
      expenses?.service || 0,
      expenses?.tolls || 0
    );
  }, [monthlyIncome, expenses]);

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>Monthly Financial Report</h1>
        <p className="page-subtitle">Comprehensive financial analysis and breakdown</p>
      </div>

      <div className="reports-grid">
        <div className="card report-card income-card">
          <div className="report-icon">💰</div>
          <h3>Income Summary</h3>
          <div className="report-value income-value">${monthlyIncome.toFixed(2)}</div>
          <div className="report-label">Total Monthly Income</div>
        </div>

        <div className="card report-card expense-card">
          <div className="report-icon">💸</div>
          <h3>Expense Summary</h3>
          <div className="report-value expense-value">${totalExpenses.toFixed(2)}</div>
          <div className="report-label">Total Expenses</div>
          <div className="expense-breakdown">
            <div className="expense-item">
              <span>Fuel</span>
              <span>${(expenses?.fuel || 0).toFixed(2)}</span>
            </div>
            <div className="expense-item">
              <span>Service & Repairs</span>
              <span>${(expenses?.service || 0).toFixed(2)}</span>
            </div>
            <div className="expense-item">
              <span>Insurance</span>
              <span>${(expenses?.insurance || 0).toFixed(2)}</span>
            </div>
            <div className="expense-item">
              <span>Toll Fees</span>
              <span>${(expenses?.tolls || 0).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="card report-card profit-card">
          <div className="report-icon">📈</div>
          <h3>Profit Calculation</h3>
          <div className="profit-breakdown">
            <div className="profit-item">
              <span>Operating Balance</span>
              <span>${report.operatingBalance.toFixed(2)}</span>
            </div>
            <div className="profit-item">
              <span>Driver Commission (10%)</span>
              <span>${report.driverCommission.toFixed(2)}</span>
            </div>
            <div className="profit-item highlight">
              <span>Net Profit</span>
              <span className="net-profit">${report.netProfit.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="card report-card distribution-card">
          <div className="report-icon">📊</div>
          <h3>Profit Distribution</h3>
          <div className="distribution-note">Equal split (33.33% each)</div>
          <div className="distribution-list">
            <div className="distribution-item">
              <span className="dist-icon">👨‍👩‍👧‍👦</span>
              <div className="dist-details">
                <div className="dist-label">Tapiwa Family</div>
                <div className="dist-percent">33.33%</div>
              </div>
              <div className="dist-amount">${report.tapiwaFamily.toFixed(2)}</div>
            </div>
            <div className="distribution-item">
              <span className="dist-icon">👨‍👩‍👧‍👦</span>
              <div className="dist-details">
                <div className="dist-label">Sunil Family</div>
                <div className="dist-percent">33.33%</div>
              </div>
              <div className="dist-amount">${report.sunilFamily.toFixed(2)}</div>
            </div>
            <div className="distribution-item">
              <span className="dist-icon">🚗</span>
              <div className="dist-details">
                <div className="dist-label">Car EMI (Sunil)</div>
                <div className="dist-percent">33.33%</div>
              </div>
              <div className="dist-amount">${report.carEMI.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
