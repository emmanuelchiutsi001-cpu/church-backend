import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const API_URL = "http://localhost:8080/api/auth";

function AdminDashboard() {
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
                  <span className="admin-badge">
                    Parish: {user?.parish?.name || "Not Assigned"}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="admin-metric-grid">
                <div className="admin-metric">
                  <div className="label">Events</div>
                  <div className="value">12</div>
                </div>
                <div className="admin-metric">
                  <div className="label">Announcements</div>
                  <div className="value">08</div>
                </div>
                <div className="admin-metric">
                  <div className="label">Members</div>
                  <div className="value">240</div>
                </div>
                <div className="admin-metric">
                  <div className="label">Documents</div>
                  <div className="value">19</div>
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