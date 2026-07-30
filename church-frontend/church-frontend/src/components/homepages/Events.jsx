import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendar, FaClock, FaMapMarkerAlt, FaArrowRight, FaSearch } from 'react-icons/fa';

const Events = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Masses', 'Pilgrimages', 'Youth', 'Conferences', 'Workshops'];

  const events = [
    {
      id: 1,
      title: 'Annual Pilgrimage to Marian Shrine',
      category: 'Pilgrimages',
      date: 'August 15, 2026',
      time: '6:00 AM - 6:00 PM',
      location: 'Marian Shrine, Harare',
      description: 'Join the Archdiocese for the annual pilgrimage to the Marian Shrine. A day of prayer, reflection, and community.',
      featured: true,
    },
    {
      id: 2,
      title: 'Youth Leadership Conference',
      category: 'Youth',
      date: 'September 5-7, 2026',
      time: '9:00 AM - 5:00 PM',
      location: 'Archdiocesan Retreat Center',
      description: 'A three-day conference for young leaders in the Archdiocese. Workshops, talks, and team-building activities.',
      featured: true,
    },
    {
      id: 3,
      title: 'Ordination Mass',
      category: 'Masses',
      date: 'October 12, 2026',
      time: '10:00 AM',
      location: 'Cathedral of the Sacred Heart',
      description: 'Ordination of new priests for the Archdiocese of Harare. All are welcome to attend.',
      featured: false,
    },
    {
      id: 4,
      title: 'Catechetical Workshop',
      category: 'Workshops',
      date: 'October 20, 2026',
      time: '8:30 AM - 4:00 PM',
      location: 'Pastoral Center',
      description: 'Formation workshop for catechists and religious educators. Focus on new catechetical methods.',
      featured: false,
    },
    {
      id: 5,
      title: 'Family Day Celebration',
      category: 'Conferences',
      date: 'November 1, 2026',
      time: '10:00 AM - 5:00 PM',
      location: 'Archdiocesan Grounds',
      description: 'A day of celebration for families in the Archdiocese. Games, food, music, and family activities.',
      featured: false,
    },
    {
      id: 6,
      title: 'Advent Retreat',
      category: 'Conferences',
      date: 'December 7-9, 2026',
      time: '6:00 PM - 8:00 PM',
      location: 'Parish Halls (Various)',
      description: 'Advent retreats at various parishes across the Archdiocese. Prepare for the coming of Christ.',
      featured: false,
    },
  ];

  const filteredEvents = filter === 'All' ? events : events.filter(e => e.category === filter);

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Events</Badge>
              <h1 className="display-4 fw-bold">Upcoming Events</h1>
              <p className="lead text-white-50">
                Stay connected with the life of the Archdiocese through our events and programs.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CATEGORY FILTER */}
      <section className="py-4 bg-light border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col lg={3} className="mb-2 mb-lg-0">
              <div className="d-flex align-items-center">
                <FaSearch className="text-muted me-2" />
                <span className="fw-bold">Filter Events:</span>
              </div>
            </Col>
            <Col lg={9}>
              <div className="d-flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <Button 
                    key={idx} 
                    variant={filter === cat ? 'warning' : 'outline-secondary'} 
                    size="sm"
                    onClick={() => setFilter(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURED EVENT */}
      {filter === 'All' && (
        <section className="py-5">
          <Container>
            <Row className="mb-4">
              <Col>
                <Badge bg="warning" text="dark" className="mb-2">Featured Event</Badge>
                <h2 className="display-6 fw-bold">Don't Miss These</h2>
              </Col>
            </Row>
            <Row>
              {events.filter(e => e.featured).map((event) => (
                <Col key={event.id} lg={6} className="mb-4">
                  <Card className="h-100 shadow-sm border-warning border-2">
                    <Card.Body className="p-4">
                      <Badge bg="warning" text="dark" className="mb-2">{event.category}</Badge>
                      <Card.Title className="fw-bold h4">{event.title}</Card.Title>
                      <div className="d-flex flex-wrap gap-3 mb-3">
                        <span className="text-muted small"><FaCalendar className="me-1" /> {event.date}</span>
                        <span className="text-muted small"><FaClock className="me-1" /> {event.time}</span>
                        <span className="text-muted small"><FaMapMarkerAlt className="me-1" /> {event.location}</span>
                      </div>
                      <Card.Text className="text-muted">{event.description}</Card.Text>
                      <Button variant="warning">Register Now <FaArrowRight className="ms-2" /></Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* EVENT CARDS */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">
                {filter === 'All' ? 'All Events' : `${filter} Events`}
              </h2>
              <p className="text-muted">Join us for these upcoming events in the Archdiocese.</p>
            </Col>
          </Row>
          <Row>
            {filteredEvents.map((event) => (
              <Col key={event.id} lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Badge bg="warning" text="dark" className="mb-2">{event.category}</Badge>
                    <Card.Title className="fw-bold h5">{event.title}</Card.Title>
                    <div className="mb-3">
                      <div className="text-muted small"><FaCalendar className="me-1" /> {event.date}</div>
                      <div className="text-muted small"><FaClock className="me-1" /> {event.time}</div>
                      <div className="text-muted small"><FaMapMarkerAlt className="me-1" /> {event.location}</div>
                    </div>
                    <Card.Text className="text-muted small">{event.description}</Card.Text>
                    <Button variant="outline-warning" size="sm">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" size="lg">View Full Calendar</Button>
          </div>
        </Container>
      </section>

      {/* SUBMIT EVENT */}
      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h2 className="display-6 fw-bold">Submit an Event</h2>
              <p className="text-muted">
                Do you have an event you'd like to share with the Archdiocese community? Submit it here.
              </p>
              <Button variant="warning" as={Link} to="/contact">Submit Event <FaArrowRight className="ms-2" /></Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold">Stay Updated</h2>
              <p className="text-white-50">Subscribe to our events calendar and never miss an important event.</p>
              <div className="mt-4 d-flex flex-column flex-sm-row gap-2 justify-content-center">
                <input type="email" className="form-control" placeholder="Enter your email" style={{ maxWidth: '300px' }} />
                <Button variant="warning" className="fw-bold">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Events;