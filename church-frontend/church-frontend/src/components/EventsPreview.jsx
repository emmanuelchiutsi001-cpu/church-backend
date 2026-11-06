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
    { title: "Community Outreach", date: "Monthly", desc: "Serving our community with love and compassion", icon: "🤝" },
  ];

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 3 >= events.length ? 0 : prevIndex + 3));
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
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="events-preview"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <span className="eyebrow">What&apos;s happening</span>
          <h2 className="section-title">
            Upcoming <span className="accent">Events</span>
          </h2>
          <p className="section-blurb">Join us in our faith-filled activities.</p>
          <div className="gold-divider" />
        </motion.div>

        <div
          className="events-carousel"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="row g-3">
            {fullDisplay.map((event, i) => (
              <motion.div key={`${event.title}-${i}`} className="col-md-4">
                <div className="event-card">
                  <div className="event-icon">{event.icon}</div>
                  <span className="event-badge">{event.date}</span>
                  <h6>{event.title}</h6>
                  <p>{event.desc}</p>
                  <button type="button" className="event-btn">
                    Learn More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="carousel-dots">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index * 3)}
                className={index === Math.floor(currentIndex / 3) ? "active" : ""}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default EventsPreview;