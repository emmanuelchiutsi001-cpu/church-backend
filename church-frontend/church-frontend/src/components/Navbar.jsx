import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function NavigationBar() {
  const deaneryData = [
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
        "St. Patrick (Glen Nora)",
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

  return (
    <Navbar expand="lg" className="bg-white shadow-sm py-2 sticky-top">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img 
            src={logo} 
            width="42" 
            height="42" 
            className="me-2" 
            alt="Agnes & Alois Youth Guild Logo" 
          />
          <div>
            <span
              className="fw-bold text-primary d-block"
              style={{ fontSize: "0.92rem", lineHeight: "1.2" }}
            >
              Archdiocese of Harare
            </span>
            <span
              style={{
                fontSize: "0.62rem",
                color: "#D4AF37",
                letterSpacing: "1.5px",
                textTransform: "uppercase"
              }}
            >
              Roman Catholic Church
            </span>
          </div>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbar-nav" />
        
        <Navbar.Collapse id="navbar-nav">
          
          {/* Note: We removed 'ms-auto' from the Nav so it aligns to the left, 
              and added it to the Join Us button to push it to the right. */}
          <Nav className="align-items-lg-center me-auto">
            
            {/* ================= DEANERIES DROPDOWN (FIRST ITEM) ================= */}
            <NavDropdown 
              title="Deaneries" 
              id="deaneries-dropdown"
              style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px", fontWeight: "600" }}
            >
              <NavDropdown.Item as={Link} to="/deaneries" className="fw-bold text-primary">
                View All Deaneries
              </NavDropdown.Item>
              <NavDropdown.Divider />

              {deaneryData.map((item, index) => (
                <NavDropdown 
                  key={index} 
                  title={item.deanery} 
                  drop="end" 
                  style={{ fontSize: "0.85rem" }}
                >
                  {item.parishes.map((parish, pIndex) => {
                    const slug = parish
                      .toLowerCase()
                      .replace(/[()']/g, '')
                      .replace(/\s+/g, '-');
                      
                    return (
                      <NavDropdown.Item 
                        key={pIndex} 
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
            {/* ======================================================================= */}

            {/* Home Link (NOW SECOND) */}
            <Nav.Link 
              as={Link} 
              to="/" 
              style={{ fontSize: "0.78rem", color: "#0D47A1", fontWeight: "600", padding: "6px 12px" }}
            >
              Home
            </Nav.Link>

            {/* About Link */}
            <Nav.Link 
              as={Link} 
              to="/about" 
              style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px" }}
            >
              About the Archdiocese
            </Nav.Link>

            {/* Leadership Link */}
            <Nav.Link 
              as={Link} 
              to="/leadership" 
              style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px" }}
            >
              Leadership
            </Nav.Link>

            {/* Remaining Navigation Items */}
            <Nav.Link as={Link} to="/ministries" style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px" }}>Ministries</Nav.Link>
            <Nav.Link as={Link} to="/news" style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px" }}>News</Nav.Link>
            <Nav.Link as={Link} to="/events" style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px" }}>Events</Nav.Link>
            <Nav.Link as={Link} to="/gallery" style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px" }}>Gallery</Nav.Link>
            <Nav.Link as={Link} to="/contact" style={{ fontSize: "0.78rem", color: "#495057", padding: "6px 12px" }}>Contact</Nav.Link>
            
            {/* Join Us Button (Added ms-auto to keep it on the far right) */}
            <Nav.Link 
              as={Link}
              to="/join"
              className="btn btn-primary text-white px-4 py-2 ms-auto mt-2 mt-lg-0" 
              style={{ fontSize: "0.75rem", borderRadius: "50px", fontWeight: "600", letterSpacing: "0.5px" }}
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