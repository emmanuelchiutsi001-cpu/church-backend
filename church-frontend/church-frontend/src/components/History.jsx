import { motion } from "framer-motion";

function History() {
  const historyData = [
    {
      period: "2010",
      title: "The Foundation",
      description: "Agnes & Alois Youth Guild was established at St. Mary’s Cathedral with 50 founding members, inspired by the patron saints of youth. The founding members came together with a shared vision of creating a vibrant Catholic youth community in Harare.",
      icon: "🌱",
      color: "#4CAF50",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop",
    },
    {
      period: "2011 - 2013",
      title: "Growth & Outreach",
      description: "Expanded to 5 parishes, launched community outreach programs and youth leadership training initiatives. The guild began making a significant impact in local communities through various charitable activities.",
      icon: "📈",
      color: "#2196F3",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=400&h=300&fit=crop",
    },
    {
      period: "2014 - 2016",
      title: "Expansion & Impact",
      description: "Grew to 8 parishes. Hosted the first annual youth convention with 200+ attendees from across Harare. The convention became a landmark event, bringing together young Catholics from all over the archdiocese.",
      icon: "🌟",
      color: "#FF9800",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    },
    {
      period: "2017 - 2019",
      title: "Strengthening Faith",
      description: "Introduced mentorship programs, Bible study groups, and participated in international youth exchanges. The guild established partnerships with other youth organizations across Africa.",
      icon: "📖",
      color: "#9C27B0",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    },
    {
      period: "2020 - 2022",
      title: "Resilience & Innovation",
      description: "Adapted to online ministry during the pandemic. Launched digital catechesis, virtual fellowship, and online prayer groups. The guild showed remarkable resilience and innovation during challenging times.",
      icon: "💪",
      color: "#E91E63",
      image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&h=300&fit=crop",
    },
    {
      period: "2023 - Present",
      title: "Thriving Community",
      description: "Over 500 active members across 12+ parishes. Recognized for outstanding service by the Archdiocese of Harare. The guild continues to grow and inspire young Catholics across Zimbabwe.",
      icon: "❤️",
      color: "#D4AF37",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=400&h=300&fit=crop",
    },
  ];

  const stats = [
    { number: "500+", label: "Active Members", icon: "👥" },
    { number: "12+", label: "Parishes", icon: "⛪" },
    { number: "15", label: "Years of Service", icon: "🎂" },
    { number: "10+", label: "Programs", icon: "📋" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="history-shell"
    >
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Our Journey</span>
          <h2 className="section-title">
            Our Story of <span className="accent">Faith &amp; Service</span>
          </h2>
          <p className="section-blurb">
            A legacy of persistence, sacrifice, and growth in the heart of Zimbabwe.
          </p>
          <div className="gold-divider" />
        </div>

        <div className="row g-3 mb-4 history-metrics">
          {stats.map((stat, index) => (
            <div className="col-6 col-md-3" key={index}>
              <div className="history-stat-card">
                <div className="history-stat-icon">{stat.icon}</div>
                <div className="history-stat-number">{stat.number}</div>
                <div className="history-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          <div className="col-lg-4">
            <div className="history-timeline-card">
              <h5>
                <span>⏳</span> Our Timeline
              </h5>
              <div className="history-timeline-list">
                {historyData.map((item) => (
                  <div key={item.period} className="history-step-item">
                    <div className="history-step-period">{item.period}</div>
                    <div className="history-step-title">{item.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              {historyData.map((item, index) => (
                <motion.article
                  key={item.period}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="history-card"
                >
                  <div className="history-card-inner" style={{ borderLeft: `4px solid ${item.color}` }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={item.image} alt={item.title} className="history-card-image" />
                      </div>
                      <div className="col-md-8">
                        <div className="history-card-body">
                          <div className="history-card-meta">
                            <span className="history-card-icon">{item.icon}</span>
                            <span className="history-chip" style={{ background: `${item.color}20`, color: item.color }}>
                              {item.period}
                            </span>
                          </div>
                          <h5>{item.title}</h5>
                          <p>{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>

        <div className="history-values">
          {[
            { icon: "✝", title: "Faith", desc: "Rooted in Christ and the Church" },
            { icon: "🤝", title: "Service", desc: "Living the Gospel in action" },
            { icon: "❤️", title: "Unity", desc: "One family in Christ" },
          ].map((item) => (
            <div key={item.title} className="history-value-item">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default History;