import { motion } from "framer-motion";

function MissionCards() {
  const cards = [
    { 
      title: "Our Mission", 
      text: "To serve God and humanity through faith, love, and action — empowering young Catholics to become disciples of Christ.", 
      icon: "✝" 
    },
    { 
      title: "Our Vision", 
      text: "A united, empowered, and vibrant Catholic youth community transforming Zimbabwe through the Gospel.", 
      icon: "🌟" 
    },
    { 
      title: "Our Motto", 
      text: "Faith • Unity • Service — Living the Gospel, building the Church, serving our community.", 
      icon: "❤️" 
    }
  ];

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
      className="py-4" 
      style={{ background: "#f8f9fa" }}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-2" style={{ 
            fontSize: "0.5rem", 
            letterSpacing: "3px",
            border: "1px solid rgba(13,71,161,0.1)"
          }}>
            OUR IDENTITY
          </span>
          <h4 className="fw-bold" style={{ color: "#0D47A1", fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}>
            Who <span style={{ color: "#D4AF37" }}>We Are</span>
          </h4>
          <div className="mx-auto" style={{ width: "40px", height: "2px", background: "#D4AF37" }} />
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row g-3"
        >
          {cards.map((card, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="col-md-4"
            >
              <motion.div 
                className="p-3 bg-white rounded-3 shadow-sm text-center h-100"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 12px 40px rgba(13,71,161,0.08)"
                }}
                transition={{ duration: 0.3 }}
                style={{ borderBottom: `3px solid ${i === 0 ? "#0D47A1" : i === 1 ? "#D4AF37" : "#dc3545"}` }}
              >
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  style={{ fontSize: "2rem", color: "#D4AF37", display: "block", marginBottom: "6px" }}
                >
                  {card.icon}
                </motion.span>
                <h6 className="fw-bold" style={{ color: "#0D47A1", fontSize: "0.9rem" }}>{card.title}</h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.8rem", lineHeight: "1.6" }}>{card.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
export default MissionCards;