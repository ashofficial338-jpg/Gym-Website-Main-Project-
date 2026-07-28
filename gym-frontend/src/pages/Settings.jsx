import { useEffect, useState } from "react";
import API from "../services/api";

function Settings() {

  const [form, setForm] = useState({
    gymName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
    theme: "light",
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const res = await API.get("/settings");
    setForm(res.data.settings);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const save = async () => {
    await API.put("/settings", form);
    alert("Settings Saved Successfully");
  };

  return (
    <div className="container mt-4">

      <h2>⚙️ Settings</h2>

      <div className="card shadow mt-3">

        <div className="card-body">

          <input
            className="form-control mb-3"
            name="gymName"
            placeholder="Gym Name"
            value={form.gymName}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="ownerName"
            placeholder="Owner Name"
            value={form.ownerName}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <select
            className="form-control mb-3"
            name="theme"
            value={form.theme}
            onChange={handleChange}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <button
            className="btn btn-primary"
            onClick={save}
          >
            Save Settings
          </button>

        </div>

      </div>

    </div>
  );
}

export default Settings;