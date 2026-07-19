import { useEffect, useState } from "react";
import API from "../services/api";

function Trainers() {
  const [trainers, setTrainers] = useState([]);

  const [trainer, setTrainer] = useState({
    name: "",
    specialization: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await API.get("/trainers");
      setTrainers(res.data.trainers || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTrainer({
      ...trainer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/trainers/${editId}`, trainer);
        alert("Trainer Updated Successfully");
      } else {
        await API.post("/trainers", trainer);
        alert("Trainer Added Successfully");
      }

      setTrainer({
        name: "",
        specialization: "",
        phone: "",
      });

      setEditId(null);
      fetchTrainers();

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const handleEdit = (data) => {
    setTrainer({
      name: data.name,
      specialization: data.specialization,
      phone: data.phone,
    });

    setEditId(data._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trainer?")) return;

    try {
      await API.delete(`/trainers/${id}`);
      alert("Trainer Deleted");
      fetchTrainers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Trainer Management</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Trainer Name"
          name="name"
          value={trainer.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Specialization"
          name="specialization"
          value={trainer.specialization}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Phone Number"
          name="phone"
          value={trainer.phone}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          {editId ? "Update Trainer" : "Add Trainer"}
        </button>

      </form>

      <hr />

      <table className="table table-bordered">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {trainers.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Trainers Found
              </td>
            </tr>
          ) : (
            trainers.map((t) => (
              <tr key={t._id}>
                <td>{t.name}</td>
                <td>{t.specialization}</td>
                <td>{t.phone}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(t._id)}
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

export default Trainers;