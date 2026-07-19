import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");

    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-4">

      <h4 className="text-white m-0">
        🏋️ Gym Management System
      </h4>

      <div className="d-flex align-items-center">

        <span className="text-white me-3">
          Welcome, {username}
        </span>

        <button
          className="btn btn-light"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;