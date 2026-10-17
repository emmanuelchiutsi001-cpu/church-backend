import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaAddressBook, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt,
  FaFacebook, FaYoutube, FaClock, FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

const CONTACT = {
  officeName: "Archdiocese Head Office",
  address: "123 Cathedral Street, Harare, Zimbabwe",
  phone: "+263 242 700 000",
  email: "info@archdiocese.org",
  website: "www.archdiocese.org",
  facebook: "https://facebook.com/archdiocese",
  youtube: "https://youtube.com/@archdiocese",
  hours: "Mon – Fri · 8:00 AM – 4:30 PM",
};

const CARD_SHADOW = "0 4px 20px rgba(15,23,42,0.06)";
const CARD_RADIUS = "16px";

// Palette
const BLUE = {
  main: "#1D4ED8",
  soft: "#DBEAFE",
  hover: "rgba(29,78,216,0.18)",
  border: "rgba(29,78,216,0.25)",
};
const YELLOW = {
  main: "#D97706",
  soft: "#FEF3C7",
  hover: "rgba(217,119,6,0.18)",
  border: "rgba(217,119,6,0.25)",
};

function Contact() {
  // 👇 The four cards, alternating blue / yellow
  const infoCards = [
    { icon: FaMapMarkerAlt, label: "Visit Us",     value: CONTACT.address, theme: BLUE },
    { icon: FaPhone,        label: "Call Us",      value: CONTACT.phone,   theme: YELLOW },
    { icon: FaEnvelope,     label: "Email Us",     value: CONTACT.email,   theme: BLUE },
    { icon: FaClock,        label: "Office Hours", value: CONTACT.hours,   theme: YELLOW },
  ];

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* ---------- Hero ---------- */}
      <div
        style={{
          background: "linear-gradient(135deg,#1E3A8A 0%,#1D4ED8 60%,#D97706 130%)",
          color: "#fff",
          padding: "64px 0 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -120, left: -60, width: 320, height: 320, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <Container className="position-relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
            <div
              className="d-inline-flex align-items-center justify-content-center mb-3"
              style={{
                width: 64, height: 64, borderRadius: 18,
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <FaAddressBook size={26} />
            </div>
            <h1 className="fw-bold mb-2" style={{ letterSpacing: "-0.5px" }}>Get in Touch</h1>
            <p className="mb-0 mx-auto" style={{ maxWidth: 520, opacity: 0.85 }}>
              We'd love to hear from you. Reach us through any of the channels below.
            </p>
          </motion.div>
        </Container>
      </div>

      {/* ---------- Info cards ---------- */}
      <Container style={{ marginTop: -64 }}>
        <Row className="g-3 g-md-4">
          {infoCards.map((item, i) => {
            const Icon = item.icon;
            return (
              <Col md={6} lg={3} key={i}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <Card
                    className="border-0 h-100 info-card"
                    style={{
                      borderRadius: CARD_RADIUS,
                      boxShadow: CARD_SHADOW,
                      borderTop: `4px solid ${item.theme.main}`,   // 👈 blue / yellow top bar
                      overflow: "hidden",
                    }}
                  >
                    <Card.Body className="p-4 text-center">
                      <div
                        className="d-inline-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: 56, height: 56, borderRadius: 14,
                          background: item.theme.soft,
                          color: item.theme.main,
                        }}
                      >
                        <Icon size={22} />
                      </div>
                      <div className="fw-bold mb-1" style={{ color: "#0f172a" }}>{item.label}</div>
                      <div className="text-muted small" style={{ wordBreak: "break-word" }}>{item.value}</div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* ---------- Main content ---------- */}
        <Row className="g-4 mt-4">
          {/* Left: Form + socials */}
          <Col lg={7}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="border-0 h-100" style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}>
                <Card.Body className="p-4 p-md-5">
                  <h4 className="fw-bold mb-1" style={{ color: "#0f172a" }}>Send us a message</h4>
                  <p className="text-muted small mb-4">We usually reply within 2 business days.</p>

                  <form onSubmit={(e) => e.preventDefault()}>
                    <Row className="g-3">
                      <Col md={6}>
                        <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>Full Name</label>
                        <input className="form-control" placeholder="John Doe" style={{ borderRadius: 10, padding: "10px 14px", border: "1px solid #e2e8f0" }} />
                      </Col>
                      <Col md={6}>
                        <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>Email</label>
                        <input type="email" className="form-control" placeholder="you@example.com" style={{ borderRadius: 10, padding: "10px 14px", border: "1px solid #e2e8f0" }} />
                      </Col>
                      <Col md={12}>
                        <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>Subject</label>
                        <input className="form-control" placeholder="How can we help?" style={{ borderRadius: 10, padding: "10px 14px", border: "1px solid #e2e8f0" }} />
                      </Col>
                      <Col md={12}>
                        <label className="form-label small fw-semibold text-uppercase" style={{ color: "#475569", letterSpacing: "0.4px" }}>Message</label>
                        <textarea rows={5} className="form-control" placeholder="Write your message..." style={{ borderRadius: 10, padding: "10px 14px", border: "1px solid #e2e8f0", resize: "vertical" }} />
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      className="mt-4 d-inline-flex align-items-center gap-2 fw-semibold border-0"
                      style={{
                        borderRadius: 10, padding: "11px 24px",
                        background: `linear-gradient(135deg, ${BLUE.main}, ${YELLOW.main})`,
                        boxShadow: `0 6px 16px ${BLUE.hover}`,
                      }}
                    >
                      <FaPaperPlane /> Send Message
                    </Button>
                  </form>

                  {/* Socials */}
                  <div className="mt-5 pt-4" style={{ borderTop: "1px solid #eef2f7" }}>
                    <div className="small fw-semibold text-uppercase mb-3" style={{ color: "#94a3b8", letterSpacing: "0.5px" }}>Follow Us</div>
                    <div className="d-flex gap-2 flex-wrap">
                      <a href={CONTACT.facebook} target="_blank" rel="noreferrer" className="social-btn"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: BLUE.soft, color: BLUE.main, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                        <FaFacebook /> Facebook
                      </a>
                      <a href={CONTACT.youtube} target="_blank" rel="noreferrer" className="social-btn"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: YELLOW.soft, color: YELLOW.main, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                        <FaYoutube /> YouTube
                      </a>
                      <a href={`mailto:${CONTACT.email}`} className="social-btn"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: BLUE.soft, color: BLUE.main, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                        <FaEnvelope /> Email
                      </a>
                      <a href={`https://${CONTACT.website}`} target="_blank" rel="noreferrer" className="social-btn"
                        style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", borderRadius: 10, background: YELLOW.soft, color: YELLOW.main, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                        <FaGlobe /> Website
                      </a>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          {/* Right: Info + map */}
          <Col lg={5}>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card
                className="border-0 mb-4"
                style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, borderTop: `4px solid ${YELLOW.main}` }}
              >
                <Card.Body className="p-4">
                  <h5 className="fw-bold mb-3" style={{ color: "#0f172a" }}>{CONTACT.officeName}</h5>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 36, height: 36, borderRadius: 10, background: BLUE.soft, color: BLUE.main }}>
                      <FaMapMarkerAlt size={14} />
                    </div>
                    <div>
                      <div className="small text-muted text-uppercase fw-semibold" style={{ letterSpacing: "0.4px" }}>Address</div>
                      <div className="fw-medium" style={{ color: "#0f172a" }}>{CONTACT.address}</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 36, height: 36, borderRadius: 10, background: YELLOW.soft, color: YELLOW.main }}>
                      <FaPhone size={14} />
                    </div>
                    <div>
                      <div className="small text-muted text-uppercase fw-semibold" style={{ letterSpacing: "0.4px" }}>Phone</div>
                      <a href={`tel:${CONTACT.phone}`} className="fw-medium text-decoration-none" style={{ color: "#0f172a" }}>{CONTACT.phone}</a>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0"
                      style={{ width: 36, height: 36, borderRadius: 10, background: BLUE.soft, color: BLUE.main }}>
                      <FaEnvelope size={14} />
                    </div>
                    <div>
                      <div className="small text-muted text-uppercase fw-semibold" style={{ letterSpacing: "0.4px" }}>Email</div>
                      <a href={`mailto:${CONTACT.email}`} className="fw-medium text-decoration-none" style={{ color: "#0f172a" }}>{CONTACT.email}</a>
                    </div>
                  </div>
                </Card.Body>
              </Card>

              {/* Map placeholder — blue + yellow gradient */}
              <Card className="border-0 overflow-hidden" style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}>
                <div
                  style={{
                    height: 260,
                    background: "linear-gradient(135deg,#DBEAFE 0%,#FEF3C7 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <div className="text-center" style={{ color: BLUE.main }}>
                    <FaMapMarkerAlt size={42} className="mb-2" />
                    <div className="fw-bold">Map Location</div>
                    <small className="d-block" style={{ opacity: 0.75 }}>{CONTACT.address}</small>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <div style={{ height: 64 }} />
      </Container>

      <style>{`
        .info-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(15,23,42,0.10) !important;
        }
        .social-btn { transition: transform 0.2s ease, filter 0.2s ease; }
        .social-btn:hover { transform: translateY(-2px); filter: brightness(0.95); }
        .form-control:focus {
          border-color: ${BLUE.main} !important;
          box-shadow: 0 0 0 3px rgba(29,78,216,0.15) !important;
        }
      `}</style>
    </div>
  );
}

export default Contact;