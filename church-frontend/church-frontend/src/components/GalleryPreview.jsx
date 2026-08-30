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
        // Grab top 3 items for homepage preview
        setImages(res.data.slice(0, 3));
      })
      .catch((err) => console.error("Error loading preview images:", err));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-5"
      style={{ background: "#0D47A1" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-white mb-4"
        >
          <span
            className="badge bg-warning text-dark px-3 py-2 mb-2"
            style={{ fontSize: "0.6rem", letterSpacing: "2px" }}
          >
            OUR COMMUNITY
          </span>
          <h2 className="fw-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
            Moments From Our Community
          </h2>
          <div className="mx-auto" style={{ width: "50px", height: "3px", background: "#D4AF37" }} />
          <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
            Sharing memories of faith, unity, and service
          </p>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row g-4"
        >
          {images.map((image, i) => (
            <motion.div key={image.id || i} variants={itemVariants} className="col-md-4">
              <motion.div
                className="card border-0 shadow-sm overflow-hidden"
                style={{ borderRadius: "16px", transition: "all 0.3s ease" }}
                whileHover={{ y: -10, boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}
              >
                <div className="position-relative" style={{ height: "250px" }}>
                  <img
                    src={image.imageUrl || image.url}
                    alt={image.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div style="height:250px;background:linear-gradient(135deg,#1a6bc4,#0D47A1);display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;padding:20px;text-align:center;">
                          <div style="font-size:3rem;opacity:0.3;">🕊️</div>
                          <div style="font-weight:600;margin-top:10px;">${image.title}</div>
                          <div style="font-size:0.8rem;opacity:0.7;">${image.description || ""}</div>
                        </div>
                      `;
                    }}
                  />
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ background: "linear-gradient(135deg, rgba(13,71,161,0.1), rgba(212,175,55,0.05))" }}
                  >
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-3"
                      style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}
                    >
                      <h6 className="text-white fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
                        {image.title}
                      </h6>
                      <p className="text-white-50 mb-0" style={{ fontSize: "0.75rem" }}>
                        {image.description || image.category}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <motion.button
            onClick={() => navigate("/gallery")}
            className="btn btn-warning px-4 py-2 rounded-pill"
            style={{ fontSize: "0.85rem", fontWeight: "600", boxShadow: "0 4px 15px rgba(212,175,55,0.3)" }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(212,175,55,0.4)" }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Gallery →
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default GalleryPreview;