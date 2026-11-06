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
              <div
                className="mission-card"
                style={{ borderBottom: `3px solid ${i === 0 ? "#0D47A1" : i === 1 ? "#D4AF37" : "#dc3545"}` }}
              >
                <span className="mission-icon">{card.icon}</span>
                <h6 className="mission-title">{card.title}</h6>
                <p className="mission-text">{card.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
export default MissionCards;