import { motion } from "framer-motion";
import rosaryImage from "../assets/rosary.jpeg";

function Welcome() {
  const pillars = [
    {
      icon: "✝",
      title: "Faith Formation",
      desc: "Deepening our relationship with Christ through prayer, scripture, and the sacraments.",
    },
    {
      icon: "🤝",
      title: "Community Service",
      desc: "Living the Gospel through outreach, charity, and serving those in need.",
    },
    {
      icon: "❤️",
      title: "Youth Fellowship",
      desc: "Building lasting friendships and a supportive community of young believers.",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="about-spotlight"
      style={{ backgroundImage: `url(${rosaryImage})` }}
    >
      <div className="about-spotlight-overlay" />

      <div className="container about-spotlight-inner">
        <div className="about-shell">
          <div className="text-center mb-4">
            <span className="about-crumb">About the Guild</span>
            <h2 className="about-heading">
              United in <span>Faith</span>, Service &amp; Community
            </h2>
            <div className="gold-divider" />
          </div>

          <div className="about-story-grid">
            <div className="about-story-copy">
              <p className="about-intro">
                The <strong>Agnes &amp; Alois Youth Guild</strong>, established under the
                <strong> Archdiocese of Harare</strong>, is a dynamic Catholic youth network
                created to help young people grow in faith, lead with integrity, and serve with
                compassion.
              </p>

              <div className="about-stats-row">
                <div className="about-stat-card">
                  <span className="about-stat-label">Rooted in</span>
                  <strong>Archdiocese</strong>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-label">Guided by</span>
                  <strong>St. Agnes</strong>
                </div>
                <div className="about-stat-card">
                  <span className="about-stat-label">Inspired by</span>
                  <strong>Service</strong>
                </div>
              </div>

              <blockquote className="about-verse">
                “Let no one despise your youth, but set the believers an example in speech and
                conduct, in love, in faith, in purity.”
                <span>— 1 Timothy 4:12</span>
              </blockquote>
            </div>

            <div className="about-visual-panel">
              <div className="about-panel">
                <div className="about-feature-block">
                  <div className="about-feature-icon">⛪</div>
                  <div>
                    <h5>Our Foundation</h5>
                    <p>
                      A vibrant community of young Catholics devoted to spiritual growth, active
                      discipleship, and meaningful friendships shaped by Christ.
                    </p>
                  </div>
                </div>

                <div className="about-feature-block">
                  <div className="about-feature-icon">✝</div>
                  <div>
                    <h5>Our Patron Saints</h5>
                    <p>
                      Our guild bears the names of <strong>St. Agnes</strong> and
                      <strong> St. Aloisius Gonzaga</strong>, inspiring courage, purity, and
                      holiness in everyday life.
                    </p>
                  </div>
                </div>

                <div className="about-feature-block">
                  <div className="about-feature-icon">❤️</div>
                  <div>
                    <h5>Our Mission</h5>
                    <p>
                      Building tomorrow&apos;s church today through youth empowerment, spiritual
                      growth, and Christ-centered service. <span>United in faith, service, and love.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-4 g-3">
            {pillars.map((item) => (
              <div key={item.title} className="col-md-4">
                <div className="about-pill">
                  <span className="about-pill-icon">{item.icon}</span>
                  <h6>{item.title}</h6>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button type="button" className="about-cta-btn">
              Learn More About Us →
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Welcome;