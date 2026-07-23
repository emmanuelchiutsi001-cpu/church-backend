import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      title: 'Location',
      details: 'Archdiocese of Harare, 123 Main Street, Harare, Zimbabwe',
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      details: '+263 4 123456',
    },
    {
      icon: <FaEnvelope />,
      title: 'Email',
      details: 'info@hararearchdiocese.org',
    },
    {
      icon: <FaClock />,
      title: 'Office Hours',
      details: 'Monday - Friday: 8:00 AM - 4:30 PM',
    },
  ];

  const departments = [
    { name: 'Communications', email: 'comm@hararearchdiocese.org', phone: '+263 4 123462' },
    { name: 'Youth Office', email: 'youth@hararearchdiocese.org', phone: '+263 4 123463' },
    { name: 'Education Office', email: 'education@hararearchdiocese.org', phone: '+263 4 123464' },
    { name: 'Social Services', email: 'social@hararearchdiocese.org', phone: '+263 4 123465' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Contact</Badge>
              <h1 className="display-4 fw-bold">Get in Touch</h1>
              <p className="lead text-white-50">
                Reach out to us for inquiries, prayer requests, or to learn more about the Archdiocese.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CONTACT INFO & FORM */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {/* Contact Info */}
            <Col lg={5}>
              <h2 className="display-6 fw-bold mb-4">Contact Information</h2>
              {contactInfo.map((info, idx) => (
                <div key={idx} className="d-flex align-items-start mb-4">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '45px', height: '45px', minWidth: '45px' }}>
                    <span className="text-dark">{info.icon}</span>
                  </div>
                  <div>
                    <h6 className="fw-bold mb-1">{info.title}</h6>
                    <p className="text-muted mb-0">{info.details}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-4">
                <h5 className="fw-bold mb-3">Connect With Us</h5>
                <div className="d-flex gap-2 flex-wrap">
                  <Button variant="outline-warning" size="sm">Facebook</Button>
                  <Button variant="outline-warning" size="sm">Twitter</Button>
                  <Button variant="outline-warning" size="sm">Instagram</Button>
                </div>
              </div>
            </Col>

            {/* Contact Form */}
            <Col lg={7}>
              <Card className="shadow-sm">
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-3">Send Us a Message</h3>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Enter subject"
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Message</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Type your message here..."
                        required
                      />
                    </Form.Group>
                    <Button type="submit" variant="warning" size="lg" className="w-100 fw-bold">
                      Send Message <FaArrowRight className="ms-2" />
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* DEPARTMENTS */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">Contact Our Departments</h2>
              <p className="text-muted">Reach out directly to the specific department you need.</p>
            </Col>
          </Row>
          <Row>
            {departments.map((dept, idx) => (
              <Col key={idx} lg={3} md={6} className="mb-4">
                <Card className="h-100 text-center shadow-sm">
                  <Card.Body>
                    <h5 className="fw-bold">{dept.name}</h5>
                    <p className="text-muted small mb-1"><FaEnvelope className="me-1" /> {dept.email}</p>
                    <p className="text-muted small mb-0"><FaPhone className="me-1" /> {dept.phone}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* MAP */}
      <section className="py-5">
        <Container>
          <Row>
            <Col>
              <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '300px', border: '2px dashed #dee2e6' }}>
                <div className="text-center">
                  <FaMapMarkerAlt size={60} className="text-warning mb-2" />
                  <p className="text-muted">Google Map Location</p>
                  <p className="text-muted small">123 Main Street, Harare, Zimbabwe</p>
                </div>
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
              <h2 className="display-6 fw-bold">We're Here to Help</h2>
              <p className="text-white-50">Whether you have a question, prayer request, or want to get involved, reach out to us.</p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold">Call Us Now</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/about">Learn More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;