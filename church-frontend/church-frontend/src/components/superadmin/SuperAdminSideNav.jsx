import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaInfoCircle,
  FaUserShield,
  FaAddressBook,
  FaChurch,
  FaCalendarAlt,
  FaImages,
  FaUsers,
  FaHandsHelping,
  FaNewspaper,
  FaSignOutAlt,
} from "react-icons/fa";

function SuperAdminSideNav() {
  const location = useLocation();

  const menuItems = [
    { title: "Dashboard", path: "/superadmin/dashboard", icon: <FaTachometerAlt /> },
    { title: "About", path: "/superadmin/about", icon: <FaInfoCircle /> },
    { title: "Authentication", path: "/superadmin/auth", icon: <FaUserShield /> },
    { title: "Contact", path: "/superadmin/contact", icon: <FaAddressBook /> },
    { title: "Deaneries", path: "/superadmin/deaneries", icon: <FaChurch /> },
    { title: "Events", path: "/superadmin/events", icon: <FaCalendarAlt /> },
    { title: "Gallery", path: "/superadmin/gallery", icon: <FaImages /> },
    { title: "Leadership", path: "/superadmin/leadership", icon: <FaUsers /> },
    { title: "Ministries", path: "/superadmin/ministries", icon: <FaHandsHelping /> },
    { title: "News", path: "/superadmin/news", icon: <FaNewspaper /> },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="d-flex align-items-center gap-3">
          <div className="admin-sidebar-badge" style={{ background: "linear-gradient(135deg, #d4af37 0%, #b98b1d 100%)" }}>
            SA
          </div>
          <div>
            <div className="admin-sidebar-title">Super Admin</div>
            <div className="admin-sidebar-subtitle">Archdiocese CMS</div>
          </div>
        </div>
      </div>

      <Nav className="admin-nav-list flex-column">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Nav.Link
              key={item.path}
              as={Link}
              to={item.path}
              className={`admin-nav-link ${isActive ? "active" : ""}`}
            >
              <span className="icon-wrap">{item.icon}</span>
              <span className="admin-nav-link-label">{item.title}</span>
            </Nav.Link>
          );
        })}
      </Nav>

      <div className="admin-sidebar-footer">
        <Link to="/admin/login" className="admin-sidebar-logout" style={{ borderColor: "rgba(239, 68, 68, 0.5)" }}>
          <FaSignOutAlt />
          <span>Logout</span>
        </Link>
      </div>
    </aside>
  );
}

export default SuperAdminSideNav;