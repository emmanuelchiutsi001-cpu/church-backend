import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8080/api/news";

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const { data } = await axios.get(API_URL);
        setAnnouncements(Array.isArray(data) ? data.slice(0, 5) : []);
      } catch (error) {
        console.error("Failed to load announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="mb-5">
        <h2 className="text-primary fw-bold">Latest Announcements</h2>
        <p className="text-muted">Loading announcements...</p>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <h2 className="text-primary fw-bold">Latest Announcements</h2>

      {announcements.length === 0 ? (
        <div className="card shadow-sm border-0">
          <div className="card-body text-muted">No announcements have been published yet.</div>
        </div>
      ) : (
        announcements.map((item) => (
          <div key={item.id} className="card shadow-sm mb-3 border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="mb-0">{item.title}</h5>
                <small className="text-muted">
                  {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : "Recently"}
                </small>
              </div>

              {item.imageUrl && (
                <img
                  src={item.imageUrl.startsWith("http") ? item.imageUrl : `http://localhost:8080${item.imageUrl}`}
                  alt={item.title}
                  className="img-fluid rounded mb-3"
                  style={{ maxHeight: "220px", objectFit: "cover", width: "100%" }}
                />
              )}

              <p className="mb-0 text-muted" style={{ whiteSpace: "pre-line" }}>{item.content}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AnnouncementList;
