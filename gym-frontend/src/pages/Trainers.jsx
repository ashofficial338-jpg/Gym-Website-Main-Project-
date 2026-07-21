import { useEffect, useState } from "react";
import API from "../services/api";

function Trainers() {
  const [trainers, setTrainers] = useState([]);

  const [trainer, setTrainer] = useState({
    name: "",
    specialization: "",
    experience: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await API.get("/trainers");
      setTrainers(res.data || []);
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
        experience: "",
        image: "",
      });

      setEditId(null);
      fetchTrainers();

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const handleEdit = (t) => {
    setTrainer({
      name: t.name,
      specialization: t.specialization,
      experience: t.experience,
      image: t.image,
    });

    setEditId(t._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trainer?")) return;

    try {
      await API.delete(`/trainers/${id}`);
      alert("Trainer Deleted Successfully");
      fetchTrainers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid py-4">

      <div className="card shadow-lg border-0 rounded-4">

        <div className="card-header bg-dark text-white">
          <h3 className="mb-0">🏋️ Trainer Management</h3>
        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Trainer Name"
                  name="name"
                  value={trainer.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Specialization"
                  name="specialization"
                  value={trainer.specialization}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-2 mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Experience"
                  name="experience"
                  value={trainer.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Image URL"
                  name="image"
                  value={trainer.image}
                  onChange={handleChange}
                />
              </div>

            </div>

            <button className="btn btn-primary">
              {editId ? "Update Trainer" : "Add Trainer"}
            </button>

          </form>

          <hr />

          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead className="table-dark">

                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Experience</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {trainers.length === 0 ? (

                  <tr>
                    <td colSpan="5" className="text-center">
                      No Trainers Found
                    </td>
                  </tr>

                ) : (

                  trainers.map((t) => (

                    <tr key={t._id}>

                      <td>
                        <img
                          src={
                            t.image ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt={t.name}
                          width="60"
                          height="60"
                          className="rounded-circle"
                        />
                      </td>

                      <td>{t.name}</td>

                      <td>{t.specialization}</td>

                      <td>{t.experience} Years</td>

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

        </div>

      </div>

    </div>
  );
}

export default Trainers;