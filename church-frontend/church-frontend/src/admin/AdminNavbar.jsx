import { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaUserCircle, FaSignOutAlt, FaCog, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/api/auth";

function AdminNavbar() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.log("Failed loading user", error);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-inner">
        <div className="admin-topbar-title">
          <h5>{user?.parish?.name || "Parish Portal"}</h5>
          <small>Parish Administration Portal</small>
        </div>

        <div className="admin-topbar-actions">
          <div className="admin-notification" aria-label="Notifications">
            <FaBell />
            <span className="admin-notification-badge">3</span>
          </div>

          <div className="admin-profile">
            <div
              className="admin-profile-trigger"
              onClick={() => setShowProfile(!showProfile)}
            >
              <FaUserCircle size={32} className="text-primary" />
              <div>
                <h6>{user?.username || "Loading..."}</h6>
                <small>{user?.role || ""}</small>
              </div>
            </div>

            {showProfile && (
              <div className="admin-profile-menu">
                <button type="button" onClick={() => navigate("/admin/profile")}>
                  <FaUser />
                  My Profile
                </button>
                <button type="button" onClick={() => navigate("/admin/settings")}>
                  <FaCog />
                  Settings
                </button>
                <hr className="m-0" />
                <button type="button" className="danger" onClick={logout}>
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavbar;
