import { useEffect, useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function Reports() {
  const [report, setReport] = useState({
    totalMembers: 0,
    totalTrainers: 0,
    totalPlans: 0,
    totalPayments: 0,
    totalAttendance: 0,
    totalWorkouts: 0,
    pendingWorkouts: 0,
    completedWorkouts: 0,
    paidPayments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
    monthlyRevenue: [],
    recentPayments: [],
    recentWorkouts: [],
  });

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const res = await API.get("/reports");
      setReport(res.data.report);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid p-4">

      <h2 className="mb-4 fw-bold">
        📊 Reports Dashboard
      </h2>

      <div className="row g-3">

        <div className="col-md-3">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h5>Members</h5>
              <h2>{report.totalMembers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h5>Trainers</h5>
              <h2>{report.totalTrainers}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-warning">
            <div className="card-body text-center">
              <h5>Plans</h5>
              <h2>{report.totalPlans}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card bg-danger text-white">
            <div className="card-body text-center">
              <h5>Payments</h5>
              <h2>{report.totalPayments}</h2>
            </div>
          </div>
        </div>

      </div>

      <div className="row g-3 mt-3">

        <div className="col-md-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <h6>Attendance</h6>
              <h3>{report.totalAttendance}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-primary">
            <div className="card-body text-center">
              <h6>Workouts</h6>
              <h3>{report.totalWorkouts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-warning">
            <div className="card-body text-center">
              <h6>Pending Workout</h6>
              <h3>{report.pendingWorkouts}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card border-success">
            <div className="card-body text-center">
              <h6>Completed Workout</h6>
              <h3>{report.completedWorkouts}</h3>
            </div>
          </div>
        </div>

      </div>

      <div className="card mt-4 shadow">
        <div className="card-body">

          <h4>💰 Revenue Summary</h4>

          <h2 className="text-success">
            ₹ {report.totalRevenue}
          </h2>

          <div className="mt-3">

            <button className="btn btn-danger me-2">
              Export PDF
            </button>

            <button className="btn btn-success">
              Export Excel
            </button>

          </div>

        </div>
      </div>

      <div className="row mt-4">

        <div className="col-lg-6">

          <div className="card shadow">

            <div className="card-header bg-dark text-white">
              Recent Payments
            </div>

            <div className="card-body table-responsive">

              <table className="table table-bordered">

                <thead>

                  <tr>
                    <th>Member</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {report.recentPayments?.map((pay) => (

                    <tr key={pay._id}>
                      <td>{pay.member}</td>
                      <td>₹ {pay.amount}</td>
                      <td>{pay.paymentMethod}</td>
                      <td>{pay.status}</td>
                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

        <div className="col-lg-6">

          <div className="card shadow">

            <div className="card-header bg-primary text-white">
              Recent Workouts
            </div>

            <div className="card-body table-responsive">

              <table className="table table-bordered">

                <thead>

                  <tr>
                    <th>Member</th>
                    <th>Workout</th>
                    <th>Trainer</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {report.recentWorkouts?.map((workout) => (

                    <tr key={workout._id}>
                      <td>{workout.member}</td>
                      <td>{workout.workoutName}</td>
                      <td>{workout.trainer}</td>
                      <td>{workout.status}</td>
                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

      <div className="card mt-4 shadow">

        <div className="card-header bg-success text-white">
          Monthly Revenue
        </div>

        <div className="card-body table-responsive">

          <table className="table table-striped">

            <thead>

              <tr>
                <th>Year</th>
                <th>Month</th>
                <th>Revenue</th>
              </tr>

            </thead>

            <tbody>

              {report.monthlyRevenue?.map((item, index) => (

                <tr key={index}>
                  <td>{item._id.year}</td>
                  <td>{item._id.month}</td>
                  <td>₹ {item.amount}</td>
                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Reports;