import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Welcome from "./components/Welcome";
import MissionCards from "./components/MissionCards";
import History from "./components/History";
import EventsPreview from "./components/EventsPreview";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Welcome />
      <MissionCards />
      <History />
      <EventsPreview />
      <Footer />
    </>
  );
}
export default App;