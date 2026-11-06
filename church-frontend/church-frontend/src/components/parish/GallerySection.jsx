import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/gallery";

function GallerySection() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setImages(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      }
    };

    loadImages();
  }, []);

  return (
    <div className="mb-5">
      <h2 className="text-primary fw-bold">Parish Gallery</h2>

      {images.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-muted">No gallery photos uploaded yet.</div>
        </div>
      ) : (
        <div className="row">
          {images.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card shadow-sm border-0 h-100">
                <img
                  src={item.fileUrl?.startsWith("http") ? item.fileUrl : `http://localhost:8080${item.fileUrl}`}
                  className="card-img-top"
                  alt={item.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6 className="mb-0">{item.title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GallerySection;