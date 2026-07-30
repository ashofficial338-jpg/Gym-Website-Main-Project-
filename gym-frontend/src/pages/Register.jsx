import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match");
    }

    setLoading(true);

    try {
      await API.post("/users/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center UI-fade-in"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0f17",
        fontFamily: "'Inter', sans-serif",
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

        /* Glassmorphic Container Box */
        .premium-auth-card {
          width: 450px;
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
        }

        /* Form Inputs */
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

        /* Password Toggle Button */
        .premium-eye-btn {
          background: rgba(11, 15, 23, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-left: none !important;
          color: #8a94a6 !important;
          border-top-right-radius: 10px !important;
          border-bottom-right-radius: 10px !important;
          padding: 12px 16px !important;
        }

        /* Input specific for grouping with eye icon */
        .premium-password-input {
          border-top-right-radius: 0px !important;
          border-bottom-right-radius: 0px !important;
        }

        /* Gold Action Button */
        .gold-action-btn {
          background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important;
          border: none !important;
          color: #0b0f17 !important;
          font-weight: 600;
          border-radius: 10px !important;
          padding: 12px !important;
          transition: all 0.2s ease;
        }
        .gold-action-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.05);
          box-shadow: 0 6px 15px rgba(212, 163, 89, 0.2);
        }
        .gold-action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>

      <div className="premium-auth-card p-5 shadow-lg">
        <div className="text-center mb-4">
          <h1 className="mb-2" style={{ fontSize: "50px" }}>🏋️</h1>
          <h2 className="fw-bold mb-1" style={{ color: "#e5b869", letterSpacing: "-0.5px" }}>
            Create Account
          </h2>
          <p style={{ color: "#8a94a6", fontSize: "14px" }}>
            Join the Gym Management System
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control premium-field-control"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control premium-field-control"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control premium-field-control premium-password-input"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn premium-eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <div className="mb-2">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control premium-field-control"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="px-1">
            <small style={{ color: "#8a94a6", fontSize: "12px" }}>
              Password must be at least 6 characters long.
            </small>
          </div>

          <button
            type="submit"
            className="btn gold-action-btn w-100 mt-4 text-uppercase"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div className="text-center mt-4 pt-2">
          <span style={{ color: "#8a94a6", fontSize: "14px" }}>
            Already have an account?{" "}
          </span>
          <Link
            to="/"
            className="fw-semibold text-decoration-none"
            style={{ color: "#e5b869", fontSize: "14px" }}
          >
            Login Here
          </Link>
        </div>

        <hr style={{ borderColor: "rgba(255, 255, 255, 0.1)", margin: "24px 0 16px 0" }} />

        <div className="text-center">
          <small style={{ color: "#6b7280", fontSize: "12px" }}>
            💪 Train Hard • Stay Strong
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;