import React, { useEffect, useState } from "react";
import { vehicleAPI } from "../../services/api";
import "./Fleet.css";

const Fleet = ({ data, setData }) => {
  const [form, setForm] = useState({ name: "", plate: "", mileage: "", status: "Active" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      setLoading(true);
      const response = await vehicleAPI.getAll();
      const vehicles = response.data.map(item => ({
        id: item.id,
        name: item.name,
        plate: item.plate,
        mileage: item.mileage,
        status: item.status
      }));
      if (setData) setData(vehicles);
    } catch (err) {
      console.error("Failed to load vehicles:", err);
      setError("Failed to load fleet data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addVehicle = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const payload = {
        name: form.name,
        plate: form.plate,
        mileage: parseInt(form.mileage),
        status: form.status
      };
      await vehicleAPI.create(payload);
      setForm({ name: "", plate: "", mileage: "", status: "Active" });
      await loadVehicles();
    } catch (err) {
      console.error("Failed to create vehicle:", err);
      setError(err.response?.data?.message || "Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      "Active": "success",
      "Parked": "warn",
      "In Service": "warn"
    };
    return statusMap[status] || "info";
  };

  return (
    <div className="fleet-page">
      <div className="page-header">
        <h1>Fleet Management</h1>
        <p className="page-subtitle">Manage your vehicle fleet</p>
      </div>

      {error && (
        <div className="alert alert-error" style={{ marginBottom: 24, padding: 16, background: "var(--danger)", color: "white", borderRadius: 8 }}>
          {error}
        </div>
      )}

      <div className="card fleet-form-card" style={{ marginBottom: 24 }}>
        <h2 style={{ marginTop: 0, marginBottom: 24 }}>Add New Vehicle</h2>
        <form className="fleet-form" onSubmit={addVehicle}>
          <div className="form-group">
            <label>Vehicle Name</label>
            <input className="input" name="name" placeholder="e.g., SUV-01" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Number Plate</label>
            <input className="input" name="plate" placeholder="e.g., ABC-123" value={form.plate} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Mileage (km)</label>
            <input className="input" type="number" name="mileage" placeholder="0" min="0" value={form.mileage} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Status</label>
            <select className="select" name="status" value={form.status} onChange={handleChange}>
              <option>Active</option>
              <option>Parked</option>
              <option>In Service</option>
            </select>
          </div>
          <div className="form-group">
            <label>&nbsp;</label>
            <button className="btn" type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </div>
        </form>
      </div>

      <div className="card fleet-table-card">
        <h2 style={{ marginTop: 0, marginBottom: 20 }}>Fleet Overview</h2>
        {loading && <div style={{ padding: 20, textAlign: "center", color: "var(--muted)" }}>Loading...</div>}
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Vehicle Name</th>
                <th>Number Plate</th>
                <th>Mileage</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {(data || []).length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "40px", color: "var(--muted)" }}>
                    No vehicles in fleet yet. Add your first vehicle above.
                  </td>
                </tr>
              ) : (
                (data || []).map((car, index) => (
                  <tr key={car.id || index}>
                    <td><strong>{car.name}</strong></td>
                    <td>{car.plate}</td>
                    <td>{car.mileage} km</td>
                    <td><span className={`badge ${getStatusBadge(car.status)}`}>{car.status}</span></td>
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

export default Fleet;
