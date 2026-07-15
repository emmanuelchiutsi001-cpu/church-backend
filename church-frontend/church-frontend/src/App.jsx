import { Routes, Route } from "react-router-dom";

import NavigationBar from "./components/Navbar";
import ParishDetails from "./pages/ParishDetails";
import Home from "./pages/Home";

import AdminDashboard from "./admin/AdminDashboard";

// Admin pages
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

      {/* PUBLIC */}

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


      {/* ADMIN */}

      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />


      <Route
        path="/admin/profile"
        element={<Profile />}
      />


      <Route
        path="/admin/parish"
        element={<ParishProfile />}
      />


      <Route
        path="/admin/events"
        element={<Events />}
      />


      <Route
        path="/admin/announcements"
        element={<Announcements />}
      />


      <Route
        path="/admin/gallery"
        element={<Gallery />}
      />


      <Route
        path="/admin/podcasts"
        element={<Podcasts />}
      />


      <Route
        path="/admin/executive"
        element={<Executive />}
      />


      <Route
        path="/admin/documents"
        element={<Documents />}
      />


    </Routes>

  );

}


export default App;