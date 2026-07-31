// src/admin/pages/Events.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton";
import apiClient from "../../utils/axiosConfig";

function Events() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [event, setEvent] = useState({
        title: "",
        date: "",
        description: "",
        location: "",
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setEvent({ ...event, image: files[0] });
        } else {
            setEvent({ ...event, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("title", event.title);
            formData.append("date", event.date);
            formData.append("description", event.description);
            formData.append("location", event.location || "");
            if (event.image) formData.append("image", event.image);

            await apiClient.post("/events", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setSuccess("✅ Event created successfully!");
            setEvent({ title: "", date: "", description: "", location: "", image: null });
            
            setTimeout(() => navigate("/admin/events-list"), 1500);

        } catch (error) {
            setError(error.response?.data || "Failed to create event");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <BackButton />
            <h2 className="fw-bold text-primary mb-4">Create Event</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
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

                <div className="mb-3">
                    <label className="form-label">Event Picture</label>
                    <input
                        type="file"
                        className="form-control"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Creating..." : "Create Event"}
                </button>
            </form>
        </div>
    );
}

export default Events;