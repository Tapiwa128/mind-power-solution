import React, { useState } from "react";
import "./Income.css";

const Income = () => {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: "",
    vehicle: "",
    amount: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addIncome = (e) => {
    e.preventDefault();
    setEntries([...entries, form]);
    setForm({ date: "", vehicle: "", amount: "" });
  };

  const totalIncome = entries.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  return (
    <div className="income">
      <h2>Daily Income</h2>

      <form className="income-form" onSubmit={addIncome}>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />
        <input name="vehicle" placeholder="Vehicle (SUV)" value={form.vehicle} onChange={handleChange} required />
        <input type="number" name="amount" placeholder="Amount ($)" value={form.amount} onChange={handleChange} required />
        <button>Add</button>
      </form>

      <h3>Total Monthly Income: ${totalIncome}</h3>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.vehicle}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Income;
