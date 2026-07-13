import { motion } from "framer-motion";
import guildImage from "../assets/guild.jpeg";

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

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="position-relative overflow-hidden" 
      style={{ 
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        background: `url(${guildImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Premium Gradient Overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: `
            linear-gradient(135deg, 
              rgba(0,0,0,0.75) 0%, 
              rgba(0,0,0,0.55) 30%, 
              rgba(0,0,0,0.35) 50%,
              rgba(0,0,0,0.15) 70%,
              rgba(0,0,0,0.05) 100%
            )
          `,
          zIndex: 1
        }}
      />

      {/* Gold Glow Effect */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, rgba(212,175,55,0.06) 0%, transparent 60%)",
          zIndex: 1
        }}
      />

      {/* Decorative Gold Circles */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.05, 0.15]
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="position-absolute top-0 end-0" 
        style={{ 
          width: "600px", 
          height: "600px", 
          background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(30%, -20%)",
          zIndex: 1
        }} 
      />

      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.03, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, delay: 2 }}
        className="position-absolute bottom-0 start-0" 
        style={{ 
          width: "500px", 
          height: "500px", 
          background: "radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-20%, 20%)",
          zIndex: 1
        }} 
      />

      {/* Content */}
      <div className="container-fluid h-100 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center" style={{ minHeight: "100vh" }}>
          <div className="col-lg-7 offset-lg-1 px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <span className="d-inline-block px-4 py-2 mb-4" style={{ 
                  fontSize: "0.6rem", 
                  letterSpacing: "4px",
                  background: "rgba(212,175,55,0.12)",
                  color: "#D4AF37",
                  border: "1px solid rgba(212,175,55,0.15)",
                  backdropFilter: "blur(15px)",
                  borderRadius: "50px",
                  fontWeight: "600",
                  textTransform: "uppercase"
                }}>
                  Archdiocese of Harare
                </span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="fw-bold mb-3" style={{ 
                color: "#FFFFFF", 
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: "1.05",
                textShadow: "0 4px 40px rgba(0,0,0,0.4)",
                letterSpacing: "-1px"
              }}>
                Agnes & Alois
                <br />
                <span style={{ 
                  color: "#D4AF37", 
                  textShadow: "0 2px 30px rgba(212,175,55,0.2)",
                  display: "inline-block",
                  position: "relative"
                }}>
                  Youth Guild
                  <span style={{
                    position: "absolute",
                    bottom: "-8px",
                    left: "0",
                    width: "80px",
                    height: "3px",
                    background: "#D4AF37",
                    borderRadius: "2px",
                    boxShadow: "0 2px 20px rgba(212,175,55,0.3)"
                  }} />
                </span>
              </motion.h1>

              <motion.p variants={itemVariants} style={{ 
                fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
                maxWidth: "580px",
                lineHeight: "1.9",
                marginTop: "25px",
                marginBottom: "20px",
                color: "rgba(255,255,255,0.85)",
                textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                fontWeight: "300",
                letterSpacing: "0.3px"
              }}>
                A story of <span style={{ color: "#D4AF37", fontWeight: "400" }}>faith</span>, 
                <span style={{ color: "#FFFFFF", fontWeight: "300" }}> service</span>, and 
                <span style={{ color: "#D4AF37", fontWeight: "400" }}> community</span> 
                in the heart of Zimbabwe. Building tomorrow's church today through 
                youth empowerment and spiritual growth.
              </motion.p>

              <motion.div variants={itemVariants} className="d-flex flex-wrap gap-3 mt-4">
                <motion.button 
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 8px 40px rgba(212,175,55,0.4)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn px-5 py-3 rounded-pill fw-bold" 
                  style={{ 
                    fontSize: "0.85rem", 
                    background: "linear-gradient(135deg, #D4AF37 0%, #C5A027 100%)",
                    color: "#0D47A1",
                    border: "none",
                    boxShadow: "0 4px 25px rgba(212,175,55,0.25)",
                    transition: "all 0.3s ease"
                  }}
                >
                  Explore Our Story →
                </motion.button>
                <motion.button 
                  whileHover={{ 
                    scale: 1.05, 
                    background: "rgba(255,255,255,0.12)",
                    borderColor: "rgba(255,255,255,0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="btn px-5 py-3 rounded-pill fw-bold" 
                  style={{ 
                    fontSize: "0.85rem", 
                    color: "#FFFFFF",
                    border: "2px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.3s ease"
                  }}
                >
                  View Events
                </motion.button>
              </motion.div>

              <motion.div variants={itemVariants} className="d-flex gap-5 mt-4 pt-3" style={{ 
                borderTop: "1px solid rgba(255,255,255,0.06)" 
              }}>
                {[
                  { value: "500+", label: "Active Members" },
                  { value: "12+", label: "Parishes" },
                  { value: "15", label: "Years of Service" }
                ].map((stat, i) => (
                  <motion.div key={i} whileHover={{ y: -3, scale: 1.02 }}>
                    <div className="fw-bold" style={{ 
                      fontSize: "clamp(1.2rem, 1.8vw, 1.8rem)", 
                      color: "#D4AF37",
                      textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                      lineHeight: "1.2"
                    }}>
                      {stat.value}
                    </div>
                    <div style={{ 
                      fontSize: "0.65rem", 
                      color: "rgba(255,255,255,0.4)", 
                      letterSpacing: "1.5px",
                      fontWeight: "300",
                      textTransform: "uppercase"
                    }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right Panel - Quote */}
          <div className="col-lg-3 d-none d-lg-block">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-end"
            >
              <div 
                className="d-inline-block p-4 rounded-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(15px)",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}
              >
                <motion.p
                  animate={{
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  style={{
                    color: "#D4AF37",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    letterSpacing: "1px",
                    margin: 0,
                    maxWidth: "200px"
                  }}
                >
                  "Building tomorrow's church today"
                </motion.p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  style={{
                    height: "1px",
                    background: "linear-gradient(90deg, #D4AF37, transparent)",
                    marginTop: "12px",
                    marginLeft: "auto",
                    width: "100%"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="position-absolute bottom-4 start-50 translate-middle-x"
        style={{
          zIndex: 2,
          bottom: "30px"
        }}
      >
        <div className="text-center">
          <span style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.6rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            display: "block"
          }}>
            Scroll
          </span>
          <span style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: "1.5rem",
            display: "block",
            marginTop: "-5px"
          }}>
            ⌄
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
export default Hero;