import React, { useState } from "react";
import "./Expenses.css";

const Expenses = () => {
  const [expenses, setExpenses] = useState({
    fuel: 0,
    service: 0,
    insurance: 0,
    tolls: 0,
  });

  const handleChange = (e) => {
    setExpenses({
      ...expenses,
      [e.target.name]: Number(e.target.value),
    });
  };

  const totalExpenses =
    expenses.fuel +
    expenses.service +
    expenses.insurance +
    expenses.tolls;

  return (
    <div className="expenses">
      <h2>Monthly Expenses</h2>

      <div className="expense-form">
        <input
          type="number"
          name="fuel"
          placeholder="Fuel Cost ($)"
          onChange={handleChange}
        />
        <input
          type="number"
          name="service"
          placeholder="Service & Repairs ($)"
          onChange={handleChange}
        />
        <input
          type="number"
          name="insurance"
          placeholder="Insurance ($)"
          onChange={handleChange}
        />
        <input
          type="number"
          name="tolls"
          placeholder="Toll Fees ($)"
          onChange={handleChange}
        />
      </div>

      <h3>Total Expenses: ${totalExpenses}</h3>

      <div className="expense-summary">
        <p>Fuel: ${expenses.fuel}</p>
        <p>Service: ${expenses.service}</p>
        <p>Insurance: ${expenses.insurance}</p>
        <p>Tolls: ${expenses.tolls}</p>
      </div>
    </div>
  );
};

export default Expenses;
