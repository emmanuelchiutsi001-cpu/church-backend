import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { FaChurch, FaMapMarkerAlt, FaUserTie } from 'react-icons/fa';

const ParishDetails = () => {
  const { slug } = useParams(); // Gets the slug from the URL
  const [parish, setParish] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    // Fetch real data from your Spring Boot API
    const fetchParish = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/parishes');
        if (!response.ok) throw new Error('Failed to fetch parishes');
        
        const data = await response.json();
        
        // Find the specific parish that matches the URL slug
        const foundParish = data.find((p) => p.slug === slug);
        
        if (foundParish) {
          setParish(foundParish);
        } else {
          setError("Parish not found");
        }
      } catch (err) {
        console.error(err);
        setError("Could not load parish details.");
      } finally {
        setLoading(false);
      }
    };

    fetchParish();
  }, [slug]);

  // --- LOADING STATE ---
  if (loading) {
    return (
      <Container className="py-5 text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading parish details...</p>
      </Container>
    );
  }

  // --- ERROR / NOT FOUND STATE ---
  if (error || !parish) {
    return (
      <Container className="py-5 text-center my-5">
        <FaChurch size={60} className="text-warning mb-3" />
        <h2>{error || "Parish Not Found"}</h2>
        <p className="text-muted">
          We couldn't find the parish you are looking for. It may have been moved or removed.
        </p>
        <Button as={Link} to="/deaneries" variant="primary" className="mt-3">
          Back to Deaneries
        </Button>
      </Container>
    );
  }

  // --- SUCCESS STATE (Displays API Data) ---
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container>
          {/* Note: Using optional chaining (?.) in case deanery is null in DB */}
          <Badge bg="warning" text="dark" className="mb-3">
            {parish.deanery?.name || "Deanery Info Pending"}
          </Badge>
          <h1 className="display-4 fw-bold">{parish.name}</h1>
          <p className="lead">
            <FaMapMarkerAlt className="me-2" /> {parish.address || "Location not provided"}
          </p>
        </Container>
      </section>

      {/* Main Content */}
      <Container className="py-5">
        <Row>
          <Col lg={8}>
            <h3 className="fw-bold mb-3">About the Parish</h3>
            <p className="text-muted">
              {/* Since your API docs don't show a 'history' field, 
                  we use the description or a default message */}
              {parish.description || "More information about this parish will be available soon."}
            </p>

            <h3 className="fw-bold mb-3 mt-5">Contact Information</h3>
            <p className="text-muted">
              <strong>Phone:</strong> {parish.phone || "N/A"}<br />
              <strong>Email:</strong> {parish.email || "N/A"}
            </p>
          </Col>
          
          <Col lg={4}>
            <Card className="shadow-sm border-0 bg-light mb-4">
              <Card.Body>
                <h5 className="fw-bold mb-4">Parish Leadership</h5>
                
                {/* Note: Your API returns parishPriestId. 
                    To show the actual name, your backend needs to send the priest object 
                    instead of just the ID. For now, we show a placeholder. */}
                <div className="mb-3 d-flex align-items-center">
                  <FaUserTie className="text-warning me-3" size={24} />
                  <div>
                    <small className="text-muted d-block">Parish Priest</small>
                    <strong>{parish.parishPriest?.name || "Coming Soon"}</strong>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ParishDetails;