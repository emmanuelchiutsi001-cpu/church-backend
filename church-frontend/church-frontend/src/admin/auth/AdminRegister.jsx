import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import catholic from "../../assets/catholic.jpg";

function AdminRegister() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    parishName: "",
    password: "",
    confirmPassword: "",
  });

  const [parishes, setParishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingParishes, setLoadingParishes] = useState(true);

  useEffect(() => {
    const fetchParishes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/parishes");
        setParishes(response.data || []);
      } catch (error) {
        console.error("Failed to load parishes:", error);
        setParishes([]);
      } finally {
        setLoadingParishes(false);
      }
    };

    fetchParishes();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!form.parishName) {
      alert("Please select a parish.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username: form.username,
        password: form.password,
        parishName: form.parishName,
      });

      alert(response.data?.message || "Registration submitted successfully.");
      navigate("/admin/waiting");
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Server connection failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url(${catholic})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "420px",
          background: "rgba(255,255,255,.15)",
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="card-body p-4 text-white">
          <h3 className="text-center mb-4">Parish Admin Registration</h3>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Username</label>
              <input
                className="form-control"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Parish</label>
              {loadingParishes ? (
                <div className="form-control bg-light text-muted">Loading parishes...</div>
              ) : (
                <select
                  className="form-select"
                  name="parishName"
                  value={form.parishName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a parish</option>
                  {parishes.map((parish) => (
                    <option key={parish.id} value={parish.name}>
                      {parish.name}
                    </option>
                  ))}
                </select>
              )}

              {!loadingParishes && parishes.length === 0 && (
                <small className="text-warning d-block mt-2">
                  No available parishes are currently synced. Please contact the system admin.
                </small>
              )}
            </div>

            <div className="mb-3">
              <label>Password</label>
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
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <hr />
          <div className="text-center">
            Already approved?
            <br />
            <Link to="/admin/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRegister;
