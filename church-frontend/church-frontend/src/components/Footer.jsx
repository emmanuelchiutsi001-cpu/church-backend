import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
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

  const socialLinks = [
    { name: "Facebook", icon: "📘", color: "#1877f2" },
    { name: "Instagram", icon: "📸", color: "#e4405f" },
    { name: "YouTube", icon: "▶️", color: "#ff0000" },
    { name: "Twitter", icon: "🐦", color: "#1da1f2" }
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-4" 
      style={{ background: "#0D47A1" }}
    >
      <div className="container">
        <div className="row g-4">
          {/* About Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-lg-4 col-md-6"
          >
            <div className="d-flex align-items-center gap-2 mb-2">
              <motion.span 
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity }}
                style={{ fontSize: "1.5rem" }}
              >
                ⛪
              </motion.span>
              <div>
                <h5 className="fw-bold text-white mb-0" style={{ fontSize: "1rem" }}>
                  Agnes & Alois
                </h5>
                <span style={{ fontSize: "0.6rem", color: "#D4AF37", letterSpacing: "2px" }}>
                  YOUTH GUILD • HARARE
                </span>
              </div>
            </div>
            
            <p className="text-white-50" style={{ 
              fontSize: "0.8rem", 
              lineHeight: "1.7",
              maxWidth: "300px"
            }}>
              United in faith, service, and community. Building tomorrow's church today through youth empowerment and spiritual growth in the Archdiocese of Harare.
            </p>
            
            <div className="d-flex gap-2 mt-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ 
                    scale: 1.15,
                    y: -3,
                    background: `${social.color}30`,
                    borderColor: social.color,
                    color: "white"
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="d-flex align-items-center justify-content-center rounded-circle text-decoration-none"
                  style={{
                    width: "32px",
                    height: "32px",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    fontSize: "0.8rem",
                    transition: "all 0.3s ease",
                    color: "rgba(255,255,255,0.6)"
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="col-lg-4 col-md-6"
          >
            <h6 className="fw-bold text-warning mb-3" style={{ fontSize: "0.8rem", letterSpacing: "2px" }}>
              QUICK LINKS
            </h6>
            <div className="row g-1">
              {quickLinks.map((link, index) => (
                <motion.div 
                  className="col-6" 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a
                    href={link.href}
                    className="text-decoration-none d-block py-1"
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(255,255,255,0.6)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#D4AF37"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
                  >
                    <span style={{ color: "#D4AF37", marginRight: "4px" }}>›</span>
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="col-lg-4 col-md-6"
          >
            <h6 className="fw-bold text-warning mb-3" style={{ fontSize: "0.8rem", letterSpacing: "2px" }}>
              CONTACT US
            </h6>
            
            <div className="d-flex gap-2 mb-2">
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontSize: "0.8rem", color: "#D4AF37" }}
              >
                📧
              </motion.span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                info@agnesalois.org
              </span>
            </div>
            
            <div className="d-flex gap-2 mb-2">
              <span style={{ fontSize: "0.8rem", color: "#D4AF37" }}>📍</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                Archdiocese of Harare, Zimbabwe
              </span>
            </div>
            
            <div className="d-flex gap-2 mb-3">
              <span style={{ fontSize: "0.8rem", color: "#D4AF37" }}>📞</span>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                +263 24 270 1234
              </span>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-2">
              <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>
                Subscribe to our newsletter
              </p>
              <div className="d-flex gap-1">
                <motion.input
                  type="email"
                  placeholder="Your email"
                  className="form-control form-control-sm"
                  whileFocus={{ scale: 1.02 }}
                  style={{
                    fontSize: "0.7rem",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "white",
                    borderRadius: "20px",
                    padding: "4px 12px"
                  }}
                />
                <motion.button
                  className="btn btn-warning btn-sm px-3"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    fontSize: "0.65rem",
                    borderRadius: "20px",
                    fontWeight: "600",
                    whiteSpace: "nowrap"
                  }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <hr style={{ 
            opacity: 0.1, 
            borderColor: "#ffffff", 
            margin: "20px 0 12px 0" 
          }} />
          
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
            <p className="text-white-50 mb-0" style={{ 
              fontSize: "0.65rem",
              letterSpacing: "0.5px"
            }}>
              © {currentYear} Agnes & Alois Youth Guild • Archdiocese of Harare. All Rights Reserved.
            </p>
            
            <div className="d-flex gap-3">
              {["Privacy Policy", "Terms of Service", "Sitemap"].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-decoration-none"
                  whileHover={{ color: "rgba(255,255,255,0.6)" }}
                  style={{ 
                    fontSize: "0.6rem", 
                    color: "rgba(255,255,255,0.3)",
                    transition: "color 0.3s ease",
                    letterSpacing: "1px"
                  }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="position-fixed border-0 rounded-circle shadow-sm"
        style={{
          bottom: "20px",
          right: "20px",
          width: "40px",
          height: "40px",
          background: "#D4AF37",
          color: "#0D47A1",
          fontSize: "1.2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 999,
          cursor: "pointer"
        }}
      >
        ↑
      </motion.button>
    </motion.footer>
  );
}
export default Footer;