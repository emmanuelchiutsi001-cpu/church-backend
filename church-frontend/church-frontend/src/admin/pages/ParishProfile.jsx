import { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../BackButton";

const API_URL = "http://localhost:8080/api/parishes";

const emptyForm = {
  deaneryId: "",
  name: "",
  address: "",
  phone: "",
  email: "",
  yearEstablished: "",
  imageUrl: "",
  facebookPageUrl: "",
  catholicCount: 0,
};

function ParishProfile() {
  const [parish, setParish] = useState(emptyForm);
  const [parishId, setParishId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchParishProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const meRes = await axios.get("http://localhost:8080/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const assignedParishId = meRes?.data?.parishId || localStorage.getItem("parishId");

        if (!assignedParishId) {
          setError("This account is not assigned to a parish yet.");
          setLoading(false);
          return;
        }

        setParishId(Number(assignedParishId));

        const parishRes = await axios.get(`${API_URL}/${assignedParishId}`);
        setParish({
          deaneryId: parishRes.data.deaneryId ?? "",
          name: parishRes.data.name ?? "",
          address: parishRes.data.address ?? "",
          phone: parishRes.data.phone ?? "",
          email: parishRes.data.email ?? "",
          yearEstablished: parishRes.data.yearEstablished ?? "",
          imageUrl: parishRes.data.imageUrl ?? "",
          facebookPageUrl: parishRes.data.facebookPageUrl ?? "",
          catholicCount: parishRes.data.catholicCount ?? 0,
        });
      } catch (err) {
        console.error(err);
        setError("Unable to load the parish profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParishProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParish((current) => ({
      ...current,
      [name]: ["deaneryId", "yearEstablished", "catholicCount"].includes(name)
        ? value === "" ? "" : Number(value)
        : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!parishId) {
      setError("No parish is assigned to this account.");
      return;
    }

    try {
      setSaving(true);
      const payload = { ...parish };
      if (payload.deaneryId === "") delete payload.deaneryId;
      if (payload.yearEstablished === "") delete payload.yearEstablished;
      if (payload.catholicCount === "") delete payload.catholicCount;

      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/${parishId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("Parish profile saved successfully.");
      localStorage.setItem("parishName", parish.name);
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Unable to save the parish profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mt-4">
      <BackButton />

      <h2 className="fw-bold text-primary">Parish Profile</h2>

      {loading ? (
        <div className="alert alert-info mt-3">Loading parish details...</div>
      ) : (
        <form onSubmit={submit} className="mt-4">
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Parish Name</label>
              <input
                className="form-control mb-3"
                name="name"
                value={parish.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Deanery ID</label>
              <input
                className="form-control mb-3"
                name="deaneryId"
                type="number"
                value={parish.deaneryId}
                onChange={handleChange}
                placeholder="Optional"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Address</label>
              <input
                className="form-control mb-3"
                name="address"
                value={parish.address}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone Number</label>
              <input
                className="form-control mb-3"
                name="phone"
                value={parish.phone}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control mb-3"
                name="email"
                value={parish.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Year Established</label>
              <input
                type="number"
                className="form-control mb-3"
                name="yearEstablished"
                value={parish.yearEstablished}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Image URL</label>
              <input
                className="form-control mb-3"
                name="imageUrl"
                value={parish.imageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Facebook Page URL</label>
              <input
                className="form-control mb-3"
                name="facebookPageUrl"
                value={parish.facebookPageUrl}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Catholic Count</label>
              <input
                type="number"
                min="0"
                className="form-control mb-3"
                name="catholicCount"
                value={parish.catholicCount}
                onChange={handleChange}
              />
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Parish Profile"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ParishProfile;