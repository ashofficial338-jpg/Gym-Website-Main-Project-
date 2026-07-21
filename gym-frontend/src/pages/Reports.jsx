import { useEffect, useState } from "react";
import API from "../services/api";

function Reports() {
  const [report, setReport] = useState({
    totalMembers: 0,
    totalTrainers: 0,
    totalPlans: 0,
    totalPayments: 0,
    totalAttendance: 0,
  });

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await API.get("/reports");
      setReport(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load reports");
    }
  };

  const reportData = [
    {
      title: "Members",
      value: report.totalMembers,
      color: "primary",
      icon: "👥",
    },
    {
      title: "Trainers",
      value: report.totalTrainers,
      color: "success",
      icon: "🏋️",
    },
    {
      title: "Plans",
      value: report.totalPlans,
      color: "warning",
      icon: "📋",
    },
    {
      title: "Payments",
      value: report.totalPayments,
      color: "danger",
      icon: "💰",
    },
    {
      title: "Attendance",
      value: report.totalAttendance,
      color: "info",
      icon: "📅",
    },
  ];

  return (
    <div
      className="container-fluid p-4"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e293b,#111827)",
      }}
    >
      {/* Header */}

      <div
        className="p-4 mb-4 shadow"
        style={{
          background: "rgba(255,255,255,.08)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-warning fw-bold">
          📊 Gym Reports
        </h2>

        <p className="text-light">
          Overall Gym Management Summary
        </p>

        <button
          className="btn btn-warning"
          onClick={fetchReport}
        >
          🔄 Refresh Report
        </button>
      </div>

      {/* Cards */}

      <div className="row g-4 mb-4">
        {reportData.map((item, index) => (
          <div className="col-lg-4 col-md-6" key={index}>
            <div
              className={`card border-0 shadow bg-${item.color} text-white rounded-4`}
            >
              <div className="card-body text-center">
                <h1>{item.icon}</h1>
                <h5>{item.title}</h5>
                <h2>{item.value}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}

      <div className="card shadow rounded-4">
        <div className="card-body">

          <h4 className="mb-3">
            📋 Detailed Report
          </h4>

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>Module</th>
                  <th>Total Records</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {reportData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      {item.icon} {item.title}
                    </td>

                    <td className="fw-bold">
                      {item.value}
                    </td>

                    <td width="40%">
                      <div className="progress">
                        <div
                          className={`progress-bar bg-${item.color}`}
                          style={{
                            width: `${Math.min(
                              item.value * 10,
                              100
                            )}%`,
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Reports;