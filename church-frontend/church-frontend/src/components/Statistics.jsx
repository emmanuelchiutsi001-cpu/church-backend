function Statistics() {
  const stats = [
    { number: "52", label: "Parishes" },
    { number: "2", label: "System Administrators" },
    { number: "1000+", label: "Members" },
    { number: "Many", label: "Years of Service" },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="section-header">
          <span className="eyebrow">Our Community</span>
          <h2 className="section-title">
            Faith in <span className="accent">Action</span>
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <strong>{stat.number}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;