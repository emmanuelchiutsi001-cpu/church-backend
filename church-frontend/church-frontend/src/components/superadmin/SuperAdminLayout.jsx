import { Outlet } from "react-router-dom";
import SuperAdminSideNav from "./SuperAdminSideNav";

function SuperAdminLayout() {
  return (
    <div className="admin-shell">
      <SuperAdminSideNav />

      <main className="admin-main">
        <div className="admin-content-wrap">
          <div className="admin-page-card">
            <div className="admin-hero-panel">
              <div className="admin-hero-inner">
                <div className="eyebrow">Archdiocese Control</div>
                <h1>Super Administrator</h1>
                <p>
                  Oversee deaneries, leadership, ministries, content, and public
                  church operations from one central management area.
                </p>
              </div>
            </div>
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SuperAdminLayout;