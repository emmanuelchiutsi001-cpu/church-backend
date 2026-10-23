import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaChurch, FaMapMarkerAlt, FaUsers, FaArrowRight } from 'react-icons/fa';

const Deaneries = () => {
  // 1. Setup state for the API data, loading status, and errors
  const [deaneries, setDeaneries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // 2. Fetch the real data from your Spring Boot Backend
    const fetchDeaneries = async () => {
      try {
        // This matches the public GET route from your API docs
        const response = await fetch('http://localhost:8080/api/deaneries');
        
        if (!response.ok) {
          throw new Error('Failed to fetch deaneries');
        }
        
        const data = await response.json();
        setDeaneries(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching deaneries:", err);
        setError("Could not load deaneries at this time. Please try again later.");
        setLoading(false);
      }
    };

    fetchDeaneries();
  }, []);

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
                The Archdiocese of Harare is organized into deaneries, each bringing the Church closer to the community.
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
          
          {/* 3. Handle Loading and Error States */}
          {loading && (
            <div className="text-center py-5">
              <Spinner animation="border" variant="warning" />
              <p className="mt-3 text-muted">Loading deaneries...</p>
            </div>
          )}

          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}

          {/* 4. Display Real Data from API */}
          {!loading && !error && (
            <Row>
              {deaneries.length === 0 ? (
                <Col className="text-center">
                  <p className="text-muted">No deaneries found in the database yet.</p>
                </Col>
              ) : (
                deaneries.map((deanery) => (
                  <Col key={deanery.id} lg={3} md={6} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <div className="text-center">
                          <FaChurch size={40} className="text-warning mb-2" />
                          
                          {/* Used item.name */}
                          <Card.Title className="fw-bold h6">{deanery.name}</Card.Title>
                          
                          {/* Used item.territory which matches the API docs */}
                          <Badge bg="light" text="dark" className="mb-2">
                            <FaMapMarkerAlt className="me-1" /> {deanery.territory || 'Location TBD'}
                          </Badge>
                          
                          {/* Used item.description */}
                          <Card.Text className="text-muted small">
                            {deanery.description || 'No description provided.'}
                          </Card.Text>
                          
                          <div className="d-flex justify-content-around mt-2">
                            <span className="badge bg-secondary">
                              {/* The API returns parishCount on the GET request */}
                              <FaUsers className="me-1" /> {deanery.parishCount || 0} Parishes
                            </span>
                          </div>
                          
                          <div className="mt-3">
                            {/* Added dynamic link to pass the ID to a detail page later */}
                            <Button as={Link} to={`/deaneries/${deanery.id}`} variant="outline-warning" size="sm">
                              View Deanery
                            </Button>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          )}
        </Container>
      </section>

      {/* DEANERY STATS */}
      {/* Note: You might want to make these dynamic in the future by fetching /api/deaneries/{id}/stats */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-3">
              <div className="display-4 fw-bold text-warning">{deaneries.length}</div>
              <div className="text-white-50">Deaneries</div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="display-4 fw-bold text-warning">
                {/* Calculate total parishes from the fetched data */}
                {deaneries.reduce((total, d) => total + (d.parishCount || 0), 0)}
              </div>
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