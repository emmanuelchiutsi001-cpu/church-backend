import { motion } from "framer-motion";

function GalleryPreview() {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Youth Fellowship",
      desc: "Young Catholics gathering in faith",
      icon: "🕊️"
    },
    {
      url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Community Service",
      desc: "Serving with love and compassion",
      icon: "🤝"
    },
    {
      url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      title: "Youth Group",
      desc: "United in Christ's love",
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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
      style={{ background: "#0D47A1" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-white mb-4"
        >
          <span className="badge bg-warning text-dark px-3 py-2 mb-2" style={{
            fontSize: "0.6rem",
            letterSpacing: "2px"
          }}>
            OUR COMMUNITY
          </span>
          <h2 className="fw-bold" style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)" }}>
            Moments From Our Community
          </h2>
          <div className="mx-auto" style={{ width: "50px", height: "3px", background: "#D4AF37" }} />
          <p className="text-white-50" style={{ fontSize: "0.9rem" }}>
            Sharing memories of faith, unity, and service
          </p>
        </motion.div>
        
        {/* Image Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="row g-4"
        >
          {images.map((image, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="col-md-4"
            >
              <motion.div 
                className="card border-0 shadow-sm overflow-hidden"
                style={{
                  borderRadius: "16px",
                  transition: "all 0.3s ease"
                }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 50px rgba(0,0,0,0.2)"
                }}
              >
                <div className="position-relative" style={{ height: "250px" }}>
                  <img 
                    src={image.url}
                    alt={image.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div style="height:250px;background:linear-gradient(135deg,#1a6bc4,#0D47A1);display:flex;flex-direction:column;align-items:center;justify-content:center;color:white;padding:20px;text-align:center;">
                          <div style="font-size:3rem;opacity:0.3;">${image.icon}</div>
                          <div style="font-weight:600;margin-top:10px;">${image.title}</div>
                          <div style="font-size:0.8rem;opacity:0.7;">${image.desc}</div>
                        </div>
                      `;
                    }}
                  />
                  {/* Overlay with icon */}
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                    background: "linear-gradient(135deg, rgba(13,71,161,0.1), rgba(212,175,55,0.05))"
                  }}>
                    <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{
                      background: "linear-gradient(transparent, rgba(0,0,0,0.6))"
                    }}>
                      <span style={{ fontSize: "1.5rem", color: "rgba(255,215,0,0.3)" }}>
                        {image.icon}
                      </span>
                      <h6 className="text-white fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
                        {image.title}
                      </h6>
                      <p className="text-white-50 mb-0" style={{ fontSize: "0.75rem" }}>
                        {image.desc}
                      </p>
                    </div>
                  </div>
                  {/* Decorative cross */}
                  <div className="position-absolute top-0 end-0 m-2">
                    <span style={{ fontSize: "1.5rem", color: "rgba(255,215,0,0.05)" }}>✝</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View All Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-4"
        >
          <motion.button 
            className="btn btn-warning px-4 py-2 rounded-pill"
            style={{ 
              fontSize: "0.85rem",
              fontWeight: "600",
              boxShadow: "0 4px 15px rgba(212,175,55,0.3)"
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 8px 30px rgba(212,175,55,0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Gallery →
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}
export default GalleryPreview;