import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Trainers", path: "/trainers" },
    { name: "Members", path: "/members" },
    { name: "Plans", path: "/plans" },
    { name: "Attendance", path: "/attendance" },
    { name: "Payments", path: "/payments" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <h4 className="text-center mb-4">Gym Menu</h4>

      <ul className="nav flex-column">
        {menus.map((menu) => (
          <li className="nav-item mb-2" key={menu.path}>
            <Link
              to={menu.path}
              className={`nav-link ${
                location.pathname === menu.path
                  ? "bg-primary text-white rounded"
                  : "text-white"
              }`}
            >
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;