import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

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
      name: "Reports",
      path: "/reports",
      icon: "bi-bar-chart-line-fill",
    },
  ];

  return (
    <div
      className="d-flex flex-column shadow-lg"
      style={{
        width: "250px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#111827,#1f2937,#111827)",
        color: "#fff",
        position: "sticky",
        top: 0,
      }}
    >
      {/* Logo */}
      <div
        className="text-center py-4 border-bottom"
        style={{
          borderColor: "#374151",
        }}
      >
        <div
          className="mx-auto mb-3 d-flex justify-content-center align-items-center"
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "#dc3545",
            fontSize: "32px",
          }}
        >
          🏋️
        </div>

        <h4 className="fw-bold mb-1">
          Gym Pro
        </h4>

        <small className="text-secondary">
          Management System
        </small>
      </div>

      {/* Menu */}
      <div className="flex-grow-1 mt-4">

        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`d-flex align-items-center text-decoration-none px-4 py-3 mx-2 mb-2 rounded-3 ${
              location.pathname === menu.path
                ? "bg-danger text-white shadow"
                : "text-light"
            }`}
            style={{
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== menu.path) {
                e.currentTarget.style.background = "#374151";
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== menu.path) {
                e.currentTarget.style.background = "transparent";
              }
            }}
          >
            <i
              className={`bi ${menu.icon}`}
              style={{
                fontSize: "20px",
                marginRight: "15px",
              }}
            ></i>

            <span className="fw-semibold">
              {menu.name}
            </span>
          </Link>
        ))}

      </div>

      {/* Footer */}
      <div
        className="text-center py-4 border-top"
        style={{
          borderColor: "#374151",
        }}
      >
        <small className="text-secondary">
          Gym Management System
        </small>

        <br />

        <small
          className="text-danger fw-bold"
        >
          Version 1.0
        </small>
      </div>
    </div>
  );
}

export default Sidebar;