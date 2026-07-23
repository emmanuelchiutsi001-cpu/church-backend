import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUser, FaUsers, FaEnvelope, FaPhone, FaArrowRight } from 'react-icons/fa';

const Leadership = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const leadership = [
    {
      name: 'Most Rev. Robert Ndlovu',
      title: 'Archbishop of Harare',
      bio: 'Appointed Archbishop in 2004, leading the Archdiocese with wisdom and pastoral care.',
      email: 'archbishop@hararearchdiocese.org',
      phone: '+263 4 123456',
    },
    {
      name: 'Rev. Fr. John Makoni',
      title: 'Vicar General',
      bio: 'Oversees the day-to-day administration of the Archdiocese and supports the Archbishop.',
      email: 'vicar@hararearchdiocese.org',
      phone: '+263 4 123457',
    },
    {
      name: 'Rev. Fr. Peter Chigora',
      title: 'Chancellor',
      bio: 'Manages the legal and administrative affairs of the Archdiocese.',
      email: 'chancellor@hararearchdiocese.org',
      phone: '+263 4 123458',
    },
    {
      name: 'Rev. Fr. Michael Banda',
      title: 'Episcopal Vicar for Education',
      bio: 'Leads the education ministry, overseeing schools and catechetical programs.',
      email: 'education@hararearchdiocese.org',
      phone: '+263 4 123459',
    },
    {
      name: 'Rev. Fr. Thomas Moyo',
      title: 'Episcopal Vicar for Social Services',
      bio: 'Coordinates the Archdiocese\'s social outreach and charitable works.',
      email: 'social@hararearchdiocese.org',
      phone: '+263 4 123460',
    },
    {
      name: 'Rev. Fr. David Nyathi',
      title: 'Vicar for Clergy',
      bio: 'Supports the spiritual and professional development of priests in the Archdiocese.',
      email: 'clergy@hararearchdiocese.org',
      phone: '+263 4 123461',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Leadership</Badge>
              <h1 className="display-4 fw-bold">Our Shepherds</h1>
              <p className="lead text-white-50">
                Meet the dedicated clergy guiding the Archdiocese of Harare with faith, wisdom, and service.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* LEADERSHIP CARDS */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">Archdiocesan Leadership</h2>
              <p className="text-muted">Servant leaders committed to the Gospel and the people of Zimbabwe.</p>
            </Col>
          </Row>
          <Row>
            {leadership.map((leader, idx) => (
              <Col key={idx} lg={4} md={6} className="mb-4">
                <Card className="h-100 shadow-sm">
                  <Card.Body className="text-center">
                    <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                      <FaUser size={50} className="text-secondary" />
                    </div>
                    <Card.Title className="fw-bold mt-3">{leader.name}</Card.Title>
                    <Badge bg="warning" text="dark" className="mb-2">{leader.title}</Badge>
                    <Card.Text className="text-muted small">{leader.bio}</Card.Text>
                    <div className="d-flex justify-content-center gap-3 mt-2">
                      <FaEnvelope className="text-warning" title={leader.email} />
                      <FaPhone className="text-warning" title={leader.phone} />
                    </div>
                    <div className="mt-3">
                      <Button variant="outline-warning" size="sm">View Profile</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* VOCATIONS */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <Badge bg="warning" text="dark" className="mb-3">Call to Serve</Badge>
              <h2 className="display-6 fw-bold">Discern Your Vocation</h2>
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
              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '200px', height: '200px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                <FaUsers size={80} className="text-warning" />
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
              <h2 className="display-6 fw-bold">Pray for Our Shepherds</h2>
              <p className="text-white-50">Support our leadership with your prayers as they guide the Archdiocese.</p>
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