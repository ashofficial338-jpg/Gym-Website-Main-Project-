import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaUsers, FaUserTie, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";

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
  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    plans: 0,
    payments: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");

      setStats({
        members: res.data.members || 0,
        trainers: res.data.trainers || 0,
        plans: res.data.plans || 0,
        payments: res.data.payments || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Bar Chart
  const memberChart = {
    labels: ["Members", "Trainers", "Plans", "Payments"],
    datasets: [
      {
        label: "Gym Statistics",
        data: [
          stats.members,
          stats.trainers,
          stats.plans,
          stats.payments,
        ],
        backgroundColor: [
          "#0d6efd",
          "#198754",
          "#ffc107",
          "#dc3545",
        ],
      },
    ],
  };

  // Doughnut Chart
  const paymentChart = {
    labels: ["Payments", "Remaining"],
    datasets: [
      {
        data: [stats.payments, 100],
        backgroundColor: ["#dc3545", "#dee2e6"],
      },
    ],
  };

  return (
    <div className="container-fluid p-4">

      {/* Hero Banner */}
      <div
        className="text-white rounded-4 shadow-lg p-5 mb-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.6),rgba(0,0,0,.6)),url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="display-5 fw-bold">
          🏋️ Gym Management Dashboard
        </h1>

        <p className="lead">
          Welcome back! Manage your gym efficiently.
        </p>

        <div className="mt-4">
          <Link to="/members" className="btn btn-warning me-2">
            Members
          </Link>

          <Link to="/trainers" className="btn btn-success me-2">
            Trainers
          </Link>

          <Link to="/payments" className="btn btn-danger">
            Payments
          </Link>
        </div>
      </div>

      {/* Statistics */}
      <div className="row g-4">

        <div className="col-lg-3 col-md-6">
          <div className="card bg-primary text-white shadow border-0 rounded-4">
            <div className="card-body text-center">
              <h5>Total Members</h5>
              <h1>{stats.members}</h1>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-success text-white shadow border-0 rounded-4">
            <div className="card-body text-center">
              <h5>Total Trainers</h5>
              <h1>{stats.trainers}</h1>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-warning shadow border-0 rounded-4">
            <div className="card-body text-center">
              <h5>Total Plans</h5>
              <h1>{stats.plans}</h1>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card bg-danger text-white shadow border-0 rounded-4">
            <div className="card-body text-center">
              <h5>Total Payments</h5>
              <h1>{stats.payments}</h1>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="card shadow rounded-4 mt-5">
        <div className="card-body">

          <h3>⚡ Quick Actions</h3>

          <div className="d-flex flex-wrap gap-3 mt-3">

            <Link to="/members" className="btn btn-primary">
              Add Member
            </Link>

            <Link to="/trainers" className="btn btn-success">
              Add Trainer
            </Link>

            <Link to="/plans" className="btn btn-warning">
              Create Plan
            </Link>

            <Link to="/attendance" className="btn btn-info text-white">
              Attendance
            </Link>

            <Link to="/payments" className="btn btn-danger">
              Add Payment
            </Link>

          </div>

        </div>
      </div>

      {/* Motivation */}
      <div className="card shadow rounded-4 mt-4">
        <div className="card-body">

          <h3>💪 Fitness Motivation</h3>

          <p className="fs-5">
            "Success doesn't come from what you do occasionally.
            It comes from what you do consistently."
          </p>

        </div>
      </div>

      {/* Charts */}
      <div className="row mt-5">

        <div className="col-lg-8">

          <div className="card shadow rounded-4">
            <div className="card-body">

              <h4 className="mb-4">
                📊 Gym Statistics
              </h4>

              <Bar data={memberChart} />

            </div>
          </div>

        </div>

        <div className="col-lg-4">

          <div className="card shadow rounded-4">
            <div className="card-body">

              <h4 className="mb-4">
                💰 Payment Overview
              </h4>

              <Doughnut data={paymentChart} />

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;