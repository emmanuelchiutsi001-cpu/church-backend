// src/admin/superadmin/Auth.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Table,
  Button,
  Badge,
  Alert,
  Spinner,
} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/auth";

function SuperAdminAuth() {
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);

  // JWT Authorization Header
  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  };

  // Load pending admin requests
  const loadAdmins = async () => {
    setLoading(true);
    try {
      console.log("Fetching pending admins...");
      const token = localStorage.getItem("token");
      console.log("Token exists:", !!token);

      const response = await axios.get(
        `${API_URL}/pending`,
        authHeaders()
      );

      console.log("Response data:", response.data);
      setAdmins(response.data);
      setMessage("");
    } catch (error) {
      console.error("Failed loading admin requests:", error);
      
      // Handle specific error cases
      if (error.response?.status === 401) {
        setMessage("⚠️ Session expired. Please login again.");
        setMessageType("danger");
        // Optionally redirect to login
        // navigate("/admin/login");
      } else if (error.response?.status === 403) {
        setMessage("⛔ You don't have permission to view pending admins.");
        setMessageType("danger");
      } else if (error.response?.status === 404) {
        setMessage("❌ Backend endpoint not found. Check API URL.");
        setMessageType("danger");
      } else {
        setMessage(`❌ Error: ${error.response?.data || error.message}`);
        setMessageType("danger");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  // Approve admin
  const approveAdmin = async (id) => {
    try {
      await axios.put(
        `${API_URL}/approve/${id}`,
        {},
        authHeaders()
      );

      setMessage("✅ Parish admin approved successfully!");
      setMessageType("success");
      loadAdmins(); // Refresh list
    } catch (error) {
      console.error("Approval failed:", error);
      setMessage(`❌ Approval failed: ${error.response?.data || error.message}`);
      setMessageType("danger");
    }
  };

  // Reject admin
  const rejectAdmin = async (id) => {
    const confirmDelete = window.confirm(
      "⚠️ Are you sure you want to reject this registration?"
    );

    if (!confirmDelete) return;

    try {
      // Based on your backend docs, DELETE /api/auth/{id}
      await axios.delete(
        `${API_URL}/${id}`,
        authHeaders()
      );

      setMessage("🗑️ Registration rejected successfully.");
      setMessageType("success");
      loadAdmins(); // Refresh list
    } catch (error) {
      console.error("Reject failed:", error);
      setMessage(`❌ Rejection failed: ${error.response?.data || error.message}`);
      setMessageType("danger");
    }
  };

  if (loading) {
    return (
      <Card className="shadow">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading pending approvals...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow">
      <Card.Header className="bg-primary text-white">
        <h4 className="mb-0">
          <i className="bi bi-person-check me-2"></i>
          Parish Admin Approval Requests
        </h4>
      </Card.Header>

      <Card.Body>
        {message && (
          <Alert
            variant={messageType}
            dismissible
            onClose={() => setMessage("")}
            className="mb-3"
          >
            {message}
          </Alert>
        )}

        <div className="mb-3">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={loadAdmins}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </Button>
          <span className="ms-2 text-muted small">
            {admins.length} pending request{admins.length !== 1 ? "s" : ""}
          </span>
        </div>

        <Table bordered hover responsive className="align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Parish</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length > 0 ? (
              admins.map((admin, index) => (
                <tr key={admin.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{admin.username}</strong>
                  </td>
                  <td>{admin.email}</td>
                  <td>{admin.parish || "N/A"}</td>
                  <td>
                    <Badge bg="warning" text="dark">
                      <i className="bi bi-clock-history me-1"></i>
                      Pending
                    </Badge>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => approveAdmin(admin.id)}
                      className="me-1"
                    >
                      <i className="bi bi-check-lg me-1"></i>
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => rejectAdmin(admin.id)}
                    >
                      <i className="bi bi-x-lg me-1"></i>
                      Reject
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                  No pending admin requests
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="text-muted small mt-2">
          <i className="bi bi-info-circle me-1"></i>
          Only System Admins can approve or reject parish admin registrations.
        </div>
      </Card.Body>
    </Card>
  );
}

export default SuperAdminAuth;