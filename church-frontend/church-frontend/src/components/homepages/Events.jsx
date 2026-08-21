import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
  FaSearch,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:8080/api/events";

const Events = () => {
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
    "All",
    "Masses",
    "Pilgrimages",
    "Youth",
    "Conferences",
    "Workshops",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvents = async () => {
      try {
        const response = await axios.get(API_URL);
        setEvents(response.data);
      } catch (error) {
        console.log("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-5"
      >
        <h3>Loading Events...</h3>
      </motion.div>
    );
  }

  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.category === filter);

  const featuredEvents = events.filter((event) => event.featured);

  // Get 3 events per slide
  const getVisibleEvents = () => {
    const start = currentSlide * 3;
    const end = start + 3;
    return filteredEvents.slice(start, end);
  };

  const totalSlides = Math.ceil(filteredEvents.length / 3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* HERO SECTION */}
      <section
        className="text-white py-5"
        style={{
          background: "linear-gradient(135deg, #0D47A1, #1565C0, #42A5F5)",
        }}
      >
        <Container className="py-4">
          <Row>
            <Col lg={7}>
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <Badge bg="light" text="primary" className="mb-3 px-3 py-2">
                  <FaStar className="me-1" /> Upcoming Events
                </Badge>
                <h1 className="display-3 fw-bold mb-3">Discover & Connect</h1>
                <p className="lead text-white-50">
                  Stay connected with the life of the Archdiocese through our
                  events and programs.
                </p>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FILTER SECTION */}
      <section className="py-4 bg-white shadow-sm">
        <Container>
          <Row className="align-items-center">
            <Col lg={3} className="mb-2 mb-lg-0">
              <div className="d-flex align-items-center">
                <FaSearch className="text-primary me-2" />
                <span className="fw-bold">Filter Events:</span>
              </div>
            </Col>
            <Col lg={9}>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="d-flex flex-wrap gap-2"
              >
                {categories.map((cat, index) => (
                  <Button
                    key={index}
                    variant={filter === cat ? "primary" : "outline-primary"}
                    size="sm"
                    onClick={() => {
                      setFilter(cat);
                      setCurrentSlide(0);
                    }}
                    className="px-3"
                  >
                    {cat}
                  </Button>
                ))}
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURED EVENTS */}
      {filter === "All" && featuredEvents.length > 0 && (
        <section className="py-5 bg-light">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <Badge bg="primary" className="mb-2 px-3 py-2">
                <FaStar className="me-1" /> Featured
              </Badge>
              <h2 className="display-6 fw-bold">Don't Miss These Events</h2>
            </motion.div>
            <Row>
              {featuredEvents.slice(0, 2).map((event, idx) => (
                <Col key={event.id} lg={6} className="mb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15 }}
                  >
                    <Card className="h-100 shadow border-0">
                      <Card.Body className="p-4">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <Badge bg="primary">{event.category || "General"}</Badge>
                          <Badge bg="warning" text="dark">
                            Featured
                          </Badge>
                        </div>
                        <Card.Title className="fw-bold h4 mb-3">
                          {event.title}
                        </Card.Title>
                        <div className="d-flex flex-wrap gap-3 mb-3">
                          <span className="text-muted small">
                            <FaCalendar className="me-1 text-primary" />
                            {event.eventDate}
                          </span>
                          <span className="text-muted small">
                            <FaClock className="me-1 text-primary" />
                            {event.time || "TBA"}
                          </span>
                          <span className="text-muted small">
                            <FaMapMarkerAlt className="me-1 text-primary" />
                            {event.location}
                          </span>
                        </div>
                        <Card.Text className="text-muted">
                          {event.description || "Church event"}
                        </Card.Text>
                        <Button variant="primary">
                          Register Now
                          <FaArrowRight className="ms-2" />
                        </Button>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* SLIDING EVENTS CARDS */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-5"
          >
            <h2 className="display-6 fw-bold">
              {filter === "All" ? "All Events" : `${filter} Events`}
            </h2>
            <p className="text-muted">
              Swipe through our upcoming events
            </p>
          </motion.div>

          <div className="position-relative">
            {filteredEvents.length > 3 && (
              <>
                <Button
                  variant="outline-primary"
                  className="position-absolute top-50 start-0 translate-middle-y z-index-1"
                  style={{ left: "-20px" }}
                  onClick={prevSlide}
                >
                  <FaChevronLeft />
                </Button>
                <Button
                  variant="outline-primary"
                  className="position-absolute top-50 end-0 translate-middle-y z-index-1"
                  style={{ right: "-20px" }}
                  onClick={nextSlide}
                >
                  <FaChevronRight />
                </Button>
              </>
            )}

            <Row className="justify-content-center">
              <AnimatePresence mode="wait">
                {getVisibleEvents().map((event, idx) => (
                  <Col key={event.id} lg={4} md={6} className="mb-4">
                    <motion.div
                      custom={1}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.3 },
                      }}
                    >
                      <Card className="h-100 shadow-sm border-0 hover-card">
                        <Card.Body className="p-4">
                          <Badge bg="primary" className="mb-2">
                            {event.category || "General"}
                          </Badge>
                          <Card.Title className="fw-bold h5 mb-3">
                            {event.title}
                          </Card.Title>
                          <div className="mb-3">
                            <div className="text-muted small mb-1">
                              <FaCalendar className="me-1 text-primary" />
                              {event.eventDate}
                            </div>
                            <div className="text-muted small mb-1">
                              <FaClock className="me-1 text-primary" />
                              {event.time || "TBA"}
                            </div>
                            <div className="text-muted small">
                              <FaMapMarkerAlt className="me-1 text-primary" />
                              {event.location}
                            </div>
                          </div>
                          <Card.Text className="text-muted small">
                            {event.description || "Church event"}
                          </Card.Text>
                          <Button variant="outline-primary" size="sm">
                            View Details
                          </Button>
                        </Card.Body>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </AnimatePresence>
            </Row>

            {/* Slide indicators */}
            {totalSlides > 1 && (
              <div className="d-flex justify-content-center gap-2 mt-3">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <Button
                    key={idx}
                    variant={currentSlide === idx ? "primary" : "outline-primary"}
                    size="sm"
                    className="rounded-circle"
                    style={{ width: "12px", height: "12px", padding: 0 }}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-4"
          >
            <Button variant="primary" size="lg">
              View Full Calendar
              <FaArrowRight className="ms-2" />
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* SUBMIT EVENT */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <motion.Row
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="justify-content-center text-center"
          >
            <Col lg={6}>
              <h2 className="display-6 fw-bold">Submit an Event</h2>
              <p className="text-white-50">
                Do you have an event you'd like to share with the Archdiocese
                community? Submit it here.
              </p>
              <Button variant="light" as={Link} to="/contact" className="fw-bold">
                Submit Event
                <FaArrowRight className="ms-2" />
              </Button>
            </Col>
          </motion.Row>
        </Container>
      </section>

      {/* CTA SUBSCRIBE */}
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <Container>
          <motion.Row
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="justify-content-center text-center"
          >
            <Col lg={8}>
              <h2 className="display-6 fw-bold text-primary">Stay Updated</h2>
              <p className="text-muted">
                Subscribe to our events calendar and never miss an important
                event.
              </p>
              <div className="mt-4 d-flex flex-column flex-sm-row gap-2 justify-content-center">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter your email"
                  style={{ maxWidth: "350px" }}
                />
                <Button variant="primary" size="lg" className="fw-bold">
                  Subscribe
                </Button>
              </div>
            </Col>
          </motion.Row>
        </Container>
      </section>

      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(13, 71, 161, 0.15) !important;
        }
        .z-index-1 {
          z-index: 1;
        }
      `}</style>
    </motion.div>
  );
};

export default Events;