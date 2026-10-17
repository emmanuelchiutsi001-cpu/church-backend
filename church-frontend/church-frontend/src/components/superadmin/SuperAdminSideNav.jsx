import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt, FaInfoCircle, FaUserShield, FaAddressBook,
  FaChurch, FaCalendarAlt, FaImages, FaUsers, FaHandsHelping,
  FaNewspaper, FaSignOutAlt,
} from "react-icons/fa";

function SuperAdminSideNav() {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard",      path: "/superadmin/dashboard", icon: <FaTachometerAlt /> },
    { title: "About",          path: "/superadmin/about",     icon: <FaInfoCircle /> },
    { title: "Authentication", path: "/superadmin/auth",      icon: <FaUserShield /> },
    { title: "Contact",        path: "/superadmin/contact",   icon: <FaAddressBook /> },
    { title: "Deaneries",      path: "/superadmin/deaneries", icon: <FaChurch /> },
    { title: "Events",         path: "/superadmin/events",    icon: <FaCalendarAlt /> },
    { title: "Gallery",        path: "/superadmin/gallery",   icon: <FaImages /> },
    { title: "Leadership",     path: "/superadmin/leadership",icon: <FaUsers /> },
    { title: "Ministries",     path: "/superadmin/ministries",icon: <FaHandsHelping /> },
    { title: "News",           path: "/superadmin/news",      icon: <FaNewspaper /> },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "#0F172A",              // 👈 slate-900 (darker, more modern)
        color: "#E2E8F0",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* ---------- Header ---------- */}
      <div className="px-4 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="d-flex align-items-center gap-2">
          <div
            style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, color: "#fff", fontSize: 14,
            }}
          >
            SA
          </div>
          <div>
            <div className="fw-bold" style={{ fontSize: 15, color: "#fff" }}>Super Admin</div>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>Archdiocese CMS</div>
          </div>
        </div>
      </div>

      {/* ---------- Menu ---------- */}
      <Nav
        className="flex-column mt-3 px-2"
        style={{ flex: 1, minHeight: 0, overflowY: "auto" }}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className="sidebar-item"
              style={{
                color: isActive ? "#fff" : "#CBD5E1",
                padding: "11px 14px",
                margin: "2px 6px",
                borderRadius: 8,
                background: isActive ? "rgba(99,102,241,0.15)" : "transparent",
                fontWeight: isActive ? 600 : 500,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                transition: "all 0.15s ease",
              }}
            >
              <span className="me-3" style={{ fontSize: 15, color: isActive ? "#818CF8" : "#64748B" }}>
                {item.icon}
              </span>
              {item.title}
            </Nav.Link>
          );
        })}
      </Nav>

      {/* ---------- Outline Logout ---------- */}
      <div className="p-3 flex-shrink-0" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <Link
          to="/admin/login"
          className="outline-logout"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            padding: "11px 16px",
            borderRadius: 8,
            background: "transparent",
            border: "1px solid rgba(239,68,68,0.4)",
            color: "#F87171",
            fontWeight: 600,
            fontSize: 14,
            textDecoration: "none",
            transition: "all 0.25s ease",
          }}
        >
          <FaSignOutAlt style={{ fontSize: 15 }} />
          Logout
        </Link>
      </div>

      <style>{`
        .sidebar-item:hover {
          background: rgba(255,255,255,0.05) !important;
          color: #fff !important;
        }
        .outline-logout:hover {
          background: #EF4444;
          border-color: #EF4444;
          color: #fff !important;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.15);
        }
      `}</style>
    </div>
  );
}

export default SuperAdminSideNav;