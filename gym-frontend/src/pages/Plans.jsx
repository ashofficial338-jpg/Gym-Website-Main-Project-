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
    setPlan({
      ...plan,
      [e.target.name]: e.target.value,
    });
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
      name: data.name,
      duration: data.duration,
      price: data.price,
    });

    setEditId(data._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await API.delete(`/plans/${id}`);
      alert("Plan Deleted Successfully");
      fetchPlans();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Plan Management</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          className="form-control mb-2"
          placeholder="Plan Name"
          value={plan.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="duration"
          className="form-control mb-2"
          placeholder="Duration (Months)"
          value={plan.duration}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          className="form-control mb-3"
          placeholder="Price"
          value={plan.price}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          {editId ? "Update Plan" : "Add Plan"}
        </button>

      </form>

      <hr />

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Plan Name</th>
            <th>Duration (Months)</th>
            <th>Price</th>
            <th width="180">Action</th>
          </tr>
        </thead>

        <tbody>
          {plans.length > 0 ? (
            plans.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.duration}</td>
                <td>₹ {p.price}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Plans Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Plans;