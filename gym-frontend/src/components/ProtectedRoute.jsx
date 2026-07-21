import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Small loading effect
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const token = localStorage.getItem("token");

  // Loading Screen
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background:
            "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
        }}
      >
        <div className="text-center">

          <div
            className="spinner-border text-warning"
            style={{
              width: "5rem",
              height: "5rem",
            }}
          ></div>

          <h2 className="text-white mt-4">
            🏋️ Gym Management System
          </h2>

          <p className="text-light">
            Loading Dashboard...
          </p>

        </div>
      </div>
    );
  }

  // Session Expired
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;