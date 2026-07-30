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

  // ======================================================
  // Load Settings
  // ======================================================

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

      alert(
        error.response?.data?.message ||
          "Unable to load settings"
      );
    } finally {
      setLoading(false);
    }
  };

  // ======================================================
  // Handle Input
  // ======================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value ?? "",
    }));
  };

  // ======================================================
  // Update Settings
  // ======================================================

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

      const response = await API.put(
        "/settings",
        payload
      );

      if (response.data?.success) {
        const updated = response.data.settings;

        setSettings({
          gymName: updated?.gymName ?? "",
          ownerName: updated?.ownerName ?? "",
          email: updated?.email ?? "",
          phone: updated?.phone ?? "",
          address: updated?.address ?? "",
          currency: updated?.currency ?? "INR",
          timezone:
            updated?.timezone ?? "Asia/Kolkata",
          logo: updated?.logo ?? "",
        });

        alert("Settings Updated Successfully");
      } else {
        alert(
          response.data?.message ||
            "Update Failed"
        );
      }
    } catch (error) {
      console.error(
        "Settings Update Error:",
        error
      );

      console.error(
        "Server Response:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ||
          "Settings Update Failed"
      );
    } finally {
      setSaving(false);
    }
  };

  // ======================================================
  // Loading
  // ======================================================

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <p className="mt-3">
            Loading Settings...
          </p>
        </div>
      </div>
    );
  }

  // ======================================================
  // UI
  // ======================================================

  return (
    <div className="container-fluid p-4">

      <div className="mb-4">
        <h2 className="fw-bold">
          ⚙️ Gym Settings
        </h2>

        <p className="text-muted">
          Manage your gym information and preferences.
        </p>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="card shadow-sm border-0 rounded-4">

          <div className="card-header bg-dark text-white rounded-top-4">
            <h5 className="mb-0">
              🏋️ General Information
            </h5>
          </div>

          <div className="card-body p-4">

            <div className="row g-4">

              {/* Gym Name */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Gym Name
                </label>

                <input
                  type="text"
                  name="gymName"
                  className="form-control"
                  value={settings.gymName ?? ""}
                  onChange={handleChange}
                  placeholder="Enter gym name"
                />

              </div>

              {/* Owner */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Owner Name
                </label>

                <input
                  type="text"
                  name="ownerName"
                  className="form-control"
                  value={settings.ownerName ?? ""}
                  onChange={handleChange}
                  placeholder="Enter owner name"
                />

              </div>

              {/* Email */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={settings.email ?? ""}
                  onChange={handleChange}
                  placeholder="gym@example.com"
                />

              </div>

              {/* Phone */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={settings.phone ?? ""}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />

              </div>

              {/* Address */}
              <div className="col-12">

                <label className="form-label fw-semibold">
                  Address
                </label>

                <textarea
                  name="address"
                  className="form-control"
                  rows="3"
                  value={settings.address ?? ""}
                  onChange={handleChange}
                  placeholder="Enter gym address"
                />

              </div>

              {/* Currency */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Currency
                </label>

                <select
                  name="currency"
                  className="form-select"
                  value={settings.currency ?? "INR"}
                  onChange={handleChange}
                >
                  <option value="INR">
                    INR - Indian Rupee
                  </option>

                  <option value="USD">
                    USD - US Dollar
                  </option>

                  <option value="EUR">
                    EUR - Euro
                  </option>

                  <option value="GBP">
                    GBP - British Pound
                  </option>
                </select>

              </div>

              {/* Timezone */}
              <div className="col-md-6">

                <label className="form-label fw-semibold">
                  Timezone
                </label>

                <select
                  name="timezone"
                  className="form-select"
                  value={
                    settings.timezone ??
                    "Asia/Kolkata"
                  }
                  onChange={handleChange}
                >
                  <option value="Asia/Kolkata">
                    Asia/Kolkata
                  </option>

                  <option value="Asia/Dubai">
                    Asia/Dubai
                  </option>

                  <option value="Asia/Singapore">
                    Asia/Singapore
                  </option>

                  <option value="Europe/London">
                    Europe/London
                  </option>

                  <option value="America/New_York">
                    America/New_York
                  </option>

                  <option value="America/Los_Angeles">
                    America/Los_Angeles
                  </option>
                </select>

              </div>

              {/* Logo URL */}
              <div className="col-12">

                <label className="form-label fw-semibold">
                  Logo URL
                </label>

                <input
                  type="text"
                  name="logo"
                  className="form-control"
                  value={settings.logo ?? ""}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                />

              </div>

            </div>

          </div>

          <div className="card-footer bg-white border-0 p-4">

            <button
              type="submit"
              className="btn btn-primary px-5"
              disabled={saving}
            >
              {saving ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  ></span>

                  Updating...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Update Settings
                </>
              )}
            </button>

            <button
              type="button"
              className="btn btn-secondary ms-2 px-4"
              onClick={loadSettings}
              disabled={saving}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Reset
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}

export default Settings;