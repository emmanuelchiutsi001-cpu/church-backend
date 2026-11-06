import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/gallery";

function GalleryPreview() {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((res) => {
        setImages(res.data.slice(0, 3));
      })
      .catch((err) => console.error("Error loading preview images:", err));
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="gallery-preview"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="eyebrow">Our community</span>
          <h2 className="section-title text-white">
            Moments From Our <span className="accent">Community</span>
          </h2>
          <p className="section-blurb text-white-50">Sharing memories of faith, unity, and service.</p>
          <div className="gold-divider" />
        </motion.div>

        <div className="row g-4">
          {images.map((image, i) => (
            <div key={image.id || i} className="col-md-4">
              <div className="gallery-card">
                <img
                  src={image.imageUrl || image.url}
                  alt={image.title}
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `
                      <div class="gallery-fallback">
                        <div class="gallery-fallback-icon">🕊️</div>
                        <div class="gallery-fallback-title">${image.title}</div>
                        <div class="gallery-fallback-copy">${image.description || ""}</div>
                      </div>
                    `;
                  }}
                />
                <div className="gallery-overlay">
                  <h6>{image.title}</h6>
                  <p>{image.description || image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <button type="button" onClick={() => navigate("/gallery")} className="gallery-cta-btn">
            View Full Gallery →
          </button>
        </div>
      </div>
    </motion.section>
  );
}

export default GalleryPreview;