import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-2">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src={logo} width="42" height="42" className="me-2" alt="Logo" />
          <div>
            <span className="fw-bold text-primary d-block" style={{ fontSize: "0.9rem", lineHeight: "1.2" }}>
              Agnes & Alois
            </span>
            <span style={{ fontSize: "0.65rem", color: "#6c757d", letterSpacing: "1px" }}>
              Youth Guild
            </span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link href="#" className="fw-semibold" style={{ fontSize: "0.85rem", color: "#0D47A1" }}>Home</Nav.Link>
            <Nav.Link href="#" style={{ fontSize: "0.85rem" }}>About</Nav.Link>
            <Nav.Link href="#" style={{ fontSize: "0.85rem" }}>Parishes</Nav.Link>
            <Nav.Link href="#" style={{ fontSize: "0.85rem" }}>Events</Nav.Link>
            <Nav.Link href="#" style={{ fontSize: "0.85rem" }}>Gallery</Nav.Link>
            <Nav.Link className="btn btn-primary text-white px-3 ms-2" style={{ fontSize: "0.8rem", borderRadius: "20px" }}>
              Join Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default NavigationBar;