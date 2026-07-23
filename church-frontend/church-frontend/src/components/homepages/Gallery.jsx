import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaImages, FaCamera, FaArrowRight, FaTimes } from 'react-icons/fa';

const Gallery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedImage, setSelectedImage] = useState(null);

  const categories = ['All', 'Masses', 'Events', 'Youth', 'Pilgrimages', 'Community'];

  const images = [
    { id: 1, category: 'Masses', title: 'Sunday Mass at Cathedral' },
    { id: 2, category: 'Masses', title: 'Easter Vigil Celebration' },
    { id: 3, category: 'Events', title: 'Archdiocesan Synod' },
    { id: 4, category: 'Events', title: 'Priests Ordination' },
    { id: 5, category: 'Youth', title: 'Youth Leadership Camp' },
    { id: 6, category: 'Youth', title: 'World Youth Day Celebration' },
    { id: 7, category: 'Pilgrimages', title: 'Pilgrimage to Marian Shrine' },
    { id: 8, category: 'Pilgrimages', title: 'Way of the Cross' },
    { id: 9, category: 'Community', title: 'Food Distribution Program' },
    { id: 10, category: 'Community', title: 'School Opening Mass' },
    { id: 11, category: 'Masses', title: 'Christmas Midnight Mass' },
    { id: 12, category: 'Events', title: 'Archbishop\'s Installation' },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* HERO */}
      <section className="bg-primary text-white py-5" style={{ background: 'linear-gradient(135deg, #0D47A1, #1a237e)' }}>
        <Container className="py-4">
          <Row>
            <Col lg={8}>
              <Badge bg="warning" text="dark" className="mb-3">Gallery</Badge>
              <h1 className="display-4 fw-bold">Photo Gallery</h1>
              <p className="lead text-white-50">
                Capturing moments of faith, community, and celebration in the Archdiocese of Harare.
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

      {/* GALLERY GRID */}
      <section className="py-5">
        <Container>
          <Row>
            {images.map((image) => (
              <Col key={image.id} lg={3} md={4} sm={6} className="mb-4">
                <div 
                  className="bg-light rounded shadow-sm d-flex flex-column align-items-center justify-content-center p-4"
                  style={{ height: '200px', cursor: 'pointer', transition: 'transform 0.3s ease' }}
                  onClick={() => handleImageClick(image)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <FaImages size={50} className="text-secondary mb-2" />
                  <Badge bg="warning" text="dark" className="mb-2">{image.category}</Badge>
                  <p className="text-muted small text-center mb-0">{image.title}</p>
                  <small className="text-muted">Click to view</small>
                </div>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Button variant="warning" size="lg">Load More Photos <FaArrowRight className="ms-2" /></Button>
          </div>
        </Container>
      </section>

      {/* LIGHTBOX MODAL */}
      {selectedImage && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.85)', 
            zIndex: 9999,
            cursor: 'pointer'
          }}
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded p-4 text-center position-relative"
            style={{ maxWidth: '500px', width: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="btn btn-outline-secondary position-absolute top-0 end-0 m-2"
              onClick={handleCloseModal}
              style={{ zIndex: 10 }}
            >
              <FaTimes />
            </button>
            <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ height: '250px' }}>
              <FaImages size={80} className="text-secondary" />
            </div>
            <h5 className="fw-bold mt-3">{selectedImage.title}</h5>
            <Badge bg="warning" text="dark" className="mb-2">{selectedImage.category}</Badge>
            <p className="text-muted small">Photo from the Archdiocese of Harare</p>
            <div className="d-flex gap-2 justify-content-center">
              <Button variant="outline-secondary" size="sm">Download</Button>
              <Button variant="outline-secondary" size="sm">Share</Button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMIT PHOTOS */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <FaCamera size={50} className="text-warning mb-3" />
              <h2 className="display-6 fw-bold">Share Your Photos</h2>
              <p className="text-muted">
                Do you have photos from Archdiocese events? Submit them to our gallery.
              </p>
              <Button variant="warning" as={Link} to="/contact">Submit Photos <FaArrowRight className="ms-2" /></Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2 className="display-6 fw-bold">Follow Us</h2>
              <p className="text-white-50">Stay connected through our social media channels for more updates and photos.</p>
              <div className="mt-4 d-flex gap-2 justify-content-center flex-wrap">
                <Button variant="warning" className="fw-bold">Facebook</Button>
                <Button variant="outline-light">Twitter</Button>
                <Button variant="outline-light">Instagram</Button>
                <Button variant="outline-light">YouTube</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Gallery;