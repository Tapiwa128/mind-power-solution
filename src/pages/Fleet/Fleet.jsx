import React, { useState } from "react";
import "./Fleet.css";

const Fleet = () => {
  const [fleet, setFleet] = useState([]);
  const [form, setForm] = useState({
    name: "",
    plate: "",
    mileage: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addVehicle = (e) => {
    e.preventDefault();
    setFleet([...fleet, form]);
    setForm({ name: "", plate: "", mileage: "", status: "Active" });
  };

  return (
    <div className="fleet">
      <h2>Fleet Management</h2>

      <form className="fleet-form" onSubmit={addVehicle}>
        <input name="name" placeholder="Vehicle Name" value={form.name} onChange={handleChange} required />
        <input name="plate" placeholder="Number Plate" value={form.plate} onChange={handleChange} required />
        <input name="mileage" placeholder="Mileage" value={form.mileage} onChange={handleChange} required />
        
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Active</option>
          <option>Parked</option>
          <option>In Service</option>
        </select>

        <button>Add Vehicle</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Plate</th>
            <th>Mileage</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {fleet.map((car, index) => (
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
