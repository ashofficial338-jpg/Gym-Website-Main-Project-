import { useEffect, useState } from "react";
import API from "../services/api";
import { 
  FaUserTie, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSync, 
  FaPhone, 
  FaAward, 
  FaImage, 
  FaTimes,
  FaCheck
} from "react-icons/fa";

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
    <div 
      className="UI-fade-in"
      style={{
        backgroundColor: "#0b0f17",
        minHeight: "100vh",
        width: "100%",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        margin: 0,
        padding: "24px 32px",
        boxSizing: "border-box"
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .UI-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .spin-animation {
          animation: spinEffect 1s linear infinite;
        }
        @keyframes spinEffect {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .premium-dashboard-card {
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
          transition: all 0.25s ease;
        }

        .metric-card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 163, 89, 0.3);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        }

        .gold-action-btn {
          background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important;
          border: none !important;
          color: #0b0f17 !important;
          font-weight: 600;
          transition: all 0.2s ease;
        }
        .gold-action-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 6px 15px rgba(212, 163, 89, 0.2);
        }

        .outline-action-btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15) !important;
          color: #ffffff !important;
          transition: all 0.2s ease;
        }
        .outline-action-btn:hover {
          background: rgba(255, 255, 255, 0.05) !important;
          border-color: #e5b869 !important;
          color: #e5b869 !important;
        }

        .custom-dark-input {
          background: rgba(11, 15, 23, 0.6) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          border-radius: 10px !important;
        }
        .custom-dark-input:focus {
          border-color: #e5b869 !important;
          box-shadow: 0 0 0 0.25rem rgba(229, 184, 105, 0.25) !important;
        }
        .custom-dark-input::placeholder {
          color: #6c757d;
        }

        .table-dark-custom {
          background-color: transparent !important;
          color: #ffffff !important;
        }
        .table-dark-custom th {
          background: rgba(19, 26, 38, 0.9) !important;
          color: #e5b869 !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          font-weight: 600;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.5px;
        }
        .table-dark-custom td {
          background: transparent !important;
          color: #ffffff !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
          vertical-align: middle;
        }
        .table-hover-custom tbody tr:hover td {
          background: rgba(255, 255, 255, 0.02) !important;
        }
      `}</style>

      {/* =================================================
          HEADER SECTION
      ================================================= */}
      <div
        className="premium-dashboard-card p-4 mb-4 position-relative overflow-hidden w-100"
        style={{
          backgroundImage: "linear-gradient(135deg, rgba(11, 15, 23, 0.95), rgba(19, 26, 38, 0.85)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h2 className="fw-bold text-white mb-2 d-flex align-items-center gap-2">
              <FaUserTie style={{ color: "#e5b869" }} /> Trainer Management
            </h2>
            <p className="text-muted mb-0" style={{ color: "#8a94a6", fontSize: "14px" }}>
              Manage professional gym trainers, specializations, and credentials.
            </p>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            <div className="px-3 py-2 rounded-pill" style={{ background: "rgba(229, 184, 105, 0.1)", border: "1px solid rgba(229, 184, 105, 0.3)", color: "#e5b869", fontSize: "13px", fontWeight: "600" }}>
              Total Trainers: {trainers.length}
            </div>
            <button 
              onClick={fetchTrainers} 
              className="btn outline-action-btn btn-sm rounded-pill px-3 py-2 d-flex align-items-center gap-2"
              disabled={fetching}
            >
              <FaSync className={fetching ? "spin-animation" : ""} /> 
              {fetching ? "Syncing..." : "Refresh"}
            </button>
          </div>
        </div>
      </div>

      {/* =================================================
          FORM SECTION
      ================================================= */}
      <div className="card premium-dashboard-card shadow-sm mb-4 w-100">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4 text-white d-flex align-items-center gap-2 text-uppercase tracking-wider small" style={{ fontSize: "15px" }}>
            {editId ? <FaEdit style={{ color: "#e5b869" }} /> : <FaPlus style={{ color: "#e5b869" }} />} 
            {editId ? "Update Trainer Details" : "Add New Trainer"}
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6 col-lg-4">
                <label className="form-label fw-medium small" style={{ color: "#8a94a6" }}>
                  Trainer Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control custom-dark-input py-2"
                  placeholder="Enter trainer name"
                  value={trainer.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Specialization */}
              <div className="col-md-6 col-lg-4">
                <label className="form-label fw-medium small" style={{ color: "#8a94a6" }}>
                  Specialization *
                </label>
                <input
                  type="text"
                  name="specialization"
                  className="form-control custom-dark-input py-2"
                  placeholder="e.g. Fitness, Yoga, Crossfit"
                  value={trainer.specialization}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone */}
              <div className="col-md-6 col-lg-4">
                <label className="form-label fw-medium small" style={{ color: "#8a94a6" }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control custom-dark-input py-2"
                  placeholder="Enter phone number"
                  value={trainer.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Experience */}
              <div className="col-md-6 col-lg-4">
                <label className="form-label fw-medium small" style={{ color: "#8a94a6" }}>
                  Experience (Years) *
                </label>
                <input
                  type="number"
                  name="experience"
                  className="form-control custom-dark-input py-2"
                  placeholder="Years of experience"
                  min="0"
                  value={trainer.experience}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Image */}
              <div className="col-md-8">
                <label className="form-label fw-medium small" style={{ color: "#8a94a6" }}>
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  className="form-control custom-dark-input py-2"
                  placeholder="https://example.com/trainer.jpg"
                  value={trainer.image}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="d-flex gap-2 mt-4">
              <button
                type="submit"
                className="btn gold-action-btn px-4 py-2 rounded-3 d-flex align-items-center gap-2"
                disabled={loading}
              >
                <FaCheck />
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Trainer"
                  : "Add Trainer"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn outline-action-btn px-4 py-2 rounded-3 d-flex align-items-center gap-2"
                  onClick={handleCancel}
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* =================================================
          TRAINER TABLE SECTION
      ================================================= */}
      <div className="card premium-dashboard-card shadow-sm w-100">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-4 text-white d-flex align-items-center gap-2 text-uppercase tracking-wider small" style={{ fontSize: "15px" }}>
            <FaUserTie style={{ color: "#e5b869" }} /> Trainer Directory
          </h5>

          {fetching ? (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ width: "2.5rem", height: "2.5rem", color: "#e5b869" }} role="status">
                <span className="visually-hidden">Loading trainers...</span>
              </div>
              <p className="mt-3 text-muted">Loading professional trainers...</p>
            </div>
          ) : trainers.length === 0 ? (
            <div className="text-center py-5">
              <div className="fs-1 mb-3" style={{ color: "#e5b869" }}>
                <FaUserTie opacity={0.3} />
              </div>
              <h5 className="text-white">No Trainers Found</h5>
              <p className="text-muted small">
                Add your first trainer using the registration form above.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-dark-custom table-hover-custom align-middle mb-0">
                <thead>
                  <tr>
                    <th className="py-3">#</th>
                    <th className="py-3">Image</th>
                    <th className="py-3">Name</th>
                    <th className="py-3">Specialization</th>
                    <th className="py-3">Phone</th>
                    <th className="py-3">Experience</th>
                    <th className="py-3 text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {trainers.map((t, index) => (
                    <tr key={t._id}>
                      <td className="fw-medium text-muted">{index + 1}</td>
                      <td>
                        <img
                          src={
                            t.image ||
                            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                          }
                          alt={t.name}
                          width="45"
                          height="45"
                          className="rounded-circle"
                          style={{
                            objectFit: "cover",
                            border: "1px solid rgba(229, 184, 105, 0.3)"
                          }}
                        />
                      </td>
                      <td>
                        <strong className="text-white">{t.name}</strong>
                      </td>
                      <td>
                        <span className="badge px-3 py-2 rounded-pill" style={{ background: "rgba(129, 140, 248, 0.1)", color: "#818cf8", border: "1px solid rgba(129, 140, 248, 0.2)" }}>
                          {t.specialization}
                        </span>
                      </td>
                      <td>
                        <span className="d-flex align-items-center gap-1 text-muted">
                          <FaPhone size={12} className="text-warning" style={{ color: "#e5b869" }} /> {t.phone}
                        </span>
                      </td>
                      <td>
                        <span className="badge px-3 py-2 rounded-pill" style={{ background: "rgba(52, 211, 153, 0.1)", color: "#34d399", border: "1px solid rgba(52, 211, 153, 0.2)" }}>
                          {t.experience} Years
                        </span>
                      </td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm me-2 px-3 py-1.5 rounded-2"
                          style={{ background: "rgba(229, 184, 105, 0.1)", color: "#e5b869", border: "1px solid rgba(229, 184, 105, 0.3)" }}
                          onClick={() => handleEdit(t)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm px-3 py-1.5 rounded-2"
                          style={{ background: "rgba(248, 113, 113, 0.1)", color: "#f87171", border: "1px solid rgba(248, 113, 113, 0.3)" }}
                          onClick={() => handleDelete(t._id)}
                        >
                          <FaTrash className="me-1" /> Delete
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