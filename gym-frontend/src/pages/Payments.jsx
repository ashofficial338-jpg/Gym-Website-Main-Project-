import { useEffect, useState } from "react";
import API from "../services/api";

function Payments() {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]); // State to store members list

  const [payment, setPayment] = useState({
    member: "", // Will store the selected member's _id
    amount: "",
    paymentDate: "",
    paymentMethod: "Cash",
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchPayments();
    fetchMembers(); // Load members on component mount
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments");
      setPayments(res.data.payments || []);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  // Fetch members list from the backend
  const fetchMembers = async () => {
    try {
      const res = await API.get("/members"); // Your members API endpoint
      setMembers(res.data.members || res.data || []);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };

  const handleCancelEdit = () => {
    setPayment({
      member: "",
      amount: "",
      paymentDate: "",
      paymentMethod: "Cash",
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...payment,
      amount: Number(payment.amount),
    };

    try {
      if (editId) {
        await API.put(`/payments/${editId}`, payload);
        alert("Payment Updated Successfully");
      } else {
        await API.post("/payments", payload);
        alert("Payment Added Successfully");
      }

      handleCancelEdit();
      fetchPayments(); 
    } catch (err) {
      console.error("API Error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Operation Failed");
    }
  };

  const handleEdit = (item) => {
    setPayment({
      // Check if populated as an object (item.member._id) or flat string (item.member)
      member: typeof item.member === 'object' ? item.member?._id : item.member,
      amount: item.amount || "",
      paymentDate: item.paymentDate ? item.paymentDate.substring(0, 10) : "",
      paymentMethod: item.paymentMethod || "Cash",
    });

    setEditId(item._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Do you want to delete this payment?")) return;

    try {
      await API.delete(`/payments/${id}`);
      alert("Payment Deleted Successfully");
      fetchPayments();
    } catch (err) {
      console.error("Error deleting payment:", err);
    }
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .UI-fade-in { animation: fadeIn 0.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .premium-panel-card { background: rgba(19, 26, 38, 0.65); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 16px; }
        .premium-field-control { background: #0b0f17 !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; color: #ffffff !important; border-radius: 10px !important; padding: 12px 14px !important; font-size: 14px; transition: all 0.2s ease; }
        .premium-field-control:focus { border-color: #e5b869 !important; box-shadow: 0 0 0 3px rgba(212, 163, 89, 0.12) !important; }
        select.premium-field-control option { background: #131a26; color: #fff; }
        .gold-action-btn { background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important; border: none !important; color: #0b0f17 !important; font-weight: 600; border-radius: 10px !important; padding: 12px !important; transition: all 0.2s ease; }
        .gold-action-btn:hover { transform: translateY(-1px); filter: brightness(1.05); box-shadow: 0 6px 15px rgba(212, 163, 89, 0.2); }
        .premium-table { color: #ffffff !important; margin-bottom: 0 !important; }
        .premium-table th { background: rgba(11, 15, 23, 0.6) !important; color: #8a94a6 !important; font-size: 12px; text-transform: uppercase; padding: 16px !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important; }
        .premium-table td { padding: 16px !important; border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important; font-size: 14px; color: #e2e8f0; }
        .action-mini-btn-edit { background: rgba(229, 184, 105, 0.15) !important; border: 1px solid rgba(229, 184, 105, 0.3) !important; color: #e5b869 !important; font-size: 12px; border-radius: 6px; padding: 4px 12px; }
        .action-mini-btn-delete { background: rgba(248, 113, 113, 0.15) !important; border: 1px solid rgba(248, 113, 113, 0.3) !important; color: #f87171 !important; font-size: 12px; border-radius: 6px; padding: 4px 12px; }
      `}</style>

      <div className="premium-panel-card p-4 shadow-lg mb-4">
        <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
          <span style={{ color: "#e5b869" }}>💳</span> Payment Management
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* Member Dropdown Selection */}
            <div className="col-md-6">
              <select
                name="member"
                className="form-select premium-field-control"
                value={payment.member}
                onChange={handleChange}
                required
              >
                <option value="">Select Member</option>
                {members.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.name || m.username} {/* Fallback dynamically checks your member schema key */}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6">
              <input
                type="number"
                name="amount"
                className="form-control premium-field-control"
                placeholder="Amount (₹)"
                value={payment.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="date"
                name="paymentDate"
                className="form-control premium-field-control"
                value={payment.paymentDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <select
                name="paymentMethod"
                className="form-select premium-field-control"
                value={payment.paymentMethod}
                onChange={handleChange}
              >
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Card">Card</option>
              </select>
            </div>

            <div className="col-12 mt-4 d-flex gap-2">
              <button type="submit" className="btn gold-action-btn flex-grow-1">
                {editId ? "Update Payment" : "Add Payment"}
              </button>
              {editId && (
                <button 
                  type="button" 
                  className="btn btn-outline-secondary rounded-3 px-4"
                  onClick={handleCancelEdit}
                  style={{ color: '#8a94a6', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="premium-panel-card p-4 shadow-lg">
        <h4 className="fw-bold mb-4">Payment History List</h4>
        <div className="table-responsive rounded-3" style={{ border: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <table className="table premium-table table-hover align-middle">
            <thead>
              <tr>
                <th>Member</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5" style={{ color: "#8a94a6" }}>
                    No payments found.
                  </td>
                </tr>
              ) : (
                payments.map((item) => (
                  <tr key={item._id}>
                    {/* Fallback structure checks if backend populated the member object */}
                    <td className="fw-medium text-white">
                      {typeof item.member === 'object' ? item.member?.name : item.member}
                    </td>
                    <td style={{ color: "#34d399", fontWeight: "600" }}>
                      ₹ {parseFloat(item.amount).toLocaleString("en-IN")}
                    </td>
                    <td>{item.paymentDate?.substring(0, 10)}</td>
                    <td>{item.paymentMethod}</td>
                    <td className="text-end">
                      <button className="btn action-mini-btn-edit me-2" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="btn action-mini-btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
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

export default Payments;