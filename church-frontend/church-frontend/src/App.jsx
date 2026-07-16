import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import ParishDetails from "./pages/ParishDetails";

import ProtectedRoute from "./admin/auth/ProtectedRoute";

// Authentication
import AdminRegister from "./admin/auth/AdminRegister";
import AdminLogin from "./admin/auth/AdminLogin";
import WaitingApproval from "./admin/auth/WaitingApproval";

// Dashboard
import AdminDashboard from "./admin/AdminDashboard";

// Admin Pages
import Profile from "./admin/pages/Profile";
import ParishProfile from "./admin/pages/ParishProfile";
import Events from "./admin/pages/Events";
import Announcements from "./admin/pages/Announcements";
import Gallery from "./admin/pages/Gallery";
import Podcasts from "./admin/pages/Podcasts";
import Executive from "./admin/pages/Executive";
import Documents from "./admin/pages/Documents";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC WEBSITE ================= */}

      <Route
        path="/"
        element={
          <>
            <NavigationBar />
            <Home />
          </>
        }
      />

      <Route
        path="/parishes/:slug"
        element={
          <>
            <NavigationBar />
            <ParishDetails />
          </>
        }
      />

      {/* ================= AUTHENTICATION ================= */}

      <Route path="/admin/register" element={<AdminRegister />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/waiting" element={<WaitingApproval />} />

      {/* ================= PROTECTED ADMIN ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/parish"
        element={
          <ProtectedRoute>
            <ParishProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/podcasts"
        element={
          <ProtectedRoute>
            <Podcasts />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/executive"
        element={
          <ProtectedRoute>
            <Executive />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/documents"
        element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;