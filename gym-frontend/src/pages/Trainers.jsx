import { useEffect, useState } from "react";
import API from "../services/api";

function Trainers() {
  const emptyTrainer = {
    name: "",
    specialization: "",
    phone: "",
    experience: "",
    image: "",
  };

  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState(emptyTrainer);
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // =====================================================
  // FETCH TRAINERS
  // =====================================================

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      setFetching(true);

      const res = await API.get("/trainers");

      console.log("TRAINERS RESPONSE:", res.data);

      // Backend returns { success, trainers }
      setTrainers(res.data.trainers || []);
    } catch (error) {
      console.error("FETCH TRAINERS ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to load trainers"
      );
    } finally {
      setFetching(false);
    }
  };

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTrainer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD / UPDATE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !trainer.name.trim() ||
      !trainer.specialization.trim() ||
      !trainer.phone.trim() ||
      trainer.experience === ""
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: trainer.name.trim(),
        specialization: trainer.specialization.trim(),
        phone: trainer.phone.trim(),
        experience: Number(trainer.experience),
        image: trainer.image.trim(),
      };

      if (editId) {
        await API.put(`/trainers/${editId}`, payload);

        alert("Trainer Updated Successfully");
      } else {
        await API.post("/trainers", payload);

        alert("Trainer Added Successfully");
      }

      setTrainer(emptyTrainer);
      setEditId(null);

      await fetchTrainers();
    } catch (error) {
      console.error("TRAINER SAVE ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Trainer operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // EDIT
  // =====================================================

  const handleEdit = (t) => {
    setTrainer({
      name: t.name || "",
      specialization: t.specialization || "",
      phone: t.phone || "",
      experience: t.experience ?? "",
      image: t.image || "",
    });

    setEditId(t._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/trainers/${id}`);

      alert("Trainer Deleted Successfully");

      await fetchTrainers();
    } catch (error) {
      console.error("DELETE TRAINER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete trainer"
      );
    }
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setTrainer(emptyTrainer);
    setEditId(null);
  };

  return (
    <div className="container-fluid py-4">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>
          <h2 className="fw-bold mb-1">
            🏋️ Trainer Management
          </h2>

          <p className="text-muted mb-0">
            Manage gym trainers and their details
          </p>
        </div>

        <div className="badge bg-primary fs-6 p-3">
          Total Trainers: {trainers.length}
        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

      <div className="card shadow-lg border-0 rounded-4 mb-4">

        <div className="card-header bg-dark text-white rounded-top-4">

          <h4 className="mb-0">
            {editId
              ? "✏️ Update Trainer"
              : "➕ Add New Trainer"}
          </h4>

        </div>

        <div className="card-body p-4">

          <form onSubmit={handleSubmit}>

            <div className="row">

              {/* Name */}

              <div className="col-md-6 col-lg-4 mb-3">

                <label className="form-label fw-bold">
                  Trainer Name
                </label>

                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Enter trainer name"
                  value={trainer.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Specialization */}

              <div className="col-md-6 col-lg-4 mb-3">

                <label className="form-label fw-bold">
                  Specialization
                </label>

                <input
                  type="text"
                  name="specialization"
                  className="form-control"
                  placeholder="e.g. Fitness, Yoga"
                  value={trainer.specialization}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Phone */}

              <div className="col-md-6 col-lg-4 mb-3">

                <label className="form-label fw-bold">
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  placeholder="Enter phone number"
                  value={trainer.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Experience */}

              <div className="col-md-6 col-lg-4 mb-3">

                <label className="form-label fw-bold">
                  Experience
                </label>

                <input
                  type="number"
                  name="experience"
                  className="form-control"
                  placeholder="Years"
                  min="0"
                  value={trainer.experience}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* Image */}

              <div className="col-md-8 mb-3">

                <label className="form-label fw-bold">
                  Image URL
                </label>

                <input
                  type="url"
                  name="image"
                  className="form-control"
                  placeholder="https://example.com/trainer.jpg"
                  value={trainer.image}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="d-flex gap-2">

              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Trainer"
                  : "Add Trainer"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary px-4"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </div>
      </div>

      {/* =================================================
          TRAINER TABLE
      ================================================= */}

      <div className="card shadow-lg border-0 rounded-4">

        <div className="card-header bg-primary text-white rounded-top-4">

          <h4 className="mb-0">
            👥 Trainer List
          </h4>

        </div>

        <div className="card-body">

          {fetching ? (

            <div className="text-center py-5">

              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <p className="mt-3 text-muted">
                Loading trainers...
              </p>

            </div>

          ) : trainers.length === 0 ? (

            <div className="text-center py-5">

              <div style={{ fontSize: "60px" }}>
                🏋️
              </div>

              <h5>No Trainers Found</h5>

              <p className="text-muted">
                Add your first trainer using the form above.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Specialization</th>
                    <th>Phone</th>
                    <th>Experience</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {trainers.map((t, index) => (

                    <tr key={t._id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>

                        <img
                          src={
                            t.image ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt={t.name}
                          width="55"
                          height="55"
                          className="rounded-circle border"
                          style={{
                            objectFit: "cover",
                          }}
                        />

                      </td>

                      <td>
                        <strong>{t.name}</strong>
                      </td>

                      <td>
                        <span className="badge bg-info text-dark">
                          {t.specialization}
                        </span>
                      </td>

                      <td>
                        📞 {t.phone}
                      </td>

                      <td>
                        <span className="badge bg-success">
                          {t.experience} Years
                        </span>
                      </td>

                      <td>

                        <button
                          type="button"
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(t)}
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(t._id)
                          }
                        >
                          🗑️ Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Trainers;