import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  FaCalendar, FaUser, FaArrowRight, FaNewspaper,
  FaFilePdf, FaFileWord, FaFileAlt, FaDownload, FaClock,
  FaSortAmountDown, FaSearch,
} from 'react-icons/fa';

const API_URL = "http://localhost:8080/api/news";

const SORT_OPTIONS = {
  newest:   { label: "Newest first",  fn: (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt) },
  oldest:   { label: "Oldest first",  fn: (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt) },
  titleAZ:  { label: "Title (A–Z)",   fn: (a, b) => (a.title  || "").localeCompare(b.title  || "") },
  titleZA:  { label: "Title (Z–A)",   fn: (a, b) => (b.title  || "").localeCompare(a.title  || "") },
  authorAZ: { label: "Author (A–Z)",  fn: (a, b) => (a.author || "").localeCompare(b.author || "") },
};

// Turn "/api/news/images/xyz.jpg" (or a raw filename) into a full URL
const imageSrc = (imageUrl) => {
  if (!imageUrl) return "";
  // If backend returns a full URL, use it as-is
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  // If it starts with /api/news/images/, strip the prefix
  const name = imageUrl.replace(/^.*\/images\//, "").replace(/^\//, "");
  return `${API_URL}/images/${name}`;
};

// Turn "/api/news/files/xyz.pdf" (or a raw filename) into a full URL
const documentSrc = (documentUrl) => {
  if (!documentUrl) return "";
  if (/^https?:\/\//i.test(documentUrl)) return documentUrl;
  const name = documentUrl.replace(/^.*\/files\//, "").replace(/^\//, "");
  return `${API_URL}/files/${name}`;
};

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortKey, setSortKey] = useState("newest");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadNews = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(API_URL);
        setNews(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load news.");
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  // ── Categories from data ────────────────────────────────
  const categories = useMemo(() => {
    const set = new Set(news.map((n) => n.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [news]);

  // ── Filter → search → sort ──────────────────────────────
  const visibleNews = useMemo(() => {
    let list = activeCategory === "All"
      ? [...news]
      : news.filter((n) => n.category === activeCategory);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((n) =>
        (n.title || "").toLowerCase().includes(q) ||
        (n.content || "").toLowerCase().includes(q) ||
        (n.author || "").toLowerCase().includes(q)
      );
    }

    list.sort(SORT_OPTIONS[sortKey].fn);
    return list;
  }, [news, activeCategory, sortKey, search]);

  const featured = visibleNews[0];
  const rest = visibleNews.slice(1);

  // ── Helpers ─────────────────────────────────────────────
  const formatDate = (iso) => {
    if (!iso) return "No date";
    try {
      return new Date(iso).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      });
    } catch { return iso; }
  };

  const relativeDate = (iso) => {
    if (!iso) return "";
    const diff = Date.now() - new Date(iso).getTime();
    const day = 1000 * 60 * 60 * 24;
    if (diff < day) return "Today";
    if (diff < 2 * day) return "Yesterday";
    if (diff < 7 * day) return `${Math.floor(diff / day)} days ago`;
    return "";
  };

  const excerpt = (text, max = 160) => {
    if (!text) return "";
    if (text.length <= max) return text;
    const cut = text.slice(0, max);
    const lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + "…";
  };

  const fileIcon = (type) => {
    const t = (type || "").toLowerCase();
    if (t === "pdf") return <FaFilePdf style={{ color: "#dc2626" }} />;
    if (t === "doc" || t === "docx") return <FaFileWord style={{ color: "#2563eb" }} />;
    return <FaFileAlt />;
  };

  const lastUpdated = news[0]?.publishedAt ? relativeDate(news[0].publishedAt) : "";

  // ────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── COMPACT HERO ────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0D47A1 0%, #1a237e 100%)',
          padding: '2.5rem 0',
        }}
      >
        <Container>
          <Row className="align-items-center g-3">
            <Col lg={8}>
              <Badge
                bg="warning"
                text="dark"
                className="mb-2 px-3 py-1"
                style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
              >
                NEWS
              </Badge>
              <h1
                className="text-white fw-bold mb-2"
                style={{ fontSize: '2.25rem', lineHeight: 1.15 }}
              >
                News &amp; Updates
              </h1>
              <p className="text-white-50 mb-0" style={{ fontSize: '0.95rem' }}>
                Latest events and developments in the Archdiocese of Harare.
              </p>
            </Col>
            <Col lg={4} className="text-lg-end">
              {!loading && news.length > 0 && (
                <div className="text-white-50 small">
                  <div><FaClock className="me-1" /> Updated {lastUpdated || "recently"}</div>
                  <div className="mt-1">
                    {news.length} article{news.length !== 1 ? "s" : ""} published
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── FILTER + SORT + SEARCH BAR ──────────────────── */}
      <section className="bg-white border-bottom" style={{ padding: '0.75rem 0' }}>
        <Container>
          <Row className="g-2 align-items-center">
            {/* Categories */}
            <Col lg={6} md={12}>
              <div
                className="d-flex gap-2"
                style={{ overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'thin' }}
              >
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    size="sm"
                    variant={cat === activeCategory ? 'warning' : 'outline-secondary'}
                    className="fw-semibold text-nowrap"
                    style={{ flexShrink: 0 }}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </Col>

            {/* Search */}
            <Col lg={3} md={6}>
              <div className="position-relative">
                <FaSearch
                  className="position-absolute text-muted"
                  style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '0.8rem' }}
                />
                <Form.Control
                  size="sm"
                  placeholder="Search news…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ paddingLeft: '2rem' }}
                />
              </div>
            </Col>

            {/* Sort */}
            <Col lg={3} md={6}>
              <div className="d-flex align-items-center gap-2">
                <FaSortAmountDown className="text-muted" style={{ fontSize: '0.85rem' }} />
                <Form.Select size="sm" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
                  {Object.entries(SORT_OPTIONS).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </Form.Select>
              </div>
            </Col>
          </Row>

          {!loading && !error && (
            <div className="text-muted small mt-2">
              Showing <strong>{visibleNews.length}</strong>
              {activeCategory !== "All" && <> in <strong>{activeCategory}</strong></>}
              {search.trim() && <> matching “<strong>{search.trim()}</strong>”</>}
            </div>
          )}
        </Container>
      </section>

      {/* ── MAIN ────────────────────────────────────────── */}
      <section className="py-4">
        <Container>
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" style={{ color: "#0D47A1" }} />
              <p className="mt-3 text-muted">Loading news…</p>
            </div>
          )}

          {!loading && error && (
            <Alert variant="danger" className="text-center">{error}</Alert>
          )}

          {!loading && !error && visibleNews.length === 0 && (
            <div className="text-center py-5">
              <FaNewspaper size={56} className="text-secondary mb-3" />
              <h5 className="text-muted">No articles found</h5>
              <p className="text-muted small">Try a different category or clear the search.</p>
            </div>
          )}

          {!loading && !error && featured && (
            <>
              {/* ── FEATURED ───────────────────────────── */}
              <Card className="mb-4 border-0 shadow-sm overflow-hidden">
                <Row className="g-0">
                  <Col
                    md={5}
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      background: featured.imageUrl
                        ? `url(${imageSrc(featured.imageUrl)}) center/cover`
                        : 'linear-gradient(135deg, #0D47A1 0%, #1a237e 100%)',
                      minHeight: '220px',
                    }}
                  >
                    {!featured.imageUrl && (
                      <FaNewspaper size={80} style={{ color: 'rgba(255,255,255,0.35)' }} />
                    )}
                  </Col>
                  <Col md={7}>
                    <Card.Body className="p-4">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <Badge bg="warning" text="dark">Featured</Badge>
                        <Badge bg="light" text="dark" className="border">
                          {featured.category ||
                            (featured.fileType ? featured.fileType.toUpperCase() : "Article")}
                        </Badge>
                      </div>
                      <h3 className="fw-bold mb-2" style={{ color: "#0D47A1" }}>
                        {featured.title}
                      </h3>
                      <p className="text-muted mb-3" style={{ fontSize: '0.95rem' }}>
                        {excerpt(featured.content, 220)}
                      </p>
                      <div className="d-flex flex-wrap gap-3 text-muted small mb-3">
                        <span><FaUser className="me-1" /> {featured.author || "Church Admin"}</span>
                        <span><FaCalendar className="me-1" /> {formatDate(featured.publishedAt)}</span>
                        {relativeDate(featured.publishedAt) && (
                          <span className="text-warning fw-semibold">
                            {relativeDate(featured.publishedAt)}
                          </span>
                        )}
                      </div>
                      {featured.documentUrl && (
                        <div className="mb-3">
                          <a
                            href={documentSrc(featured.documentUrl)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none small fw-semibold"
                            style={{ color: "#0D47A1" }}
                          >
                            {fileIcon(featured.fileType)}
                            <span className="ms-1">
                              Download {featured.documentName || "attachment"}
                            </span>
                          </a>
                        </div>
                      )}
                      <Button variant="warning" className="fw-semibold px-4">
                        Read Full Story <FaArrowRight className="ms-2" />
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>

              {/* ── GRID ───────────────────────────────── */}
              {rest.length > 0 && (
                <>
                  <h5 className="fw-bold mb-3" style={{ color: "#0D47A1" }}>
                    More News
                  </h5>
                  <Row>
                    {rest.map((item) => (
                      <Col key={item.id} lg={4} md={6} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm news-card">
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              height: '140px',
                              background: item.imageUrl
                                ? `url(${imageSrc(item.imageUrl)}) center/cover`
                                : 'linear-gradient(135deg, #e3e8f5 0%, #c9d3ec 100%)',
                            }}
                          >
                            {!item.imageUrl && (
                              <FaNewspaper size={42} style={{ color: '#7a8cbd' }} />
                            )}
                          </div>
                          <Card.Body className="d-flex flex-column">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                              <Badge bg="warning" text="dark" className="fw-semibold">
                                {item.category ||
                                  (item.fileType ? item.fileType.toUpperCase() : "Article")}
                              </Badge>
                              <small className="text-muted">
                                <FaCalendar className="me-1" /> {formatDate(item.publishedAt)}
                              </small>
                            </div>
                            <Card.Title className="fw-bold h6 mb-2" style={{ color: "#0D47A1" }}>
                              {item.title}
                            </Card.Title>
                            <Card.Text className="text-muted small flex-grow-1">
                              {excerpt(item.content, 140)}
                            </Card.Text>

                            {item.documentUrl && (
                              <a
                                href={documentSrc(item.documentUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-decoration-none small fw-semibold mb-2"
                                style={{ color: "#0D47A1" }}
                              >
                                {fileIcon(item.fileType)}
                                <span className="ms-1">{item.documentName || "Attachment"}</span>
                                <FaDownload className="ms-1" size={11} />
                              </a>
                            )}

                            <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                              <small className="text-muted">
                                <FaUser className="me-1" /> {item.author || "Church Admin"}
                              </small>
                              <Button
                                variant="link"
                                size="sm"
                                className="p-0 text-warning fw-semibold text-decoration-none"
                              >
                                Read More <FaArrowRight className="ms-1" size={11} />
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
            </>
          )}
        </Container>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h3 className="fw-bold">Subscribe to News</h3>
              <p className="text-muted">Get the latest news and updates delivered to your inbox.</p>
              <div className="d-flex flex-column flex-sm-row gap-2">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <Button variant="warning" className="fw-bold">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5" style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #1a237e 100%)' }}>
        <Container>
          <Row className="justify-content-center text-center text-white">
            <Col lg={8}>
              <h3 className="fw-bold">Share Your News</h3>
              <p className="text-white-50">
                Have news to share with the Archdiocese? Contact our communications office.
              </p>
              <div className="mt-3">
                <Button variant="warning" className="me-3 fw-bold" as={Link} to="/contact">
                  Submit News
                </Button>
                <Button variant="outline-light" as={Link} to="/contact">
                  Contact Us
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default News;