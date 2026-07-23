import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaArrowRight, FaNewspaper, FaTag } from 'react-icons/fa';

const News = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const news = [
    {
      title: 'Archbishop Announces New Youth Initiative',
      date: 'July 20, 2026',
      author: 'Communications Office',
      category: 'Youth',
      excerpt: 'The Archdiocese launches a new program to empower young people in faith and leadership.',
      image: 'youth-program',
    },
    {
      title: 'Harare Celebrates 73rd Anniversary',
      date: 'July 15, 2026',
      author: 'Archdiocesan Communications',
      category: 'Events',
      excerpt: 'The Archdiocese of Harare celebrates 73 years of faith and service in Zimbabwe.',
      image: 'anniversary',
    },
    {
      title: 'New Priests Ordained for the Archdiocese',
      date: 'July 10, 2026',
      author: 'Vocations Office',
      category: 'Vocations',
      excerpt: 'Five new priests were ordained to serve the Archdiocese of Harare.',
      image: 'ordination',
    },
    {
      title: 'Pilgrimage to Marian Shrine Announced',
      date: 'July 5, 2026',
      author: 'Liturgy Office',
      category: 'Pilgrimage',
      excerpt: 'Annual pilgrimage to the Marian Shrine scheduled for August 2026.',
      image: 'pilgrimage',
    },
    {
      title: 'Social Services Outreach Expands',
      date: 'June 28, 2026',
      author: 'Social Services',
      category: 'Outreach',
      excerpt: 'The Archdiocese expands its food distribution program to reach more communities.',
      image: 'outreach',
    },
    {
      title: 'Catechetical Conference Held in Harare',
      date: 'June 20, 2026',
      author: 'Catechesis Office',
      category: 'Formation',
      excerpt: 'Catechetical leaders gather for formation and training conference.',
      image: 'conference',
    },
  ];

  const categories = ['All', 'Youth', 'Events', 'Vocations', 'Pilgrimage', 'Outreach', 'Formation'];

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">News</Badge>
              <h1 className="display-4 fw-bold">News &amp; Updates</h1>
              <p className="lead text-white-50">
                Stay informed about the latest events and developments in the Archdiocese of Harare.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CATEGORY FILTER */}
      <section className="py-4 bg-light border-bottom">
        <Container>
          <Row>
            <Col>
              <div className="d-flex flex-wrap gap-2">
                {categories.map((cat, idx) => (
                  <Button key={idx} variant={idx === 0 ? 'warning' : 'outline-secondary'} size="sm">
                    {cat}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* NEWS GRID */}
      <section className="py-5">
        <Container>
          <Row>
            {news.map((item, idx) => (
              <Col key={idx} lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <div className="bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                    <FaNewspaper size={60} className="text-secondary" />
                  </div>
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <Badge bg="warning" text="dark">{item.category}</Badge>
                      <small className="text-muted">
                        <FaCalendar className="me-1" /> {item.date}
                      </small>
                    </div>
                    <Card.Title className="fw-bold h5">{item.title}</Card.Title>
                    <Card.Text className="text-muted small">{item.excerpt}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">
                        <FaUser className="me-1" /> {item.author}
                      </small>
                      <Button variant="outline-warning" size="sm">Read More <FaArrowRight className="ms-1" /></Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" size="lg">Load More News</Button>
          </div>
        </Container>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h2 className="display-6 fw-bold">Subscribe to News</h2>
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
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold">Share Your News</h2>
              <p className="text-white-50">Have news to share with the Archdiocese? Contact our communications office.</p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold" as={Link} to="/contact">Submit News</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contact">Contact Us</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default News;