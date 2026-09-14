import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock,
  FaArrowRight, FaFacebook, FaTwitter, FaInstagram,
  FaYoutube, FaWhatsapp, FaUserTie, FaQuestionCircle,
} from 'react-icons/fa';

// ─────────────────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

// ─────────────────────────────────────────────────────────
// Page data (replace with real info later)
// ─────────────────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: <FaMapMarkerAlt />,
    title: 'Physical Address',
    details: 'Archdiocese of Harare, 123 Main Street, Harare, Zimbabwe',
  },
  {
    icon: <FaEnvelope />,
    title: 'Postal Address',
    details: 'P.O. Box 1234, Harare, Zimbabwe',
  },
  {
    icon: <FaPhone />,
    title: 'Phone',
    details: '+263 4 123 456 | +263 77 123 4567',
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    details: 'info@hararearchdiocese.org',
  },
  {
    icon: <FaClock />,
    title: 'Office Hours',
    details: 'Mon – Fri: 8:00 AM – 4:30 PM | Sat: 8:00 AM – 12:00 PM',
  },
];

const DEPARTMENTS = [
  { name: 'Communications',   email: 'comm@hararearchdiocese.org',      phone: '+263 4 123 462' },
  { name: 'Youth Office',     email: 'youth@hararearchdiocese.org',     phone: '+263 4 123 463' },
  { name: 'Education Office', email: 'education@hararearchdiocese.org', phone: '+263 4 123 464' },
  { name: 'Social Services',  email: 'social@hararearchdiocese.org',    phone: '+263 4 123 465' },
];

const LEADERSHIP = [
  { name: 'Archbishop [Name]', title: 'Archbishop of Harare', email: 'archbishop@hararearchdiocese.org' },
  { name: 'Fr. [Name]',        title: 'Vicar General',        email: 'vicar@hararearchdiocese.org' },
  { name: 'Sr. [Name]',        title: 'Communications Office', email: 'comm@hararearchdiocese.org' },
];

const SOCIALS = [
  { icon: <FaFacebook />,  label: 'Facebook',  href: '#' },
  { icon: <FaTwitter />,   label: 'Twitter',   href: '#' },
  { icon: <FaInstagram />, label: 'Instagram', href: '#' },
  { icon: <FaYoutube />,   label: 'YouTube',   href: '#' },
  { icon: <FaWhatsapp />,  label: 'WhatsApp',  href: '#' },
];

const FAQS = [
  {
    q: 'How do I request a Mass intention?',
    a: 'Contact the parish office directly or use the form on this page. Include the date and intention.',
  },
  {
    q: 'How can I get baptized or receive sacraments?',
    a: 'Reach out to your local parish. Requirements vary by sacrament — the parish secretary will guide you.',
  },
  {
    q: 'Can I submit news or an event for the website?',
    a: 'Yes — email comm@hararearchdiocese.org with details and any images/documents.',
  },
];

// ─────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────
const Contact = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! Your message has been sent.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div>
      {/* ══════════ HERO ══════════ */}
      <section
        style={{
          background: 'linear-gradient(135deg, #0D47A1 0%, #1a237e 100%)',
          padding: '3rem 0',
          overflow: 'hidden',
        }}
      >
        <Container>
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.div variants={fadeUp}>
              <Badge bg="warning" text="dark" className="mb-3 px-3 py-1">
                CONTACT
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-white fw-bold mb-2"
              style={{ fontSize: '2.5rem' }}
            >
              Get in Touch
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="text-white-50 mb-0"
              style={{ fontSize: '1rem', maxWidth: '600px' }}
            >
              Reach out for inquiries, prayer requests, sacramental needs, or to learn
              more about the Archdiocese of Harare.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* ══════════ INFO + FORM ══════════ */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            {/* ── Contact Info ── */}
            <Col lg={5}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="fw-bold mb-4" style={{ color: '#0D47A1' }}>
                  Contact Information
                </h2>

                {CONTACT_INFO.map((info, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={idx}
                    className="d-flex align-items-start mb-4"
                  >
                    <div
                      className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                      style={{ width: '45px', height: '45px' }}
                    >
                      <span className="text-dark">{info.icon}</span>
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1">{info.title}</h6>
                      <p className="text-muted mb-0 small">{info.details}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Socials */}
                <div className="mt-4">
                  <h6 className="fw-bold mb-3">Connect With Us</h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {SOCIALS.map((s, i) => (
                      <motion.a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline-warning btn-sm d-flex align-items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {s.icon} {s.label}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </Col>

            {/* ── Form ── */}
            <Col lg={7}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Card className="shadow-sm border-0">
                  <Card.Body className="p-4">
                    <h3 className="fw-bold mb-1" style={{ color: '#0D47A1' }}>
                      Send Us a Message
                    </h3>
                    <p className="text-muted small mb-4">
                      We'll get back to you within 1–2 working days.
                    </p>

                    <Form onSubmit={handleSubmit}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold">Full Name *</Form.Label>
                            <Form.Control
                              type="text" name="name" value={formData.name}
                              onChange={handleChange} placeholder="Your name" required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold">Email *</Form.Label>
                            <Form.Control
                              type="email" name="email" value={formData.email}
                              onChange={handleChange} placeholder="you@example.com" required
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold">Phone (optional)</Form.Label>
                            <Form.Control
                              type="tel" name="phone" value={formData.phone}
                              onChange={handleChange} placeholder="+263 …"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="small fw-semibold">Subject *</Form.Label>
                            <Form.Select
                              name="subject" value={formData.subject}
                              onChange={handleChange} required
                            >
                              <option value="">Choose a topic…</option>
                              <option>General Inquiry</option>
                              <option>Prayer Request</option>
                              <option>Sacraments</option>
                              <option>Submit News / Event</option>
                              <option>Volunteer / Get Involved</option>
                              <option>Other</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Form.Group className="mb-3">
                        <Form.Label className="small fw-semibold">Message *</Form.Label>
                        <Form.Control
                          as="textarea" rows={5} name="message"
                          value={formData.message} onChange={handleChange}
                          placeholder="Type your message here…" required
                        />
                      </Form.Group>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit" variant="warning"
                          className="w-100 fw-bold py-2"
                        >
                          Send Message <FaArrowRight className="ms-2" />
                        </Button>
                      </motion.div>
                    </Form>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══════════ LEADERSHIP ══════════ */}
      <section className="py-5 bg-light">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <Badge bg="warning" text="dark" className="mb-2 px-3 py-1">LEADERSHIP</Badge>
            <h2 className="fw-bold" style={{ color: '#0D47A1' }}>Contact Our Leadership</h2>
            <p className="text-muted">Direct contacts for specific offices.</p>
          </motion.div>

          <Row>
            {LEADERSHIP.map((person, idx) => (
              <Col key={idx} lg={4} md={6} className="mb-4">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  whileHover={{ y: -6 }}
                  style={{ height: '100%' }}
                >
                  <Card className="h-100 border-0 shadow-sm text-center">
                    <Card.Body className="p-4">
                      <div
                        className="bg-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                        style={{ width: '70px', height: '70px' }}
                      >
                        <FaUserTie size={30} className="text-dark" />
                      </div>
                      <h5 className="fw-bold mb-1">{person.name}</h5>
                      <p className="text-muted small mb-3">{person.title}</p>
                      <a
                        href={`mailto:${person.email}`}
                        className="text-decoration-none small fw-semibold"
                        style={{ color: '#0D47A1' }}
                      >
                        <FaEnvelope className="me-1" /> {person.email}
                      </a>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════ DEPARTMENTS ══════════ */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-5"
          >
            <Badge bg="warning" text="dark" className="mb-2 px-3 py-1">DEPARTMENTS</Badge>
            <h2 className="fw-bold" style={{ color: '#0D47A1' }}>Contact Our Departments</h2>
            <p className="text-muted">Reach the right office directly.</p>
          </motion.div>

          <Row>
            {DEPARTMENTS.map((dept, idx) => (
              <Col key={idx} lg={3} md={6} className="mb-4">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx}
                  whileHover={{ y: -6 }}
                  style={{ height: '100%' }}
                >
                  <Card className="h-100 border-0 shadow-sm">
                    <Card.Body className="p-4">
                      <h5 className="fw-bold mb-3" style={{ color: '#0D47A1' }}>{dept.name}</h5>
                      <p className="text-muted small mb-2 d-flex align-items-center">
                        <FaEnvelope className="me-2 text-warning" />
                        <a href={`mailto:${dept.email}`} className="text-decoration-none text-muted">
                          {dept.email}
                        </a>
                      </p>
                      <p className="text-muted small mb-0 d-flex align-items-center">
                        <FaPhone className="me-2 text-warning" />
                        <a href={`tel:${dept.phone}`} className="text-decoration-none text-muted">
                          {dept.phone}
                        </a>
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ══════════ FAQ ══════════ */}
      <section className="py-5 bg-light">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <FaQuestionCircle size={40} className="text-warning mb-2" />
            <h2 className="fw-bold" style={{ color: '#0D47A1' }}>Frequently Asked</h2>
            <p className="text-muted">Quick answers before you reach out.</p>
          </motion.div>

          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion>
                {FAQS.map((f, i) => (
                  <Accordion.Item eventKey={String(i)} key={i}>
                    <Accordion.Header>{f.q}</Accordion.Header>
                    <Accordion.Body className="text-muted">{f.a}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ══════════ MAP ══════════ */}
      <section className="py-5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="rounded d-flex align-items-center justify-content-center"
              style={{
                height: '320px',
                background: 'linear-gradient(135deg, #e3e8f5 0%, #c9d3ec 100%)',
                border: '2px dashed #b6c2e0',
              }}
            >
              <div className="text-center">
                <FaMapMarkerAlt size={60} className="text-warning mb-2" />
                <p className="text-muted mb-1 fw-semibold">Google Map Location</p>
                <p className="text-muted small mb-0">123 Main Street, Harare, Zimbabwe</p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ══════════ CTA ══════════ */}
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
              <h2 className="fw-bold">We're Here to Help</h2>
              <p className="text-white-50">
                Whether you have a question, prayer request, or want to get involved —
                reach out to us.
              </p>
              <div className="mt-4">
                <motion.span
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  style={{ display: 'inline-block' }}
                >
                  <Button variant="warning" size="lg" className="me-3 fw-bold">
                    Call Us Now
                  </Button>
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  style={{ display: 'inline-block' }}
                >
                  <Button variant="outline-light" size="lg" as={Link} to="/about">
                    Learn More
                  </Button>
                </motion.span>
              </div>
            </Col>
          </Row>
        </Container>
      </motion.section>
    </div>
  );
};

export default Contact;