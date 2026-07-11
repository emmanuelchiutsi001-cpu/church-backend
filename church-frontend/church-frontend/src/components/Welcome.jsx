import { motion } from "framer-motion";

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

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-5" 
      style={{ background: "#ffffff" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants}>
                <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-3" style={{ 
                  fontSize: "0.6rem", 
                  letterSpacing: "2px",
                  border: "1px solid rgba(13,71,161,0.1)"
                }}>
                  ABOUT OUR GUILD
                </span>
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="fw-bold mb-2" style={{ 
                color: "#0D47A1", 
                fontSize: "clamp(1.5rem, 3vw, 2.2rem)"
              }}>
                Welcome to <span style={{ color: "#D4AF37" }}>Agnes & Alois</span> Youth Guild
              </motion.h2>
              
              <motion.div variants={itemVariants} className="mx-auto mb-3" style={{ width: "50px", height: "3px", background: "#D4AF37" }} />
              
              <motion.p variants={itemVariants} className="text-secondary mx-auto" style={{ 
                fontSize: "clamp(0.9rem, 1.1vw, 1.05rem)", 
                maxWidth: "650px",
                lineHeight: "1.8"
              }}>
                A vibrant community of young Catholics dedicated to growing in faith, 
                serving others, and building lasting friendships through Christ-centered 
                activities and programs.
              </motion.p>

              <motion.div variants={itemVariants} className="row mt-4">
                {[
                  { icon: "✝", title: "Faith", desc: "Growing together in Christ" },
                  { icon: "🤝", title: "Service", desc: "Serving our communities" },
                  { icon: "❤️", title: "Unity", desc: "One family in faith" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="col-md-4"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-3">
                      <motion.span 
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                        style={{ fontSize: "2rem" }}
                      >
                        {item.icon}
                      </motion.span>
                      <h6 className="fw-bold mt-2" style={{ color: "#0D47A1", fontSize: "0.9rem" }}>{item.title}</h6>
                      <p className="text-muted" style={{ fontSize: "0.85rem" }}>{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
export default Welcome;