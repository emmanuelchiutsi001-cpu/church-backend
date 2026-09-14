import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
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

const imageSrc = (imageUrl) => {
  if (!imageUrl) return "";
  if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
  const name = imageUrl.replace(/^.*\/images\//, "").replace(/^\//, "");
  return `${API_URL}/images/${name}`;
};

const documentSrc = (documentUrl) => {
  if (!documentUrl) return "";
  if (/^https?:\/\//i.test(documentUrl)) return documentUrl;
  const name = documentUrl.replace(/^.*\/files\//, "").replace(/^\//, "");
  return `${API_URL}/files/${name}`;
};

// ── Animation variants ────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } },
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

  const categories = useMemo(() => {
    const set = new Set(news.map((n) => n.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [news]);

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

  return (
    <div>
      {/* ── COMPACT HERO ────────────────────────────────── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0D47A1 0%, #1a237e 100%)',
          padding: '2.5rem 0',
          overflow: 'hidden',
        }}
      >
        <Container>
          <Row className="align-items-center g-3">
            <Col lg={8}>
              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <motion.div variants={fadeUp}>
                  <Badge
                    bg="warning"
                    text="dark"
                    className="mb-2 px-3 py-1"
                    style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}
                  >
                    NEWS
                  </Badge>
                </motion.div>
                <motion.h1
                  variants={fadeUp}
                  className="text-white fw-bold mb-2"
                  style={{ fontSize: '2.25rem', lineHeight: 1.15 }}
                >
                  News &amp; Updates
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  className="text-white-50 mb-0"
                  style={{ fontSize: '0.95rem' }}
                >
                  Latest events and developments in the Archdiocese of Harare.
                </motion.p>
              </motion.div>
            </Col>
            <Col lg={4} className="text-lg-end">
              {!loading && news.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-white-50 small"
                >
                  <div><FaClock className="me-1" /> Updated {lastUpdated || "recently"}</div>
                  <div className="mt-1">
                    {news.length} article{news.length !== 1 ? "s" : ""} published
                  </div>
                </motion.div>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── FILTER + SORT + SEARCH BAR ──────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="bg-white border-bottom"
        style={{ padding: '0.75rem 0' }}
      >
        <Container>
          <Row className="g-2 align-items-center">
            <Col lg={6} md={12}>
              <div
                className="d-flex gap-2"
                style={{ overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'thin' }}
              >
                {categories.map((cat) => (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="sm"
                      variant={cat === activeCategory ? 'warning' : 'outline-secondary'}
                      className="fw-semibold text-nowrap"
                      style={{ flexShrink: 0 }}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Col>

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
      </motion.section>

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
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-5"
            >
              <FaNewspaper size={56} className="text-secondary mb-3" />
              <h5 className="text-muted">No articles found</h5>
              <p className="text-muted small">Try a different category or clear the search.</p>
            </motion.div>
          )}

          {!loading && !error && featured && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${sortKey}-${search}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* ── FEATURED ───────────────────────────── */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
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
                          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-block' }}>
                            <Button variant="warning" className="fw-semibold px-4">
                              Read Full Story <FaArrowRight className="ms-2" />
                            </Button>
                          </motion.div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </motion.div>

                {/* ── GRID ───────────────────────────────── */}
                {rest.length > 0 && (
                  <>
                    <motion.h5
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="fw-bold mb-3"
                      style={{ color: "#0D47A1" }}
                    >
                      More News
                    </motion.h5>
                    <Row>
                      <AnimatePresence mode="popLayout">
                        {rest.map((item, i) => (
                          <Col key={item.id} lg={4} md={6} className="mb-4">
                            <motion.div
                              layout
                              variants={cardVariant}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              transition={{ delay: Math.min(i * 0.06, 0.4) }}
                              whileHover={{ y: -6 }}
                              style={{ height: '100%' }}
                            >
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
                            </motion.div>
                          </Col>
                        ))}
                      </AnimatePresence>
                    </Row>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </Container>
      </section>

      {/* SUBSCRIBE */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="py-5 bg-light"
      >
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h3 className="fw-bold">Subscribe to News</h3>
              <p className="text-muted">Get the latest news and updates delivered to your inbox.</p>
              <div className="d-flex flex-column flex-sm-row gap-2">
                <input type="email" className="form-control" placeholder="Enter your email" />
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                  <Button variant="warning" className="fw-bold">Subscribe</Button>
                </motion.div>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="py-5"
        style={{ background: 'linear-gradient(135deg, #0D47A1 0%, #1a237e 100%)' }}
      >
        <Container>
          <Row className="justify-content-center text-center text-white">
            <Col lg={8}>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="fw-bold"
              >
                Share Your News
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white-50"
              >
                Have news to share with the Archdiocese? Contact our communications office.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-3"
              >
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
                  <Button variant="warning" className="me-3 fw-bold" as={Link} to="/contact">
                    Submit News
                  </Button>
                </motion.span>
                <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ display: 'inline-block' }}>
                  <Button variant="outline-light" as={Link} to="/contact">
                    Contact Us
                  </Button>
                </motion.span>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </motion.section>
    </div>
  );
};

export default News;