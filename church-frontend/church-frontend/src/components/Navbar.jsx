import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavigationBar() {
  const parishData = [
    {
      deanery: "Inner City Deanery",
      parishes: [
        "Cathedral of the Sacred Heart of Jesus",
        "St. Gerard (Borrowdale)",
        "Immaculate Conception (Highlands)",
        "Our Lady of the Wayside (Mount Pleasant)",
        "St. John's (Avondale)",
        "Holy Name (Mabelreign)",
        "St. Canisius (Marlborough)",
        "The Assumption of Our Lady (Rhodesville)",
        "St. Augustine (Hatcliffe)"
      ]
    },
    {
      deanery: "South East Deanery",
      parishes: [
        "St. Francis of Assisi (Waterfalls)",
        "St. Francis Xavier (Braeside)",
        "St. Martin's (Cranborne)",
        "St. Peter's (Mbare)",
        "St. Peter Claver (Mbare)",
        "St. Joseph (Hatfield)",
        "St. Patrick's (Epworth)"
      ]
    },
    {
      deanery: "Highfield Deanery",
      parishes: [
        "St. Mary Immaculate (New Highfield)",
        "St. Paul (Glen View)",
        "St. Patrick (Glen Norah)",
        "St. John (Budiriro)",
        "Holy Cross (Budiriro)"
      ]
    },
    {
      deanery: "Mufakose Deanery",
      parishes: [
        "St. Pius (Mufakose)",
        "St. Joseph (Kambuzuma)",
        "St. Stephen (Dzivarasekwa)",
        "St. Mary (Kuwadzana)"
      ]
    },
    {
      deanery: "Chitungwiza Deanery",
      parishes: [
        "St. Alois (Chitungwiza)",
        "St. Theresa (Seke)",
        "St. Monica (Zengeza)",
        "St. Mary (Seke)"
      ]
    },
    {
      deanery: "Mabvuku/Goromonzi Deanery",
      parishes: [
        "St. Fidelis (Mabvuku)",
        "St. Joseph (Chishawasha)",
        "St. Dominic (Churuwiza)",
        "St. Ignatius (Chishawasha)"
      ]
    },
    {
      deanery: "Mhondoro Deanery",
      parishes: [
        "St. Matia Kalemba (Norton)",
        "St. Anthony (Norton)",
        "St. Dominic (Mubayira)",
        "St. Michael (Mhondoro)",
        "St. Monica (Beatrice)"
      ]
    },
    {
      deanery: "Chivhu Deanery",
      parishes: [
        "St. Theresa (Chivhu)",
        "Our Lady of Montserrat (Enkeldoorn)",
        "St. Barbara (Charter)",
        "Our Lady of Fatima (Murambinda)"
      ]
    },
    {
      deanery: "Bindura Deanery",
      parishes: [
        "St. John's (Bindura)",
        "St. Albert's (Mazowe)",
        "Our Lady of the Rosary (Mvurwi)",
        "Christ the King (Concession)"
      ]
    },
    {
      deanery: "Murewa Deanery",
      parishes: [
        "St. Paul's (Musami)",
        "St. Clare (Murewa)",
        "St. Peter's (Juru)"
      ]
    },
    {
      deanery: "Mutoko Deanery",
      parishes: [
        "All Souls (Mutoko)",
        "St. Benedict's (Mutoko)",
        "St. Gabriel's (Mutoko)"
      ]
    }
  ];

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Leadership", href: "/leadership" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-2 sticky-top">
      <Container>
        {/* Fixed Brand - Only ONE logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={logo} 
            width="42" 
            height="42" 
            className="me-2" 
            alt="Agnes & Alois Youth Guild Logo" 
          />
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
            {/* Parishes Dropdown */}
            <NavDropdown
              title="Parishes"
              id="parishes-dropdown"
              style={{
                fontSize: "0.78rem",
                color: "#495057",
                padding: "6px 12px",
              }}
              className="parishes-dropdown"
            >
              {parishData.map((deanery, index) => (
                <NavDropdown key={index} title={deanery.deanery} drop="end">
                  {deanery.parishes.map((parish, idx) => {
                    const slug = parish
                      .toLowerCase()
                      .replace(/[()']/g, '')
                      .replace(/\s+/g, '-');
                    
                    return (
                      <NavDropdown.Item 
                        key={idx} 
                        as={Link} 
                        to={`/parishes/${slug}`}
                      >
                        {parish}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              ))}
            </NavDropdown>

            {navItems.map((item, index) => (
              <Nav.Link 
                key={index} 
                as={Link}
                to={item.href} 
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
              as={Link}
              to="/join"
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