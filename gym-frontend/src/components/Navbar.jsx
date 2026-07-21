import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Admin";

  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      setTime(
        now.toLocaleString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to Logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    navigate("/", { replace: true });
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-4 shadow-lg sticky-top"
      style={{
        background: "rgba(20,20,20,.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="container-fluid">

        {/* Logo */}

        <div className="d-flex align-items-center">

          <div
            className="bg-danger rounded-circle d-flex justify-content-center align-items-center"
            style={{
              width: "55px",
              height: "55px",
              fontSize: "25px",
            }}
          >
            🏋️
          </div>

          <div className="ms-3">

            <h4
              className="text-white fw-bold mb-0"
            >
              Gym Management
            </h4>

            <small className="text-warning">
              Fitness Administration Panel
            </small>

          </div>

        </div>

        {/* Right Side */}

        <div className="d-flex align-items-center">

          {/* Time */}

          <div className="text-end me-4">

            <div className="text-info fw-bold">
              <i className="bi bi-clock"></i> {time}
            </div>

          </div>

          {/* User */}

          <div
            className="d-flex align-items-center bg-dark rounded-pill px-3 py-2 me-3"
          >
            <div
              className="bg-primary rounded-circle d-flex justify-content-center align-items-center me-2"
              style={{
                width: "45px",
                height: "45px",
                fontSize: "18px",
                color: "#fff",
              }}
            >
              <i className="bi bi-person-fill"></i>
            </div>

            <div>

              <div className="text-white fw-bold">
                {username}
              </div>

              <small className="text-secondary">
                Administrator
              </small>

            </div>

          </div>

          {/* Logout */}

          <button
            className="btn btn-danger rounded-pill px-4"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>

            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;