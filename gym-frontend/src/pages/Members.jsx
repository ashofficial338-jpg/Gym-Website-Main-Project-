import { useEffect, useState } from "react";
import API from "../services/api";

function Members() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [member, setMember] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    plan: "",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembers(res.data.members || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/members/${editId}`, member);
        alert("Member Updated Successfully");
      } else {
        await API.post("/members", member);
        alert("Member Added Successfully");
      }

      setMember({
        name: "",
        age: "",
        gender: "",
        phone: "",
        plan: "",
      });

      setEditId(null);
      fetchMembers();

    } catch (err) {
      alert("Operation Failed");
    }
  };

  const handleEdit = (m) => {
    setMember({
      name: m.name,
      age: m.age,
      gender: m.gender,
      phone: m.phone,
      plan: m.plan,
    });

    setEditId(m._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await API.delete(`/members/${id}`);
      fetchMembers();
    } catch (err) {
      alert("Delete Operation Failed");
    }
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="container-fluid p-4 UI-fade-in"
      style={{
        backgroundColor: "#0b0f17",
        minHeight: "100vh",
        color: "#ffffff",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* Premium Design Styles System */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .UI-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Glassmorphic Panel Systems */
        .premium-panel-card {
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 16px;
        }

        /* Input Controls */
        .premium-field-control {
          background: rgba(11, 15, 23, 0.8) !important;
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
        }
        .premium-field-control::placeholder {
          color: rgba(255, 255, 255, 0.35) !important;
        }
        select.premium-field-control option {
          background: #131a26;
          color: #fff;
        }

        /* Premium Buttons */
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

        /* Table Systems Overrides */
        .premium-table {
          color: #ffffff !important;
          margin-bottom: 0 !important;
        }
        .premium-table th {
          background: rgba(11, 15, 23, 0.6) !important;
          color: #8a94a6 !important;
          font-size: 12px;
          text-uppercase: uppercase;
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

        /* Micro Operations Badges */
        .action-mini-btn-edit {
          background: rgba(229, 184, 105, 0.15) !important;
          border: 1px solid rgba(229, 184, 105, 0.3) !important;
          color: #e5b869 !important;
          font-size: 12px;
          font-weight: 500;
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
          font-weight: 500;
          border-radius: 6px;
          padding: 4px 12px;
          transition: all 0.2s ease;
        }
        .action-mini-btn-delete:hover {
          background: #f87171 !important;
          color: #ffffff !important;
        }
      `}</style>

      {/* Workspace Management Form Panel */}
      <div className="premium-panel-card p-4 shadow-lg mb-4">
        <h4 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ letterSpacing: "-0.5px" }}>
          <span style={{ color: "#e5b869" }}>👥</span> Member Registration Console
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                className="form-control premium-field-control"
                name="name"
                placeholder="Full Name"
                value={member.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <input
                type="number"
                className="form-control premium-field-control"
                name="age"
                placeholder="Age"
                value={member.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-select premium-field-control"
                name="gender"
                value={member.gender}
                onChange={handleChange}
                required
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className="col-md-4">
              <input
                className="form-control premium-field-control"
                name="phone"
                placeholder="Phone Configuration"
                value={member.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                className="form-control premium-field-control"
                name="plan"
                placeholder="Assign Membership Plan"
                value={member.plan}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <button className="btn gold-action-btn w-100">
                {editId ? "Update System Records" : "Authorize & Save Member"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Database Output Matrix View */}
      <div className="premium-panel-card p-4 shadow-lg">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <h4 className="fw-bold m-0" style={{ letterSpacing: "-0.5px" }}>
            Active Roster Records
          </h4>

          <input
            className="form-control premium-field-control"
            style={{ width: "260px" }}
            placeholder="🔍 Quick Filter Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-responsive rounded-3" style={{ border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <table className="table premium-table table-hover align-middle">
            <thead>
              <tr>
                <th>Member Identity</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone Matrix</th>
                <th>Assigned Plan</th>
                <th className="text-end">Operations</th>
              </tr>
            </thead>

            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-5" style={{ color: "#8a94a6" }}>
                    No authorized matches detected inside database logs
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m._id}>
                    <td className="fw-medium text-white">{m.name}</td>
                    <td>{m.age}</td>
                    <td>
                      <span className="badge px-2 py-1" style={{ 
                        background: m.gender === "Male" ? "rgba(129, 140, 248, 0.1)" : "rgba(248, 113, 113, 0.1)",
                        color: m.gender === "Male" ? "#818cf8" : "#f87171" 
                      }}>
                        {m.gender}
                      </span>
                    </td>
                    <td>{m.phone}</td>
                    <td>
                      <span className="badge border border-secondary text-secondary-light px-2 py-1">
                        {m.plan}
                      </span>
                    </td>
                    <td className="text-end">
                      <button
                        className="btn action-mini-btn-edit me-2"
                        onClick={() => handleEdit(m)}
                      >
                        Modify
                      </button>
                      <button
                        className="btn action-mini-btn-delete"
                        onClick={() => handleDelete(m._id)}
                      >
                        Remove
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

export default Members;