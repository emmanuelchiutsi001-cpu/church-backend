import ParishHeader from "../components/parish/ParishHeader";
import ParishAbout from "../components/parish/ParishAbout";
import AnnouncementList from "../components/parish/AnnouncementList";
import EventList from "../components/parish/EventList";
import GallerySection from "../components/parish/GallerySection";
import PodcastSection from "../components/parish/PodcastSection";
import ExecutiveSection from "../components/parish/ExecutiveSection";
import DocumentSection from "../components/parish/DocumentSection";


function ParishDetails() {

  return (

    <div>

      <ParishHeader />

      <div className="container py-5">

        <ParishAbout />

        <AnnouncementList />

        <EventList />

        <GallerySection />

        <PodcastSection />

        <ExecutiveSection />

        <DocumentSection />

      </div>

    </div>

  );

}


export default ParishDetails;