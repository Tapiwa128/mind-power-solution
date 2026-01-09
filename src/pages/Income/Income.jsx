import React, { useState, useEffect } from "react";
import "./Income.css";

const Income = ({ data, setData }) => {
  const [form, setForm] = useState({ date: "", vehicle: "", amount: "" });

  useEffect(() => {
    if (!data || !Array.isArray(data)) setData([]);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addIncome = (e) => {
    e.preventDefault();
    const entry = { ...form, amount: Number(form.amount || 0) };
    setData([...(data || []), entry]);
    setForm({ date: "", vehicle: "", amount: "" });
  };

  const totalIncome = (data || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return (
    <div className="card income">
      <h2 style={{ marginTop: 0 }}>Daily Income</h2>

      <form className="income-form" onSubmit={addIncome}>
        <input className="input" type="date" name="date" value={form.date} onChange={handleChange} required />
        <input className="input" name="vehicle" placeholder="Vehicle (SUV)" value={form.vehicle} onChange={handleChange} required />
        <input className="input" type="number" name="amount" placeholder="Amount ($)" value={form.amount} onChange={handleChange} required />
        <button className="btn" type="submit">Add</button>
      </form>

      <h3>Total Monthly Income: ${totalIncome.toFixed(2)}</h3>

      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {(data || []).map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.vehicle}</td>
              <td>${Number(item.amount).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Income;
