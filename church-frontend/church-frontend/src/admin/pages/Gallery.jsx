import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import apiClient from "../../utils/axiosConfig";

function Gallery() {
    const [gallery, setGallery] = useState({ title: "" });
    const [images, setImages] = useState([]);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadGallery = async () => {
        try {
            const { data } = await apiClient.get("/gallery");
            setImages(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load gallery.");
        }
    };

    useEffect(() => {
        loadGallery();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!gallery.title.trim()) {
            setError("Please enter an image title.");
            return;
        }

        if (!file) {
            setError("Please select an image.");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", gallery.title.trim());
            formData.append("file", file);

            await apiClient.post("/gallery/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess("Gallery image uploaded successfully.");
            setGallery({ title: "" });
            setFile(null);
            const input = document.getElementById("gallery-file");
            if (input) input.value = "";
            await loadGallery();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Gallery upload failed.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this gallery image?")) return;

        try {
            await apiClient.delete(`/gallery/${id}`);
            setSuccess("Image deleted successfully.");
            await loadGallery();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete gallery image.");
        }
    };

    return (
        <div className="container mt-4">
            <BackButton />
            <h2 className="fw-bold text-primary">Gallery Management</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={submit} className="card p-4 shadow-sm mb-4">
                <div className="mb-3">
                    <label>Image Title</label>
                    <input
                        className="form-control"
                        placeholder="Example: St Alois Feast 2026"
                        value={gallery.title}
                        onChange={(e) => setGallery({ title: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Upload Image</label>
                    <input
                        id="gallery-file"
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Uploading..." : "Upload Gallery Image"}
                </button>
            </form>

            <div className="card p-4 shadow-sm">
                <h4 className="mb-3">Current Gallery</h4>
                {images.length === 0 ? (
                    <p className="text-muted mb-0">No photos have been uploaded yet.</p>
                ) : (
                    <div className="row g-3">
                        {images.map((image) => (
                            <div key={image.id} className="col-md-4">
                                <div className="card h-100">
                                    <img
                                        src={image.fileUrl?.startsWith("http") ? image.fileUrl : `http://localhost:8080${image.fileUrl}`}
                                        alt={image.title}
                                        className="card-img-top"
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <span className="fw-semibold">{image.title}</span>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(image.id)}>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Gallery;
