import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#eef2f7 0%,#d9e7ff 50%,#f8fbff 100%)",
      }}
    >
      {/* Top Navbar */}
      <Navbar />

      <div className="d-flex">

        {/* Sidebar */}
        <div
          style={{
            width: "240px",
            minHeight: "calc(100vh - 70px)",
            position: "sticky",
            top: "70px",
          }}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 p-4"
          style={{
            overflowY: "auto",
            minHeight: "calc(100vh - 70px)",
          }}
        >
          <div
            className="shadow-lg rounded-4 p-4"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(12px)",
              minHeight: "100%",
              animation: "fadeIn .5s ease-in-out",
            }}
          >
            {children}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn{
          from{
            opacity:0;
            transform:translateY(20px);
          }
          to{
            opacity:1;
            transform:translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default Layout;