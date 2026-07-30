import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { 
  FaUsers, 
  FaUserTie, 
  FaClipboardList, 
  FaMoneyBillWave, 
  FaDumbbell, 
  FaBolt, 
  FaQuoteLeft, 
  FaSync,
  FaChartLine,
  FaChartPie 
} from "react-icons/fa";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function Dashboard() {
  const barChartRef = useRef(null);
  const doughnutChartRef = useRef(null);

  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    plans: 0,
    payments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await API.get("/dashboard");
      setStats({
        members: res.data.members || 0,
        trainers: res.data.trainers || 0,
        plans: res.data.plans || 0,
        payments: res.data.payments || 0,
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const memberChart = {
    labels: ["Active Members", "Certified Trainers", "Membership Plans", "Total Collections"],
    datasets: [
      {
        label: "Operational Metrics",
        data: [stats.members, stats.trainers, stats.plans, stats.payments],
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          
          const goldGrad = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          goldGrad.addColorStop(0, "rgba(201, 147, 70, 0.2)");
          goldGrad.addColorStop(1, "rgba(229, 184, 105, 0.85)");

          const greenGrad = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          greenGrad.addColorStop(0, "rgba(16, 185, 129, 0.2)");
          greenGrad.addColorStop(1, "rgba(52, 211, 153, 0.85)");

          const blueGrad = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          blueGrad.addColorStop(0, "rgba(99, 102, 241, 0.2)");
          blueGrad.addColorStop(1, "rgba(129, 140, 248, 0.85)");

          const redGrad = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          redGrad.addColorStop(0, "rgba(239, 68, 68, 0.2)");
          redGrad.addColorStop(1, "rgba(248, 113, 113, 0.85)");

          return [goldGrad, greenGrad, blueGrad, redGrad][context.dataIndex];
        },
        borderColor: ["#e5b869", "#34d399", "#818cf8", "#f87171"],
        borderWidth: 1.5,
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 35,
      },
    ],
  };

  const paymentChart = {
    labels: ["Collected Revenue", "Target Remaining"],
    datasets: [
      {
        data: [stats.payments, stats.payments > 0 ? stats.payments * 0.25 : 100],
        backgroundColor: ["#e5b869", "rgba(255, 255, 255, 0.05)"],
        borderColor: ["#0b0f17", "transparent"],
        borderWidth: 3,
        hoverOffset: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#8a94a6", font: { family: "'Inter', sans-serif", size: 12 } }
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.04)" },
        ticks: { color: "#8a94a6", font: { family: "'Inter', sans-serif", size: 12 } }
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#131a26",
        titleFont: { family: "'Inter', sans-serif", size: 13, weight: "600" },
        bodyFont: { family: "'Inter', sans-serif", size: 13 },
        padding: 12,
        cornerRadius: 8,
        borderColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        displayColors: true
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#131a26",
        padding: 12,
        cornerRadius: 8,
        borderColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1
      }
    }
  };

  return (
    <div 
      className="UI-fade-in"
      style={{
        backgroundColor: "#0b0f17",
        minHeight: "100vh",
        width: "100%",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        margin: 0,
        padding: "24px 32px",
        boxSizing: "border-box"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .UI-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin-animation {
          animation: spinEffect 1s linear infinite;
        }
        @keyframes spinEffect {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .premium-dashboard-card {
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          transition: all 0.25s ease;
        }

        .metric-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 163, 89, 0.3);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .gold-action-btn {
          background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important;
          border: none !important;
          color: #0b0f17 !important;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .gold-action-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 6px 15px rgba(212, 163, 89, 0.2);
        }

        .outline-action-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          color: #ffffff !important;
          transition: all 0.2s ease;
        }
        .outline-action-btn:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: #e5b869 !important;
          color: #e5b869 !important;
        }
      `}</style>

      {/* Hero Dashboard Header */}
      <div
        className="premium-dashboard-card p-5 mb-4 position-relative overflow-hidden w-100"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(11, 15, 23, 0.95), rgba(19, 26, 38, 0.85)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-white mb-2 d-flex align-items-center gap-2">
              <FaDumbbell style={{ color: "#e5b869" }} /> Gym Management Console
            </h2>
            <p className="text-muted mb-0" style={{ color: "#8a94a6", fontSize: "14px" }}>
              Welcome back, Administrator. Real-time operations and analytics overview.
            </p>
          </div>
          
          <button 
            onClick={fetchDashboard} 
            className="btn outline-action-btn btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-2"
            disabled={loading}
          >
            <FaSync className={loading ? "spin-animation" : ""} /> 
            {loading ? "Syncing..." : "Refresh Console"}
          </button>
        </div>

        <div className="mt-4 d-flex flex-wrap gap-2">
          <Link to="/members" className="btn gold-action-btn btn-sm px-4 rounded-3 py-2">Manage Members</Link>
          <Link to="/trainers" className="btn outline-action-btn btn-sm px-4 rounded-3 py-2">Manage Trainers</Link>
          <Link to="/payments" className="btn outline-action-btn btn-sm px-4 rounded-3 py-2">View Collections</Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" style={{ width: "2.5rem", height: "2.5rem", color: "#e5b869" }} role="status">
            <span className="visually-hidden">Loading data...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Statistics Info Cards Grid with equal gap */}
          <div className="row g-4 w-100 m-0 mb-4">
            <div className="col-xl-3 col-md-6 px-2">
              <div className="card premium-dashboard-card metric-card-hover text-white shadow-sm h-100">
                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-uppercase tracking-wider fw-medium small mb-2" style={{ color: "#8a94a6" }}>Total Members</h6>
                    <h3 className="fw-bold mb-0">{stats.members}</h3>
                  </div>
                  <div className="fs-2 p-3 rounded-3" style={{ background: "rgba(229, 184, 105, 0.1)", color: "#e5b869" }}><FaUsers /></div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 px-2">
              <div className="card premium-dashboard-card metric-card-hover text-white shadow-sm h-100">
                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-uppercase tracking-wider fw-medium small mb-2" style={{ color: "#8a94a6" }}>Gym Trainers</h6>
                    <h3 className="fw-bold mb-0">{stats.trainers}</h3>
                  </div>
                  <div className="fs-2 p-3 rounded-3" style={{ background: "rgba(52, 211, 153, 0.1)", color: "#34d399" }}><FaUserTie /></div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 px-2">
              <div className="card premium-dashboard-card metric-card-hover text-white shadow-sm h-100">
                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-uppercase tracking-wider fw-medium small mb-2" style={{ color: "#8a94a6" }}>Active Plans</h6>
                    <h3 className="fw-bold mb-0">{stats.plans}</h3>
                  </div>
                  <div className="fs-2 p-3 rounded-3" style={{ background: "rgba(129, 140, 248, 0.1)", color: "#818cf8" }}><FaClipboardList /></div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-md-6 px-2">
              <div className="card premium-dashboard-card metric-card-hover text-white shadow-sm h-100">
                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-uppercase tracking-wider fw-medium small mb-2" style={{ color: "#8a94a6" }}>Total Payments</h6>
                    <h3 className="fw-bold mb-0">{stats.payments}</h3>
                  </div>
                  <div className="fs-2 p-3 rounded-3" style={{ background: "rgba(248, 113, 113, 0.1)", color: "#f87171" }}><FaMoneyBillWave /></div>
                </div>
              </div>
            </div>
          </div>

          {/* Fast Management Channels */}
          <div className="card premium-dashboard-card shadow-sm mb-4 w-100">
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 text-white text-uppercase tracking-wider small">
                <FaBolt style={{ color: "#e5b869" }} /> Fast Management Channels
              </h6>
              <div className="d-flex flex-wrap gap-2 mt-2">
                <Link to="/members" className="btn outline-action-btn rounded-3 px-4 btn-sm py-2">Add Member</Link>
                <Link to="/trainers" className="btn outline-action-btn rounded-3 px-4 btn-sm py-2">Add Trainer</Link>
                <Link to="/plans" className="btn outline-action-btn rounded-3 px-4 btn-sm py-2">Create Plan</Link>
                <Link to="/attendance" className="btn outline-action-btn rounded-3 px-4 btn-sm py-2">Attendance Sheet</Link>
                <Link to="/payments" className="btn outline-action-btn rounded-3 px-4 btn-sm py-2">Record Payment</Link>
              </div>
            </div>
          </div>

          {/* Chart Panels Workspace */}
          <div className="row g-4 w-100 m-0 mb-4">
            <div className="col-xl-8 px-2">
              <div className="card premium-dashboard-card shadow-sm h-100">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-4 text-white d-flex align-items-center gap-2 text-uppercase tracking-wider small">
                    <FaChartLine style={{ color: "#e5b869" }} /> Core Operational Data Bars
                  </h6>
                  <div style={{ height: "380px", position: "relative" }}>
                    <Bar ref={barChartRef} data={memberChart} options={chartOptions} />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 px-2">
              <div className="card premium-dashboard-card shadow-sm h-100">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-4 text-white d-flex align-items-center gap-2 text-uppercase tracking-wider small">
                    <FaChartPie style={{ color: "#e5b869" }} /> Revenue Target Ring
                  </h6>
                  <div style={{ height: "380px", position: "relative" }} className="d-flex align-items-center justify-content-center">
                    <Doughnut ref={doughnutChartRef} data={paymentChart} options={doughnutOptions} />
                    <div className="position-absolute text-center" style={{ pointerEvents: "none" }}>
                      <span className="text-muted small d-block mb-1">Total Vault</span>
                      <span className="fw-bold fs-4 text-white">{stats.payments}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Motivation Insight Banner */}
          <div className="card premium-dashboard-card border-0 p-2 w-100">
            <div className="card-body d-flex align-items-start gap-3">
              <FaQuoteLeft className="fs-4 text-warning opacity-25 mt-1" style={{ color: "#e5b869" }} />
              <div>
                <p className="fs-6 mb-1 text-muted" style={{ fontStyle: "italic" }}>
                  "Success doesn't come from what you do occasionally. It comes from what you do consistently."
                </p>
                <small className="text-uppercase tracking-widest opacity-20" style={{ fontSize: "10px", color: "#ffffff" }}>
                  Automated Corporate Fitness Matrix System Panel
                </small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;