import { motion } from "framer-motion";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="hero-section"
    >
      <div className="hero-overlay" />
      <div className="hero-radial hero-radial--gold" />
      <div className="hero-radial hero-radial--soft" />

      <div className="container hero-content">
        <div className="row w-100 align-items-center g-0">
          <div className="col-lg-7 hero-copy">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <span className="hero-kicker">Archdiocese of Harare</span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="hero-title">
                Agnes &amp; Alois
                <br />
                <span className="hero-title-accent">Youth Guild</span>
              </motion.h1>

              <motion.p variants={itemVariants} className="hero-subtitle">
                A story of <strong>faith</strong>, service, and <strong>community</strong> in the heart of Zimbabwe. Building tomorrow&apos;s church today through youth empowerment and spiritual growth.
              </motion.p>

              <motion.div variants={itemVariants} className="hero-actions">
                <button className="btn-primary-custom" type="button">
                  Explore Our Story →
                </button>

                <button className="btn-secondary-custom" type="button">
                  View Events
                </button>
              </motion.div>

              <motion.div variants={itemVariants} className="hero-stats">
                {[
                  { value: "500+", label: "Active Members" },
                  { value: "12+", label: "Parishes" },
                  { value: "15+", label: "Years of Service" },
                ].map((item) => (
                  <div key={item.label} className="hero-stat">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <div className="text-center">
          <span>Scroll</span>
          <span>⌄</span>
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;