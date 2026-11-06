// src/admin/pages/Events.jsx
import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import apiClient from "../../utils/axiosConfig";

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [event, setEvent] = useState({
        title: "",
        date: "",
        category: "General",
        description: "",
        location: "",
        imageUrl: ""
    });

    const loadEvents = async () => {
        try {
            setLoading(true);
            const { data } = await apiClient.get("/events");
            setEvents(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load events.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEvents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEvent({ ...event, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!event.title.trim() || !event.description.trim() || !event.date) {
            setError("Title, description and event date are required.");
            return;
        }

        try {
            const payload = {
                title: event.title.trim(),
                description: event.description.trim(),
                eventDate: new Date(event.date).toISOString(),
                location: event.location.trim(),
                category: event.category || "General",
                imageUrl: event.imageUrl.trim()
            };

            await apiClient.post("/events", payload);

            setSuccess("✅ Event created successfully!");
            setEvent({ title: "", date: "", category: "General", description: "", location: "", imageUrl: "" });
            await loadEvents();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Failed to create event");
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;

        try {
            await apiClient.delete(`/events/${id}`);
            setSuccess("Event deleted successfully.");
            await loadEvents();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete event.");
        }
    };

    return (
        <div className="container mt-4">
            <BackButton />
            <h2 className="fw-bold text-primary mb-4">Create Event</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
                <div className="mb-3">
                    <label className="form-label">Event Name *</label>
                    <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={event.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-control" name="category" value={event.category} onChange={handleChange}>
                        <option value="General">General</option>
                        <option value="Mass">Mass</option>
                        <option value="Youth">Youth</option>
                        <option value="Retreat">Retreat</option>
                        <option value="Workshop">Workshop</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Event Date *</label>
                    <input
                        type="date"
                        className="form-control"
                        name="date"
                        value={event.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        placeholder="Enter venue"
                        value={event.location}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Image URL (optional)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        placeholder="https://..."
                        value={event.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows="4"
                        value={event.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Create Event"}
                </button>
            </form>

            <div className="card p-4 shadow-sm">
                <h4 className="mb-3">Current Events</h4>
                {events.length === 0 ? (
                    <p className="text-muted mb-0">No events published yet.</p>
                ) : (
                    <div className="list-group">
                        {events.map((item) => (
                            <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{item.title}</strong>
                                    <div className="small text-muted">
                                        {item.eventDate ? new Date(item.eventDate).toLocaleDateString() : "No date"} · {item.location || "No location"}
                                    </div>
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

export default Events;