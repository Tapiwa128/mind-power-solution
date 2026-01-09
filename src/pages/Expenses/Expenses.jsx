import React, { useState, useEffect } from "react";
import { expenseAPI } from "../../services/api";
import "./Expenses.css";

const Expenses = ({ data, setData }) => {
  const [form, setForm] = useState({
    fuel: data?.fuel || 0,
    service: data?.service || 0,
    insurance: data?.insurance || 0,
    tolls: data?.tolls || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
  });

  useEffect(() => {
    loadExpenses();
  }, [month]);

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const response = await expenseAPI.getByMonth(month);
      const expense = response.data;
      const expenseData = {
        fuel: parseFloat(expense.fuel || 0),
        service: parseFloat(expense.service || 0),
        insurance: parseFloat(expense.insurance || 0),
        tolls: parseFloat(expense.tolls || 0)
      };
      setForm(expenseData);
      if (setData) setData(expenseData);
    } catch (err) {
      // If expense not found, use defaults
      const expenseData = { fuel: 0, service: 0, insurance: 0, tolls: 0 };
      setForm(expenseData);
      if (setData) setData(expenseData);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: Number(e.target.value) || 0,
    };
    setForm(newForm);
  };

  const saveExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const payload = {
        month: month,
        fuel: form.fuel,
        service: form.service,
        insurance: form.insurance,
        tolls: form.tolls
      };
      await expenseAPI.createOrUpdate(payload);
      if (setData) setData(form);
    } catch (err) {
      console.error("Failed to save expenses:", err);
      setError("Failed to save expenses");
    } finally {
      setLoading(false);
    }
  };

  const totalExpenses = form.fuel + form.service + form.insurance + form.tolls;

  const expenseCategories = [
    { key: "fuel", label: "Fuel Cost", icon: "⛽", color: "#f59e0b" },
    { key: "service", label: "Service & Repairs", icon: "🔧", color: "#ef4444" },
    { key: "insurance", label: "Insurance", icon: "🛡️", color: "#3b82f6" },
    { key: "tolls", label: "Toll Fees", icon: "🛣️", color: "#8b5cf6" },
  ];

  return (
    <div className="expenses-page">
      <div className="page-header">
        <h1>Monthly Expenses</h1>
        <p className="page-subtitle">Track and manage your operational costs</p>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: 24, padding: 16, background: "var(--danger)", color: "white", borderRadius: 8 }}>
          {error}
        </div>
      )}

      <div className="expenses-grid">
        <div className="card expense-form-card">
          <h2 style={{ marginTop: 0, marginBottom: 24 }}>Enter Expenses</h2>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label>Month</label>
            <input 
              className="input" 
              type="month" 
              value={month.substring(0, 7)} 
              onChange={(e) => setMonth(e.target.value + '-01')}
            />
          </div>
          <form className="expense-form">
            {expenseCategories.map((cat) => (
              <div key={cat.key} className="form-group">
                <label>
                  <span className="label-icon" style={{ color: cat.color }}>
                    {cat.icon}
                  </span>
                  {cat.label}
                </label>
                <input
                  className="input"
                  type="number"
                  name={cat.key}
                  placeholder={`${cat.label} ($)`}
                  value={form[cat.key] || ""}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                />
              </div>
            ))}
            <div className="form-group">
              <button className="btn" type="button" onClick={saveExpenses} disabled={loading}>
                {loading ? "Saving..." : "Save Expenses"}
              </button>
            </div>
          </form>
        </div>

        <div className="card expense-summary-card">
          <h2 style={{ marginTop: 0, marginBottom: 24 }}>Summary</h2>
          <div className="total-expenses">
            <div className="total-label">Total Expenses</div>
            <div className="total-value">${totalExpenses.toFixed(2)}</div>
          </div>

          <div className="expense-breakdown">
            {expenseCategories.map((cat) => (
              <div key={cat.key} className="expense-item">
                <div className="expense-item-header">
                  <span className="expense-icon" style={{ color: cat.color }}>
                    {cat.icon}
                  </span>
                  <span className="expense-label">{cat.label}</span>
                </div>
                <div className="expense-amount">${(form[cat.key] || 0).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
