import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/gallery";

function Gallery() {
  const [images, setImages] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin Upload State
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Masses",
    description: "",
    imageUrl: ""
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  // Helper function to safely extract auth values from localStorage or sessionStorage
  const getToken = () => localStorage.getItem("token") || sessionStorage.getItem("token");
  const getRole = () => localStorage.getItem("role") || sessionStorage.getItem("role");

  const token = getToken();
  const userRole = getRole();

  // Flexible check for Admin authority across common naming conventions
  const isAdmin =
    Boolean(token) &&
    ["ROLE_SYSTEM_ADMIN", "SYSTEM_ADMIN", "ROLE_ADMIN", "ADMIN"].includes(userRole);

  const categories = ["All", "Masses", "Youth", "Community", "Events"];

  // Fetch images from Spring Boot API
  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_BASE_URL);
      setImages(res.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch gallery images:", err);
      setError("Unable to load gallery images from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Handle Form Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Upload image handler with active JWT Bearer token
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadError(null);

    const activeToken = getToken();

    if (!activeToken) {
      setUploadError("No authentication token found. Please log in again.");
      return;
    }

    setUploading(true);
    try {
      await axios.post(API_BASE_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${activeToken}`
        }
      });

      setShowModal(false);
      setFormData({ title: "", category: "Masses", description: "", imageUrl: "" });
      fetchGallery(); // Refresh gallery grid
    } catch (err) {
      console.error("Upload error response:", err.response);
      
      if (err.response?.status === 403) {
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

  // Filter images based on category
  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="py-5" style={{ background: "#f8f9fa", minHeight: "80vh" }}>
      <div className="container">
        {/* Header Section */}
        <div className="text-center mb-4">
          <span className="badge bg-primary px-3 py-2 mb-2 text-uppercase" style={{ letterSpacing: "2px" }}>
            Photo Gallery
          </span>
          <h1 className="fw-bold display-5 text-dark">Life in Our Parish</h1>
          <div className="mx-auto my-3" style={{ width: "60px", height: "3px", background: "#0D47A1" }} />
          <p className="text-muted">Explore moments captured across our masses, youth events, and community projects.</p>
          
          {/* Admin Upload Trigger Button */}
          {isAdmin && (
            <button className="btn btn-warning mt-2 fw-semibold shadow-sm" onClick={() => setShowModal(true)}>
              + Upload New Image
            </button>
          )}
        </div>

        {/* Category Filters */}
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`btn ${activeCategory === cat ? "btn-primary" : "btn-outline-secondary"} rounded-pill px-4`}
              style={{ transition: "all 0.3s ease" }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading / Error States */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
          </div>
        )}
        
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {/* Gallery Grid */}
        {!loading && !error && (
          <motion.div layout className="row g-4">
            <AnimatePresence>
              {filteredImages.map((img) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={img.id || img.imageUrl}
                  className="col-12 col-sm-6 col-md-4"
                >
                  <div className="card h-100 border-0 shadow-sm overflow-hidden rounded-4">
                    <div className="position-relative" style={{ height: "240px" }}>
                      <img
                        src={img.imageUrl || img.url}
                        alt={img.title}
                        className="w-100 h-100"
                        style={{ objectFit: "cover" }}
                      />
                      <div
                        className="position-absolute bottom-0 start-0 w-100 p-3"
                        style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
                      >
                        <span className="badge bg-warning text-dark mb-1">{img.category}</span>
                        <h6 className="text-white fw-bold mb-0">{img.title}</h6>
                        {img.description && <p className="text-white-50 small mb-0">{img.description}</p>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="modal d-block tab-index-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 shadow">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Upload Gallery Image</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModal(false);
                    setUploadError(null);
                  }}
                />
              </div>

              <form onSubmit={handleUploadSubmit}>
                <div className="modal-body">
                  {uploadError && <div className="alert alert-danger small mb-3">{uploadError}</div>}

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select"
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
                    <label className="form-label fw-semibold">Image URL</label>
                    <input
                      type="url"
                      className="form-control"
                      name="imageUrl"
                      placeholder="https://example.com/photo.jpg"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="2"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      setUploadError(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={uploading}>
                    {uploading ? "Uploading..." : "Save Image"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;