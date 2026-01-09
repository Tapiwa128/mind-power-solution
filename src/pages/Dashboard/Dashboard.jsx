import React, { useMemo, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import Fleet from "../Fleet/Fleet";
import Income from "../Income/Income";
import Reports from "../Reports/Reports";

import "./Dashboard.css";

const sampleRecent = [
  { date: "2026-01-01", vehicle: "SUV-01", amount: 120 },
  { date: "2026-01-02", vehicle: "SUV-02", amount: 140 },
  { date: "2026-01-03", vehicle: "SUV-03", amount: 100 },
  { date: "2026-01-04", vehicle: "SUV-02", amount: 160 },
];

// Simple utility: group by vehicle and sum amount
const sumByVehicle = (rows) => {
  const map = {};
  rows.forEach((r) => {
    const key = r.vehicle || "Unknown";
    map[key] = (map[key] || 0) + Number(r.amount || 0);
  });
  return Object.entries(map).map(([label, value]) => ({ label, value }));
};

// Prepare data for charts
const toSeries = (rows) => {
  // Sort by date asc
  const copy = [...rows].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  return copy.map((r, idx) => ({ x: idx + 1, y: Number(r.amount || 0), label: r.date || "" }));
};

// SVG charts
const LineChart = ({ data, height = 160, color = "#38bdf8" }) => {
  const width = 400;
  const pad = 24;
  const max = Math.max(1, ...data.map(d => d.y));
  const points = data.map((d, i) => {
    const x = pad + (i * (width - 2 * pad)) / Math.max(1, data.length - 1);
    const y = height - pad - (d.y * (height - 2 * pad)) / max;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      <polyline fill="none" stroke={color} strokeWidth="2" points={points} />
    </svg>
  );
};

const BarChart = ({ data, height = 160, color = "#22c55e" }) => {
  const width = 400;
  const pad = 24;
  const max = Math.max(1, ...data.map(d => d.value));
  const bw = (width - 2 * pad) / Math.max(1, data.length);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {data.map((d, i) => {
        const h = (d.value * (height - 2 * pad)) / max;
        const x = pad + i * bw;
        const y = height - pad - h;
        return <rect key={i} x={x} y={y} width={Math.max(8, bw - 6)} height={h} fill={color} rx="4" />
      })}
    </svg>
  );
};

const PieChart = ({ data, radius = 70 }) => {
  const sum = data.reduce((s, d) => s + d.value, 0) || 1;
  const cx = radius + 6, cy = radius + 6;
  return (
    <svg width={cx * 2} height={cy * 2} viewBox={`0 0 ${cx * 2} ${cy * 2}`} style={{ width: "100%", height: "160px" }}>
      {data.map((d, i) => {
        const val = d.value / sum;
        const acc = data.slice(0, i).reduce((sum, item) => sum + item.value / sum, 0);
        const start = acc * 2 * Math.PI;
        const end = (acc + val) * 2 * Math.PI;
        const x1 = cx + radius * Math.cos(start);
        const y1 = cy + radius * Math.sin(start);
        const x2 = cx + radius * Math.cos(end);
        const y2 = cy + radius * Math.sin(end);
        const large = end - start > Math.PI ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
        const colors = ["#38bdf8", "#22c55e", "#f59e0b", "#ef4444", "#a78bfa", "#10b981"]; 
        return <path key={i} d={path} fill={colors[i % colors.length]} opacity="0.9" />;
      })}
    </svg>
  );
};

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  // Pull in persisted data from localStorage to drive analytics
  const [incomeData, setIncomeData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("incomeData") || "[]"); } catch { return []; }
  });
  const [fleetData, setFleetData] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fleetData") || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem("incomeData", JSON.stringify(incomeData)); }, [incomeData]);
  useEffect(() => { localStorage.setItem("fleetData", JSON.stringify(fleetData)); }, [fleetData]);

  const kpis = useMemo(() => {
    const totalIncome = incomeData.reduce((s, x) => s + Number(x.amount || 0), 0);
    const rides = incomeData.length;
    const vehicles = fleetData.length;
    const avgPerRide = rides ? (totalIncome / rides) : 0;

    // Simple deltas using last 7 vs previous 7 entries
    const last7 = incomeData.slice(-7).reduce((s, x) => s + Number(x.amount || 0), 0);
    const prev7 = incomeData.slice(-14, -7).reduce((s, x) => s + Number(x.amount || 0), 0);
    const delta = prev7 ? (((last7 - prev7) / prev7) * 100) : 0;

    return { totalIncome, rides, vehicles, avgPerRide, delta };
  }, [incomeData, fleetData]);

  const recent = useMemo(() => {
    const rows = incomeData.length ? incomeData : sampleRecent;
    return rows.slice(-5).reverse();
  }, [incomeData]);

  const series = useMemo(() => toSeries(incomeData.length ? incomeData : sampleRecent), [incomeData]);
  const byVehicle = useMemo(() => sumByVehicle(incomeData.length ? incomeData : sampleRecent), [incomeData]);

  const exportCSV = (filename, rows) => {
    const header = Object.keys(rows[0] || { date: "", vehicle: "", amount: 0 });
    const csv = [header.join(",")].concat(
      rows.map(r => header.map(h => JSON.stringify(r[h] ?? "")).join(","))
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    switch (activePage) {
      case "fleet":
        return <Fleet data={fleetData} setData={setFleetData} />;
      case "income":
        return <Income data={incomeData} setData={setIncomeData} />;
      case "reports":
        return <Reports />;
      default:
        return (
          <div className="dashboard-overview">
            <div className="kpi-grid">
              <div className="card kpi-card">
                <h3>Total Income</h3>
                <div className="value">${kpis.totalIncome.toFixed(2)}</div>
                <div className="delta">Last 7d vs prev: {kpis.delta.toFixed(1)}%</div>
              </div>
              <div className="card kpi-card">
                <h3>Rides</h3>
                <div className="value">{kpis.rides}</div>
                <div className="delta">Avg/Ride ${kpis.avgPerRide.toFixed(2)}</div>
              </div>
              <div className="card kpi-card">
                <h3>Active Vehicles</h3>
                <div className="value">{kpis.vehicles}</div>
                <div className="delta">Utilization est.</div>
              </div>
              <div className="card kpi-card">
                <h3>Status</h3>
                <div className="value"><span className="badge success">Healthy</span></div>
                <div className="delta">Systems nominal</div>
              </div>
            </div>

            <div className="section-grid" style={{ marginTop: 16 }}>
              <div className="card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 style={{ marginTop: 0 }}>Income Trend</h3>
                  <button className="btn secondary" onClick={() => exportCSV("income.csv", incomeData.length ? incomeData : sampleRecent)}>Export CSV</button>
                </div>
                <LineChart data={series} />
              </div>

              <div className="card">
                <h3 style={{ marginTop: 0 }}>Distribution</h3>
                <PieChart data={byVehicle} />
              </div>
            </div>

            <div className="section-grid" style={{ marginTop: 16 }}>
              <div className="card">
                <h3 style={{ marginTop: 0 }}>Income by Vehicle</h3>
                <BarChart data={byVehicle} />
              </div>

              <div className="card">
                <h3 style={{ marginTop: 0 }}>Recent Income</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Vehicle</th>
                      <th>Amount ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((r, idx) => (
                      <tr key={idx}>
                        <td>{r.date}</td>
                        <td>{r.vehicle}</td>
                        <td>${Number(r.amount).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-shell">
      <Sidebar setActivePage={setActivePage} activePage={activePage} />
      <Navbar />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default Dashboard;
