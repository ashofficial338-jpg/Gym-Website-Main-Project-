import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="d-flex justify-content-center align-items-center UI-fade-in"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0f17",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* Premium UI System Engine */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');

        .UI-fade-in {
          animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .premium-404-card {
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 24px;
          color: #ffffff;
          max-width: 500px;
          width: 90%;
        }

        .gold-glow-text {
          font-size: 7.5rem;
          font-weight: 800;
          background: linear-gradient(180deg, #ffffff 30%, #e5b869 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -2px;
          line-height: 1;
        }

        .gold-action-btn {
          background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important;
          border: none !important;
          color: #0b0f17 !important;
          font-weight: 600;
          border-radius: 12px !important;
          padding: 14px 28px !important;
          font-size: 15px;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .gold-action-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.05);
          box-shadow: 0 8px 20px rgba(212, 163, 89, 0.25);
        }
      `}</style>

      <div className="text-center p-5 shadow-lg premium-404-card">
        <h1 className="gold-glow-text mb-2">
          404
        </h1>

        <h3 className="fw-bold mb-3" style={{ color: "#ffffff", letterSpacing: "-0.5px" }}>
          System Path Lost
        </h3>

        <p className="mb-4" style={{ color: "#8a94a6", fontSize: "15px", lineHeight: "1.6" }}>
          The requested operational resource does not exist, has been decoupled, or shifted to another matrix directory.
        </p>

        <Link to="/dashboard" className="btn gold-action-btn">
          <span>🏠</span> Return to Main Console
        </Link>
      </div>
    </div>
  );
}

export default NotFound;