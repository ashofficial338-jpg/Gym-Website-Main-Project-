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

    await API.delete(`/members/${id}`);
    fetchMembers();
  };

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="container-fluid p-4"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,.75)),url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        className="p-4 shadow-lg mb-4"
        style={{
          background: "rgba(255,255,255,.12)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
        }}
      >
        <h2 className="text-warning mb-4">
          👥 Member Management
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="row">

            <div className="col-md-4 mb-3">
              <input
                className="form-control"
                name="name"
                placeholder="Member Name"
                value={member.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2 mb-3">
              <input
                type="number"
                className="form-control"
                name="age"
                placeholder="Age"
                value={member.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-2 mb-3">
              <select
                className="form-control"
                name="gender"
                value={member.gender}
                onChange={handleChange}
                required
              >
                <option value="">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <input
                className="form-control"
                name="phone"
                placeholder="Phone Number"
                value={member.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                className="form-control"
                name="plan"
                placeholder="Plan"
                value={member.plan}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <button className="btn btn-warning w-100">
                {editId ? "Update Member" : "Add Member"}
              </button>
            </div>

          </div>

        </form>
      </div>

      <div
        className="p-4 shadow-lg"
        style={{
          background: "rgba(255,255,255,.12)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
        }}
      >

        <div className="d-flex justify-content-between mb-3">

          <h3 className="text-warning">
            Member List
          </h3>

          <input
            className="form-control"
            style={{ width: "250px" }}
            placeholder="Search Member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="table-responsive">

          <table className="table table-dark table-hover align-middle">

            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Plan</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">
                    No Members Found
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m._id}>

                    <td>{m.name}</td>
                    <td>{m.age}</td>
                    <td>{m.gender}</td>
                    <td>{m.phone}</td>
                    <td>{m.plan}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(m)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(m._id)}
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

export default Members;