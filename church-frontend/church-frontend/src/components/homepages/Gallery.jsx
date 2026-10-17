import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaCamera, FaPlus, FaTimes, FaImage, FaTag } from "react-icons/fa";

/* ══════════════════════════════════════════════════════════════
   API LAYER
   ══════════════════════════════════════════════════════════════ */
const API_BASE_URL = "http://localhost:8080/api/gallery";

const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
const getRole  = () => localStorage.getItem("role")  || sessionStorage.getItem("role");

const checkIsAdmin = () => {
  const token = getToken();
  const role  = getRole();
  return Boolean(token) && [
    "ROLE_SYSTEM_ADMIN", "SYSTEM_ADMIN", "ROLE_ADMIN", "ADMIN",
  ].includes(role);
};

const fetchGalleryImages = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

const uploadGalleryImage = async (payload) => {
  const token = getToken();
  if (!token) throw new Error("NO_TOKEN");
  const res = await axios.post(API_BASE_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

/* ══════════════════════════════════════════════════════════════
   THEME
   ══════════════════════════════════════════════════════════════ */
const BLUE = { main: "#1D4ED8", soft: "#DBEAFE", hover: "rgba(29,78,216,0.18)" };
const YELLOW = { main: "#D97706", soft: "#FEF3C7", hover: "rgba(217,119,6,0.18)" };
const CARD_SHADOW = "0 4px 20px rgba(15,23,42,0.06)";
const CARD_RADIUS = "16px";

/* ══════════════════════════════════════════════════════════════
   CONSTANTS
   ══════════════════════════════════════════════════════════════ */
const CATEGORIES = ["All", "Masses", "Youth", "Community", "Events"];
const EMPTY_FORM = { title: "", category: "Masses", description: "", imageUrl: "" };

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */
function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const isAdmin = checkIsAdmin();

  const loadGallery = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchGalleryImages();
      setImages(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch gallery images:", err);
      setError("Unable to load gallery images from backend.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadGallery(); }, [loadGallery]);

  const filteredImages = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter(
      (img) => img.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [images, activeCategory]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const closeModal = () => { setShowModal(false); setUploadError(null); };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadError(null);
    setUploading(true);
    try {
      await uploadGalleryImage(formData);
      setFormData(EMPTY_FORM);
      setShowModal(false);
      await loadGallery();
    } catch (err) {
      console.error("Upload error response:", err.response);
      if (err.message === "NO_TOKEN") {
        setUploadError("No authentication token found. Please log in again.");
      } else if (err.response?.status === 403) {
        setUploadError("Access Denied (403): Your account does not have admin permissions to upload to the gallery.");
      } else if (err.response?.status === 401) {
        setUploadError("Unauthorized (401): Your session has expired or the security token is invalid. Please log in again.");
      } else {
        setUploadError(err.response?.data?.message || "Failed to upload image. Please check backend server logs.");
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* ═══════════════════════════════════════════════════════
          HERO
          ═══════════════════════════════════════════════════════ */}
      <section
        style={{
          background: "linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 60%,#D97706 130%)",
          color: "#fff",
          padding: "72px 16px 96px",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
        }}
      >
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -120, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ position: "relative", maxWidth: 720, margin: "0 auto" }}
        >
          <div
            style={{
              width: 64, height: 64, borderRadius: 18,
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.25)",
              backdropFilter: "blur(8px)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <FaCamera size={26} />
          </div>

          <div
            className="d-inline-block"
            style={{
              background: YELLOW.main, color: "#fff",
              padding: "6px 14px", borderRadius: 999,
              fontSize: 11, fontWeight: 700, letterSpacing: "2px",
              textTransform: "uppercase", marginBottom: 16,
            }}
          >
            Photo Gallery
          </div>

          <h1 className="fw-bold mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.5px" }}>
            Life in Our Parish
          </h1>
          <p className="mb-0 mx-auto" style={{ maxWidth: 560, opacity: 0.85 }}>
            Explore moments captured across our masses, youth events, and community projects.
          </p>

          {isAdmin && (
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={() => setShowModal(true)}
              className="border-0 fw-semibold d-inline-flex align-items-center gap-2"
              style={{
                marginTop: 28,
                padding: "11px 24px",
                borderRadius: 10,
                background: `linear-gradient(135deg, ${YELLOW.main}, #F59E0B)`,
                color: "#fff",
                boxShadow: `0 6px 16px ${YELLOW.hover}`,
                fontSize: 15,
              }}
            >
              <FaPlus /> Upload New Image
            </motion.button>
          )}
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          FILTER BAR (floating card overlapping hero bottom)
          ═══════════════════════════════════════════════════════ */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        <div
          style={{
            marginTop: -40,
            background: "#fff",
            borderRadius: CARD_RADIUS,
            boxShadow: CARD_SHADOW,
            padding: "16px 20px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 8,
            position: "relative",
            zIndex: 2,
          }}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="border-0 fw-semibold"
                style={{
                  padding: "9px 22px",
                  borderRadius: 999,
                  fontSize: 14,
                  background: active
                    ? `linear-gradient(135deg, ${BLUE.main}, ${YELLOW.main})`
                    : "#F1F5F9",
                  color: active ? "#fff" : "#475569",
                  boxShadow: active ? `0 6px 16px ${BLUE.hover}` : "none",
                  transition: "all 0.25s ease",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          GALLERY GRID
          ═══════════════════════════════════════════════════════ */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 16px 64px" }}>
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border" role="status" style={{ color: BLUE.main }} />
          </div>
        )}

        {error && (
          <div
            className="text-center py-4 px-3 mx-auto"
            style={{
              maxWidth: 520,
              background: "#FEF2F2",
              color: "#991B1B",
              borderRadius: CARD_RADIUS,
            }}
          >
            {error}
          </div>
        )}

        {!loading && !error && filteredImages.length === 0 && (
          <div className="text-center py-5 text-muted">
            <FaImage size={48} style={{ opacity: 0.25 }} className="mb-3" />
            <div className="fw-semibold">No images in this category yet.</div>
          </div>
        )}

        {!loading && !error && filteredImages.length > 0 && (
          <motion.div layout className="row g-4">
            <AnimatePresence>
              {filteredImages.map((img, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  key={img.id || img.imageUrl}
                  className="col-12 col-sm-6 col-lg-4"
                >
                  <div
                    className="gallery-card h-100"
                    style={{
                      borderRadius: CARD_RADIUS,
                      boxShadow: CARD_SHADOW,
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    <div style={{ height: 260, position: "relative", overflow: "hidden" }}>
                      <img
                        src={img.imageUrl || img.url}
                        alt={img.title}
                        className="gallery-img"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          display: "block",
                        }}
                      />

                      <span
                        style={{
                          position: "absolute", top: 14, left: 14,
                          padding: "5px 12px", borderRadius: 999,
                          fontSize: 11, fontWeight: 700,
                          letterSpacing: "0.4px", textTransform: "uppercase",
                          background: YELLOW.main, color: "#fff",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        }}
                      >
                        {img.category}
                      </span>

                      <div
                        style={{
                          position: "absolute", bottom: 0, left: 0, right: 0,
                          padding: 16,
                          background: "linear-gradient(transparent, rgba(15,23,42,0.85))",
                          color: "#fff",
                        }}
                      >
                        <h6 className="fw-bold mb-1">{img.title}</h6>
                        {img.description && (
                          <p className="small mb-0" style={{ opacity: 0.85 }}>{img.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* ═══════════════════════════════════════════════════════
          UPLOAD MODAL
          ═══════════════════════════════════════════════════════ */}
      {showModal && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(15,23,42,0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div
              className="modal-content border-0"
              style={{ borderRadius: CARD_RADIUS, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", overflow: "hidden" }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${BLUE.main}, ${YELLOW.main})`,
                  color: "#fff",
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h5 className="fw-bold mb-0 d-flex align-items-center gap-2">
                  <FaCamera size={16} /> Upload Gallery Image
                </h5>
                <button
                  type="button"
                  className="border-0 bg-transparent text-white"
                  onClick={closeModal}
                  style={{ fontSize: 18, lineHeight: 1 }}
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUploadSubmit}>
                <div className="modal-body p-4">
                  {uploadError && (
                    <div
                      className="small mb-3 p-3"
                      style={{ background: "#FEF2F2", color: "#991B1B", borderRadius: 10, border: "1px solid #FECACA" }}
                    >
                      {uploadError}
                    </div>
                  )}

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>
                      <FaImage className="me-2" style={{ color: BLUE.main }} /> Title
                    </label>
                    <input
                      type="text"
                      className="form-control gallery-input"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Easter Sunday Mass"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>
                      <FaTag className="me-2" style={{ color: YELLOW.main }} /> Category
                    </label>
                    <select
                      className="form-select gallery-input"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="Masses">Masses</option>
                      <option value="Youth">Youth</option>
                      <option value="Community">Community</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>
                      <FaImage className="me-2" style={{ color: BLUE.main }} /> Image URL
                    </label>
                    <input
                      type="url"
                      className="form-control gallery-input"
                      name="imageUrl"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-0">
                    <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>
                      Description
                    </label>
                    <textarea
                      className="form-control gallery-input"
                      name="description"
                      rows="2"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Optional short description"
                    />
                  </div>
                </div>

                <div className="modal-footer border-0 p-4 pt-0">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn fw-semibold border-0"
                    style={{ borderRadius: 10, padding: "10px 20px", background: "#F1F5F9", color: "#475569" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={uploading}
                    className="btn fw-semibold border-0"
                    style={{
                      borderRadius: 10, padding: "10px 24px",
                      background: `linear-gradient(135deg, ${BLUE.main}, ${YELLOW.main})`,
                      color: "#fff",
                      boxShadow: `0 6px 16px ${BLUE.hover}`,
                    }}
                  >
                    {uploading ? "Uploading..." : "Save Image"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          LOCAL STYLES
          ═══════════════════════════════════════════════════════ */}
      <style>{`
        .gallery-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .gallery-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(15,23,42,0.12) !important;
        }
        .gallery-card:hover .gallery-img { transform: scale(1.06); }
        .gallery-input {
          border-radius: 10px !important;
          padding: 10px 14px !important;
          border: 1px solid #e2e8f0 !important;
          font-size: 14px;
        }
        .gallery-input:focus {
          border-color: ${BLUE.main} !important;
          box-shadow: 0 0 0 3px ${BLUE.hover} !important;
        }
      `}</style>
    </div>
  );
}

export default Gallery;