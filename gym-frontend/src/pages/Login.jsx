import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("Please enter Email and Password");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/users/login", user);

      localStorage.setItem("token", res.data.token);

      if (res.data.user) {
        localStorage.setItem("username", res.data.user.name);
        localStorage.setItem("email", res.data.user.email);
      }

      alert("Login Successful");

      navigate("/dashboard", { replace: true });

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
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
          width: "430px",
          borderRadius: "20px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,.2)",
        }}
      >
        <div className="text-center mb-4">

          <h1 style={{ fontSize: "60px" }}>🏋️</h1>

          <h2 className="text-warning fw-bold">
            Gym Management System
          </h2>

          <p className="text-light">
            Login to Continue
          </p>

        </div>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={user.email}
            onChange={handleChange}
            required
          />

          <div className="input-group mb-3">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              className="form-control"
              value={user.password}
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

          <div className="d-flex justify-content-between mb-3">

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="remember"
              />
              <label
                className="form-check-label text-white"
                htmlFor="remember"
              >
                Remember Me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-warning text-decoration-none"
            >
              Forgot Password?
            </Link>

          </div>

          <button
            className="btn btn-warning w-100 fw-bold"
            disabled={loading}
            style={{
              height: "50px",
              fontSize: "18px",
            }}
          >
            {loading ? "Logging In..." : "LOGIN"}
          </button>

        </form>

        <div className="text-center mt-4">

          <span className="text-white">
            Don't have an account?
          </span>

          <br />

          <Link
            to="/register"
            className="text-warning fw-bold text-decoration-none"
          >
            Register Now
          </Link>

        </div>

        <hr className="text-light" />

        <div className="text-center">

          <small className="text-light">
            💪 Train Hard • Stay Strong • Never Give Up
          </small>

          <br />

          <small className="text-secondary">
            © 2026 Gym Management System
          </small>

        </div>

      </div>
    </div>
  );
}

export default Login;