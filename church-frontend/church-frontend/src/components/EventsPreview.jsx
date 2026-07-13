import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function EventsPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const events = [
    { title: "Youth Gathering", date: "Every Friday", desc: "Weekly fellowship, prayer, and worship", icon: "🙏" },
    { title: "Parish Celebration", date: "Monthly", desc: "Community worship, sharing, and fellowship", icon: "⛪" },
    { title: "Annual Convention", date: "Coming Soon", desc: "Youth conference, retreat, and leadership training", icon: "🌟" },
    { title: "Bible Study", date: "Every Wednesday", desc: "Deepening our faith through scripture and discussion", icon: "📖" },
    { title: "Youth Choir", date: "Saturdays", desc: "Singing praises to the Lord through music", icon: "🎵" },
    { title: "Community Outreach", date: "Monthly", desc: "Serving our community with love and compassion", icon: "🤝" }
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex + 3 >= events.length ? 0 : prevIndex + 3
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isHovered, events.length]);

  const visibleEvents = events.slice(currentIndex, currentIndex + 3);
  const remaining = 3 - visibleEvents.length;
  const fullDisplay = [...visibleEvents, ...events.slice(0, remaining)];
  const totalSlides = Math.ceil(events.length / 3);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-4 bg-light"
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
            WHAT'S HAPPENING
          </span>
          <h4 className="fw-bold" style={{ color: "#0D47A1", fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}>
            Upcoming <span style={{ color: "#D4AF37" }}>Events</span>
          </h4>
          <div className="mx-auto" style={{ width: "40px", height: "2px", background: "#D4AF37" }} />
          <p className="text-muted" style={{ fontSize: "0.8rem" }}>Join us in our faith-filled activities</p>
        </motion.div>
        
        <div 
          className="position-relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="row g-3">
            {fullDisplay.map((event, i) => (
              <motion.div 
                key={i} 
                className="col-md-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <motion.div 
                  className="card border-0 shadow-sm h-100"
                  whileHover={{ y: -8, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card-body p-3 text-center">
                    <motion.span 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      style={{ fontSize: "2.5rem", marginBottom: "8px", display: "inline-block" }}
                    >
                      {event.icon}
                    </motion.span>
                    <div className="mb-2">
                      <span className="badge" style={{ 
                        background: "#D4AF37",
                        color: "white",
                        fontSize: "0.55rem",
                        fontWeight: "600"
                      }}>
                        {event.date}
                      </span>
                    </div>
                    <h6 className="fw-bold" style={{ color: "#0D47A1", fontSize: "0.85rem" }}>{event.title}</h6>
                    <p className="text-muted mb-2" style={{ fontSize: "0.75rem" }}>{event.desc}</p>
                    <motion.button 
                      className="btn btn-outline-primary btn-sm rounded-pill px-3" 
                      style={{ fontSize: "0.7rem" }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More →
                    </motion.button>
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
        </div>
      </div>
    </motion.section>
  );
}
export default EventsPreview;