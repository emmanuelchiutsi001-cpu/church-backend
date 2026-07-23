import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaHandsHelping, FaHeart, FaUsers, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const Join = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ways = [
    {
      icon: <FaHeart />,
      title: 'Become a Member',
      desc: 'Register as a parishioner and be part of our faith community.',
    },
    {
      icon: <FaHandsHelping />,
      title: 'Volunteer',
      desc: 'Offer your time and talents to serve the Church and community.',
    },
    {
      icon: <FaUsers />,
      title: 'Join a Ministry',
      desc: 'Find your place in one of our many ministries and outreach programs.',
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Join Us</Badge>
              <h1 className="display-4 fw-bold">Become Part of Our Community</h1>
              <p className="lead text-white-50">
                We welcome everyone to join the Archdiocese of Harare family. 
                Find your place and serve with us.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* WAYS TO JOIN */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">How to Get Involved</h2>
              <p className="text-muted">There are many ways to be part of the Archdiocese community.</p>
            </Col>
          </Row>
          <Row className="g-4">
            {ways.map((way, idx) => (
              <Col key={idx} lg={4} md={6}>
                <Card className="h-100 text-center shadow-sm">
                  <Card.Body className="p-4">
                    <div className="text-warning" style={{ fontSize: '3rem' }}>
                      {way.icon}
                    </div>
                    <Card.Title className="fw-bold mt-3">{way.title}</Card.Title>
                    <Card.Text className="text-muted">{way.desc}</Card.Text>
                    <Button variant="outline-warning" size="sm">Learn More</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* REGISTRATION FORM */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-3">Join the Archdiocese</h3>
                  <p className="text-muted">Fill in the form below to register or get more information.</p>
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>First Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter first name" />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Last Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter last name" />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="tel" placeholder="Enter phone number" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Parish</Form.Label>
                      <Form.Select>
                        <option>Select your parish</option>
                        <option>Cathedral of the Sacred Heart</option>
                        <option>St. Gerard (Borrowdale)</option>
                        <option>Immaculate Conception (Highlands)</option>
                        <option>Other</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>How would you like to get involved?</Form.Label>
                      <Form.Select>
                        <option>Select an option</option>
                        <option>Become a parishioner</option>
                        <option>Volunteer</option>
                        <option>Join a ministry</option>
                        <option>Learn more about the faith</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message (Optional)</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Tell us more about yourself..." />
                    </Form.Group>
                    <Button type="submit" variant="warning" size="lg" className="w-100 fw-bold">
                      Submit <FaArrowRight className="ms-2" />
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* BENEFITS */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">What You Get</h2>
              <p className="text-muted">Being part of the Archdiocese community comes with many blessings.</p>
            </Col>
          </Row>
          <Row className="g-4">
            {[
              'Spiritual growth and formation',
              'Community and fellowship',
              'Opportunities to serve',
              'Sacramental preparation',
              'Youth and family programs',
              'Social and charitable works',
            ].map((item, idx) => (
              <Col key={idx} lg={4} md={6}>
                <div className="d-flex align-items-center p-3 bg-white rounded shadow-sm">
                  <FaCheckCircle className="text-warning me-2" />
                  <span>{item}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold">We Welcome You</h2>
              <p className="text-white-50">Come as you are. There's a place for you in the Archdiocese of Harare.</p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold">Visit a Parish</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contact">Contact Us</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Join;