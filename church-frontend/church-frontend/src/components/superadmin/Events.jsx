import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Image,
  Spinner,
  Badge,
  Container,
} from "react-bootstrap";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaTag,
  FaTimes,
  FaImage,
  FaChurch,
  FaClock
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:8080/api/events";

function Events() {
  const emptyForm = {
    title: "",
    description: "",
    location: "",
    eventDate: "",
    imageUrl: "",
    category: "",
  };

  const [event, setEvent] = useState(emptyForm);
  const [events, setEvents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(API_URL);
      setEvents(response.data);
    } catch (error) {
      console.error("Error loading events:", error);
      setError("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setEvent(emptyForm);
    setEditingId(null);
    setMessage("");
    setError("");
    setShowForm(false);
  };

  const saveEvent = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!event.title || !event.location || !event.eventDate) {
      setError("Please fill in all required fields.");
      return;
    }

    setSaving(true);

    try {
      const eventData = {
        title: event.title,
        description: event.description || "",
        location: event.location,
        eventDate: event.eventDate,
        imageUrl: event.imageUrl || "",
        category: event.category || "",
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, eventData, getAuthConfig());
        setMessage("Event updated successfully!");
      } else {
        await axios.post(API_URL, eventData, getAuthConfig());
        setMessage("Event created successfully!");
      }

      clearForm();
      await loadEvents();
    } catch (error) {
      console.error("Save event error:", error);
      setError(error.response?.data?.message || "Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  const editEvent = (item) => {
    setEditingId(item.id);
    setEvent({
      title: item.title || "",
      description: item.description || "",
      location: item.location || "",
      eventDate: item.eventDate || "",
      imageUrl: item.imageUrl || "",
      category: item.category || "",
    });
    setShowForm(true);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`, getAuthConfig());
      setMessage("Event deleted successfully!");
      await loadEvents();
    } catch (error) {
      console.error("Delete error:", error);
      setError("Failed to delete event.");
    }
  };

  const formatDate = (dateTime) => {
    if (!dateTime) return "N/A";
    try {
      const date = new Date(dateTime);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateTime;
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Worship: "#4f46e5",
      Conference: "#059669",
      Prayer: "#d97706",
      Outreach: "#0891b2",
      Youth: "#dc2626",
      Community: "#6b7280",
    };
    return colors[category] || "#6b7280";
  };

  return (
    <div style={{ 
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
      minHeight: "100vh",
      padding: "2rem"
    }}>
      <Container fluid>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div>
              <h1 style={{ 
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#1a1a2e",
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.75rem"
              }}>
                <FaChurch style={{ color: "#4f46e5" }} />
                Events
              </h1>
              <p style={{ color: "#6b7280", margin: "0.25rem 0 0 0", fontSize: "1.1rem" }}>
                Manage your church events and activities
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowForm(!showForm);
                if (!showForm) clearForm();
              }}
              style={{
                background: showForm ? "#dc2626" : "#4f46e5",
                color: "white",
                border: "none",
                padding: "0.75rem 1.75rem",
                borderRadius: "50px",
                fontSize: "1rem",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: showForm ? "0 4px 15px rgba(220,38,38,0.3)" : "0 4px 15px rgba(79,70,229,0.3)"
              }}
            >
              {showForm ? <FaTimes /> : <FaPlus />}
              {showForm ? "Close Form" : "New Event"}
            </motion.button>
          </div>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert 
                variant="success" 
                dismissible 
                onClose={() => setMessage("")}
                style={{
                  borderRadius: "12px",
                  border: "none",
                  background: "#d1fae5",
                  color: "#065f46"
                }}
              >
                {message}
              </Alert>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => setError("")}
                style={{
                  borderRadius: "12px",
                  border: "none",
                  background: "#fecaca",
                  color: "#991b1b"
                }}
              >
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, overflow: "hidden" }}
              animate={{ opacity: 1, height: "auto", overflow: "visible" }}
              exit={{ opacity: 0, height: 0, overflow: "hidden" }}
              transition={{ duration: 0.3 }}
            >
              <Card style={{
                border: "none",
                borderRadius: "16px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                marginBottom: "2rem",
                overflow: "hidden"
              }}>
                <Card.Body style={{ padding: "2rem" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.5rem"
                  }}>
                    <span style={{
                      fontSize: "1.5rem"
                    }}>
                      {editingId ? "✏️" : "➕"}
                    </span>
                    <h4 style={{ 
                      margin: 0,
                      fontWeight: "600",
                      color: "#1a1a2e"
                    }}>
                      {editingId ? "Edit Event" : "Create New Event"}
                    </h4>
                  </div>

                  <Form onSubmit={saveEvent}>
                    <Row className="g-3">
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: "500", color: "#374151" }}>
                            Event Title <span style={{ color: "#dc2626" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="title"
                            placeholder="Enter event title"
                            value={event.title}
                            onChange={handleChange}
                            required
                            style={{
                              borderRadius: "10px",
                              border: "2px solid #e5e7eb",
                              padding: "0.75rem 1rem",
                              transition: "border-color 0.2s"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: "500", color: "#374151" }}>
                            Location <span style={{ color: "#dc2626" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="location"
                            placeholder="Enter event location"
                            value={event.location}
                            onChange={handleChange}
                            required
                            style={{
                              borderRadius: "10px",
                              border: "2px solid #e5e7eb",
                              padding: "0.75rem 1rem",
                              transition: "border-color 0.2s"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "#4f46e5"}
                            onBlur={(e) => e.target.style.borderColor = "#e5e7eb"}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: "500", color: "#374151" }}>
                            Date & Time <span style={{ color: "#dc2626" }}>*</span>
                          </Form.Label>
                          <Form.Control
                            type="datetime-local"
                            name="eventDate"
                            value={event.eventDate}
                            onChange={handleChange}
                            required
                            style={{
                              borderRadius: "10px",
                              border: "2px solid #e5e7eb",
                              padding: "0.75rem 1rem"
                            }}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: "500", color: "#374151" }}>
                            Category
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="category"
                            placeholder="e.g., Worship, Conference"
                            value={event.category}
                            onChange={handleChange}
                            style={{
                              borderRadius: "10px",
                              border: "2px solid #e5e7eb",
                              padding: "0.75rem 1rem"
                            }}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: "500", color: "#374151" }}>
                            Description
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder="Enter event description"
                            value={event.description}
                            onChange={handleChange}
                            style={{
                              borderRadius: "10px",
                              border: "2px solid #e5e7eb",
                              padding: "0.75rem 1rem"
                            }}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={12}>
                        <Form.Group>
                          <Form.Label style={{ fontWeight: "500", color: "#374151" }}>
                            Image URL
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={event.imageUrl}
                            onChange={handleChange}
                            style={{
                              borderRadius: "10px",
                              border: "2px solid #e5e7eb",
                              padding: "0.75rem 1rem"
                            }}
                          />
                        </Form.Group>
                      </Col>

                      {event.imageUrl && (
                        <Col md={12}>
                          <div style={{
                            padding: "1rem",
                            background: "#f9fafb",
                            borderRadius: "10px",
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem"
                          }}>
                            <Image
                              src={event.imageUrl}
                              alt="Preview"
                              thumbnail
                              style={{
                                maxHeight: "100px",
                                objectFit: "cover",
                                borderRadius: "8px"
                              }}
                              onError={(e) => (e.target.style.display = "none")}
                            />
                            <span style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                              Image preview
                            </span>
                          </div>
                        </Col>
                      )}

                      <Col md={12} className="mt-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="submit"
                          disabled={saving}
                          style={{
                            background: "#4f46e5",
                            color: "white",
                            border: "none",
                            padding: "0.75rem 2rem",
                            borderRadius: "50px",
                            fontSize: "1rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 4px 15px rgba(79,70,229,0.3)"
                          }}
                        >
                          {saving ? (
                            <>
                              <Spinner animation="border" size="sm" className="me-2" />
                              {editingId ? "Updating..." : "Saving..."}
                            </>
                          ) : (
                            editingId ? "Update Event" : "Create Event"
                          )}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          type="button"
                          onClick={clearForm}
                          style={{
                            background: "transparent",
                            color: "#6b7280",
                            border: "2px solid #e5e7eb",
                            padding: "0.75rem 2rem",
                            borderRadius: "50px",
                            fontSize: "1rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            marginLeft: "0.75rem",
                            transition: "all 0.3s ease"
                          }}
                        >
                          Cancel
                        </motion.button>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events Grid */}
        {loading ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px",
            flexDirection: "column",
            gap: "1rem"
          }}>
            <Spinner animation="border" style={{ color: "#4f46e5", width: "3rem", height: "3rem" }} />
            <p style={{ color: "#6b7280" }}>Loading events...</p>
          </div>
        ) : events.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📅</div>
            <h3 style={{ color: "#1a1a2e", marginBottom: "0.5rem" }}>No Events Yet</h3>
            <p style={{ color: "#6b7280" }}>Click "New Event" to create your first event.</p>
          </motion.div>
        ) : (
          <Row className="g-4">
            {events.map((item, index) => (
              <Col key={item.id} md={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <Card style={{
                    border: "none",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    transition: "box-shadow 0.3s ease",
                    height: "100%"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"}
                  >
                    <div style={{ 
                      height: "200px", 
                      overflow: "hidden",
                      background: "#f3f4f6",
                      position: "relative"
                    }}>
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease"
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                          onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        />
                      ) : (
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "100%",
                          flexDirection: "column",
                          color: "#9ca3af"
                        }}>
                          <FaImage size={48} />
                          <span style={{ marginTop: "0.5rem" }}>No image</span>
                        </div>
                      )}
                      {item.category && (
                        <span style={{
                          position: "absolute",
                          top: "1rem",
                          right: "1rem",
                          background: getCategoryColor(item.category),
                          color: "white",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "50px",
                          fontSize: "0.75rem",
                          fontWeight: "600"
                        }}>
                          {item.category}
                        </span>
                      )}
                    </div>

                    <Card.Body style={{ padding: "1.5rem" }}>
                      <h5 style={{
                        fontWeight: "600",
                        color: "#1a1a2e",
                        marginBottom: "0.75rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}>
                        {item.title}
                      </h5>

                      <div style={{ marginBottom: "0.75rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6b7280", fontSize: "0.875rem" }}>
                          <FaCalendarAlt style={{ color: "#4f46e5", fontSize: "0.875rem" }} />
                          {formatDate(item.eventDate)}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#6b7280", fontSize: "0.875rem" }}>
                          <FaMapMarkerAlt style={{ color: "#4f46e5", fontSize: "0.875rem" }} />
                          {item.location}
                        </div>
                      </div>

                      {item.description && (
                        <p style={{
                          color: "#6b7280",
                          fontSize: "0.875rem",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          marginBottom: "0"
                        }}>
                          {item.description}
                        </p>
                      )}
                    </Card.Body>

                    <div style={{
                      padding: "0.75rem 1.5rem 1.5rem",
                      display: "flex",
                      gap: "0.5rem"
                    }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => editEvent(item)}
                        style={{
                          flex: 1,
                          background: "#4f46e5",
                          color: "white",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <FaEdit size={14} /> Edit
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => deleteEvent(item.id)}
                        style={{
                          flex: 1,
                          background: "#fee2e2",
                          color: "#dc2626",
                          border: "none",
                          padding: "0.5rem 1rem",
                          borderRadius: "8px",
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <FaTrash size={14} /> Delete
                      </motion.button>
                    </div>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Events;