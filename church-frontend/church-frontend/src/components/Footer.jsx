import { motion } from "framer-motion";

function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Parishes", href: "/deaneries" },
    { name: "Leadership", href: "/leadership" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "News", href: "/news" },
    { name: "Podcast", href: "/podcast" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "f" },
    { name: "Instagram", icon: "◎" },
    { name: "YouTube", icon: "▶" },
    { name: "X", icon: "X" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="site-footer"
    >
      <div className="container">
        <div className="row g-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-lg-4 col-md-6"
          >
            <div className="footer-brand">
              <motion.span
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="icon"
              >
                ⛪
              </motion.span>
              <div>
                <h5>Agnes &amp; Alois</h5>
                <small>Youth Guild • Harare</small>
              </div>
            </div>

            <p className="footer-copy">
              United in faith, service, and community. Building tomorrow&apos;s church today through youth empowerment and spiritual growth in the Archdiocese of Harare.
            </p>

            <div className="social-list">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  aria-label={social.name}
                  whileHover={{ y: -3, scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ delay: index * 0.06 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            viewport={{ once: true }}
            className="col-lg-4 col-md-6"
          >
            <div className="footer-title">Quick Links</div>
            <div className="footer-links">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            viewport={{ once: true }}
            className="col-lg-4 col-md-6"
          >
            <div className="footer-title">Contact Us</div>

            <div className="footer-meta">
              <div className="footer-meta-item">
                <span>✉</span>
                <span>info@agnesalois.org</span>
              </div>
              <div className="footer-meta-item">
                <span>⌂</span>
                <span>Archdiocese of Harare, Zimbabwe</span>
              </div>
              <div className="footer-meta-item">
                <span>☎</span>
                <span>+263 24 270 1234</span>
              </div>
            </div>

            <div className="footer-newsletter">
              <span className="label">Subscribe to our newsletter</span>
              <div className="field-row">
                <motion.input
                  type="email"
                  placeholder="Your email"
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }} type="button">
                  Join
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="footer-bottom"
        >
          <small>© {currentYear} Agnes &amp; Alois Youth Guild • Archdiocese of Harare. All rights reserved.</small>
          <div className="footer-bottom-links">
            {['Privacy Policy', 'Terms of Service', 'Sitemap'].map((item) => (
              <a href="#" key={item}>{item}</a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="back-to-top"
        type="button"
        aria-label="Back to top"
      >
        ↑
      </motion.button>
    </motion.footer>
  );
}

export default Footer;