import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden", // Prevents whole-page scrolling
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #eef2f7 0%, #d9e7ff 50%, #f8fbff 100%)",
      }}
    >
      {/* Global CSS Reset for Full Screen */}
      <style>{`
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Top Navbar Area (Assuming fixed 70px height) */}
      <div style={{ height: "70px", flexShrink: 0 }}>
        <Navbar />
      </div>

      {/* Bottom Area: Sidebar + Main Content */}
      <div 
        className="d-flex" 
        style={{ 
          flexGrow: 1, 
          height: "calc(100vh - 70px)", 
          overflow: "hidden" 
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            width: "240px",
            height: "100%",
            flexShrink: 0,
            overflowY: "auto", // Allows sidebar to scroll independently if needed
          }}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 p-3 p-md-4"
          style={{
            height: "100%",
            overflowY: "auto", // Allows only the content area to scroll
          }}
        >
          <div
            className="shadow-sm rounded-4 p-4"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              minHeight: "100%", // Ensures the white card always stretches to the bottom
              animation: "fadeIn .5s ease-in-out",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;