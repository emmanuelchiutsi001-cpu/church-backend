import { useEffect, useState } from "react";
import BackButton from "../BackButton";
import apiClient from "../../utils/axiosConfig";

function Executive() {
    const [member, setMember] = useState({
        name: "",
        role: "",
        deanery: "",
        bio: "",
        sermonTitle: "",
        photo: null,
        video: null,
    });
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const loadLeaders = async () => {
        try {
            const { data } = await apiClient.get("/leaders");
            setLeaders(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to load leadership data.");
        }
    };

    useEffect(() => {
        loadLeaders();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!member.name.trim() || !member.role.trim() || !member.deanery.trim()) {
            setError("Full name, role and deanery are required.");
            return;
        }

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("name", member.name.trim());
            formData.append("role", member.role.trim());
            formData.append("deanery", member.deanery.trim());
            formData.append("bio", member.bio.trim());
            formData.append("sermonTitle", member.sermonTitle.trim());

            if (member.photo) formData.append("photo", member.photo);
            if (member.video) formData.append("video", member.video);

            await apiClient.post("/leaders/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSuccess("Executive member saved successfully.");
            setMember({ name: "", role: "", deanery: "", bio: "", sermonTitle: "", photo: null, video: null });
            await loadLeaders();
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Failed to save leader.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this leader?")) return;

        try {
            await apiClient.delete(`/leaders/${id}`);
            setSuccess("Leader deleted successfully.");
            await loadLeaders();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to delete leader.");
        }
    };

    return (
        <div className="container mt-4">
            <BackButton />
            <h2 className="fw-bold text-primary">Executive Management</h2>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={submit} className="card p-4 shadow-sm mb-4">
                <div className="mb-3">
                    <label>Full Name</label>
                    <input
                        className="form-control"
                        placeholder="Enter name"
                        value={member.name}
                        onChange={(e) => setMember({ ...member, name: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Role</label>
                    <input
                        className="form-control"
                        placeholder="e.g. Parish Priest"
                        value={member.role}
                        onChange={(e) => setMember({ ...member, role: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Deanery</label>
                    <input
                        className="form-control"
                        placeholder="e.g. Harare Deanery"
                        value={member.deanery}
                        onChange={(e) => setMember({ ...member, deanery: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Biography</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={member.bio}
                        onChange={(e) => setMember({ ...member, bio: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Sermon Title</label>
                    <input
                        className="form-control"
                        placeholder="Optional"
                        value={member.sermonTitle}
                        onChange={(e) => setMember({ ...member, sermonTitle: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Photo</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setMember({ ...member, photo: e.target.files?.[0] || null })}
                    />
                </div>

                <div className="mb-3">
                    <label>Sermon Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        className="form-control"
                        onChange={(e) => setMember({ ...member, video: e.target.files?.[0] || null })}
                    />
                </div>

                <button className="btn btn-primary" disabled={loading}>
                    {loading ? "Saving..." : "Save Executive Member"}
                </button>
            </form>

            <div className="card p-4 shadow-sm">
                <h4 className="mb-3">Leadership List</h4>
                {leaders.length === 0 ? (
                    <p className="text-muted mb-0">No leaders added yet.</p>
                ) : (
                    <div className="list-group">
                        {leaders.map((leader) => (
                            <div key={leader.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>{leader.name}</strong>
                                    <div className="small text-muted">{leader.role} · {leader.deanery}</div>
                                </div>
                                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(leader.id)}>
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

export default Executive;
