function PodcastSection(){
  const podcasts = [
    {
      title: "Sunday Gospel Reflection",
      speaker: "Fr. Michael",
      description: "A weekly reflection on the Sunday gospel and parish life."
    },
    {
      title: "Youth Spiritual Talk",
      speaker: "Youth Ministry",
      description: "Encouragement and spiritual guidance for young parishioners."
    }
  ];

  return (
    <div className="mb-5">
      <h2 className="text-primary fw-bold">Podcasts</h2>

      {podcasts.map((podcast, index) => (
        <div className="card shadow-sm mb-3 border-0" key={index}>
          <div className="card-body">
            <h5>🎧 {podcast.title}</h5>
            <p className="mb-1"><strong>Speaker:</strong> {podcast.speaker}</p>
            <p className="text-muted mb-3">{podcast.description}</p>
            <button className="btn btn-primary btn-sm" disabled>
              Play Podcast
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PodcastSection;