import { Container, Nav, Navbar } from "react-bootstrap";
import logo from "../assets/logo.png";

function NavigationBar() {
  const navItems = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#" },
    { name: "Parishes", href: "#" },
    { name: "Leadership", href: "#" },
    { name: "Events", href: "#" },
    { name: "Gallery", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Podcast", href: "#" },
    { name: "Contact", href: "#" }
  ];

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-2 sticky-top">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src={logo} width="42" height="42" className="me-2" alt="Logo" />
          <div>
            <span className="fw-bold text-primary d-block" style={{ fontSize: "0.9rem", lineHeight: "1.2" }}>
              Agnes & Alois
            </span>
            <span style={{ fontSize: "0.6rem", color: "#D4AF37", letterSpacing: "2px" }}>
              YOUTH GUILD • HARARE
            </span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            {navItems.map((item, index) => (
              <Nav.Link 
                key={index} 
                href={item.href} 
                style={{ 
                  fontSize: "0.78rem", 
                  color: item.name === "Home" ? "#0D47A1" : "#495057",
                  fontWeight: item.name === "Home" ? "600" : "400",
                  padding: "6px 12px",
                  transition: "color 0.3s ease"
                }}
                className={item.name === "Home" ? "fw-semibold" : ""}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#0D47A1";
                }}
                onMouseLeave={(e) => {
                  if (item.name !== "Home") {
                    e.currentTarget.style.color = "#495057";
                  }
                }}
              >
                {item.name}
              </Nav.Link>
            ))}
            <Nav.Link 
              className="btn btn-primary text-white px-4 py-2 ms-lg-2 mt-2 mt-lg-0" 
              style={{ 
                fontSize: "0.75rem", 
                borderRadius: "50px", 
                fontWeight: "600",
                letterSpacing: "0.5px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(13,71,161,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Join Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;