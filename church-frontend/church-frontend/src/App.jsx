import { motion } from "framer-motion";
import NavigationBar from "./components/Navbar";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import MissionCards from "./components/MissionCards";
import History from "./components/History";
import EventsPreview from "./components/EventsPreview";
import GalleryPreview from "./components/GalleryPreview";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <NavigationBar />
      <Hero />
      <Welcome />
      <MissionCards />
      <History />
      <EventsPreview />
      <GalleryPreview />
      <Footer />
    </motion.div>
  );
}

export default App;