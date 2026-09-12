import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, Form, Button, Row, Col, Alert, Spinner, Badge, Container,
} from "react-bootstrap";
import {
  FaPlus, FaTrash, FaCalendarAlt, FaNewspaper, FaTimes,
  FaUser, FaFilePdf, FaFileWord, FaFileAlt, FaDownload, FaImage,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:8080/api/news";

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

function News() {
  const emptyForm = { title: "", content: "", author: "" };

  const [news, setNews] = useState(emptyForm);
  const [newsList, setNewsList] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // ── Load ────────────────────────────────────────
  const loadNews = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await axios.get(API_URL);
      setNewsList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load news failed:", err);
      setError(err.response?.data?.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadNews(); }, []);

  // ── Handlers ────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setImageFile(null); setImagePreview(""); return; }

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed for the hero image.");
      e.target.value = ""; setImageFile(null); setImagePreview("");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Hero image must be under 5MB.");
      e.target.value = ""; setImageFile(null); setImagePreview("");
      return;
    }
    setError("");
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) { setSelectedFile(null); return; }

    const ok = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!ok.includes(file.type)) {
      setError("Only PDF, DOC, or DOCX files are allowed.");
      e.target.value = ""; return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      e.target.value = ""; return;
    }
    setError("");
    setSelectedFile(file);
  };

  const clearForm = () => {
    setNews(emptyForm);
    setSelectedFile(null);
    setImageFile(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview("");
    setMessage("");
    setError("");
    const f = document.getElementById("news-file");
    if (f) f.value = "";
    const img = document.getElementById("news-image");
    if (img) img.value = "";
  };

  // ── Submit ──────────────────────────────────────
  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!news.title.trim() || !news.content.trim()) {
      setError("Title and Content are required.");
      return;
    }
    if (!getToken()) {
      setError("You are not logged in.");
      return;
    }

    try {
      setSubmitting(true);

      // If an image OR a document is selected → use multipart /upload
      if (imageFile || selectedFile) {
        const formData = new FormData();
        formData.append("title", news.title.trim());
        formData.append("content", news.content.trim());
        formData.append("author", news.author.trim() || "Church Admin");
        if (imageFile) formData.append("image", imageFile);
        if (selectedFile) formData.append("file", selectedFile);

        // Do NOT set Content-Type — axios adds the multipart boundary
        await axios.post(`${API_URL}/upload`, formData, authHeaders());
      } else {
        // Text-only → JSON
        await axios.post(
          API_URL,
          {
            title: news.title.trim(),
            content: news.content.trim(),
            author: news.author.trim() || "Church Admin",
          },
          authHeaders({ "Content-Type": "application/json" })
        );
      }

      setMessage("Article published!");
      clearForm();
      setShowForm(false);
      await loadNews();
    } catch (err) {
      console.error("Submit failed:", err);
      const s = err.response?.status;
      const d = err.response?.data;
      if (s === 401) setError("Session expired. Please log in again.");
      else if (s === 403) setError("You don't have permission to publish news.");
      else if (s === 400) setError(typeof d === "string" ? d : (d?.message || "Invalid data."));
      else setError(d?.message || "Failed to save article.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ──────────────────────────────────────
  const remove = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`, authHeaders());
      setMessage("Article deleted.");
      await loadNews();
    } catch (err) {
      const s = err.response?.status;
      if (s === 401) setError("Session expired.");
      else if (s === 403) setError("You don't have permission to delete news.");
      else setError("Failed to delete article.");
    }
  };

  // ── Helpers ─────────────────────────────────────
  const formatDate = (d) => {
    if (!d) return "No date";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      });
    } catch { return d; }
  };

  const fileIcon = (type) => {
    const t = (type || "").toLowerCase();
    if (t === "pdf") return <FaFilePdf style={{ color: "#dc2626" }} />;
    if (t === "doc" || t === "docx") return <FaFileWord style={{ color: "#2563eb" }} />;
    return <FaFileAlt />;
  };

  const downloadFile = (documentUrl) => {
    if (documentUrl) window.open(`${API_URL}/files/${documentUrl.replace(/^.*\/files\//, "")}`, "_blank");
  };

  const imageSrc = (item) => {
    if (!item?.imageUrl) return "";
    return `${API_URL}/images/${item.imageUrl.replace(/^.*\/images\//, "")}`;
  };

  // ── Render ──────────────────────────────────────
  return (
    <div style={{ background: "linear-gradient(135deg,#f5f7fa 0%,#e4e8f0 100%)", minHeight: "100vh", padding: "2rem" }}>
      <Container fluid>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h1 style={{ fontSize: "2.5rem", fontWeight: 700, color: "#1a1a2e", margin: 0, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <FaNewspaper style={{ color: "#4f46e5" }} /> News
            </h1>
            <p style={{ color: "#6b7280", margin: "0.25rem 0 0", fontSize: "1.1rem" }}>
              Manage church news, announcements, and documents
            </p>
          </div>
          <button
            onClick={() => { setShowForm((s) => !s); if (showForm) clearForm(); }}
            style={{
              background: showForm ? "#dc2626" : "#4f46e5", color: "white", border: "none",
              padding: "0.75rem 1.75rem", borderRadius: "50px", fontSize: "1rem", fontWeight: 600,
              display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer",
            }}
          >
            {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Close Form" : "New Article"}
          </button>
        </div>

        {/* Alerts */}
        <AnimatePresence>
          {message && (<Alert variant="success" dismissible onClose={() => setMessage("")}>{message}</Alert>)}
          {error && (<Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>)}
        </AnimatePresence>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
              <Card style={{ border: "none", borderRadius: "16px", boxShadow: "0 10px 40px rgba(0,0,0,0.08)", marginBottom: "2rem" }}>
                <Card.Body style={{ padding: "2rem" }}>
                  <h4 style={{ marginBottom: "1.5rem", fontWeight: 600, color: "#1a1a2e" }}>Create New Article</h4>
                  <Form onSubmit={submit}>
                    <Row className="g-3">
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Title *</Form.Label>
                          <Form.Control type="text" name="title" value={news.title} onChange={handleChange} required />
                        </Form.Group>
                      </Col>
                      <Col md={12}>
                        <Form.Group>
                          <Form.Label>Content *</Form.Label>
                          <Form.Control as="textarea" rows={6} name="content" value={news.content} onChange={handleChange} required />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Author</Form.Label>
                          <Form.Control type="text" name="author" value={news.author} onChange={handleChange} />
                        </Form.Group>
                      </Col>

                      {/* Hero image */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label><FaImage className="me-1" /> Hero Image (optional)</Form.Label>
                          <Form.Control id="news-image" type="file" accept="image/*" onChange={handleImageChange} />
                          <Form.Text className="text-muted">JPG, PNG, or WEBP. Max 5MB.</Form.Text>
                        </Form.Group>
                      </Col>

                      {/* Document */}
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Document (optional)</Form.Label>
                          <Form.Control id="news-file" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
                          <Form.Text className="text-muted">PDF, DOC, or DOCX. Max 10MB.</Form.Text>
                        </Form.Group>
                      </Col>

                      {imagePreview && (
                        <Col md={6}>
                          <strong>Image Preview</strong>
                          <div className="mt-2">
                            <img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 8 }} />
                          </div>
                        </Col>
                      )}

                      {selectedFile && (
                        <Col md={12}>
                          <div style={{ padding: "0.75rem 1rem", background: "#dbeafe", borderRadius: "8px", display: "flex", gap: "0.75rem", alignItems: "center" }}>
                            {fileIcon(selectedFile.name.split(".").pop())}
                            <span style={{ fontWeight: 500 }}>{selectedFile.name}</span>
                            <span style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                              ({(selectedFile.size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                        </Col>
                      )}

                      <Col md={12} className="mt-3">
                        <Button type="submit" disabled={submitting} style={{ background: "#4f46e5", border: "none", padding: "0.75rem 2rem", borderRadius: "50px" }}>
                          {submitting ? <><Spinner animation="border" size="sm" className="me-2" />Publishing...</> : "Publish Article"}
                        </Button>
                        <Button type="button" variant="outline-secondary" className="ms-2" onClick={clearForm} style={{ borderRadius: "50px", padding: "0.75rem 2rem" }}>
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

        {/* List */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "4rem" }}>
            <Spinner animation="border" style={{ color: "#4f46e5" }} />
            <p className="mt-2" style={{ color: "#6b7280" }}>Loading news...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", background: "white", borderRadius: "16px" }}>
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📰</div>
            <h3>No News Yet</h3>
            <p style={{ color: "#6b7280" }}>Click "New Article" to publish your first news.</p>
          </div>
        ) : (
          <Row className="g-4">
            {newsList.map((item) => (
              <Col key={item.id} md={6} lg={4}>
                <Card style={{ border: "none", borderRadius: "16px", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", height: "100%", overflow: "hidden" }}>
                  {imageSrc(item) && (
                    <img
                      src={imageSrc(item)}
                      alt={item.title}
                      style={{ width: "100%", height: 160, objectFit: "cover" }}
                    />
                  )}
                  <Card.Body>
                    <Badge bg="primary" style={{ marginBottom: "0.75rem" }}>
                      {item.fileType ? `📄 ${item.fileType.toUpperCase()}` : "📝 Article"}
                    </Badge>
                    <h5 style={{ fontWeight: 600, color: "#1a1a2e" }}>{item.title}</h5>
                    <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{item.content}</p>
                    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
                      {item.author && <div><FaUser size={12} /> {item.author}</div>}
                      <div><FaCalendarAlt size={12} /> {formatDate(item.publishedAt)}</div>
                      {item.documentUrl && (
                        <div style={{ marginTop: "0.5rem" }}>
                          {fileIcon(item.fileType)} {item.documentName}
                        </div>
                      )}
                    </div>
                    {item.documentUrl && (
                      <Button variant="outline-primary" size="sm" className="mt-3 w-100" onClick={() => downloadFile(item.documentUrl)}>
                        <FaDownload className="me-2" /> Download
                      </Button>
                    )}
                  </Card.Body>
                  <Card.Footer style={{ background: "white", display: "flex", gap: "0.5rem" }}>
                    <Button variant="danger" size="sm" className="w-100" onClick={() => remove(item.id)}>
                      <FaTrash size={14} /> Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default News;