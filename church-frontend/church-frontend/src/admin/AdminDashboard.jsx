import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const API_URL = "http://localhost:8080/api/auth";

function AdminDashboard() {
  const [user, setUser] = useState(null);

  const assignedParish = user?.parish?.name || user?.parishName || localStorage.getItem("parishName") || "Not Assigned";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(`${API_URL}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profile = response.data || {};
        if (profile.parish) {
          setUser(profile);
          return;
        }

        setUser({
          ...profile,
          username: profile.username || localStorage.getItem("username") || "User",
          role: profile.role || localStorage.getItem("role") || "ROLE_ADMIN",
          parish: {
            id: profile.parishId || localStorage.getItem("parishId") || null,
            name: profile.parishName || localStorage.getItem("parishName") || "Not Assigned",
          },
        });
      } catch (error) {
        console.log("Failed to load user", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="admin-shell">
      <AdminSidebar />

      <main className="admin-main">
        <AdminNavbar />

        <div className="admin-content-wrap">
          <div className="admin-page-card">
            <div className="admin-hero-panel">
              <div className="admin-hero-inner">
                <div className="eyebrow">Parish Administration</div>

                <h1>
                  Welcome, {user ? user.username : "Loading..."}
                </h1>

                <p>
                  Manage your parish profile, events, announcements, gallery,
                  podcasts, executive members and documents from a unified
                  ministry dashboard.
                </p>

                <div className="admin-badges">
                  <span className="admin-badge">Role: {user?.role || "Loading..."}</span>
                  <span className="admin-badge">Assigned Parish: {assignedParish}</span>
                </div>

                <div className="mt-3" style={{ fontWeight: 600, color: "#1e3a5f" }}>
                  Parish assigned to this account: <span style={{ color: "#0b7a75" }}>{assignedParish}</span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="admin-metric-grid">
                <div className="admin-metric">
                  <div className="label">Account Status</div>
                  <div className="value">{user?.approved === false ? "Pending" : "Approved"}</div>
                </div>
                <div className="admin-metric">
                  <div className="label">Assigned Parish</div>
                  <div className="value">{assignedParish}</div>
                </div>
                <div className="admin-metric">
                  <div className="label">Access Level</div>
                  <div className="value">{user?.role || "Parish Admin"}</div>
                </div>
                <div className="admin-metric">
                  <div className="label">Username</div>
                  <div className="value">{user?.username || "Loading..."}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;