import { useEffect, useState } from "react";
import API from "../services/api";

function Members() {
  const [members, setMembers] = useState([]);

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
      console.log(err);
      alert("Operation Failed");
    }
  };

  const handleEdit = (data) => {
    setMember({
      name: data.name,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      plan: data.plan,
    });

    setEditId(data._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await API.delete(`/members/${id}`);
      alert("Member Deleted Successfully");
      fetchMembers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Member Management</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Member Name"
          value={member.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="age"
          className="form-control mb-2"
          placeholder="Age"
          value={member.age}
          onChange={handleChange}
          required
        />

        <select
          name="gender"
          className="form-control mb-2"
          value={member.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="text"
          name="phone"
          className="form-control mb-2"
          placeholder="Phone Number"
          value={member.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="plan"
          className="form-control mb-3"
          placeholder="Plan"
          value={member.plan}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          {editId ? "Update Member" : "Add Member"}
        </button>

      </form>

      <hr />

      <table className="table table-bordered">

        <thead className="table-dark">
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

          {members.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No Members Found
              </td>
            </tr>
          ) : (
            members.map((m) => (
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
  );
}

export default Members;