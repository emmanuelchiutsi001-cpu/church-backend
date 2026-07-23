import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaUsers, FaBuilding, FaHandsHelping, FaPray, 
  FaBook, FaHeart, FaChild, FaArrowRight, FaCross,
  FaBible, FaMusic, FaHospital, FaSchool
} from 'react-icons/fa';

const Ministries = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const ministries = [
    {
      name: 'Youth Ministry',
      icon: <FaUsers />,
      desc: 'Empowering young people in faith, leadership, and service.',
      details: 'Youth groups, retreats, leadership camps, and youth festivals.',
    },
    {
      name: 'Education',
      icon: <FaSchool />,
      desc: 'Running schools and catechetical programs across the Archdiocese.',
      details: 'Primary and secondary schools, catechism classes, and adult education.',
    },
    {
      name: 'Social Services',
      icon: <FaHandsHelping />,
      desc: 'Charitable works and community outreach programs.',
      details: 'Food distribution, healthcare, orphan support, and community development.',
    },
    {
      name: 'Liturgy & Worship',
      icon: <FaPray />,
      desc: 'Sacramental preparation and worship coordination.',
      details: 'Mass coordination, liturgical training, and sacramental preparation.',
    },
    {
      name: 'Family & Marriage',
      icon: <FaHeart />,
      desc: 'Supporting families and marriages in the Archdiocese.',
      details: 'Marriage preparation, family counseling, and family life events.',
    },
    {
      name: 'Catechesis',
      icon: <FaBook />,
      desc: 'Formation programs for children and adults.',
      details: 'Sunday school, catechist training, and RCIA programs.',
    },
    {
      name: 'Music Ministry',
      icon: <FaMusic />,
      desc: 'Enhancing worship through sacred music and choir programs.',
      details: 'Choir training, music workshops, and liturgical music coordination.',
    },
    {
      name: 'Pastoral Care',
      icon: <FaHospital />,
      desc: 'Visiting the sick, elderly, and those in need.',
      details: 'Hospital visits, home visits, and bereavement support.',
    },
  ];

  const stats = [
    { number: '40+', label: 'Schools' },
    { number: '200+', label: 'Volunteers' },
    { number: '15', label: 'Ministries' },
    { number: '85', label: 'Priests' },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Ministries</Badge>
              <h1 className="display-4 fw-bold">Our Ministries</h1>
              <p className="lead text-white-50">
                Serving the Church and community through diverse ministries and outreach programs.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MINISTRIES CARDS */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">Explore Our Ministries</h2>
              <p className="text-muted">Each ministry serves a unique purpose in building the Kingdom of God.</p>
            </Col>
          </Row>
          <Row>
            {ministries.map((ministry, idx) => (
              <Col key={idx} lg={3} md={6} className="mb-4">
                <Card className="h-100 shadow-sm text-center">
                  <Card.Body>
                    <div className="text-warning" style={{ fontSize: '3rem' }}>
                      {ministry.icon}
                    </div>
                    <Card.Title className="fw-bold mt-3">{ministry.name}</Card.Title>
                    <Card.Text className="text-muted small">{ministry.desc}</Card.Text>
                    <Card.Text className="text-muted small">{ministry.details}</Card.Text>
                    <div className="mt-3">
                      <Button variant="outline-warning" size="sm">Learn More</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* STATISTICS */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row>
            {stats.map((stat, idx) => (
              <Col key={idx} md={3} sm={6} className="text-center mb-3">
                <div className="display-4 fw-bold text-warning">{stat.number}</div>
                <div className="text-white-50">{stat.label}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* HOW TO GET INVOLVED */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center">
            <Col>
              <Badge bg="warning" text="dark" className="mb-3">Get Involved</Badge>
              <h2 className="display-6 fw-bold">Join a Ministry</h2>
              <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
                There's a place for everyone to serve. Find the ministry that matches your gifts and calling.
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={4} md={6} className="mb-3">
              <div className="p-4 bg-white rounded shadow-sm text-center">
                <FaCross size={40} className="text-warning mb-2" />
                <h5 className="fw-bold">Pray</h5>
                <p className="text-muted small">Support our ministries through prayer.</p>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-3">
              <div className="p-4 bg-white rounded shadow-sm text-center">
                <FaHeart size={40} className="text-warning mb-2" />
                <h5 className="fw-bold">Volunteer</h5>
                <p className="text-muted small">Offer your time and talents to serve.</p>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-3">
              <div className="p-4 bg-white rounded shadow-sm text-center">
                <FaBible size={40} className="text-warning mb-2" />
                <h5 className="fw-bold">Donate</h5>
                <p className="text-muted small">Support the work of the Archdiocese.</p>
              </div>
            </Col>
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" as={Link} to="/contact">Contact Us to Join <FaArrowRight className="ms-2" /></Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold">Serve With Us</h2>
              <p className="text-white-50">Your gifts and talents are needed in the Archdiocese.</p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold">Get Started</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contact">Contact Us</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Ministries;