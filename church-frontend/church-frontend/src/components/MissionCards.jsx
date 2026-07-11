import { motion } from "framer-motion";

function MissionCards() {
  const cards = [
    { title: "Mission", text: "To serve God and humanity through faith, love and action.", icon: "✝" },
    { title: "Vision", text: "A united and empowered Catholic youth community.", icon: "🌟" },
    { title: "Motto", text: "Faith • Unity • Service", icon: "❤️" }
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
          <h4 className="fw-bold" style={{ color: "#0D47A1", fontSize: "1.3rem" }}>Our Identity</h4>
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
                className="p-3 bg-white rounded-3 shadow-sm text-center"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 12px 40px rgba(13,71,161,0.08)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  style={{ fontSize: "1.8rem", color: "#D4AF37" }}
                >
                  {card.icon}
                </motion.span>
                <h6 className="fw-bold mt-1" style={{ color: "#0D47A1", fontSize: "0.85rem" }}>{card.title}</h6>
                <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>{card.text}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
export default MissionCards;