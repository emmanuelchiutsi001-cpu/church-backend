import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, Form, Button, Row, Col, Alert, Image, Spinner, Badge, Container,
} from "react-bootstrap";
import {
  FaPlus, FaEdit, FaTrash, FaUser, FaUsers, FaTimes,
  FaVideo, FaFileAlt, FaChurch, FaUserTie,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const API_BASE = "http://localhost:8080";
const API_URL = `${API_BASE}/api/leaders`;

const getToken = () =>
  localStorage.getItem("token") || localStorage.getItem("auth_token");

const authHeaders = (extra = {}) => {
  const token = getToken();
  return {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...extra,
    },
  };
};

// Build a full URL for backend-relative paths
const absoluteUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${API_BASE}${url}`;
};

function Leadership() {
  const emptyForm = {
    name: "", role: "", deanery: "", bio: "", sermonTitle: "",
  };

  const [leader, setLeader] = useState(emptyForm);
  const [leaders, setLeaders] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  // ── Load ────────────────────────────────────────────
  const loadLeaders = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(API_URL);
      setLeaders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load leaders failed:", err);
      setError(err.response?.data?.message || "Failed to load leaders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadLeaders(); }, []);

  // ── Handlers ────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeader((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setSelectedPhoto(null); setPhotoPreview(""); return; }
    if (!file.type.startsWith("image/")) {
      setError("Photo must be a valid image (JPEG, PNG, GIF, WEBP).");
      e.target.value = ""; return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Photo must be under 5MB.");
      e.target.value = ""; return;
    }
    setError("");
    setSelectedPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setSelectedVideo(null); return; }
    if (!file.type.startsWith("video/")) {
      setError("Sermon must be a valid video (MP4, WEBM, OGG).");
      e.target.value = ""; return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError("Video must be under 50MB.");
      e.target.value = ""; return;
    }
    setError("");
    setSelectedVideo(file);
  };

  const clear = () => {
    setLeader(emptyForm);
    setEditingId(null);
    setSelectedPhoto(null);
    setSelectedVideo(null);
    setPhotoPreview("");
    setMessage("");
    setError("");
    setShowForm(false);
  };

  // ── Save / Upload ───────────────────────────────────
  const saveLeader = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!leader.name.trim() || !leader.role.trim()) {
      setError("Name and Role are required.");
      return;
    }
    if (!getToken()) {
      setError("You are not logged in.");
      return;
    }
    if (editingId) {
      setError("Edit is not yet supported by the backend. Delete and re-add instead.");
      return;
    }

    try {
      setSubmitting(true);

      if (selectedPhoto || selectedVideo) {
        const formData = new FormData();
        formData.append("name", leader.name.trim());
        formData.append("role", leader.role.trim());
        formData.append("deanery", leader.deanery.trim() || "");
        formData.append("bio", leader.bio.trim() || "");
        formData.append("sermonTitle", leader.sermonTitle.trim() || "");
        if (selectedPhoto) formData.append("photo", selectedPhoto);
        if (selectedVideo) formData.append("video", selectedVideo);

        // Do NOT set Content-Type — axios adds it with the boundary
        await axios.post(`${API_URL}/upload`, formData, authHeaders());
        setMessage("Leader with media uploaded successfully.");
      } else {
        await axios.post(
          API_URL,
          {
            name: leader.name.trim(),
            role: leader.role.trim(),
            deanery: leader.deanery.trim() || "",
            bio: leader.bio.trim() || "",
            sermonTitle: leader.sermonTitle.trim() || "",
          },
          authHeaders({ "Content-Type": "application/json" })
        );
        setMessage("Leader added successfully.");
      }

      clear();
      await loadLeaders();
    } catch (err) {
      console.error("Save failed:", err);
      const s = err.response?.status;
      const d = err.response?.data;
      if (s === 401) setError("Session expired. Please log in again.");
      else if (s === 403) setError("You don't have permission to add leaders.");
      else if (s === 400) setError(typeof d === "string" ? d : (d?.message || "Invalid data."));
      else if (s === 500) setError("Backend error while saving. Check the Spring console.");
      else setError(d?.message || err.message || "Failed to save leader.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──────────────────────────────────────────
  const deleteLeader = async (id) => {
    if (!window.confirm("Delete this leader?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, authHeaders());
      setMessage("Leader deleted.");
      await loadLeaders();
    } catch (err) {
      const s = err.response?.status;
      if (s === 401) setError("Session expired.");
      else if (s === 403) setError("You don't have permission to delete leaders.");
      else setError("Failed to delete leader.");
    }
  };

  // ── Edit (disabled — backend has no PUT) ────────────
  const editLeader = () => {
    setError("Editing leaders isn't supported by the backend yet. Delete and re-add instead.");
  };

  // ── Photo URL ───────────────────────────────────────
  const getPhotoUrl = (item) => {
    if (!item) return "";
    if (item.photoUrl) return absoluteUrl(item.photoUrl);
    if (item.photoFileName) return `${API_URL}/photos/${item.photoFileName}`;
    return "";
  };

  const formatDate = (d) => {
    if (!d) return "No date";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      });
    } catch { return d; }
  };

  // ────────────────────────────────────────────────────
  return (
    <div style={{ background: "linear-gradient(135deg,#f5f7fa 0%,#e4e8f0 100%)", minHeight: "100vh", padding: "2rem" }}>
      <Container fluid>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1a1a2e", margin: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FaUsers style={{ color: "#4f46e5" }} /> Leadership
            </h1>
            <p style={{ color: "#6b7280", margin: "0.25rem 0 0", fontSize: "1.1rem" }}>
              Manage church leaders, their profiles, and media
            </p>
          </div>
          <button
            onClick={() => { setShowForm((s) => !s); if (showForm) clear(); }}
            style={{
              background: showForm ? "#dc2626" : "#4f46e5", color: "white", border: "none",
              padding: "0.75rem 1.75rem", borderRadius: "50px", fontSize: "1rem", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer",
            }}
          >
            {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Close Form" : "Add Leader"}
          </button>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {message && <Alert variant="success" dismissible onClose={() => setMessage("")}>{message}</Alert>}
          {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}
        </AnimatePresence>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Card style={{ border: "none", borderRadius: 16, boxShadow: "0 10px 40px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
                <Card.Body style={{ padding: "2rem" }}>
                  <h4 style={{ marginBottom: "1.5rem", fontWeight: 600, color: "#1a1a2e" }}>
                    Add New Leader
                  </h4>
                  <Form onSubmit={saveLeader}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Full Name *</Form.Label>
                          <Form.Control type="text" name="name" value={leader.name} onChange={handleChange} required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Role *</Form.Label>
                          <Form.Control type="text" name="role" value={leader.role} onChange={handleChange} placeholder="e.g., Senior Pastor, Youth Dean" required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Deanery / Ministry</Form.Label>
                          <Form.Control type="text" name="deanery" value={leader.deanery} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Sermon Title</Form.Label>
                          <Form.Control type="text" name="sermonTitle" value={leader.sermonTitle} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Biography</Form.Label>
                          <Form.Control as="textarea" rows={4} name="bio" value={leader.bio} onChange={handleChange} />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Photo (JPEG, PNG, GIF, WEBP)</Form.Label>
                          <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
                          <Form.Text className="text-muted">Max 5MB.</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Sermon Video (MP4, WEBM, OGG)</Form.Label>
                          <Form.Control type="file" accept="video/*" onChange={handleVideoChange} />
                          <Form.Text className="text-muted">Max 50MB.</Form.Text>
                        </Form.Group>
                      </Col>
                      {photoPreview && (
                        <Col md={12}>
                          <Image src={photoPreview} thumbnail style={{ maxHeight: 120, objectFit: "cover" }} />
                        </Col>
                      )}
                      {selectedVideo && (
                        <Col md={12}>
                          <div style={{ padding: "0.75rem 1rem", background: "#dbeafe", borderRadius: 8, display: "flex", gap: "0.75rem", alignItems: "center" }}>
                            <FaVideo />
                            <span style={{ fontWeight: 500 }}>{selectedVideo.name}</span>
                            <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                              ({(selectedVideo.size / 1024 / 1024).toFixed(1)} MB)
                            </span>
                          </div>
                        </Col>
                      )}
                      <Col md={12} className="mt-3">
                        <Button type="submit" disabled={submitting} style={{ background: "#4f46e5", border: "none", padding: "0.75rem 2rem", borderRadius: 50 }}>
                          {submitting ? <><Spinner animation="border" size="sm" className="me-2" />Saving...</> : "Save Leader"}
                        </Button>
                        <Button type="button" variant="outline-secondary" className="ms-2" onClick={clear} style={{ borderRadius: 50, padding: "0.75rem 2rem" }}>
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <Spinner animation="border" style={{ color: "#4f46e5" }} />
            <p className="mt-2 text-muted">Loading leaders...</p>
          </div>
        ) : leaders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "white", borderRadius: 16 }}>
            <FaUserTie size={60} className="text-secondary mb-3" />
            <h3>No Leaders Yet</h3>
            <p className="text-muted">Click "Add Leader" to create the first profile.</p>
          </div>
        ) : (
          <Row className="g-4">
            {leaders.map((item, index) => {
              const photoSrc = getPhotoUrl(item);
              return (
                <Col key={item.id} md={6} lg={4}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card style={{ border: "none", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", height: "100%" }}>
                      <div style={{ height: 220, position: "relative", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {photoSrc ? (
                          <img
                            src={photoSrc}
                            alt={item.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        ) : (
                          <FaUserTie size={60} style={{ color: "#9ca3af" }} />
                        )}
                        {item.role && (
                          <Badge style={{ position: "absolute", bottom: "1rem", right: "1rem", background: "#4f46e5" }}>
                            {item.role}
                          </Badge>
                        )}
                      </div>
                      <Card.Body style={{ padding: "1.5rem" }}>
                        <h5 style={{ fontWeight: 600, color: "#1a1a2e", marginBottom: "0.25rem" }}>
                          {item.name}
                        </h5>
                        {item.deanery && (
                          <div style={{ color: "#6b7280", fontSize: "0.875rem", marginBottom: "0.5rem" }}>
                            <FaChurch style={{ color: "#4f46e5", marginRight: "0.5rem" }} />
                            {item.deanery}
                          </div>
                        )}
                        {item.bio && (
                          <p style={{ color: "#6b7280", fontSize: "0.875rem", WebkitLineClamp: 3, display: "-webkit-box", WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {item.bio}
                          </p>
                        )}
                        {item.sermonTitle && (
                          <div style={{ color: "#4f46e5", fontSize: "0.875rem", fontWeight: 500, marginTop: "0.5rem" }}>
                            <FaFileAlt style={{ marginRight: "0.4rem" }} />
                            {item.sermonTitle}
                          </div>
                        )}
                        {item.videoUrl && (
                          <a href={absoluteUrl(item.videoUrl)} target="_blank" rel="noopener noreferrer"
                             style={{ color: "#4f46e5", textDecoration: "none", fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.25rem", marginTop: "0.5rem" }}>
                            <FaVideo /> Watch Sermon
                          </a>
                        )}
                        <div style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                          <FaUser size={12} /> Added: {formatDate(item.createdAt)}
                        </div>
                      </Card.Body>
                      <div style={{ padding: "0.75rem 1.5rem 1.5rem", display: "flex", gap: "0.5rem", borderTop: "1px solid #e5e7eb" }}>
                        <Button variant="primary" size="sm" className="w-100" onClick={editLeader} disabled>
                          <FaEdit size={14} /> Edit
                        </Button>
                        <Button variant="danger" size="sm" className="w-100" onClick={() => deleteLeader(item.id)}>
                          <FaTrash size={14} /> Delete
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Leadership;