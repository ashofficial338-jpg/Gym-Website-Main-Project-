import { useEffect, useState } from "react";
import API from "../services/api";

function Workout() {
  const [workouts, setWorkouts] = useState([]);

  const [form, setForm] = useState({
    member: "",
    workoutName: "",
    trainer: "",
    duration: "",
    calories: "",
    workoutDate: "",
    status: "Pending",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const res = await API.get("/workouts");
      setWorkouts(res.data?.workouts || res.data || []);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setForm({
      member: "",
      workoutName: "",
      trainer: "",
      duration: "",
      calories: "",
      workoutDate: "",
      status: "Pending",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/workouts/${editId}`, form);
        alert("Workout Updated Successfully!");
      } else {
        await API.post("/workouts", form);
        alert("Workout Added Successfully!");
      }

      clearForm();
      fetchWorkouts();
    } catch (err) {
      console.log(err);
      alert("Operation Failed. Try again.");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      member: item.member || "",
      workoutName: item.workoutName || "",
      trainer: item.trainer || "",
      duration: item.duration || "",
      calories: item.calories || "",
      workoutDate: item.workoutDate ? item.workoutDate.substring(0, 10) : "",
      status: item.status || "Pending",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Workout? Are you sure?")) return;

    try {
      await API.delete(`/workouts/${id}`);
      fetchWorkouts();
    } catch (err) {
      console.log(err);
      alert("Failed to delete the workout.");
    }
  };

  // Helper values for dynamic summary metrics
  const totalWorkouts = workouts.length;
  const completedCount = workouts.filter(w => w.status === "Completed").length;
  const pendingCount = totalWorkouts - completedCount;

  return (
    <div className="container mt-4">
      {/* Top Quick Stats Row */}
      <div className="row mb-4">
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm border-start border-primary border-4 text-center p-3">
            <h6 className="text-muted text-uppercase mb-1 fs-7">Total Sessions</h6>
            <h3 className="m-0 text-primary fw-bold">{totalWorkouts}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm border-start border-success border-4 text-center p-3">
            <h6 className="text-muted text-uppercase mb-1 fs-7">Completed</h6>
            <h3 className="m-0 text-success fw-bold">{completedCount}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-2">
          <div className="card shadow-sm border-start border-warning border-4 text-center p-3">
            <h6 className="text-muted text-uppercase mb-1 fs-7">Pending Tasks</h6>
            <h3 className="m-0 text-warning fw-bold">{pendingCount}</h3>
          </div>
        </div>
      </div>

      {/* Input Form Card */}
      <div className="card shadow border-0 mb-4">
        <div className="card-header bg-dark text-white py-3">
          <h3 className="m-0 fs-4">{editId ? "✏️ Edit Workout Details" : "🏋️‍♂️ Workout Management"}</h3>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Member Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Member Name"
                  name="member"
                  value={form.member}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Workout Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. Cardio, Weight Lifting"
                  name="workoutName"
                  value={form.workoutName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Trainer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Trainer Name"
                  name="trainer"
                  value={form.trainer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label fw-bold">Duration (mins)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mins"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <label className="form-label fw-bold">Calories Burned</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="kcal"
                  name="calories"
                  value={form.calories}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Workout Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="workoutDate"
                  value={form.workoutDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Status</label>
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Pending">⚠️ Pending</option>
                  <option value="Completed">✅ Completed</option>
                </select>
              </div>
            </div>

            <div className="mt-2">
              <button type="submit" className={`btn ${editId ? "btn-success" : "btn-primary"} me-2`}>
                {editId ? "Update Workout" : "Add Workout"}
              </button>
              {editId && (
                <button type="button" className="btn btn-secondary" onClick={clearForm}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Workout Table List Card */}
      <div className="card shadow border-0">
        <div className="card-header bg-primary text-white py-3">
          <h3 className="m-0 fs-5">📋 Workout List Dashboard</h3>
        </div>

        <div className="card-body table-responsive p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Member</th>
                <th>Workout</th>
                <th>Trainer</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-muted fw-bold">
                    No Workouts Logged Yet!
                  </td>
                </tr>
              ) : (
                workouts.map((item) => (
                  <tr key={item._id}>
                    <td className="fw-semibold">{item.member}</td>
                    <td>{item.workoutName}</td>
                    <td>{item.trainer}</td>
                    <td>{item.duration} min</td>
                    <td>{item.calories} kcal</td>
                    <td>{item.workoutDate ? item.workoutDate.substring(0, 10) : "N/A"}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${
                          item.status === "Completed"
                            ? "bg-success-subtle text-success p-2"
                            : "bg-warning-subtle text-dark p-2"
                        }`}
                      >
                        {item.status === "Completed" ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-outline-warning btn-sm me-2"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        🗑️ Delete
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
  );
}

export default Workout;