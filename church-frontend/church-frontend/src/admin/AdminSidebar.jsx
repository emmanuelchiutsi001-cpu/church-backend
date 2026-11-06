import { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaChurch,
  FaCalendarAlt,
  FaBullhorn,
  FaImages,
  FaPodcast,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const API_URL = "http://localhost:8080/api/auth";

function AdminSidebar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data || null);
      } catch (error) {
        console.log("Failed loading sidebar parish", error);
      }
    };

    fetchUser();
  }, []);

  const displayParish = user?.parish?.name || localStorage.getItem("parishName") || "Parish Portal";

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
    { name: "My Profile", path: "/admin/profile", icon: <FaUser /> },
    { name: "Parish Profile", path: "/admin/parish", icon: <FaChurch /> },
    { name: "Events", path: "/admin/events", icon: <FaCalendarAlt /> },
    { name: "Announcements", path: "/admin/announcements", icon: <FaBullhorn /> },
    { name: "Gallery", path: "/admin/gallery", icon: <FaImages /> },
    { name: "Podcasts", path: "/admin/podcasts", icon: <FaPodcast /> },
    { name: "Executive", path: "/admin/executive", icon: <FaUsers /> },
    { name: "Documents", path: "/admin/documents", icon: <FaFileAlt /> },
    { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="d-flex align-items-center gap-3">
          <div className="admin-sidebar-badge">A</div>
          <div>
            <div className="admin-sidebar-title">Agnes &amp; Alois</div>
            <div className="admin-sidebar-subtitle">{displayParish}</div>
          </div>
        </div>
      </div>

      <nav className="admin-nav-list">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `admin-nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="icon-wrap">{item.icon}</span>
            <span className="admin-nav-link-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="admin-sidebar-footer">
        <button type="button" className="admin-sidebar-logout" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
