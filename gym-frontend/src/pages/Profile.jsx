import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await API.get("/profile");
      if (res.data && res.data.profile) {
        setProfile(res.data.profile);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProfile = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await API.put("/profile", profile);
      alert("Profile Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    }
  };

  const changePassword = async () => {
    try {
      await API.put("/profile/password", password);
      alert("Password Changed Successfully");
      setPassword({
        currentPassword: "",
        newPassword: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to change password");
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

        /* Clean Inputs */
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

        /* Red Danger Button for Password Change */
        .red-action-btn {
          background: linear-gradient(90deg, #f87171 0%, #dc2626 100%) !important;
          border: none !important;
          color: #ffffff !important;
          font-weight: 600;
          border-radius: 10px !important;
          padding: 12px !important;
          transition: all 0.2s ease;
        }
        .red-action-btn:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 6px 15px rgba(248, 113, 113, 0.2);
        }
      `}</style>

      <h2 className="fw-bold mb-4" style={{ letterSpacing: "-0.5px" }}>Admin Settings</h2>

      <div className="row g-4">
        {/* Profile Info Box */}
        <div className="col-md-6">
          <div className="premium-panel-card p-4 shadow-lg h-100">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <span style={{ color: "#e5b869" }}>👤</span> Profile Details
            </h4>
            
            <div className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small text-muted mb-1">Full Name</label>
                <input
                  type="text"
                  className="form-control premium-field-control"
                  placeholder="Name"
                  name="name"
                  value={profile.name || ""}
                  onChange={handleProfile}
                />
              </div>

              <div>
                <label className="form-label small text-muted mb-1">Email Address</label>
                <input
                  type="email"
                  className="form-control premium-field-control"
                  placeholder="Email"
                  name="email"
                  value={profile.email || ""}
                  onChange={handleProfile}
                />
              </div>

              <div>
                <label className="form-label small text-muted mb-1">Phone Number</label>
                <input
                  type="text"
                  className="form-control premium-field-control"
                  placeholder="Phone"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={handleProfile}
                />
              </div>

              <div className="mt-2">
                <button className="btn gold-action-btn w-100" onClick={saveProfile}>
                  Save Profile Changes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Change Password Box */}
        <div className="col-md-6">
          <div className="premium-panel-card p-4 shadow-lg h-100">
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <span style={{ color: "#f87171" }}>🔒</span> Security Control
            </h4>

            <div className="d-flex flex-column gap-3">
              <div>
                <label className="form-label small text-muted mb-1">Current Password</label>
                <input
                  type="password"
                  className="form-control premium-field-control"
                  placeholder="Enter current password"
                  name="currentPassword"
                  value={password.currentPassword}
                  onChange={handlePassword}
                />
              </div>

              <div>
                <label className="form-label small text-muted mb-1">New Password</label>
                <input
                  type="password"
                  className="form-control premium-field-control"
                  placeholder="Enter new password"
                  name="newPassword"
                  value={password.newPassword}
                  onChange={handlePassword}
                />
              </div>

              <div className="mt-auto pt-4">
                <button className="btn red-action-btn w-100" onClick={changePassword}>
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;