import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import catholic from "../../assets/catholic.jpg";

function AdminRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        {
          username: form.username,
          password: form.password,
        }
      );

      alert(response.data);

      navigate("/admin/waiting");

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Unable to connect to the server.");
      }

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${catholic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >

      <div
        className="card shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "15px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)"
        }}
      >

        <div className="card-body p-4 text-white">

          <div className="text-center mb-4">

            <h3 className="fw-bold text-white">
              Parish Admin Registration
            </h3>

            <p className="text-white-50 mb-0">
              Register and wait for approval.
            </p>

          </div>

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label className="form-label fw-semibold text-white">
                Username
              </label>

              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label fw-semibold text-white">
                Password
              </label>

              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-4">

              <label className="form-label fw-semibold text-white">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm password"
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
              {loading ? "Registering..." : "Register"}
            </button>

          </form>

          <hr className="border-light" />

          <div className="text-center">

            <small className="text-white-50">
              Already have an approved account?
            </small>

            <br />

            <Link
              to="/admin/login"
              className="fw-bold text-white text-decoration-none"
            >
              Login Here
            </Link>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminRegister;