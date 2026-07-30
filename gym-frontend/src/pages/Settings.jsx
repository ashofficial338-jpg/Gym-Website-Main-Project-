import { useEffect, useState } from "react";
import API from "../services/api";

function Settings() {
  const [settings, setSettings] = useState({
    gymName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    currency: "INR",
    timezone: "Asia/Kolkata",
    logo: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await API.get("/settings");
      const data = response.data?.settings;

      if (data) {
        setSettings({
          gymName: data.gymName ?? "",
          ownerName: data.ownerName ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
          currency: data.currency ?? "INR",
          timezone: data.timezone ?? "Asia/Kolkata",
          logo: data.logo ?? "",
        });
      }
    } catch (error) {
      console.error("Load Settings Error:", error);
      alert(error.response?.data?.message || "Unable to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const payload = {
        gymName: settings.gymName.trim(),
        ownerName: settings.ownerName.trim(),
        email: settings.email.trim(),
        phone: settings.phone.trim(),
        address: settings.address.trim(),
        currency: settings.currency.trim(),
        timezone: settings.timezone.trim(),
        logo: settings.logo.trim(),
      };

      const response = await API.put("/settings", payload);

      if (response.data?.success) {
        const updated = response.data.settings;
        setSettings({
          gymName: updated?.gymName ?? "",
          ownerName: updated?.ownerName ?? "",
          email: updated?.email ?? "",
          phone: updated?.phone ?? "",
          address: updated?.address ?? "",
          currency: updated?.currency ?? "INR",
          timezone: updated?.timezone ?? "Asia/Kolkata",
          logo: updated?.logo ?? "",
        });
        alert("Settings Updated Successfully");
      } else {
        alert(response.data?.message || "Update Failed");
      }
    } catch (error) {
      console.error("Settings Update Error:", error);
      alert(error.response?.data?.message || "Settings Update Failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div 
        className="container-fluid d-flex justify-content-center align-items-center" 
        style={{ backgroundColor: "#0b0f17", minHeight: "100vh", color: "#ffffff" }}
      >
        <div className="text-center py-5">
          <div className="spinner-border" style={{ color: "#e5b869" }} role="status"></div>
          <p className="mt-3" style={{ color: "#8a94a6" }}>Loading Settings...</p>
        </div>
      </div>
    );
  }

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
        textarea.premium-field-control { min-height: 100px; }
        .gold-action-btn { background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important; border: none !important; color: #0b0f17 !important; font-weight: 600; border-radius: 10px !important; padding: 12px 30px !important; transition: all 0.2s ease; }
        .gold-action-btn:hover { transform: translateY(-1px); filter: brightness(1.05); box-shadow: 0 6px 15px rgba(212, 163, 89, 0.2); }
        .gold-action-btn:disabled { background: #4a3e2b !important; color: #8a94a6 !important; transform: none; box-shadow: none; }
        .secondary-outline-btn { background: transparent !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; color: #8a94a6 !important; font-weight: 500; border-radius: 10px !important; padding: 12px 24px !important; transition: all 0.2s ease; }
        .secondary-outline-btn:hover { background: rgba(255, 255, 255, 0.05) !important; color: #ffffff !important; }
      `}</style>

      <div className="mb-4">
        <h2 className="fw-bold d-flex align-items-center gap-2">
          <span style={{ color: "#e5b869" }}>⚙️</span> Gym Settings
        </h2>
        <p style={{ color: "#8a94a6" }}>
          Manage your gym information and global software configurations.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="premium-panel-card p-4 shadow-lg">
          <h4 className="fw-bold mb-4 d-flex align-items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "15px" }}>
            <span style={{ color: "#e5b869" }}>🏋️</span> General Configuration
          </h4>

          <div className="row g-4">
            {/* Gym Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>Gym Name</label>
              <input
                type="text"
                name="gymName"
                className="form-control premium-field-control"
                value={settings.gymName}
                onChange={handleChange}
                placeholder="Enter gym name"
                required
              />
            </div>

            {/* Owner Name */}
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>Owner Name</label>
              <input
                type="text"
                name="ownerName"
                className="form-control premium-field-control"
                value={settings.ownerName}
                onChange={handleChange}
                placeholder="Enter owner name"
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control premium-field-control"
                value={settings.email}
                onChange={handleChange}
                placeholder="gym@example.com"
              />
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control premium-field-control"
                value={settings.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            {/* Address */}
            <div className="col-12">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>Physical Address</label>
              <textarea
                name="address"
                className="form-control premium-field-control"
                value={settings.address}
                onChange={handleChange}
                placeholder="Enter gym full address"
              />
            </div>

            {/* Currency */}
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>System Currency</label>
              <select
                name="currency"
                className="form-select premium-field-control"
                value={settings.currency}
                onChange={handleChange}
              >
                <option value="INR">INR - Indian Rupee (₹)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="GBP">GBP - British Pound (£)</option>
              </select>
            </div>

            {/* Timezone */}
            <div className="col-md-6">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>Timezone</label>
              <select
                name="timezone"
                className="form-select premium-field-control"
                value={settings.timezone}
                onChange={handleChange}
              >
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="Asia/Dubai">Asia/Dubai</option>
                <option value="Asia/Singapore">Asia/Singapore</option>
                <option value="Europe/London">Europe/London</option>
                <option value="America/New_York">America/New_York</option>
                <option value="America/Los_Angeles">America/Los_Angeles</option>
              </select>
            </div>

            {/* Logo URL */}
            <div className="col-12">
              <label className="form-label fw-semibold" style={{ color: "#8a94a6" }}>Logo Image URL</label>
              <input
                type="text"
                name="logo"
                className="form-control premium-field-control"
                value={settings.logo}
                onChange={handleChange}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 d-flex gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
            <button
              type="submit"
              className="btn gold-action-btn"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </button>

            <button
              type="button"
              className="btn secondary-outline-btn"
              onClick={loadSettings}
              disabled={saving}
            >
              Reset Form
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Settings;