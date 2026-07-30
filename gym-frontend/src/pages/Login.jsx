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
      alert("Please enter your Email and Password");
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
      className="d-flex justify-content-center align-items-center position-relative overflow-hidden"
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0f17", // Ultra-clean deep slate black
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* Premium Color Palette & Interface Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        /* High-Quality Ambient Glow Layers */
        .ambient-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background-image: 
            radial-gradient(circle at 10% 15%, rgba(212, 163, 89, 0.06) 0%, transparent 40%),
            radial-gradient(circle at 90% 85%, rgba(99, 102, 241, 0.05) 0%, transparent 40%);
          z-index: 1;
        }

        /* Subtle Geometric Matrix */
        .vector-grid {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23ffffff' fill-opacity='0.012' fill-rule='evenodd'/%3E%3C/svg%3E");
          z-index: 2;
        }

        /* Polished Frosted Glass Panel */
        .login-card-panel {
          width: 440px;
          background: rgba(19, 26, 38, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          z-index: 10;
          animation: loadCard 0.5s ease-out forwards;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        @keyframes loadCard {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Input Custom Overrides */
        .input-group-wrapper {
          position: relative;
          margin-bottom: 20px;
        }

        .premium-input {
          width: 100%;
          background: rgba(11, 15, 23, 0.8) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          color: #ffffff !important;
          border-radius: 12px !important;
          padding: 14px 16px 14px 45px !important;
          font-size: 14px;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-input:focus {
          border-color: #d4a359 !important; /* Premium Soft Gold Accent */
          box-shadow: 0 0 0 3px rgba(212, 163, 89, 0.12) !important;
          background: rgba(11, 15, 23, 0.95) !important;
        }

        .premium-input::placeholder {
          color: rgba(255, 255, 255, 0.35) !important;
        }

        .input-inline-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.25);
          z-index: 5;
          pointer-events: none;
          transition: color 0.2s ease;
        }

        .premium-input:focus ~ .input-inline-icon {
          color: #d4a359;
        }

        .password-toggle-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.35);
          cursor: pointer;
          font-size: 15px;
          z-index: 5;
          padding: 4px;
          transition: color 0.2s ease;
        }

        .password-toggle-btn:hover {
          color: #ffffff;
        }

        /* Gold Gradient Brand Identity Badge */
        .brand-crest {
          position: relative;
          width: 64px;
          height: 64px;
          margin: 0 auto 16px auto;
          background: linear-gradient(135deg, rgba(212, 163, 89, 0.12), rgba(212, 163, 89, 0.02));
          border: 1px solid rgba(212, 163, 89, 0.25);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        }

        /* Elite Satin-Gold Button */
        .luxury-submit-btn {
          width: 100%;
          height: 48px;
          background: linear-gradient(90deg, #e5b869 0%, #c99346 100%) !important;
          border: none !important;
          color: #0b0f17 !important;
          font-weight: 600 !important;
          font-size: 14px;
          letter-spacing: 0.5px;
          border-radius: 12px !important;
          box-shadow: 0 8px 20px rgba(212, 163, 89, 0.15) !important;
          transition: all 0.2s ease !important;
        }

        .luxury-submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 12px 24px rgba(212, 163, 89, 0.25) !important;
          filter: brightness(1.03);
        }

        .luxury-submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        /* Text Color Adaptations */
        .text-muted-custom {
          color: #8a94a6 !important;
        }
        
        .text-gold-link {
          color: #e5b869 !important;
          transition: opacity 0.2s ease;
        }

        .text-gold-link:hover {
          color: #fdc97a !important;
        }
      `}</style>

      {/* Background Ambience Layers */}
      <div className="ambient-glow"></div>
      <div className="vector-grid"></div>

      {/* Main Application Container */}
      <div className="login-card-panel p-5 shadow-lg">
        <div className="text-center mb-4">
          <div className="brand-crest">🏋️</div>
          
          <h3 className="fw-bold text-white mb-1" style={{ letterSpacing: "-0.5px" }}>
            Gym Management System
          </h3>
          
          <p className="text-muted-custom small mb-0">
            Sign in to access your business console
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* User Email Input */}
          <div className="input-group-wrapper">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="form-control premium-input"
              value={user.email}
              onChange={handleChange}
              required
            />
            <span className="input-inline-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
              </svg>
            </span>
          </div>

          {/* User Password Input */}
          <div className="input-group-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="form-control premium-input"
              value={user.password}
              onChange={handleChange}
              required
            />
            <span className="input-inline-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {/* Extra Options Grid */}
          <div className="d-flex justify-content-between align-items-center mb-4" style={{ fontSize: "13px" }}>
            <div className="form-check m-0 d-flex align-items-center gap-2">
              <input
                className="form-check-input bg-transparent border-secondary"
                type="checkbox"
                id="remember"
                style={{ cursor: "pointer", width: "15px", height: "15px" }}
              />
              <label
                className="form-check-label text-muted-custom"
                htmlFor="remember"
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-gold-link text-decoration-none fw-medium"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit CTA */}
          <button
            className="btn luxury-submit-btn d-flex align-items-center justify-content-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" style={{ color: "#0b0f17" }}></span>
                Verifying Credentials...
              </>
            ) : (
              "SIGN IN"
            )}
          </button>
        </form>

        {/* Redirect Systems */}
        <div className="text-center mt-4" style={{ fontSize: "13px" }}>
          <span className="text-muted-custom">Don't have an account?</span>
          {" "}
          <Link
            to="/register"
            className="text-gold-link fw-semibold text-decoration-none"
          >
            Register Now
          </Link>
        </div>

        <hr style={{ borderColor: "rgba(255,255,255,0.06)", margin: "24px 0" }} />

        {/* Brand System Footnote */}
        <div className="text-center">
          <small className="text-muted-custom d-block mb-1" style={{ fontSize: "12px", opacity: 0.8 }}>
            🔒 Secure Dashboard Authorization System
          </small>
          <small className="text-muted-custom opacity-25" style={{ fontSize: "11px" }}>
            © 2026 Gym Management System. All rights reserved.
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;