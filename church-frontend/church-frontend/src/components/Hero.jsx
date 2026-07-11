import { motion } from "framer-motion";

function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const bgImage = "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="position-relative overflow-hidden" 
      style={{ 
        minHeight: "80vh",
        background: `linear-gradient(135deg, rgba(248,249,250,0.92) 0%, rgba(232,240,254,0.88) 100%), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Decorative elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="position-absolute top-0 end-0" 
        style={{ 
          width: "300px", 
          height: "300px", 
          background: "radial-gradient(circle, rgba(13,71,161,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(30%, -30%)",
        }} 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.2, 0.5]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="position-absolute bottom-0 start-0" 
        style={{ 
          width: "400px", 
          height: "400px", 
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-30%, 30%)",
        }} 
      />
      
      <div className="container py-4 position-relative">
        <div className="row align-items-center" style={{ minHeight: "75vh" }}>
          <div className="col-lg-6">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-1 mb-2" style={{ 
                  fontSize: "0.6rem", 
                  letterSpacing: "2px",
                }}>
                  ARCHDIOCESE OF HARARE
                </span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="fw-bold" style={{ 
                color: "#0D47A1", 
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                lineHeight: "1.1"
              }}>
                Agnes & Alois
                <br />
                <span style={{ color: "#D4AF37" }}>Youth Guild</span>
              </motion.h1>
              
              <motion.p variants={itemVariants} className="text-secondary mt-2" style={{ fontSize: "0.95rem", lineHeight: "1.6" }}>
                <span className="text-primary">United in faith</span>, 
                <span className="text-warning"> service</span>, and 
                <span className="text-primary"> community</span>.
              </motion.p>
              
              <motion.p variants={itemVariants} className="text-muted" style={{ fontSize: "0.85rem" }}>
                Building tomorrow's church today through youth empowerment and spiritual growth.
              </motion.p>
              
              <motion.div variants={itemVariants} className="d-flex flex-wrap gap-2 mt-3">
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(13,71,161,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary px-3 py-1 rounded-pill" 
                  style={{ fontSize: "0.8rem" }}
                >
                  Explore Parishes
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline-primary px-3 py-1 rounded-pill" 
                  style={{ fontSize: "0.8rem" }}
                >
                  Upcoming Events
                </motion.button>
              </motion.div>
              
              <motion.div variants={itemVariants} className="d-flex gap-4 mt-3 pt-2" style={{ borderTop: "1px solid rgba(13,71,161,0.08)" }}>
                {[{ value: "500+", label: "Members" }, { value: "12+", label: "Parishes" }, { value: "10+", label: "Programs" }].map((stat, i) => (
                  <motion.div key={i} whileHover={{ y: -3 }}>
                    <div className="fw-bold text-primary" style={{ fontSize: "1.1rem" }}>{stat.value}</div>
                    <div style={{ fontSize: "0.7rem", color: "#6c757d" }}>{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="col-lg-6 d-none d-lg-block"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="rounded-3 shadow-sm overflow-hidden" 
              style={{ 
                background: "linear-gradient(135deg, rgba(13,71,161,0.8), rgba(26,107,196,0.8))",
                backdropFilter: "blur(10px)",
                height: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <motion.span 
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ fontSize: "5rem", opacity: 0.15 }}
              >
                ⛪
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
export default Hero;