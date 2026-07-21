import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a, #1e293b, #111827)",
      }}
    >
      <div
        className="text-center p-5 shadow-lg"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          borderRadius: "20px",
          color: "#fff",
          maxWidth: "550px",
          width: "90%",
        }}
      >
        <h1
          className="fw-bold"
          style={{
            fontSize: "7rem",
            color: "#ffc107",
          }}
        >
          404
        </h1>

        <h2 className="fw-bold mb-3">
          Page Not Found
        </h2>

        <p className="text-light mb-4">
          Sorry! The page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          className="btn btn-warning btn-lg px-4"
        >
          🏠 Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;