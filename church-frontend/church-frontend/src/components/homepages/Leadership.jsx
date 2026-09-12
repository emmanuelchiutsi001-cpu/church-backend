import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaUser, FaUsers, FaChurch, FaVideo, FaFileAlt } from "react-icons/fa";

const API_BASE = "http://localhost:8080";
const API_URL = `${API_BASE}/api/leaders`;

const absoluteUrl = (url) =>
  !url ? "" : url.startsWith("http") ? url : `${API_BASE}${url}`;

// Sort newest first — by createdAt, falling back to id
const sortNewestFirst = (list) =>
  [...list].sort((a, b) => {
    const aDate = a.createdAt ? new Date(a.createdAt).getTime() : a.id || 0;
    const bDate = b.createdAt ? new Date(b.createdAt).getTime() : b.id || 0;
    return bDate - aDate;
  });

const Leadership = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_URL);
        setLeaders(sortNewestFirst(Array.isArray(data) ? data : []));
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load leaders.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const photoOf = (item) => {
    if (!item) return "";
    if (item.photoUrl) return absoluteUrl(item.photoUrl);
    if (item.photoFileName) return `${API_URL}/photos/${item.photoFileName}`;
    return "";
  };

  return (
    <div>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)', padding: '2.5rem 0' }}>
        <Container>
          <Badge bg="warning" text="dark" className="mb-2 px-3 py-1"
                 style={{ letterSpacing: '0.5px', fontSize: '0.75rem' }}>
            LEADERSHIP
          </Badge>
          <h1 className="text-white fw-bold mb-2" style={{ fontSize: '2.25rem' }}>Our Shepherds</h1>
          <p className="text-white-50 mb-0" style={{ fontSize: '0.95rem' }}>
            Meet the clergy guiding the Archdiocese of Harare with faith, wisdom, and service.
          </p>
        </Container>
      </section>

      {/* LEADERS GRID */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="fw-bold" style={{ color: "#0D47A1" }}>Archdiocesan Leadership</h2>
              <p className="text-muted mb-0">
                Servant leaders committed to the Gospel and the people of Zimbabwe.
              </p>
            </Col>
          </Row>

          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: "#0D47A1" }} />
              <p className="mt-3 text-muted">Loading leaders…</p>
            </div>
          )}

          {!loading && error && (
            <Alert variant="danger" className="text-center">{error}</Alert>
          )}

          {!loading && !error && leaders.length === 0 && (
            <div className="text-center py-5">
              <FaUser size={56} className="text-secondary mb-3" />
              <h5 className="text-muted">No leaders to display yet</h5>
            </div>
          )}

          {!loading && !error && leaders.length > 0 && (
            <Row>
              {leaders.map((leader) => {
                const src = photoOf(leader);
                return (
                  <Col key={leader.id} lg={4} md={6} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm"
                          style={{ borderRadius: 16, overflow: "hidden" }}>
                      <div style={{
                        height: 260,
                        background: "linear-gradient(135deg, #e3e8f5 0%, #c9d3ec 100%)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        position: "relative",
                      }}>
                        {/* Photo (hidden if no src or load fails) */}
                        {src && (
                          <img
                            src={src}
                            alt={leader.name}
                            style={{
                              width: "100%", height: "100%", objectFit: "cover",
                              position: "absolute", inset: 0,
                            }}
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              const fallback = e.currentTarget.nextSibling;
                              if (fallback) fallback.style.display = "block";
                            }}
                          />
                        )}
                        {/* Fallback icon */}
                        <FaUser
                          size={72}
                          style={{
                            color: "#7a8cbd",
                            display: src ? "none" : "block",
                          }}
                        />
                      </div>
                      <Card.Body className="text-center">
                        <Card.Title className="fw-bold mb-1">{leader.name}</Card.Title>
                        {leader.role && (
                          <Badge bg="warning" text="dark" className="mb-2">{leader.role}</Badge>
                        )}
                        {leader.deanery && (
                          <div className="text-muted small mb-2">
                            <FaChurch style={{ color: "#0D47A1", marginRight: 4 }} /> {leader.deanery}
                          </div>
                        )}
                        {leader.bio && (
                          <Card.Text className="text-muted small">{leader.bio}</Card.Text>
                        )}
                        {leader.sermonTitle && (
                          <div className="text-primary small fw-semibold mt-2">
                            <FaFileAlt style={{ marginRight: 4 }} /> {leader.sermonTitle}
                          </div>
                        )}
                        {leader.videoUrl && (
                          <div className="mt-2">
                            <a href={absoluteUrl(leader.videoUrl)} target="_blank" rel="noopener noreferrer"
                               className="text-decoration-none small fw-semibold"
                               style={{ color: "#0D47A1" }}>
                              <FaVideo style={{ marginRight: 4 }} /> Watch Sermon
                            </a>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </section>

      {/* VOCATIONS */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <Badge bg="warning" text="dark" className="mb-3">Call to Serve</Badge>
              <h2 className="fw-bold">Discern Your Vocation</h2>
              <p className="text-muted fs-5">
                Are you being called to serve God as a priest, religious, or lay leader?
                The Archdiocese of Harare welcomes those who feel called to serve the Church.
              </p>
              <div className="mt-3">
                <Button variant="warning" className="me-3 fw-bold">Learn About Vocations</Button>
                <Button variant="outline-secondary">Contact Vocations Director</Button>
              </div>
            </Col>
            <Col lg={5} className="text-center mt-4 mt-lg-0">
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto"
                   style={{ width: 200, height: 200, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                <FaUsers size={80} className="text-warning" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5" style={{ background: "linear-gradient(135deg, #0D47A1, #1a237e)" }}>
        <Container>
          <Row className="justify-content-center text-center text-white">
            <Col lg={8}>
              <h2 className="fw-bold">Pray for Our Shepherds</h2>
              <p className="text-white-50">
                Support our leadership with your prayers as they guide the Archdiocese.
              </p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold">Submit Prayer Request</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contact">Contact Leadership</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Leadership;