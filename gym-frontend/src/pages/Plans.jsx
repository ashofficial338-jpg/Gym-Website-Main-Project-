import { useEffect, useState } from "react";
import API from "../services/api";

function Plans() {
  const [plans, setPlans] = useState([]);

  const [plan, setPlan] = useState({
    name: "",
    duration: "",
    price: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await API.get("/plans");
      setPlans(res.data.plans || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/plans/${editId}`, plan);
        alert("Plan Updated Successfully");
      } else {
        await API.post("/plans", plan);
        alert("Plan Added Successfully");
      }

      setPlan({
        name: "",
        duration: "",
        price: "",
      });

      setEditId(null);
      fetchPlans();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  const handleEdit = (data) => {
    setPlan({
      name: data.name || "",
      duration: data.duration || "",
      price: data.price || "",
    });

    setEditId(data._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this plan?")) return;

    try {
      await API.delete(`/plans/${id}`);
      alert("Plan Deleted Successfully");
      fetchPlans();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const handleCancelEdit = () => {
    setPlan({ name: "", duration: "", price: "" });
    setEditId(null);
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
      {/* Design System Style Engine */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .UI-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Modern Box Container */
        .premium-panel-card {
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
        }

        /* Clean Functional Inputs */
        .premium-field-control {
          background: #0b0f17 !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          border-radius: 10px !important;
          padding: 12px 14px !important;
          font-size: 14px;
          transition: all 0.2s ease;
        }
        .premium-field-control:focus {
          border-color: #e5b869 !important;
          box-shadow: 0 0 0 3px rgba(212, 163, 89, 0.12) !important;
          background: #0b0f17 !important;
          color: #ffffff !important;
        }

        /* Luxury Gold Button */
        .gold-action-btn {
          background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important;
          border: none !important;
          color: #0b0f17 !important;
          font-weight: 600;
          border-radius: 10px !important;
          padding: 12px !important;
          transition: all 0.2s ease;
        }
        .gold-action-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 6px 15px rgba(212, 163, 89, 0.2);
        }

        /* Premium Table Customizations */
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
          padding: 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .premium-table td {
          padding: 16px !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;
          font-size: 14px;
          color: #e2e8f0;
        }
        .premium-table tbody tr:hover td {
          background: rgba(255, 255, 255, 0.02) !important;
        }

        /* Mini Action Buttons */
        .action-mini-btn-edit {
          background: rgba(229, 184, 105, 0.15) !important;
          border: 1px solid rgba(229, 184, 105, 0.3) !important;
          color: #e5b869 !important;
          font-size: 12px;
          border-radius: 6px;
          padding: 4px 12px;
          transition: all 0.2s ease;
        }
        .action-mini-btn-edit:hover {
          background: #e5b869 !important;
          color: #0b0f17 !important;
        }

        .action-mini-btn-delete {
          background: rgba(248, 113, 113, 0.15) !important;
          border: 1px solid rgba(248, 113, 113, 0.3) !important;
          color: #f87171 !important;
          font-size: 12px;
          border-radius: 6px;
          padding: 4px 12px;
          transition: all 0.2s ease;
        }
        .action-mini-btn-delete:hover {
          background: #f87171 !important;
          color: #ffffff !important;
        }
      `}</style>

      {/* Plan Registration Box */}
      <div className="premium-panel-card p-4 shadow-lg mb-4">
        <h4 className="fw-bold mb-4 d-flex align-items-center justify-content-between">
          <span className="d-flex align-items-center gap-2">
            <span style={{ color: "#e5b869" }}>📋</span> Plan Management
          </span>
          {editId && (
            <button 
              type="button" 
              className="btn btn-sm btn-outline-light" 
              style={{ fontSize: "12px", borderRadius: "6px" }}
              onClick={handleCancelEdit}
            >
              Cancel Edit Mode
            </button>
          )}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                name="name"
                className="form-control premium-field-control"
                placeholder="Plan Name"
                value={plan.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="number"
                name="duration"
                className="form-control premium-field-control"
                placeholder="Duration (Months)"
                value={plan.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <input
                type="number"
                name="price"
                className="form-control premium-field-control"
                placeholder="Price (₹)"
                value={plan.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12 mt-4">
              <button type="submit" className="btn gold-action-btn w-100">
                {editId ? "Update Plan" : "Add Plan"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Plans List Table */}
      <div className="premium-panel-card p-4 shadow-lg">
        <h4 className="fw-bold mb-4">
          Active Membership Plans
        </h4>

        <div className="table-responsive rounded-3" style={{ border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <table className="table premium-table table-hover align-middle">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>Duration</th>
                <th>Price Rate</th>
                <th className="text-end" style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.length > 0 ? (
                plans.map((p) => (
                  <tr key={p._id}>
                    <td className="fw-medium text-white">{p.name}</td>
                    <td>
                      <span className="badge px-2 py-1" style={{ background: "rgba(129, 140, 248, 0.1)", color: "#818cf8" }}>
                        {p.duration} {parseInt(p.duration) === 1 ? "Month" : "Months"}
                      </span>
                    </td>
                    <td style={{ color: "#34d399", fontWeight: "600" }}>
                      ₹ {parseFloat(p.price).toLocaleString("en-IN")}
                    </td>
                    <td className="text-end">
                      <button
                        className="btn action-mini-btn-edit me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn action-mini-btn-delete"
                        onClick={() => handleDelete(p._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5" style={{ color: "#8a94a6" }}>
                    No membership plans found in the system database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Plans;