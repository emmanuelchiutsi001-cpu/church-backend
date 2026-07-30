import { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  FaUser,
  FaBullseye,
  FaHeart,
  FaHandsHelping,
  FaBuilding,
  FaUsers,
  FaArrowRight,
  FaCross,
  FaBible,
  FaHistory,
  FaPrayingHands,
} from 'react-icons/fa';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '120+', label: 'Parishes' },
    { number: '85', label: 'Priests' },
    { number: '40+', label: 'Schools' },
    { number: '15', label: 'Deaneries' },
  ];

  const values = [
    { icon: <FaCross />, title: 'Faith', desc: 'Commitment to Christ and the Catholic Church.' },
    { icon: <FaHeart />, title: 'Love', desc: 'Compassionate service to all, especially the poor.' },
    { icon: <FaHandsHelping />, title: 'Service', desc: 'Dedication to spiritual and material needs.' },
    { icon: <FaBible />, title: 'Truth', desc: 'Proclaiming the Gospel with integrity.' },
  ];

  const timeline = [
    { year: '1953', event: 'Archdiocese of Harare established' },
    { year: '1960s–70s', event: 'Expansion of parishes, schools, and social services' },
    { year: '1980s', event: 'Post-independence growth and renewal' },
    { year: 'Today', event: '120+ parishes serving communities across Zimbabwe' },
  ];

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Archdiocese of Harare</Badge>
              <h1 className="display-4 fw-bold">About Us</h1>
              <p className="lead text-white-50">
                A living Church rooted in faith, serving Zimbabwe with love and dedication since 1953.
              </p>
              <div className="mt-4">
                <Button variant="warning" className="me-3 fw-bold">Learn More <FaArrowRight className="ms-2" /></Button>
                <Button variant="outline-light" as={Link} to="/contact">Contact Us</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* WELCOME */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={5} className="text-center">
              <div className="bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center" style={{ width: '200px', height: '200px' }}>
                <FaUser size={80} className="text-warning" />
              </div>
            </Col>
            <Col lg={7} className="mt-4 mt-lg-0">
              <Badge bg="warning" text="dark" className="mb-3">Welcome</Badge>
              <h2 className="display-6 fw-bold">Archbishop's Message</h2>
              <p className="text-muted fs-5">
                "We welcome you to the Archdiocese of Harare – a community united in faith, 
                committed to the Gospel, and serving the people of Zimbabwe."
              </p>
              <p className="text-muted">
                <strong>Most Rev. Robert Ndlovu</strong>, Archbishop of Harare
              </p>
              <Button variant="outline-warning">Read Full Message</Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* HISTORY */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <Badge bg="warning" text="dark" className="mb-2">Our Story</Badge>
              <h2 className="display-6 fw-bold">History of the Archdiocese</h2>
              <p className="text-muted">From humble beginnings to a growing and dynamic Church in Zimbabwe.</p>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              {timeline.map((item, idx) => (
                <div key={idx} className="p-3 mb-3 bg-white rounded shadow-sm border-start border-4 border-warning">
                  <h5><span className="text-warning">{item.year}</span> — {item.event}</h5>
                </div>
              ))}
            </Col>
            <Col lg={6}>
              <div className="bg-secondary rounded d-flex align-items-center justify-content-center" style={{ height: '280px' }}>
                <FaHistory size={60} className="text-white-50" />
                <span className="text-white-50 ms-3">Historical Image</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* MISSION + VISION + VALUES */}
      <section className="py-5">
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <div className="p-4 text-center h-100 bg-white rounded shadow-sm">
                <FaBullseye size={40} className="text-warning mb-3" />
                <h4 className="fw-bold">Our Mission</h4>
                <p className="text-muted">Proclaim the Gospel, celebrate the sacraments, and serve with love and justice.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 text-center h-100 bg-white rounded shadow-sm">
                <FaPrayingHands size={40} className="text-warning mb-3" />
                <h4 className="fw-bold">Our Vision</h4>
                <p className="text-muted">A vibrant, inclusive Church transforming lives and communities through the Holy Spirit.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-4 text-center h-100 bg-white rounded shadow-sm">
                <FaHeart size={40} className="text-warning mb-3" />
                <h4 className="fw-bold">Core Values</h4>
                {values.map((v, i) => (
                  <p key={i} className="text-muted small mb-1">{v.icon} {v.title}</p>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* STATISTICS */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">The Archdiocese in Numbers</h2>
            </Col>
          </Row>
          <Row>
            {stats.map((stat, idx) => (
              <Col key={idx} md={3} sm={6} className="mb-3">
                <div className="p-3">
                  <div className="display-4 fw-bold text-warning">{stat.number}</div>
                  <div className="text-white-50">{stat.label}</div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* LEADERSHIP PREVIEW */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <Badge bg="warning" text="dark" className="mb-2">Leadership</Badge>
              <h2 className="display-6 fw-bold">Our Shepherds</h2>
              <p className="text-muted">Guiding the Archdiocese with faith and dedication.</p>
            </Col>
          </Row>
          <Row>
            {[
              { name: 'Most Rev. Robert Ndlovu', role: 'Archbishop of Harare' },
              { name: 'Rev. Fr. John Makoni', role: 'Vicar General' },
              { name: 'Rev. Fr. Peter Chigora', role: 'Chancellor' },
            ].map((leader, idx) => (
              <Col key={idx} lg={4} md={6} className="mb-4">
                <Card className="h-100 text-center shadow-sm">
                  <div className="bg-light rounded-circle mx-auto mt-3 d-flex align-items-center justify-content-center" style={{ width: '100px', height: '100px' }}>
                    <FaUser size={50} className="text-secondary" />
                  </div>
                  <Card.Body>
                    <Card.Title className="fw-bold h6">{leader.name}</Card.Title>
                    <Card.Text className="text-muted small">{leader.role}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            <Button variant="outline-warning" as={Link} to="/leadership">View All Leadership <FaArrowRight className="ms-2" /></Button>
          </div>
        </Container>
      </section>

      {/* MINISTRIES PREVIEW */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <Badge bg="warning" text="dark" className="mb-2">Our Work</Badge>
              <h2 className="display-6 fw-bold">Ministries &amp; Outreach</h2>
              <p className="text-muted">Serving the Church and the community through diverse ministries.</p>
            </Col>
          </Row>
          <Row>
            {[
              { name: 'Youth Ministry', icon: <FaUsers />, desc: 'Empowering young people in faith and leadership.' },
              { name: 'Education', icon: <FaBuilding />, desc: 'Running schools and catechetical programs.' },
              { name: 'Social Services', icon: <FaHandsHelping />, desc: 'Charitable works and community outreach.' },
            ].map((m, idx) => (
              <Col key={idx} lg={4} md={6} className="mb-4">
                <div className="p-4 text-center bg-white rounded shadow-sm h-100">
                  <div className="text-warning" style={{ fontSize: '2.5rem' }}>{m.icon}</div>
                  <h5 className="fw-bold mt-3">{m.name}</h5>
                  <p className="text-muted small">{m.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            <Button variant="warning" as={Link} to="/ministries">Explore All Ministries <FaArrowRight className="ms-2" /></Button>
          </div>
        </Container>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold">Join Us in Faith &amp; Service</h2>
              <p className="text-white-50">Whether you're a lifelong Catholic or exploring the faith, we welcome you.</p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold" as={Link} to="/contact">Get Involved</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/contact">Contact Us</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;