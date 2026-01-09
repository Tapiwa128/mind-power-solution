import React, { useEffect, useState } from "react";
import "./Fleet.css";

const Fleet = ({ data, setData }) => {
  const [form, setForm] = useState({ name: "", plate: "", mileage: "", status: "Active" });

  useEffect(() => {
    if (!data || !Array.isArray(data)) setData([]);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addVehicle = (e) => {
    e.preventDefault();
    setData([...(data || []), form]);
    setForm({ name: "", plate: "", mileage: "", status: "Active" });
  };

  return (
    <div className="card fleet">
      <h2 style={{ marginTop: 0 }}>Fleet Management</h2>

      <form className="fleet-form" onSubmit={addVehicle}>
        <input className="input" name="name" placeholder="Vehicle Name" value={form.name} onChange={handleChange} required />
        <input className="input" name="plate" placeholder="Number Plate" value={form.plate} onChange={handleChange} required />
        <input className="input" name="mileage" placeholder="Mileage" value={form.mileage} onChange={handleChange} required />
        
        <select className="select" name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Parked</option>
          <option>In Service</option>
        </select>

        <button className="btn" type="submit">Add Vehicle</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Plate</th>
            <th>Mileage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(data || []).map((car, index) => (
            <tr key={index}>
              <td>{car.name}</td>
              <td>{car.plate}</td>
              <td>{car.mileage} km</td>
              <td>{car.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Fleet;
