import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import rosaryImage from "../assets/rosary.jpeg";

function Welcome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const sectionRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-5 position-relative overflow-hidden" 
      style={{ 
        minHeight: "100vh",
        background: `url(${rosaryImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for text readability */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.2) 100%)",
          zIndex: 1
        }}
      />

      {/* Gold glow overlay */}
      <div 
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(212,175,55,0.05) 0%, transparent 70%)",
          zIndex: 1
        }}
      />

      {/* Decorative cross background */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.05, 0.08, 0.05]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="position-absolute top-50 start-50 translate-middle"
        style={{
          fontSize: "25rem",
          color: "rgba(255,255,255,0.03)",
          zIndex: 1,
          pointerEvents: "none"
        }}
      >
        ✝
      </motion.div>

      {/* Sticky Header */}
      <div 
        className={`position-sticky py-3 ${isSticky ? 'bg-white shadow-sm' : ''}`}
        style={{ 
          top: "70px",
          zIndex: 10,
          transition: "all 0.3s ease",
          borderRadius: isSticky ? "0 0 16px 16px" : "0",
          background: isSticky ? "rgba(255,255,255,0.95)" : "transparent",
          backdropFilter: isSticky ? "blur(10px)" : "none"
        }}
      >
        <div className="container position-relative" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="badge px-3 py-2 mb-2" style={{ 
              fontSize: "0.55rem", 
              letterSpacing: "3px",
              background: "rgba(212,175,55,0.15)",
              color: "#D4AF37",
              border: "1px solid rgba(212,175,55,0.2)",
              backdropFilter: "blur(10px)"
            }}>
              ABOUT THE GUILD
            </span>
            <h2 className="fw-bold" style={{ 
              color: isSticky ? "#0D47A1" : "#FFFFFF",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              textShadow: isSticky ? "none" : "0 2px 20px rgba(0,0,0,0.3)"
            }}>
              United in <span style={{ color: "#D4AF37" }}>Faith</span>, 
              <br className="d-md-none" /> Service & Community
            </h2>
            <div className="mx-auto" style={{ width: "60px", height: "3px", background: "#D4AF37" }} />
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container position-relative" style={{ zIndex: 2, marginTop: "30px" }}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-4 p-4 p-md-5"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
              }}
            >
              {/* Our Foundation */}
              <motion.div variants={itemVariants}>
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(255,255,255,0.15)",
                      color: "#D4AF37",
                      fontSize: "1.5rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                      ⛪
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold" style={{ color: "#FFFFFF", textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}>Our Foundation</h5>
                    <p className="text-white" style={{ 
                      fontSize: "clamp(0.9rem, 1vw, 1rem)", 
                      lineHeight: "1.8",
                      marginBottom: 0,
                      opacity: 0.9,
                      textShadow: "0 1px 8px rgba(0,0,0,0.2)"
                    }}>
                      The <strong style={{ color: "#D4AF37" }}>Agnes & Alois Youth Guild</strong>, established under the <strong style={{ color: "#D4AF37" }}>Archdiocese of Harare</strong>, 
                      serves as a vibrant community of young Catholics dedicated to growing in faith, serving others, 
                      and building lasting friendships through Christ-centered activities and programs.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Our Patron Saints */}
              <motion.div variants={itemVariants}>
                <div className="d-flex align-items-start gap-3 mb-4">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(255,255,255,0.15)",
                      color: "#D4AF37",
                      fontSize: "1.5rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                      ✝
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold" style={{ color: "#FFFFFF", textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}>Our Patron Saints</h5>
                    <p className="text-white" style={{ 
                      fontSize: "clamp(0.9rem, 1vw, 1rem)", 
                      lineHeight: "1.8",
                      marginBottom: 0,
                      opacity: 0.9,
                      textShadow: "0 1px 8px rgba(0,0,0,0.2)"
                    }}>
                      Our guild takes its name from <strong style={{ color: "#D4AF37" }}>St. Agnes</strong> and 
                      <strong style={{ color: "#D4AF37" }}> St. Aloisius Gonzaga</strong>, patrons of youth and purity, 
                      inspiring us to live lives of courage, holiness, and dedication to God.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Our Mission */}
              <motion.div variants={itemVariants}>
                <div className="d-flex align-items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: "50px",
                      height: "50px",
                      background: "rgba(255,255,255,0.15)",
                      color: "#D4AF37",
                      fontSize: "1.5rem",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)"
                    }}>
                      ❤️
                    </div>
                  </div>
                  <div>
                    <h5 className="fw-bold" style={{ color: "#FFFFFF", textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}>Our Mission</h5>
                    <p className="text-white" style={{ 
                      fontSize: "clamp(0.9rem, 1vw, 1rem)", 
                      lineHeight: "1.8",
                      marginBottom: 0,
                      opacity: 0.9,
                      textShadow: "0 1px 8px rgba(0,0,0,0.2)"
                    }}>
                      Building tomorrow's church today through youth empowerment, spiritual growth, 
                      and Christ-centered community. <span style={{ color: "#D4AF37", fontWeight: "500" }}>United in faith, service, and love.</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bible Verse */}
              <motion.div 
                variants={itemVariants}
                className="mt-4 pt-3 text-center"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.1)"
                }}
              >
                <blockquote className="mb-0" style={{
                  fontSize: "0.85rem",
                  color: "rgba(255,255,255,0.7)",
                  fontStyle: "italic",
                  textShadow: "0 1px 8px rgba(0,0,0,0.2)"
                }}>
                  "Let no one despise your youth, but set the believers an example in speech and conduct, in love, in faith, in purity."
                  <br />
                  <span style={{ fontSize: "0.7rem", color: "#D4AF37" }}>— 1 Timothy 4:12</span>
                </blockquote>
              </motion.div>
            </motion.div>

            {/* Three Pillars */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="row mt-4 g-3"
            >
              {[
                { icon: "✝", title: "Faith Formation", desc: "Deepening our relationship with Christ through prayer, scripture, and the sacraments." },
                { icon: "🤝", title: "Community Service", desc: "Living the Gospel through outreach, charity, and serving those in need." },
                { icon: "❤️", title: "Youth Fellowship", desc: "Building lasting friendships and a supportive community of young believers." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="col-md-4"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 text-center h-100" style={{ 
                    background: "rgba(255,255,255,0.08)",
                    backdropFilter: "blur(15px)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.05)"
                  }}>
                    <motion.span 
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                      style={{ fontSize: "2rem", display: "block", marginBottom: "6px" }}
                    >
                      {item.icon}
                    </motion.span>
                    <h6 className="fw-bold" style={{ color: "#FFFFFF", fontSize: "0.85rem", textShadow: "0 1px 8px rgba(0,0,0,0.2)" }}>{item.title}</h6>
                    <p className="text-white" style={{ 
                      fontSize: "0.75rem", 
                      lineHeight: "1.6",
                      opacity: 0.8,
                      textShadow: "0 1px 8px rgba(0,0,0,0.2)"
                    }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mt-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(212,175,55,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="btn px-4 py-2 rounded-pill"
                style={{ 
                  fontSize: "0.8rem", 
                  fontWeight: "600",
                  background: "#D4AF37",
                  color: "#0D47A1",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(212,175,55,0.3)"
                }}
              >
                Learn More About Us →
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
export default Welcome;