import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChurch, FaMapMarkerAlt, FaUsers, FaPhone, FaEnvelope, FaArrowRight } from 'react-icons/fa';

const Deaneries = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const deaneries = [
    {
      name: 'Harare Central',
      location: 'Harare CBD',
      parishes: '12',
      description: 'The heart of the Archdiocese, serving the capital city and its surrounding areas.',
    },
    {
      name: 'Chitungwiza',
      location: 'Chitungwiza',
      parishes: '10',
      description: 'Serving the growing communities in the Chitungwiza area with vibrant parish life.',
    },
    {
      name: 'Epworth',
      location: 'Epworth',
      parishes: '8',
      description: 'Ministering to the people of Epworth and the surrounding townships.',
    },
    {
      name: 'Marlborough',
      location: 'Marlborough, Harare',
      parishes: '9',
      description: 'Serving the northern suburbs of Harare with a focus on family and youth.',
    },
    {
      name: 'Highfields',
      location: 'Highfields, Harare',
      parishes: '7',
      description: 'A vibrant deanery serving the Highfields and surrounding communities.',
    },
    {
      name: 'Mbare',
      location: 'Mbare, Harare',
      parishes: '8',
      description: 'Rooted in the community, serving one of Harare\'s oldest suburbs.',
    },
    {
      name: 'Kambuzuma',
      location: 'Kambuzuma, Harare',
      parishes: '6',
      description: 'Serving the western suburbs of Harare with dedication and faith.',
    },
    {
      name: 'Glen View',
      location: 'Glen View, Harare',
      parishes: '7',
      description: 'Ministering to the people of Glen View and surrounding areas.',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Deaneries</Badge>
              <h1 className="display-4 fw-bold">Our Deaneries</h1>
              <p className="lead text-white-50">
                The Archdiocese of Harare is organized into 15 deaneries, each bringing the Church closer to the community.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MAP / OVERVIEW */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">Deanery Map</h2>
              <p className="text-muted">Explore the deaneries of the Archdiocese of Harare.</p>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '300px', border: '2px dashed #dee2e6' }}>
                <div className="text-center">
                  <FaMapMarkerAlt size={60} className="text-warning mb-2" />
                  <p className="text-muted">Interactive Deanery Map</p>
                  <p className="text-muted small">(Coming soon with Google Maps integration)</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* DEANERY CARDS */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">Explore Deaneries</h2>
              <p className="text-muted">Each deanery serves multiple parishes and communities across Zimbabwe.</p>
            </Col>
          </Row>
          <Row>
            {deaneries.map((deanery, idx) => (
              <Col key={idx} lg={3} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <div className="text-center">
                      <FaChurch size={40} className="text-warning mb-2" />
                      <Card.Title className="fw-bold h6">{deanery.name}</Card.Title>
                      <Badge bg="light" text="dark" className="mb-2">
                        <FaMapMarkerAlt className="me-1" /> {deanery.location}
                      </Badge>
                      <Card.Text className="text-muted small">{deanery.description}</Card.Text>
                      <div className="d-flex justify-content-around mt-2">
                        <span className="badge bg-secondary">
                          <FaUsers className="me-1" /> {deanery.parishes} Parishes
                        </span>
                      </div>
                      <div className="mt-3">
                        <Button variant="outline-warning" size="sm">View Deanery</Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* DEANERY STATS */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-3">
              <div className="display-4 fw-bold text-warning">15</div>
              <div className="text-white-50">Deaneries</div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="display-4 fw-bold text-warning">120+</div>
              <div className="text-white-50">Parishes</div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="display-4 fw-bold text-warning">85</div>
              <div className="text-white-50">Priests</div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold">Find Your Parish</h2>
              <p className="text-white-50">Discover which deanery and parish you belong to in the Archdiocese.</p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold">Find a Parish</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contact">Contact Deanery</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Deaneries;