// SuperAdminRegister.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../utils/axiosConfig"; // ✅ Import apiClient
// Remove: import axios from "axios";

function SuperAdminRegister() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            // ✅ Use apiClient instead of axios
            const response = await apiClient.post("/auth/register-system-admin", {
                username: form.username,
                email: form.email,
                password: form.password,
            });

            alert("System Admin registered successfully!");
            navigate("/admin/login");

        } catch (error) {
            console.error("Registration failed:", error);
            if (error.response) {
                setError(error.response.data || "Registration failed");
            } else if (error.request) {
                setError("No response from server. Check if backend is running.");
            } else {
                setError("Request failed: " + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body">
                            <h3 className="text-center mb-4">
                                <i className="bi bi-shield-lock me-2"></i>
                                Register System Admin
                            </h3>
                            
                            {error && (
                                <div className="alert alert-danger">{error}</div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="confirmPassword"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                    disabled={loading}
                                >
                                    {loading ? "Registering..." : "Register System Admin"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuperAdminRegister;