import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import apiClient from "../../utils/axiosConfig";

function Announcements() {
    const [announcement, setAnnouncement] = useState({
        title: "",
        author: "",
        content: "",
        image: null,
        file: null,
    });
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadAnnouncements = async () => {
        try {
            const { data } = await apiClient.get("/news");
            setNewsList(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load announcements.");
        }
    };

    useEffect(() => {
        loadAnnouncements();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!announcement.title.trim() || !announcement.content.trim()) {
            setError("Title and message are required.");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", announcement.title.trim());
            formData.append("content", announcement.content.trim());
            formData.append("author", (announcement.author || "Parish Admin").trim());

            if (announcement.image) {
                formData.append("image", announcement.image);
            }

            if (announcement.file) {
                formData.append("file", announcement.file);
            }

            await apiClient.post("/news/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess("Announcement published successfully.");
            setAnnouncement({ title: "", author: "", content: "", image: null, file: null });
            await loadAnnouncements();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Failed to publish announcement.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this announcement?")) return;

        try {
            await apiClient.delete(`/news/${id}`);
            setSuccess("Announcement deleted successfully.");
            await loadAnnouncements();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete announcement.");
        }
    };

    return (
        <div className="container mt-4">
            <BackButton />
            <h2 className="fw-bold text-primary">Create Announcement</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={submit} className="card p-4 shadow-sm mb-4">
                <div className="mb-3">
                    <label>Title</label>
                    <input
                        className="form-control"
                        placeholder="Announcement title"
                        value={announcement.title}
                        onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Author</label>
                    <input
                        className="form-control"
                        placeholder="Parish Admin"
                        value={announcement.author}
                        onChange={(e) => setAnnouncement({ ...announcement, author: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Announcement Message</label>
                    <textarea
                        className="form-control"
                        rows="5"
                        placeholder="Write announcement..."
                        value={announcement.content}
                        onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Announcement Image / Flyer</label>
                    <input
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setAnnouncement({ ...announcement, image: e.target.files?.[0] || null })}
                    />
                </div>

                <div className="mb-3">
                    <label>Attachment (PDF/DOC)</label>
                    <input
                        type="file"
                        className="form-control"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setAnnouncement({ ...announcement, file: e.target.files?.[0] || null })}
                    />
                </div>

                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Publishing..." : "Publish Announcement"}
                </button>
            </form>

            <div className="card p-4 shadow-sm">
                <h4 className="mb-3">Published News</h4>
                {newsList.length === 0 ? (
                    <p className="text-muted mb-0">No announcements have been published yet.</p>
                ) : (
                    <div className="list-group">
                        {newsList.map((item) => (
                            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{item.title}</strong>
                                    <div className="small text-muted">{item.author || "Parish Admin"}</div>
                                </div>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item.id)}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Announcements;
