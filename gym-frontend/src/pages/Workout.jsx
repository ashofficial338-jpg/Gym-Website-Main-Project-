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
      setWorkouts(res.data.workouts);
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
        alert("Workout Updated");
      } else {
        await API.post("/workouts", form);
        alert("Workout Added");
      }

      clearForm();
      fetchWorkouts();
    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setForm({
      member: item.member,
      workoutName: item.workoutName,
      trainer: item.trainer,
      duration: item.duration,
      calories: item.calories,
      workoutDate: item.workoutDate?.substring(0, 10),
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Workout?")) return;

    await API.delete(`/workouts/${id}`);
    fetchWorkouts();
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-dark text-white">
          <h3>Workout Management</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Member Name"
                  name="member"
                  value={form.member}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Workout Name"
                  name="workoutName"
                  value={form.workoutName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  className="form-control"
                  placeholder="Trainer Name"
                  name="trainer"
                  value={form.trainer}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Duration"
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Calories"
                  name="calories"
                  value={form.calories}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
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
                <select
                  className="form-select"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

            </div>

            <button className="btn btn-primary">
              {editId ? "Update Workout" : "Add Workout"}
            </button>

          </form>

        </div>

      </div>

      <div className="card shadow mt-4">

        <div className="card-header bg-primary text-white">
          Workout List
        </div>

        <div className="card-body table-responsive">

          <table className="table table-bordered table-hover">

            <thead className="table-dark">
              <tr>
                <th>Member</th>
                <th>Workout</th>
                <th>Trainer</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Workout Found
                  </td>
                </tr>
              ) : (
                workouts.map((item) => (
                  <tr key={item._id}>

                    <td>{item.member}</td>

                    <td>{item.workoutName}</td>

                    <td>{item.trainer}</td>

                    <td>{item.duration} min</td>

                    <td>{item.calories}</td>

                    <td>{item.workoutDate?.substring(0, 10)}</td>

                    <td>
                      <span
                        className={`badge ${
                          item.status === "Completed"
                            ? "bg-success"
                            : "bg-warning text-dark"
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
  );
}

export default Workout;