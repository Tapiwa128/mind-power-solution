import React, { useMemo, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Fleet from "../Fleet/Fleet";
import Income from "../Income/Income";
import Expenses from "../Expenses/Expenses";
import Profit from "../Profit/Profit";
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
  
  // Calculate angles using reduce to avoid reassignment during render
  const segments = React.useMemo(() => {
    return data.reduce((acc, d, index) => {
      const val = d.value / sum;
      const startAngle = index === 0 ? 0 : acc[index - 1].endAngle;
      const endAngle = startAngle + val * 2 * Math.PI;
      acc.push({ startAngle, endAngle, val });
      return acc;
    }, []);
  }, [data, sum]);
  
  return (
    <svg width={cx * 2} height={cy * 2} viewBox={`0 0 ${cx * 2} ${cy * 2}`} style={{ width: "100%", height: "160px" }}>
      {segments.map((seg, i) => {
        const x1 = cx + radius * Math.cos(seg.startAngle);
        const y1 = cy + radius * Math.sin(seg.startAngle);
        const x2 = cx + radius * Math.cos(seg.endAngle);
        const y2 = cy + radius * Math.sin(seg.endAngle);
        const large = seg.endAngle - seg.startAngle > Math.PI ? 1 : 0;
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
        const colors = ["#38bdf8", "#22c55e", "#f59e0b", "#ef4444", "#a78bfa", "#10b981"]; 
        return <path key={i} d={path} fill={colors[i % colors.length]} opacity="0.9" stroke="var(--card)" strokeWidth="2" />;
      })}
    </svg>
  );
};

// DashboardOverview component defined outside to avoid creation during render
const DashboardOverview = ({ incomeData, kpis, recent, series, byVehicle, exportCSV }) => {
  return (
    <div className="dashboard-overview">
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-icon">💰</div>
          <h3>Total Income</h3>
          <div className="value">${kpis.totalIncome.toFixed(2)}</div>
          <div className={`delta ${kpis.delta >= 0 ? 'positive' : 'negative'}`}>
            {kpis.delta >= 0 ? '↑' : '↓'} {Math.abs(kpis.delta).toFixed(1)}% vs previous period
          </div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon">🚗</div>
          <h3>Total Rides</h3>
          <div className="value">{kpis.rides}</div>
          <div className="delta">Avg/Ride ${kpis.avgPerRide.toFixed(2)}</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon">🚙</div>
          <h3>Active Vehicles</h3>
          <div className="value">{kpis.vehicles}</div>
          <div className="delta">Fleet utilization</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-icon">✅</div>
          <h3>Status</h3>
          <div className="value"><span className="badge success">Healthy</span></div>
          <div className="delta">All systems operational</div>
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 24 }}>
        <div className="card chart-card">
          <div className="card-header">
            <h3>Income Trend</h3>
            <button className="btn secondary" onClick={() => exportCSV("income.csv", incomeData.length ? incomeData : sampleRecent)}>Export CSV</button>
          </div>
          <div className="chart-container">
            <LineChart data={series} />
          </div>
        </div>

        <div className="card chart-card">
          <h3>Distribution by Vehicle</h3>
          <div className="chart-container">
            <PieChart data={byVehicle} />
          </div>
        </div>
      </div>

      <div className="section-grid" style={{ marginTop: 24 }}>
        <div className="card chart-card">
          <h3>Income by Vehicle</h3>
          <div className="chart-container">
            <BarChart data={byVehicle} />
          </div>
        </div>

        <div className="card">
          <h3>Recent Income</h3>
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
                {recent.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.date}</td>
                    <td>{r.vehicle}</td>
                    <td className="amount">${Number(r.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [incomeData, setIncomeData] = useState([]);
  const [fleetData, setFleetData] = useState([]);
  const [expensesData, setExpensesData] = useState({ fuel: 0, service: 0, insurance: 0, tolls: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      // Load incomes
      try {
        const incomeResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/incomes`);
        if (incomeResponse.ok) {
          const incomes = await incomeResponse.json();
          setIncomeData(incomes.map(item => ({ date: item.date, vehicle: item.vehicle, amount: item.amount })));
        }
      } catch (e) {
        console.error("Failed to load incomes:", e);
      }

      // Load vehicles
      try {
        const vehicleResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/vehicles`);
        if (vehicleResponse.ok) {
          const vehicles = await vehicleResponse.json();
          setFleetData(vehicles.map(item => ({ id: item.id, name: item.name, plate: item.plate, mileage: item.mileage, status: item.status })));
        }
      } catch (e) {
        console.error("Failed to load vehicles:", e);
      }

      // Load expenses for current month
      try {
        const now = new Date();
        const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
        const expenseResponse = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8080/api'}/expenses/month/${month}`);
        if (expenseResponse.ok) {
          const expense = await expenseResponse.json();
          setExpensesData({
            fuel: parseFloat(expense.fuel || 0),
            service: parseFloat(expense.service || 0),
            insurance: parseFloat(expense.insurance || 0),
            tolls: parseFloat(expense.tolls || 0)
          });
        }
      } catch (e) {
        console.error("Failed to load expenses:", e);
      }
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar />
        <Navbar />
        <div className="content" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", color: "var(--muted)" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
            <div>Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<DashboardOverview incomeData={incomeData} kpis={kpis} recent={recent} series={series} byVehicle={byVehicle} exportCSV={exportCSV} />} />
          <Route path="/dashboard" element={<DashboardOverview incomeData={incomeData} kpis={kpis} recent={recent} series={series} byVehicle={byVehicle} exportCSV={exportCSV} />} />
          <Route path="/fleet" element={<Fleet data={fleetData} setData={setFleetData} />} />
          <Route path="/income" element={<Income data={incomeData} setData={setIncomeData} />} />
          <Route path="/expenses" element={<Expenses data={expensesData} setData={setExpensesData} />} />
          <Route path="/profit" element={<Profit income={incomeData} expenses={expensesData} />} />
          <Route path="/reports" element={<Reports income={incomeData} expenses={expensesData} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
