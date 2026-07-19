import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow p-4" style={{ width: "400px" }}>

        <h2 className="text-center mb-4">
          🏋️ Gym Management System
        </h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;