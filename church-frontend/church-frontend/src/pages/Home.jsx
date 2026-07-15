
import Hero from "../components/Hero";
import Welcome from "../components/Welcome";
import History from "../components/History";
import MissionCards from "../components/MissionCards";
import Statistics from "../components/Statistics";
import EventsPreview from "../components/EventsPreview";
import GalleryPreview from "../components/GalleryPreview";
import Footer from "../components/Footer";


function Home() {

    return (
        <>
           

            <Hero />

            <Welcome />

            <History />

            <MissionCards />

            <Statistics />

            <EventsPreview />

            <GalleryPreview />

            <Footer />
        </>
    );
}


export default Home;