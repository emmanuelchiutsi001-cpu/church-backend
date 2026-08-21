import { useParams } from "react-router-dom";

import ParishHeader from "../components/parish/ParishHeader";
import ParishAbout from "../components/parish/ParishAbout";
import AnnouncementList from "../components/parish/AnnouncementList";
import GallerySection from "../components/parish/GallerySection";
import PodcastSection from "../components/parish/PodcastSection";
import ExecutiveSection from "../components/parish/ExecutiveSection";
import DocumentSection from "../components/parish/DocumentSection";
import EventSection from "../components/parish/EventSection";

function ParishDetails() {

  const { slug } = useParams();

  return (

    <div>

      <ParishHeader slug={slug} />

      <div className="container py-5">

        <ParishAbout slug={slug} />

        <AnnouncementList slug={slug} />

        <EventSection slug={slug} />

        <GallerySection slug={slug} />

        <PodcastSection slug={slug} />

        <ExecutiveSection slug={slug} />

        <DocumentSection slug={slug} />

      </div>

    </div>

  );

}

export default ParishDetails;