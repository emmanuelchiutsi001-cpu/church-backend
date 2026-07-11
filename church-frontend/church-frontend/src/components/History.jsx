import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function History() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const historyData = [
    {
      period: "2010 - 2012",
      title: "The Foundation Years",
      description: "Agnes & Alois Youth Guild was established at St. Mary's Cathedral with 50 founding members.",
      icon: "🌱",
      color: "#4CAF50"
    },
    {
      period: "2013 - 2015",
      title: "Growth & Service",
      description: "Launched community outreach programs, youth leadership training, and grew to 12 parishes.",
      icon: "📈",
      color: "#2196F3"
    },
    {
      period: "2016 - 2018",
      title: "Expansion & Impact",
      description: "Hosted the first annual youth convention with 300+ attendees. Participated in international exchange.",
      icon: "🌟",
      color: "#FF9800"
    },
    {
      period: "2019 - 2021",
      title: "Resilience & Innovation",
      description: "Introduced mentorship programs. Adapted to online ministry during the pandemic.",
      icon: "💪",
      color: "#9C27B0"
    },
    {
      period: "2022 - 2023",
      title: "Community Impact",
      description: "Recognized for outstanding community service by the Archdiocese.",
      icon: "👏",
      color: "#E91E63"
    },
    {
      period: "2024 - Present",
      title: "Thriving Community",
      description: "Over 500 active members across 12+ parishes. Continuing to grow in faith and service.",
      icon: "❤️",
      color: "#D4AF37"
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 3 >= historyData.length ? 0 : prevIndex + 3
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, historyData.length]);

  const visibleCards = historyData.slice(currentIndex, currentIndex + 3);
  const remaining = 3 - visibleCards.length;
  const fullDisplay = [...visibleCards, ...historyData.slice(0, remaining)];
  const totalSlides = Math.ceil(historyData.length / 3);

  const stats = [
    { number: "500+", label: "Active Members", icon: "👥" },
    { number: "12+", label: "Parishes", icon: "⛪" },
    { number: "15", label: "Years of Service", icon: "🎂" },
    { number: "10+", label: "Programs", icon: "📋" }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-5" 
      style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%)" }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 mb-2" style={{
            fontSize: "0.6rem",
            letterSpacing: "2px",
            border: "1px solid rgba(13,71,161,0.1)"
          }}>
            OUR HISTORY
          </span>
          <h2 className="fw-bold" style={{
            color: "#0D47A1",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)"
          }}>
            Our Journey of <span style={{ color: "#D4AF37" }}>Faith & Service</span>
          </h2>
          <div className="mx-auto mb-2" style={{ width: "50px", height: "3px", background: "#D4AF37" }} />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="row g-2 mb-4"
        >
          {stats.map((stat, index) => (
            <motion.div 
              className="col-6 col-md-3" 
              key={index}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-3 p-2 text-center shadow-sm">
                <div style={{ fontSize: "1.2rem" }}>{stat.icon}</div>
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="fw-bold text-primary" 
                  style={{ fontSize: "1rem" }}
                >
                  {stat.number}
                </motion.div>
                <div style={{ fontSize: "0.6rem", color: "#6c757d" }}>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Auto-Sliding Cards */}
        <div 
          className="position-relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="row g-3">
            {fullDisplay.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="col-md-4"
              >
                <motion.div 
                  className="card border-0 h-100 shadow-sm"
                  style={{
                    borderRadius: "12px",
                    overflow: "hidden"
                  }}
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 12px 40px rgba(13,71,161,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    style={{
                      height: "3px",
                      background: item.color,
                      width: "100%",
                      transformOrigin: "left"
                    }} 
                  />
                  <div className="card-body p-3">
                    <div className="d-flex align-items-start gap-2">
                      <motion.div 
                        className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity }}
                        style={{
                          width: "40px",
                          height: "40px",
                          background: `${item.color}15`,
                          fontSize: "1.2rem"
                        }}
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <span className="badge" style={{
                          background: `${item.color}20`,
                          color: item.color,
                          fontSize: "0.5rem",
                          fontWeight: "600"
                        }}>
                          {item.period}
                        </span>
                        <h6 className="fw-bold mt-1" style={{
                          color: "#0D47A1",
                          fontSize: "0.85rem"
                        }}>
                          {item.title}
                        </h6>
                      </div>
                    </div>
                    <p className="text-muted mt-2 mb-0" style={{
                      fontSize: "0.75rem",
                      lineHeight: "1.6",
                      marginLeft: "48px"
                    }}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index * 3)}
                className="border-0 rounded-pill"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: index === Math.floor(currentIndex / 3) ? "20px" : "8px",
                  height: "6px",
                  background: index === Math.floor(currentIndex / 3) ? "#0D47A1" : "#d3d3d3",
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={() => {
              setCurrentIndex((prev) => 
                prev - 3 < 0 ? historyData.length - 3 : prev - 3
              );
            }}
            className="position-absolute top-50 start-0 translate-middle-y border-0 bg-white shadow-sm rounded-circle"
            whileHover={{ scale: 1.1, boxShadow: "0 4px 15px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              left: "-12px",
              zIndex: 2,
              fontSize: "0.8rem"
            }}
          >
            ‹
          </motion.button>

          <motion.button
            onClick={() => {
              setCurrentIndex((prev) => 
                prev + 3 >= historyData.length ? 0 : prev + 3
              );
            }}
            className="position-absolute top-50 end-0 translate-middle-y border-0 bg-white shadow-sm rounded-circle"
            whileHover={{ scale: 1.1, boxShadow: "0 4px 15px rgba(0,0,0,0.15)" }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              right: "-12px",
              zIndex: 2,
              fontSize: "0.8rem"
            }}
          >
            ›
          </motion.button>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-4 pt-3"
          style={{ borderTop: "1px solid rgba(13,71,161,0.06)" }}
        >
          <div className="row g-2">
            {[
              { icon: "✝", title: "Faith", desc: "Rooted in Christ" },
              { icon: "🤝", title: "Service", desc: "Living the Gospel" },
              { icon: "❤️", title: "Unity", desc: "One family in Christ" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="col-md-4"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center p-2">
                  <motion.span 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                    style={{ fontSize: "1.5rem" }}
                  >
                    {item.icon}
                  </motion.span>
                  <h6 className="fw-bold mt-1" style={{ color: "#0D47A1", fontSize: "0.8rem" }}>{item.title}</h6>
                  <p className="text-muted" style={{ fontSize: "0.7rem" }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
export default History;