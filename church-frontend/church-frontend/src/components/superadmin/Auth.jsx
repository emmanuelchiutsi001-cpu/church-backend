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
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = "http://localhost:8080/api/auth";

function SuperAdminAuth() {
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  
  // Toast states
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

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
      
      if (error.response?.status === 401) {
        setMessage("⚠️ Session expired. Please login again.");
        setMessageType("danger");
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

  // Open approve modal
  const handleApproveClick = (admin) => {
    setSelectedAdmin(admin);
    setModalAction("approve");
    setShowModal(true);
  };

  // Open reject modal
  const handleRejectClick = (admin) => {
    setSelectedAdmin(admin);
    setModalAction("reject");
    setShowModal(true);
  };

  // Confirm action (Approve or Reject)
  const confirmAction = async () => {
    if (!selectedAdmin) return;

    try {
      if (modalAction === "approve") {
        await axios.put(
          `${API_URL}/approve/${selectedAdmin.id}`,
          {},
          authHeaders()
        );

        setToastMessage(`✅ ${selectedAdmin.username} has been approved successfully!`);
        setToastVariant("success");
        setShowToast(true);
        
        // Show alert message too
        setMessage(`✅ ${selectedAdmin.username} approved successfully!`);
        setMessageType("success");
        
      } else {
        await axios.delete(
          `${API_URL}/${selectedAdmin.id}`,
          authHeaders()
        );

        setToastMessage(`🗑️ ${selectedAdmin.username} has been rejected.`);
        setToastVariant("danger");
        setShowToast(true);
        
        setMessage(`🗑️ ${selectedAdmin.username} rejected successfully.`);
        setMessageType("danger");
      }
      
      setShowModal(false);
      setSelectedAdmin(null);
      loadAdmins(); // Refresh list
      
    } catch (error) {
      console.error("Action failed:", error);
      setMessage(`❌ Action failed: ${error.response?.data || error.message}`);
      setMessageType("danger");
      setShowModal(false);
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
    <>
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
              <AnimatePresence>
                {admins.length > 0 ? (
                  admins.map((admin, index) => (
                    <motion.tr
                      key={admin.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
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
                          onClick={() => handleApproveClick(admin)}
                          className="me-1"
                        >
                          <FaUserCheck className="me-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                          onClick={() => handleRejectClick(admin)}
                        >
                          <FaUserTimes className="me-1" />
                          Reject
                        </Button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                      No pending admin requests
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </Table>

          <div className="text-muted small mt-2">
            <i className="bi bi-info-circle me-1"></i>
            Only System Admins can approve or reject parish admin registrations.
          </div>
        </Card.Body>
      </Card>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "approve" ? (
              <span className="text-success">
                <FaUserCheck className="me-2" /> Confirm Approval
              </span>
            ) : (
              <span className="text-danger">
                <FaUserTimes className="me-2" /> Confirm Rejection
              </span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            {modalAction === "approve" ? (
              <>
                <FaCheckCircle size={50} className="text-success mb-3" />
                <h5>
                  Are you sure you want to approve <strong>{selectedAdmin?.username}</strong>?
                </h5>
                <p className="text-muted">
                  This will give them access to the parish admin dashboard.
                </p>
                <div className="bg-light p-3 rounded text-start mt-3">
                  <small>
                    <strong>Email:</strong> {selectedAdmin?.email}<br />
                    <strong>Parish:</strong> {selectedAdmin?.parish || "N/A"}
                  </small>
                </div>
              </>
            ) : (
              <>
                <FaTimesCircle size={50} className="text-danger mb-3" />
                <h5>
                  Are you sure you want to reject <strong>{selectedAdmin?.username}</strong>?
                </h5>
                <p className="text-muted">This action cannot be undone.</p>
                <div className="bg-light p-3 rounded text-start mt-3">
                  <small>
                    <strong>Email:</strong> {selectedAdmin?.email}<br />
                    <strong>Parish:</strong> {selectedAdmin?.parish || "N/A"}
                  </small>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant={modalAction === "approve" ? "success" : "danger"}
            onClick={confirmAction}
            className="px-4"
          >
            {modalAction === "approve" ? (
              <><FaCheckCircle className="me-1" /> Yes, Approve</>
            ) : (
              <><FaTimesCircle className="me-1" /> Yes, Reject</>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg={toastVariant}
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">
              {toastVariant === "success" ? "✅ Approved" : "❌ Rejected"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white">
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default SuperAdminAuth;