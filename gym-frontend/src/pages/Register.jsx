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
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,.75),rgba(0,0,0,.75)),url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1800&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="shadow-lg p-5"
        style={{
          width: "450px",
          borderRadius: "20px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,.2)",
        }}
      >
        <div className="text-center mb-4">
          <h1 style={{ fontSize: "60px" }}>🏋️</h1>

          <h2 className="text-warning fw-bold">
            Create Account
          </h2>

          <p className="text-light">
            Join Gym Management System
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            className="form-control mb-3"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <small className="text-light">
            Password should contain at least 6 characters.
          </small>

          <button
            className="btn btn-success w-100 mt-3 fw-bold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "REGISTER"}
          </button>

        </form>

        <div className="text-center mt-4">
          <span className="text-white">
            Already have an account?
          </span>

          <br />

          <Link
            to="/"
            className="text-warning fw-bold text-decoration-none"
          >
            Login Here
          </Link>
        </div>

        <hr className="text-light" />

        <div className="text-center">
          <small className="text-light">
            💪 Train Hard • Stay Strong • Never Give Up
          </small>
        </div>

      </div>
    </div>
  );
}

export default Register;