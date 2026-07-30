import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    member: "",
    date: "",
    status: "Present",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await API.get("/attendance");
      setAttendance(res.data.attendance || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/attendance/${editId}`, form);
      } else {
        await API.post("/attendance", form);
      }

      setForm({
        member: "",
        date: "",
        status: "Present",
      });

      setEditId(null);
      fetchAttendance();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      member: item.member,
      date: item.date?.substring(0, 10),
      status: item.status,
    });
    setEditId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await API.delete(`/attendance/${id}`);
      fetchAttendance();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAttendance = attendance.filter((item) =>
    item.member.toLowerCase().includes(search.toLowerCase())
  );

  const totalRecords = attendance.length;
  const presentCount = attendance.filter((a) => a.status === "Present").length;
  const absentCount = attendance.filter((a) => a.status === "Absent").length;
  const attendanceRate = totalRecords > 0 ? Math.round((presentCount / totalRecords) * 100) : 0;

  return (
    <div
      className="container-fluid p-4"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #090d16 0%, #111827 50%, #030712 100%)",
        color: "#f3f4f6",
        fontFamily: "'Segoe UI', Roboto, sans-serif"
      }}
    >
      {/* Dynamic Keyframe Injection for High Quality Graphic Animations */}
      <style>{`
        @keyframes pulseGlow {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { transform: scale(1.03); box-shadow: 0 0 20px 10px rgba(245, 158, 11, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }
        @keyframes floatIcon {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes spinSync {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes waveHand {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        .animated-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animated-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5) !important;
        }
        .floating-icon {
          animation: floatIcon 4s ease-in-out infinite;
        }
        .sync-btn-active:hover .sync-icon {
          animation: spinSync 1.2s linear infinite;
        }
        .pulse-badge {
          animation: pulseGlow 2s infinite;
        }
        .custom-input:focus {
          background-color: rgba(15, 23, 42, 0.6) !important;
          border-color: #f59e0b !important;
          box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.25) !important;
          color: #fff !important;
        }
        .table-row-hover {
          transition: background-color 0.2s ease;
        }
        .table-row-hover:hover {
          background-color: rgba(255, 255, 255, 0.03) !important;
        }
      `}</style>

      {/* Glassmorphism Dynamic Header Profile Dashboard */}
      <div
        className="p-4 mb-4 border border-secondary border-opacity-25 shadow-lg"
        style={{
          background: "rgba(17, 24, 39, 0.7)",
          backdropFilter: "blur(16px)",
          borderRadius: "24px"
        }}
      >
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div className="d-flex align-items-center gap-3">
            <div 
              className="floating-icon p-3 bg-warning bg-opacity-10 rounded-4 border border-warning border-opacity-20 d-flex align-items-center justify-content-center"
              style={{ width: "65px", height: "65px" }}
            >
              <span className="fs-2 text-warning" style={{ display: "inline-block", animation: "waveHand 2.5s ease infinite" }}>📅</span>
            </div>
            <div>
              <h2 className="fw-extrabold text-transparent bg-clip-text mb-1" style={{ background: "linear-gradient(to right, #f59e0b, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Attendance Registry Hub
              </h2>
              <p className="text-muted mb-0 small text-uppercase tracking-wider fw-semibold">Continuous Realtime Audit Log Engine</p>
            </div>
          </div>
          <button 
            onClick={fetchAttendance} 
            className="btn btn-outline-warning btn-sm rounded-pill px-4 py-2 sync-btn-active fw-bold border-opacity-50 shadow-sm"
          >
            <span className="sync-icon d-inline-block me-2">🔄</span> Re-Sync Data
          </button>
        </div>
      </div>

      {/* Multi-layered Animated Graphic Cards Summary Grid */}
      <div className="row g-4 mb-4">
        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 rounded-4 shadow-sm text-white animated-card" style={{ background: "linear-gradient(135deg, #2563eb, #1d4ed8)" }}>
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white text-opacity-70 text-uppercase fw-bold small">Total Dataset</span>
                <h1 className="display-6 fw-bold mt-1 mb-0">{totalRecords}</h1>
              </div>
              <div className="bg-white bg-opacity-10 p-3 rounded-4 fs-1 floating-icon" style={{ animationDelay: "0s" }}>👥</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 rounded-4 shadow-sm text-white animated-card" style={{ background: "linear-gradient(135deg, #059669, #047857)" }}>
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white text-opacity-70 text-uppercase fw-bold small">Present Active</span>
                <h1 className="display-6 fw-bold mt-1 mb-0">{presentCount}</h1>
              </div>
              <div className="bg-white bg-opacity-10 p-3 rounded-4 fs-1 floating-icon" style={{ animationDelay: "0.5s" }}>🟢</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 rounded-4 shadow-sm text-white animated-card" style={{ background: "linear-gradient(135deg, #dc2626, #b91c1c)" }}>
            <div className="card-body p-4 d-flex align-items-center justify-content-between">
              <div>
                <span className="text-white text-opacity-70 text-uppercase fw-bold small">Absent Logged</span>
                <h1 className="display-6 fw-bold mt-1 mb-0">{absentCount}</h1>
              </div>
              <div className="bg-white bg-opacity-10 p-3 rounded-4 fs-1 floating-icon" style={{ animationDelay: "1s" }}>🔴</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-xl-3">
          <div className="card h-100 border-0 rounded-4 shadow-sm text-white animated-card" style={{ background: "linear-gradient(135deg, #d97706, #b45309)" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-white text-opacity-70 text-uppercase fw-bold small">Efficiency Index</span>
                <div className="bg-white bg-opacity-20 px-2 py-1 rounded-pill small fw-bold">{attendanceRate}%</div>
              </div>
              <div className="progress bg-white bg-opacity-20 rounded-pill mt-3 mb-2" style={{ height: '8px' }}>
                <div 
                  className="progress-bar bg-white rounded-pill progress-bar-striped progress-bar-animated" 
                  role="progressbar" 
                  style={{ width: `${attendanceRate}%` }} 
                  aria-valuenow={attendanceRate} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="text-white text-opacity-50 small d-block" style={{ fontSize: "11px" }}>Workspace stability allocation performance</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Dynamic Forms Component Block with Interactive Micro-Animations */}
        <div className="col-lg-4">
          <div className="card border-0 rounded-4 shadow-lg text-white" style={{ backgroundColor: "#1f2937", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className={`p-2 rounded-3 fs-5 ${editId ? "bg-warning text-dark pulse-badge" : "bg-success text-white"}`}>
                  {editId ? "⚡" : "✨"}
                </div>
                <h4 className="mb-0 fw-bold">{editId ? "Update Parameters" : "Register Personnel"}</h4>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold tracking-wide">FULL NAME</label>
                  <input
                    type="text"
                    className="form-control form-control-lg border-secondary text-white bg-dark bg-opacity-40 custom-input"
                    placeholder="John Doe"
                    name="member"
                    value={form.member}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "12px", transition: "all 0.3s" }}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label text-muted small fw-bold tracking-wide">LOG TIMESTAMP</label>
                  <input
                    type="date"
                    className="form-control form-control-lg border-secondary text-white bg-dark bg-opacity-40 custom-input"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "12px", transition: "all 0.3s" }}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label text-muted small fw-bold tracking-wide">STATUS PROFILE</label>
                  <select
                    className="form-select form-select-lg border-secondary text-white bg-dark bg-opacity-40 custom-input"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={{ borderRadius: "12px", transition: "all 0.3s" }}
                  >
                    <option value="Present" className="bg-dark text-white">🟢 Present Status</option>
                    <option value="Absent" className="bg-dark text-white">🔴 Absent Status</option>
                  </select>
                </div>

                <button 
                  className={`btn w-100 py-3 fw-bold rounded-3 shadow transition-all ${editId ? 'btn-warning text-dark pulse-badge' : 'btn-success'}`}
                  style={{ letterSpacing: "0.5px" }}
                >
                  {editId ? "Commit Matrix Override" : "Finalize System Entry"}
                </button>
                
                {editId && (
                  <button 
                    type="button"
                    onClick={() => {
                      setEditId(null);
                      setForm({ member: "", date: "", status: "Present" });
                    }}
                    className="btn btn-link link-light w-100 mt-3 text-decoration-none small"
                  >
                    Reset Action Form
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Database Grid Logs Interface Layer */}
        <div className="col-lg-8">
          <div className="card border-0 rounded-4 shadow-lg text-white" style={{ backgroundColor: "#1f2937", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                <h4 className="fw-bold mb-0">System Log Repositories</h4>
                <div className="position-relative" style={{ minWidth: "280px" }}>
                  <input
                    className="form-control bg-dark bg-opacity-40 border-secondary text-white rounded-pill ps-4 pe-5 custom-input"
                    placeholder="Search entry logs..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ transition: "all 0.3s" }}
                  />
                  <span className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted">🔍</span>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-warning" style={{ width: "3rem", height: "3rem" }} role="status">
                    <span className="visually-hidden">Syncing system database...</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive rounded-3 border border-secondary border-opacity-25 shadow-sm">
                  <table className="table table-dark align-middle mb-0">
                    <thead style={{ backgroundColor: "#111827" }}>
                      <tr>
                        <th className="py-3 ps-4 border-0 text-muted small tracking-wider">MEMBER IDENTITY</th>
                        <th className="py-3 border-0 text-muted small tracking-wider">TIMESTAMP</th>
                        <th className="py-3 border-0 text-muted small tracking-wider">STATE LOG</th>
                        <th className="py-3 text-end pe-4 border-0 text-muted small tracking-wider" width="180">EXECUTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAttendance.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center text-muted py-5">
                            💥 Database validation failed. No entries match current parameters.
                          </td>
                        </tr>
                      ) : (
                        filteredAttendance.map((item) => (
                          <tr key={item._id} className="border-bottom border-secondary border-opacity-10 table-row-hover">
                            <td className="py-3 ps-4 fw-bold text-white-50">{item.member}</td>
                            <td className="py-3 text-muted">{item.date?.substring(0, 10)}</td>
                            <td className="py-3">
                              <span
                                className={`badge px-3 py-2 rounded-pill fw-bold ${
                                  item.status === "Present"
                                    ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25"
                                    : "bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25"
                                }`}
                              >
                                {item.status === "Present" ? "● Active Log" : "○ Inactive Term"}
                              </span>
                            </td>
                            <td className="py-3 text-end pe-4">
                              <div className="btn-group rounded-3 shadow-sm border border-secondary border-opacity-25">
                                <button
                                  className="btn btn-dark text-warning btn-sm px-3 border-0"
                                  onClick={() => handleEdit(item)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-dark text-danger btn-sm px-3 border-0"
                                  onClick={() => handleDelete(item._id)}
                                >
                                  Drop
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Attendance;