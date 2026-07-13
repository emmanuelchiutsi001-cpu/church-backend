import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function History() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const historyData = [
    {
      period: "2010",
      title: "The Foundation",
      description: "Agnes & Alois Youth Guild was established at St. Mary's Cathedral with 50 founding members, inspired by the patron saints of youth. The founding members came together with a shared vision of creating a vibrant Catholic youth community in Harare.",
      icon: "🌱",
      color: "#4CAF50",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop"
    },
    {
      period: "2011 - 2013",
      title: "Growth & Outreach",
      description: "Expanded to 5 parishes, launched community outreach programs and youth leadership training initiatives. The guild began making a significant impact in local communities through various charitable activities.",
      icon: "📈",
      color: "#2196F3",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=400&h=300&fit=crop"
    },
    {
      period: "2014 - 2016",
      title: "Expansion & Impact",
      description: "Grew to 8 parishes. Hosted the first annual youth convention with 200+ attendees from across Harare. The convention became a landmark event, bringing together young Catholics from all over the archdiocese.",
      icon: "🌟",
      color: "#FF9800",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
    },
    {
      period: "2017 - 2019",
      title: "Strengthening Faith",
      description: "Introduced mentorship programs, Bible study groups, and participated in international youth exchanges. The guild established partnerships with other youth organizations across Africa.",
      icon: "📖",
      color: "#9C27B0",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
    },
    {
      period: "2020 - 2022",
      title: "Resilience & Innovation",
      description: "Adapted to online ministry during the pandemic. Launched digital catechesis, virtual fellowship, and online prayer groups. The guild showed remarkable resilience and innovation during challenging times.",
      icon: "💪",
      color: "#E91E63",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop"
    },
    {
      period: "2023 - Present",
      title: "Thriving Community",
      description: "Over 500 active members across 12+ parishes. Recognized for outstanding service by the Archdiocese of Harare. The guild continues to grow and inspire young Catholics across Zimbabwe.",
      icon: "❤️",
      color: "#D4AF37",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=400&h=300&fit=crop"
    }
  ];

  const stats = [
    { number: "500+", label: "Active Members", icon: "👥" },
    { number: "12+", label: "Parishes", icon: "⛪" },
    { number: "15", label: "Years of Service", icon: "🎂" },
    { number: "10+", label: "Programs", icon: "📋" }
  ];

  // Handle scroll to highlight active card
  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.history-card');
      const scrollPosition = window.scrollY + 300;
      
      cards.forEach((card, index) => {
        const cardTop = card.offsetTop;
        const cardBottom = cardTop + card.offsetHeight;
        
        if (scrollPosition >= cardTop && scrollPosition <= cardBottom) {
          setActiveIndex(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-5" 
      style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%)" }}
      ref={containerRef}
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
            fontSize: "0.55rem",
            letterSpacing: "3px",
            border: "1px solid rgba(13,71,161,0.1)"
          }}>
            OUR JOURNEY
          </span>
          <h2 className="fw-bold" style={{
            color: "#0D47A1",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)"
          }}>
            Our Story of <span style={{ color: "#D4AF37" }}>Faith & Service</span>
          </h2>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            A legacy of persistence, sacrifice, and growth in the heart of Zimbabwe
          </p>
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

        {/* Sticky Header + Scrollable Cards */}
        <div className="row g-4">
          {/* Sticky Left Column - Timeline */}
          <div className="col-lg-4">
            <div 
              className="position-sticky" 
              style={{ 
                top: "100px",
                zIndex: 10
              }}
            >
              <div className="bg-white rounded-4 shadow-sm p-4">
                <h5 className="fw-bold text-primary mb-3" style={{ fontSize: "1.1rem" }}>
                  <span style={{ color: "#D4AF37" }}>⏳</span> Our Timeline
                </h5>
                <div className="d-flex flex-column gap-2">
                  {historyData.map((item, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        const card = document.querySelectorAll('.history-card')[index];
                        if (card) {
                          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }
                      }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="border-0 rounded-3 text-start px-3 py-2"
                      style={{
                        background: activeIndex === index ? "#0D47A1" : "transparent",
                        color: activeIndex === index ? "#FFFFFF" : "#495057",
                        transition: "all 0.3s ease",
                        borderLeft: activeIndex === index ? "3px solid #D4AF37" : "3px solid transparent"
                      }}
                    >
                      <div style={{ 
                        fontSize: "0.65rem", 
                        fontWeight: "600",
                        color: activeIndex === index ? "#D4AF37" : "#6c757d"
                      }}>
                        {item.period}
                      </div>
                      <div style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                        {item.title}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Right Column - Cards */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              {historyData.map((item, index) => (
                <motion.div
                  key={index}
                  className="history-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  style={{
                    scrollMarginTop: "100px"
                  }}
                >
                  <motion.div 
                    className="card border-0 shadow-sm overflow-hidden"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 12px 40px rgba(13,71,161,0.1)"
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      borderRadius: "16px",
                      borderLeft: `4px solid ${item.color}`
                    }}
                  >
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="img-fluid"
                          style={{
                            height: "200px",
                            width: "100%",
                            objectFit: "cover"
                          }}
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body p-3">
                          <div className="d-flex align-items-center gap-2 mb-2">
                            <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                            <span className="badge" style={{
                              background: `${item.color}20`,
                              color: item.color,
                              fontSize: "0.55rem",
                              fontWeight: "600"
                            }}>
                              {item.period}
                            </span>
                          </div>
                          <h5 className="fw-bold" style={{ 
                            color: "#0D47A1",
                            fontSize: "1rem"
                          }}>
                            {item.title}
                          </h5>
                          <p className="text-muted mb-0" style={{
                            fontSize: "0.8rem",
                            lineHeight: "1.7"
                          }}>
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-5 pt-3"
          style={{ borderTop: "1px solid rgba(13,71,161,0.06)" }}
        >
          <div className="row g-2">
            {[
              { icon: "✝", title: "Faith", desc: "Rooted in Christ and the Church" },
              { icon: "🤝", title: "Service", desc: "Living the Gospel in action" },
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
                    style={{ fontSize: "1.8rem" }}
                  >
                    {item.icon}
                  </motion.span>
                  <h6 className="fw-bold mt-1" style={{ color: "#0D47A1", fontSize: "0.85rem" }}>{item.title}</h6>
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