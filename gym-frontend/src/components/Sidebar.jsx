import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Admin";
  const role = localStorage.getItem("role") || "Administrator";

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "bi-speedometer2",
    },
    {
      name: "Members",
      path: "/members",
      icon: "bi-people-fill",
    },
    {
      name: "Trainers",
      path: "/trainers",
      icon: "bi-person-workspace",
    },
    {
      name: "Plans",
      path: "/plans",
      icon: "bi-card-checklist",
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: "bi-calendar-check",
    },
    {
      name: "Payments",
      path: "/payments",
      icon: "bi-cash-stack",
    },
    {
      name: "Workout",
      path: "/workout",
      icon: "bi-heart-pulse-fill",
    },
    {
      name: "Reports",
      path: "/reports",
      icon: "bi-bar-chart-line-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "bi-person-circle",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: "bi-gear-fill",
    },
  ];

  const logout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      className="d-flex flex-column shadow-lg"
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0f172a,#1e293b,#111827)",
        color: "#fff",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        className="text-center py-4 border-bottom"
        style={{ borderColor: "#334155" }}
      >
        <div
          className="mx-auto d-flex justify-content-center align-items-center shadow"
          style={{
            width: "85px",
            height: "85px",
            borderRadius: "50%",
            background: "linear-gradient(135deg,#ff512f,#dd2476)",
            fontSize: "40px",
          }}
        >
          🏋️
        </div>

        <h3 className="fw-bold mt-3 text-white">
          Gym Pro
        </h3>

        <small className="text-secondary">
          Management System
        </small>
      </div>

      {/* User */}
      <div className="text-center py-4 border-bottom border-secondary">

        <i
          className="bi bi-person-circle text-info"
          style={{ fontSize: "65px" }}
        ></i>

        <h5 className="mt-2 text-white">
          {username}
        </h5>

        <span className="badge bg-success">
          {role}
        </span>

      </div>

      {/* Menu */}
      <div className="flex-grow-1 mt-3">

        {menus.map((menu) => {

          const active = location.pathname === menu.path;

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className="text-decoration-none"
            >
              <div
                className="d-flex align-items-center px-3 py-3 mx-3 mb-2 rounded-4"
                style={{
                  background: active
                    ? "linear-gradient(90deg,#2563eb,#3b82f6)"
                    : "transparent",
                  color: "#fff",
                  fontWeight: "600",
                  transition: ".3s",
                  cursor: "pointer",
                  boxShadow: active
                    ? "0 0 12px rgba(37,99,235,.5)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#334155";
                    e.currentTarget.style.transform =
                      "translateX(8px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background =
                      "transparent";
                    e.currentTarget.style.transform =
                      "translateX(0)";
                  }
                }}
              >
                <i
                  className={`bi ${menu.icon}`}
                  style={{
                    fontSize: "22px",
                    marginRight: "15px",
                  }}
                ></i>

                {menu.name}
              </div>
            </Link>
          );
        })}

      </div>

      {/* Logout */}
      <div className="px-3 mb-3">

        <button
          className="btn btn-danger w-100 rounded-4"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Logout
        </button>

      </div>

      {/* Footer */}
      <div
        className="text-center py-3 border-top"
        style={{ borderColor: "#334155" }}
      >
        <i className="bi bi-shield-check text-success"></i>

        <br />

        <small className="text-light">
          Gym Management System
        </small>

        <br />

        <small className="text-warning fw-bold">
          Version 2.0
        </small>

        <br />

        <small className="text-secondary">
          © 2026 All Rights Reserved
        </small>
      </div>
    </div>
  );
}

export default Sidebar;