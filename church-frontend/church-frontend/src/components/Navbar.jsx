import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
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
        "St. Augustine (Hatcliffe)",
      ],
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
        "St. Patrick's (Epworth)",
      ],
    },
    {
      deanery: "Highfield Deanery",
      parishes: [
        "St. Mary Immaculate (New Highfield)",
        "St. Paul (Glen View)",
        "St. Patrick (Glen Nora)",
        "St. John (Budiriro)",
        "Holy Cross (Budiriro)",
      ],
    },
    {
      deanery: "Mufakose Deanery",
      parishes: [
        "St. Pius (Mufakose)",
        "St. Joseph (Kambuzuma)",
        "St. Stephen (Dzivarasekwa)",
        "St. Mary (Kuwadzana)",
      ],
    },
    {
      deanery: "Chitungwiza Deanery",
      parishes: [
        "St. Alois (Chitungwiza)",
        "St. Theresa (Seke)",
        "St. Monica (Zengeza)",
        "St. Mary (Seke)",
      ],
    },
    {
      deanery: "Mabvuku/Goromonzi Deanery",
      parishes: [
        "St. Fidelis (Mabvuku)",
        "St. Joseph (Chishawasha)",
        "St. Dominic (Churuwiza)",
        "St. Ignatius (Chishawasha)",
      ],
    },
    {
      deanery: "Mhondoro Deanery",
      parishes: [
        "St. Matia Kalemba (Norton)",
        "St. Anthony (Norton)",
        "St. Dominic (Mubayira)",
        "St. Michael (Mhondoro)",
        "St. Monica (Beatrice)",
      ],
    },
    {
      deanery: "Chivhu Deanery",
      parishes: [
        "St. Theresa (Chivhu)",
        "Our Lady of Montserrat (Enkeldoorn)",
        "St. Barbara (Charter)",
        "Our Lady of Fatima (Murambinda)",
      ],
    },
    {
      deanery: "Bindura Deanery",
      parishes: [
        "St. John's (Bindura)",
        "St. Albert's (Mazowe)",
        "Our Lady of the Rosary (Mvurwi)",
        "Christ the King (Concession)",
      ],
    },
    {
      deanery: "Murewa Deanery",
      parishes: [
        "St. Paul's (Musami)",
        "St. Clare (Murewa)",
        "St. Peter's (Juru)",
      ],
    },
    {
      deanery: "Mutoko Deanery",
      parishes: [
        "All Souls (Mutoko)",
        "St. Benedict's (Mutoko)",
        "St. Gabriel's (Mutoko)",
      ],
    },
  ];

  return (
    <Navbar expand="lg" className="site-header py-2">
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-3">
          <img src={logo} alt="Agnes & Alois Youth Guild Logo" />
          <div className="brand-text">
            <strong>Archdiocese of Harare</strong>
            <span>Roman Catholic Church</span>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          <Nav className="align-items-lg-center ms-auto navbar-shell">
            <NavDropdown
              title="Deaneries"
              id="deaneries-dropdown"
              className="nav-dropdown-modern"
            >
              <NavDropdown.Item as={Link} to="/deaneries" className="fw-bold text-primary">
                View All Deaneries
              </NavDropdown.Item>
              <NavDropdown.Divider />

              {deaneryData.map((item, index) => (
                <NavDropdown key={index} title={item.deanery} drop="end">
                  {item.parishes.map((parish, pIndex) => {
                    const slug = parish
                      .toLowerCase()
                      .replace(/[()']/g, "")
                      .replace(/\s+/g, "-");

                    return (
                      <NavDropdown.Item key={pIndex} as={Link} to={`/parishes/${slug}`}>
                        {parish}
                      </NavDropdown.Item>
                    );
                  })}
                </NavDropdown>
              ))}
            </NavDropdown>

            <NavLink to="/" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              About the Archdiocese
            </NavLink>
            <NavLink to="/leadership" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              Leadership
            </NavLink>
            <NavLink to="/ministries" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              Ministries
            </NavLink>
            <NavLink to="/news" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              News
            </NavLink>
            <NavLink to="/events" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              Events
            </NavLink>
            <NavLink to="/gallery" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              Gallery
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link-item ${isActive ? "active" : ""}`}>
              Contact
            </NavLink>

            <NavLink to="/join" className="join-link mt-2 mt-lg-0">
              Join Us
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;