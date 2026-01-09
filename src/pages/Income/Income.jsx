import React, { useState, useEffect } from "react";
import { incomeAPI } from "../../services/api";
import "./Income.css";

const Income = ({ data, setData }) => {
  const [form, setForm] = useState({ date: "", vehicle: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadIncomes();
  }, []);

  const loadIncomes = async () => {
    try {
      setLoading(true);
      const response = await incomeAPI.getAll();
      const incomes = response.data.map(item => ({
        date: item.date,
        vehicle: item.vehicle,
        amount: item.amount
      }));
      if (setData) setData(incomes);
    } catch (err) {
      console.error("Failed to load incomes:", err);
      setError("Failed to load income data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addIncome = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const payload = {
        date: form.date,
        vehicle: form.vehicle,
        amount: parseFloat(form.amount)
      };
      await incomeAPI.create(payload);
      setForm({ date: "", vehicle: "", amount: "" });
      await loadIncomes();
    } catch (err) {
      console.error("Failed to create income:", err);
      setError("Failed to add income entry");
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = (data || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <div className="income-page">
      <div className="page-header">
        <h1>Daily Income</h1>
        <p className="page-subtitle">Track and manage your rental income</p>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: 24 }}>
          {error}
        </div>
      )}

      <div className="income-grid">
        <div className="card income-form-card">
          <h2 style={{ marginTop: 0, marginBottom: 24 }}>Add Income Entry</h2>
          <form className="income-form" onSubmit={addIncome}>
            <div className="form-group">
              <label>Date</label>
              <input className="input" type="date" name="date" value={form.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Vehicle</label>
              <input className="input" name="vehicle" placeholder="e.g., SUV-01" value={form.vehicle} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Amount ($)</label>
              <input className="input" type="number" name="amount" placeholder="0.00" step="0.01" min="0" value={form.amount} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>&nbsp;</label>
              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Income"}
              </button>
            </div>
          </form>
        </div>

        <div className="card income-summary-card">
          <h2 style={{ marginTop: 0, marginBottom: 24 }}>Summary</h2>
          <div className="total-income-display">
            <div className="total-label">Total Monthly Income</div>
            <div className="total-value">${totalIncome.toFixed(2)}</div>
            <div className="total-count">{(data || []).length} entries</div>
          </div>
        </div>
      </div>

      <div className="card income-table-card" style={{ marginTop: 24 }}>
        <h2 style={{ marginTop: 0, marginBottom: 20 }}>Income History</h2>
        {loading && <div style={{ padding: 20, textAlign: "center", color: "var(--muted)" }}>Loading...</div>}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Vehicle</th>
                <th>Amount ($)</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                    No income entries yet. Add your first entry above.
                  </td>
                </tr>
              ) : (
                [...(data || [])].reverse().map((item, index) => (
                  <tr key={index}>
                    <td>{item.date}</td>
                    <td>{item.vehicle}</td>
                    <td className="amount">${Number(item.amount).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Income;
