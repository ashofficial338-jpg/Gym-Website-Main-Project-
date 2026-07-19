import { useEffect, useState } from "react";
import API from "../services/api";

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
      alert("Failed to load dashboard");
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Total Members</h5>
              <h2>{stats.members}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>Total Trainers</h5>
              <h2>{stats.trainers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning">
            <div className="card-body text-center">
              <h5>Total Plans</h5>
              <h2>{stats.plans}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h5>Total Payments</h5>
              <h2>{stats.payments}</h2>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;