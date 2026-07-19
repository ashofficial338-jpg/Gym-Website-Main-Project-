import { useEffect, useState } from "react";
import API from "../services/api";

function Attendance() {
  const [attendance, setAttendance] = useState([]);

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

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Attendance Management</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="member"
          className="form-control mb-2"
          placeholder="Member Name"
          value={form.member}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="date"
          className="form-control mb-2"
          value={form.date}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          className="form-control mb-3"
          value={form.status}
          onChange={handleChange}
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button className="btn btn-primary">
          {editId ? "Update Attendance" : "Add Attendance"}
        </button>

      </form>

      <hr />

      <table className="table table-bordered">

        <thead className="table-dark">
          <tr>
            <th>Member</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {attendance.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Attendance Found
              </td>
            </tr>
          ) : (
            attendance.map((item) => (
              <tr key={item._id}>
                <td>{item.member}</td>
                <td>{item.date?.substring(0, 10)}</td>
                <td>{item.status}</td>
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
  );
}

export default Attendance;