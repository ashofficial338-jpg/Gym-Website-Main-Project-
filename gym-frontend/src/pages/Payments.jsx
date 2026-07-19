import { useEffect, useState } from "react";
import API from "../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);

  const [payment, setPayment] = useState({
    member: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "Cash",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments");
      setPayments(res.data.payments || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await API.put(`/payments/${editId}`, payment);
        alert("Payment Updated Successfully");
      } else {
        await API.post("/payments", payment);
        alert("Payment Added Successfully");
      }

      setPayment({
        member: "",
        amount: "",
        paymentDate: "",
        paymentMethod: "Cash",
      });

      setEditId(null);
      fetchPayments();

    } catch (err) {
      console.log(err);
      alert("Operation Failed");
    }
  };

  const handleEdit = (item) => {
    setPayment({
      member: item.member,
      amount: item.amount,
      paymentDate: item.paymentDate?.substring(0, 10),
      paymentMethod: item.paymentMethod,
    });

    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payment?")) return;

    try {
      await API.delete(`/payments/${id}`);
      alert("Payment Deleted Successfully");
      fetchPayments();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Payment Management</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="member"
          className="form-control mb-2"
          placeholder="Member Name"
          value={payment.member}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="amount"
          className="form-control mb-2"
          placeholder="Amount"
          value={payment.amount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="paymentDate"
          className="form-control mb-2"
          value={payment.paymentDate}
          onChange={handleChange}
          required
        />

        <select
          name="paymentMethod"
          className="form-control mb-3"
          value={payment.paymentMethod}
          onChange={handleChange}
        >
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>

        <button className="btn btn-primary">
          {editId ? "Update Payment" : "Add Payment"}
        </button>

      </form>

      <hr />

      <table className="table table-bordered">

        <thead className="table-dark">
          <tr>
            <th>Member</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Method</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {payments.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                No Payments Found
              </td>
            </tr>
          ) : (
            payments.map((item) => (
              <tr key={item._id}>
                <td>{item.member}</td>
                <td>₹ {item.amount}</td>
                <td>{item.paymentDate?.substring(0, 10)}</td>
                <td>{item.paymentMethod}</td>

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
  );
}

export default Payments;