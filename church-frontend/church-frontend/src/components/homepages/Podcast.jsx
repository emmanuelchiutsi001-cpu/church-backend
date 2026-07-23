import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaPlay, FaPodcast, FaArrowRight, FaDownload, FaShare, FaHeadphones } from 'react-icons/fa';

const Podcast = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const episodes = [
    {
      id: 1,
      title: 'The Role of the Laity in the Church',
      host: 'Fr. John Makoni',
      date: 'July 15, 2026',
      duration: '32:15',
      description: 'Exploring the vital role of lay people in the mission of the Church and the Archdiocese.',
      category: 'Theology',
      featured: true,
    },
    {
      id: 2,
      title: 'Youth and Faith in Modern Zimbabwe',
      host: 'Sr. Mary Chirara',
      date: 'July 10, 2026',
      duration: '28:40',
      description: 'A conversation on how young people are living out their faith in today\'s Zimbabwe.',
      category: 'Youth',
      featured: false,
    },
    {
      id: 3,
      title: 'Social Justice and the Church',
      host: 'Fr. Peter Chigora',
      date: 'July 5, 2026',
      duration: '35:20',
      description: 'Discussing the Church\'s role in advocating for social justice and human dignity.',
      category: 'Social Justice',
      featured: false,
    },
    {
      id: 4,
      title: 'Preparing for the Sacraments',
      host: 'Sr. Agnes Moyo',
      date: 'June 28, 2026',
      duration: '25:10',
      description: 'A guide for parents and godparents on preparing children for Baptism and First Communion.',
      category: 'Sacraments',
      featured: false,
    },
    {
      id: 5,
      title: 'Faith and Family Life',
      host: 'Fr. Michael Banda',
      date: 'June 20, 2026',
      duration: '30:45',
      description: 'How families can grow in faith together in the context of modern challenges.',
      category: 'Family',
      featured: false,
    },
  ];

  const categories = ['All', 'Theology', 'Youth', 'Social Justice', 'Sacraments', 'Family'];

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Podcast</Badge>
              <h1 className="display-4 fw-bold">Faith &amp; Life Podcast</h1>
              <p className="lead text-white-50">
                Listen to inspiring conversations on faith, life, and the Church in the Archdiocese of Harare.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FEATURED EPISODE */}
      <section className="py-5">
        <Container>
          <Row className="mb-4">
            <Col>
              <Badge bg="warning" text="dark" className="mb-2">Featured Episode</Badge>
              <h2 className="display-6 fw-bold">Latest Episode</h2>
            </Col>
          </Row>
          {episodes.filter(e => e.featured).map((ep) => (
            <Card key={ep.id} className="shadow-sm border-warning border-2">
              <Card.Body className="p-4">
                <Row className="align-items-center">
                  <Col lg={2} className="text-center mb-3 mb-lg-0">
                    <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px' }}>
                      <FaMicrophone size={35} className="text-white" />
                    </div>
                  </Col>
                  <Col lg={7} className="mb-3 mb-lg-0">
                    <Badge bg="warning" text="dark" className="mb-2">{ep.category}</Badge>
                    <Card.Title className="fw-bold h4">{ep.title}</Card.Title>
                    <div className="d-flex flex-wrap gap-3 text-muted small">
                      <span><FaHeadphones className="me-1" /> {ep.host}</span>
                      <span>{ep.date}</span>
                      <span>Duration: {ep.duration}</span>
                    </div>
                    <Card.Text className="text-muted mt-2">{ep.description}</Card.Text>
                  </Col>
                  <Col lg={3} className="text-center">
                    <Button variant="warning" size="lg" className="mb-2 w-100">
                      <FaPlay className="me-2" /> Listen Now
                    </Button>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button variant="outline-secondary" size="sm"><FaDownload /></Button>
                      <Button variant="outline-secondary" size="sm"><FaShare /></Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </section>

      {/* PODCAST PLAYER */}
      <section className="py-4 bg-light border-top border-bottom">
        <Container>
          <Row className="align-items-center">
            <Col lg={3}>
              <h5 className="fw-bold mb-2 mb-lg-0"><FaPodcast className="text-warning me-2" />Now Playing</h5>
            </Col>
            <Col lg={6} className="mb-2 mb-lg-0">
              <div className="d-flex align-items-center gap-3">
                <Button variant="warning" size="sm"><FaPlay /></Button>
                <div className="flex-grow-1 bg-white rounded p-1">
                  <div className="bg-warning rounded" style={{ width: '35%', height: '6px' }}></div>
                </div>
                <span className="text-muted small">12:30 / 32:15</span>
              </div>
            </Col>
            <Col lg={3} className="text-end">
              <div className="d-flex gap-2 justify-content-center justify-content-lg-end">
                <Button variant="outline-secondary" size="sm"><FaDownload /></Button>
                <Button variant="outline-secondary" size="sm"><FaShare /></Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* EPISODE LIST */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2 className="display-6 fw-bold">All Episodes</h2>
              <p className="text-muted">Browse our growing library of faith-filled conversations.</p>
            </Col>
          </Row>
          <Row>
            {episodes.map((ep) => (
              <Col key={ep.id} lg={12} className="mb-3">
                <Card className="shadow-sm">
                  <Card.Body className="p-3">
                    <Row className="align-items-center">
                      <Col md={6}>
                        <div className="d-flex align-items-center">
                          <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                            <FaMicrophone className="text-secondary" />
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">{ep.title}</h6>
                            <div className="d-flex flex-wrap gap-2 text-muted small">
                              <Badge bg="warning" text="dark">{ep.category}</Badge>
                              <span>{ep.host}</span>
                              <span>{ep.date}</span>
                              <span>{ep.duration}</span>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={6} className="text-center text-md-end mt-2 mt-md-0">
                        <Button variant="outline-warning" size="sm" className="me-2">Play</Button>
                        <Button variant="outline-secondary" size="sm">Details</Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" size="lg">Load More Episodes</Button>
          </div>
        </Container>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <FaPodcast size={50} className="text-warning mb-3" />
              <h2 className="display-6 fw-bold">Subscribe to Our Podcast</h2>
              <p className="text-muted">Never miss an episode. Subscribe on your favorite podcast platform.</p>
              <div className="d-flex flex-wrap gap-2 justify-content-center">
                <Button variant="outline-warning">Apple Podcasts</Button>
                <Button variant="outline-warning">Spotify</Button>
                <Button variant="outline-warning">Google Podcasts</Button>
                <Button variant="outline-warning">Stitcher</Button>
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
              <h2 className="display-6 fw-bold">Have an Idea for a Podcast?</h2>
              <p className="text-white-50">We'd love to hear your suggestions for topics and guests.</p>
              <div className="mt-4">
                <Button variant="warning" size="lg" className="me-3 fw-bold" as={Link} to="/contact">Share Your Idea</Button>
                <Button variant="outline-light" size="lg" as={Link} to="/about">Learn More</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Podcast;