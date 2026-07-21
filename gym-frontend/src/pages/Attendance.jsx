import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");

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
    try {
      const res = await API.get("/attendance");
      setAttendance(res.data.attendance || []);
    } catch (err) {
      console.log(err);
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
        alert("Attendance Updated Successfully");
      } else {
        await API.post("/attendance", form);
        alert("Attendance Added Successfully");
      }

      setForm({
        member: "",
        date: "",
        status: "Present",
      });

      setEditId(null);
      fetchAttendance();

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
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
    if (!window.confirm("Delete Attendance?")) return;

    try {
      await API.delete(`/attendance/${id}`);
      alert("Attendance Deleted Successfully");
      fetchAttendance();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAttendance = attendance.filter((item) =>
    item.member.toLowerCase().includes(search.toLowerCase())
  );

  const presentCount = attendance.filter(
    (a) => a.status === "Present"
  ).length;

  const absentCount = attendance.filter(
    (a) => a.status === "Absent"
  ).length;

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
          📅 Attendance Management
        </h2>

        <p className="text-light">
          Manage Daily Attendance Records
        </p>
      </div>

      {/* Summary */}

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card bg-primary text-white rounded-4 shadow">
            <div className="card-body text-center">
              <h5>Total Records</h5>
              <h2>{attendance.length}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-success text-white rounded-4 shadow">
            <div className="card-body text-center">
              <h5>Present</h5>
              <h2>{presentCount}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card bg-danger text-white rounded-4 shadow">
            <div className="card-body text-center">
              <h5>Absent</h5>
              <h2>{absentCount}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* Form */}

      <div className="card shadow rounded-4 mb-4">
        <div className="card-body">

          <h4 className="mb-3">
            {editId ? "✏ Update Attendance" : "➕ Add Attendance"}
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Member Name"
                  name="member"
                  value={form.member}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Present">✅ Present</option>
                  <option value="Absent">❌ Absent</option>
                </select>
              </div>

            </div>

            <button className="btn btn-success px-4">
              {editId ? "Update Attendance" : "Add Attendance"}
            </button>

          </form>

        </div>
      </div>

      {/* Search */}

      <div className="mb-3">
        <input
          className="form-control"
          placeholder="🔍 Search Member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}

      <div className="card shadow rounded-4">
        <div className="card-body">

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">
                <tr>
                  <th>Member</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th width="170">Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredAttendance.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No Attendance Found
                    </td>
                  </tr>
                ) : (
                  filteredAttendance.map((item) => (
                    <tr key={item._id}>

                      <td>{item.member}</td>

                      <td>
                        {item.date?.substring(0, 10)}
                      </td>

                      <td>
                        <span
                          className={`badge ${
                            item.status === "Present"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td>

                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Attendance;