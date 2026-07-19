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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reports</h2>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Module</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Members</td>
            <td>{report.totalMembers}</td>
          </tr>

          <tr>
            <td>Trainers</td>
            <td>{report.totalTrainers}</td>
          </tr>

          <tr>
            <td>Plans</td>
            <td>{report.totalPlans}</td>
          </tr>

          <tr>
            <td>Payments</td>
            <td>{report.totalPayments}</td>
          </tr>

          <tr>
            <td>Attendance</td>
            <td>{report.totalAttendance}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Reports;