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
      if (res.data && res.data.report) {
        setReport(res.data.report);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Convert Month Numbers to simple English names
  const getMonthName = (monthNumber) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1] || `Month ${monthNumber}`;
  };

  // 1. Generate and Download Physical PDF File
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Title Setup
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("GYM MANAGEMENT - SYSTEM REPORT", 14, 22);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
    
    // Business Performance Summary Matrix
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Overall Business Performance Summary", 14, 40);
    
    const summaryData = [
      ["Total Earned Revenue", `INR ${parseFloat(report.totalRevenue).toLocaleString("en-IN")}`],
      ["Total Active Members", report.totalMembers.toString()],
      ["Total Active Trainers", report.totalTrainers.toString()],
      ["Total Base Membership Plans Available", report.totalPlans.toString()],
      ["Total Checked In Attendance Count", report.totalAttendance.toString()],
      ["Total Logged Payments Count", report.totalPayments.toString()],
    ];

    autoTable(doc, {
      startY: 45,
      head: [["Metric Category Indicator", "Calculated Database Metric Value"]],
      body: summaryData,
      theme: "grid",
      headStyles: { fillColor: [19, 26, 38] }
    });

    // Recent Payments Section inside PDF
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Recent Financial Payments Settled", 14, doc.lastAutoTable.finalY + 15);

    const paymentRows = report.recentPayments?.map(p => [
      p.member || "N/A",
      `INR ${parseFloat(p.amount || 0).toLocaleString("en-IN")}`,
      p.paymentMethod || "Cash",
      p.status || "Paid"
    ]) || [];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Member ID/Name", "Collected Amount", "Gateway Method", "Collection Status"]],
      body: paymentRows.length > 0 ? paymentRows : [["No records found", "-", "-", "-"]],
      theme: "striped",
      headStyles: { fillColor: [201, 147, 70] }
    });

    // Monthly Data Breakdowns
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Monthly Revenue Logs Timeline", 14, doc.lastAutoTable.finalY + 15);

    const monthlyRows = report.monthlyRevenue?.map(m => [
      m._id?.year || "-",
      getMonthName(m._id?.month),
      `INR ${parseFloat(m.amount || 0).toLocaleString("en-IN")}`
    ]) || [];

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 20,
      head: [["Financial Year", "Calendar Month", "Calculated Monthly Collection Total"]],
      body: monthlyRows.length > 0 ? monthlyRows : [["No timeline data recorded", "-", "-"]],
      theme: "grid",
      headStyles: { fillColor: [11, 15, 23] }
    });

    doc.save("Gym_System_Business_Report.pdf");
  };

  // 2. Generate and Download Physical Excel Data Sheet
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Sheet A: Overall Core Metric Counts
    const overviewData = [
      { "Report Parameter Indicator": "Total Members Registered", "Value Counts": report.totalMembers },
      { "Report Parameter Indicator": "Total Staff Trainers", "Value Counts": report.totalTrainers },
      { "Report Parameter Indicator": "Total Available Plans", "Value Counts": report.totalPlans },
      { "Report Parameter Indicator": "Total Check-in System Logs", "Value Counts": report.totalAttendance },
      { "Report Parameter Indicator": "Total Revenue Earnings (INR)", "Value Counts": report.totalRevenue },
      { "Report Parameter Indicator": "Total System Tracked Payments", "Value Counts": report.totalPayments },
      { "Report Parameter Indicator": "Total Planned Workouts", "Value Counts": report.totalWorkouts }
    ];
    const overviewSheet = XLSX.utils.json_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(workbook, overviewSheet, "Business Overview Data");

    // Sheet B: Recent Payments Sub-Data List
    const processedPayments = report.recentPayments?.map(p => ({
      "Payer Member": p.member || "N/A",
      "Amount Paid (INR)": p.amount || 0,
      "Transaction Gateway Method": p.paymentMethod || "Cash",
      "Current Status": p.status || "Paid"
    })) || [];
    const paymentsSheet = XLSX.utils.json_to_sheet(processedPayments);
    XLSX.utils.book_append_sheet(workbook, paymentsSheet, "Recent Payments Details");

    // Sheet C: Monthly Collection Logs
    const processedMonthly = report.monthlyRevenue?.map(m => ({
      "Calendar Year": m._id?.year || "-",
      "Logged Month Name": getMonthName(m._id?.month),
      "Revenue Generated (INR)": m.amount || 0
    })) || [];
    const monthlySheet = XLSX.utils.json_to_sheet(processedMonthly);
    XLSX.utils.book_append_sheet(workbook, monthlySheet, "Monthly Analytics Timeline");

    // Save File Outwards to Native User Storage Device System
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const finalDataBlob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(finalDataBlob, `Gym_Financial_Report_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <div
      className="container-fluid p-4 UI-fade-in"
      style={{
        backgroundColor: "#0b0f17",
        minHeight: "100vh",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Design UI Global CSS Rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .UI-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .premium-panel-card {
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
        }

        .metric-label-title {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #8a94a6;
          font-weight: 500;
        }

        .metric-big-counter {
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin-top: 5px;
        }

        /* Interactive Dynamic Table Rules */
        .premium-table {
          color: #ffffff !important;
          margin-bottom: 0 !important;
        }
        .premium-table th {
          background: rgba(11, 15, 23, 0.6) !important;
          color: #8a94a6 !important;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
          padding: 14px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .premium-table td {
          padding: 14px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
          font-size: 14px;
          color: #e2e8f0;
        }
        .premium-table tbody tr:hover td {
          background: rgba(255, 255, 255, 0.02) !important;
        }

        /* Action Buttons Styles */
        .pdf-export-btn {
          background: linear-gradient(90deg, #f87171 0%, #dc2626 100%) !important;
          border: none !important;
          color: #ffffff !important;
          font-weight: 600;
          border-radius: 8px !important;
          padding: 10px 20px !important;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .pdf-export-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(248, 113, 113, 0.25);
        }

        .excel-export-btn {
          background: linear-gradient(90deg, #34d399 0%, #059669 100%) !important;
          border: none !important;
          color: #ffffff !important;
          font-weight: 600;
          border-radius: 8px !important;
          padding: 10px 20px !important;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .excel-export-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(52, 211, 153, 0.25);
        }
      `}</style>

      <h2 className="fw-bold mb-4" style={{ letterSpacing: "-0.5px" }}>📊 Reports & Analytics</h2>

      {/* Row 1: Core Summary Counters */}
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm border-start border-3 border-primary">
            <div className="metric-label-title">Total Members</div>
            <div className="metric-big-counter text-white">{report.totalMembers}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm border-start border-3 border-success">
            <div className="metric-label-title">Active Trainers</div>
            <div className="metric-big-counter text-white">{report.totalTrainers}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm border-start border-3 border-warning">
            <div className="metric-label-title">Membership Plans</div>
            <div className="metric-big-counter text-white">{report.totalPlans}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm border-start border-3 border-danger">
            <div className="metric-label-title">Total Transactions</div>
            <div className="metric-big-counter text-white">{report.totalPayments}</div>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Performance Parameters */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm">
            <div className="metric-label-title">Attendance Entries</div>
            <div className="metric-big-counter text-info">{report.totalAttendance}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm">
            <div className="metric-label-title">Total Workouts</div>
            <div className="metric-big-counter style-count" style={{ color: "#a78bfa" }}>{report.totalWorkouts}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm">
            <div className="metric-label-title">Pending Tasks</div>
            <div className="metric-big-counter text-warning">{report.pendingWorkouts}</div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="premium-panel-card p-3 shadow-sm">
            <div className="metric-label-title">Completed Workouts</div>
            <div className="metric-big-counter text-success">{report.completedWorkouts}</div>
          </div>
        </div>
      </div>

      {/* Main Total Revenue Aggregator Box */}
      <div className="premium-panel-card p-4 shadow-lg mb-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
          <div>
            <div className="metric-label-title mb-1">Total System Revenue (Auto Calculated)</div>
            <h1 className="fw-bold m-0" style={{ color: "#34d399", letterSpacing: "-1px" }}>
              ₹ {parseFloat(report.totalRevenue).toLocaleString("en-IN")}
            </h1>
          </div>
          <div className="d-flex gap-2">
            <button className="btn pdf-export-btn d-flex align-items-center gap-2" onClick={exportToPDF}>
              📄 Export PDF Document
            </button>
            <button className="btn excel-export-btn d-flex align-items-center gap-2" onClick={exportToExcel}>
              📊 Export Excel Sheets
            </button>
          </div>
        </div>
      </div>

      {/* Live Operational Matrix Sheets tables */}
      <div className="row g-4 mb-4">
        {/* Recent Payment Settlement List */}
        <div className="col-lg-6">
          <div className="premium-panel-card p-4 shadow-lg h-100">
            <h4 className="fw-bold mb-3" style={{ fontSize: "16px", color: "#e5b869" }}>
              Recent Cash Flow & Payment Details
            </h4>
            <div className="table-responsive rounded-3" style={{ border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <table className="table premium-table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Amount</th>
                    <th>Method</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.recentPayments && report.recentPayments.length > 0 ? (
                    report.recentPayments.map((pay) => (
                      <tr key={pay._id}>
                        <td className="fw-medium text-white">{pay.member || "Guest User"}</td>
                        <td style={{ color: "#34d399", fontWeight: "600" }}>
                          ₹ {parseFloat(pay.amount || 0).toLocaleString("en-IN")}
                        </td>
                        <td>{pay.paymentMethod || "Cash"}</td>
                        <td>
                          <span className="badge bg-success bg-opacity-10 text-success px-2 py-1">
                            {pay.status || "Paid"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted small">No dynamic payments processed.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Workout Activity Management Track */}
        <div className="col-lg-6">
          <div className="premium-panel-card p-4 shadow-lg h-100">
            <h4 className="fw-bold mb-3" style={{ fontSize: "16px", color: "#e5b869" }}>
              Recent Training & Workout Logs
            </h4>
            <div className="table-responsive rounded-3" style={{ border: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <table className="table premium-table table-hover align-middle">
                <thead>
                  <tr>
                    <th>Member</th>
                    <th>Workout</th>
                    <th>Trainer</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.recentWorkouts && report.recentWorkouts.length > 0 ? (
                    report.recentWorkouts.map((workout) => (
                      <tr key={workout._id}>
                        <td className="fw-medium text-white">{workout.member || "Regular Member"}</td>
                        <td>{workout.workoutName || "General Cardio"}</td>
                        <td>{workout.trainer || "Assigned Coach"}</td>
                        <td>
                          <span className={`badge px-2 py-1 ${
                            workout.status === "Completed" ? "bg-success bg-opacity-10 text-success" : "bg-warning bg-opacity-10 text-warning"
                          }`}>
                            {workout.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-muted small">No scheduled workout records active.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Monthly Financial Timeline Matrix View */}
      <div className="premium-panel-card p-4 shadow-lg">
        <h4 className="fw-bold mb-3" style={{ fontSize: "16px", color: "#e5b869" }}>
          Monthly Revenue Breakdown (Days & Months Dynamic Data)
        </h4>
        <div className="table-responsive rounded-3" style={{ border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <table className="table premium-table table-hover align-middle">
            <thead>
              <tr>
                <th>Financial Year</th>
                <th>Target Calendar Month</th>
                <th>Calculated Total Monthly Revenue</th>
              </tr>
            </thead>
            <tbody>
              {report.monthlyRevenue && report.monthlyRevenue.length > 0 ? (
                report.monthlyRevenue.map((item, index) => (
                  <tr key={index}>
                    <td className="fw-semibold text-white">{item._id?.year || "2026"}</td>
                    <td>{getMonthName(item._id?.month)}</td>
                    <td style={{ color: "#34d399", fontWeight: "600" }}>
                      ₹ {parseFloat(item.amount || 0).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-muted small">No historical timeline statements recorded.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Reports;