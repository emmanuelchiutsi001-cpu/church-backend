
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Badge,
  Button,
  Toast,
  ToastContainer,
  Modal,
  Spinner,
  Container,
} from "react-bootstrap";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserCheck,
  FaUserTimes,
  FaTrash,
  FaPauseCircle,
  FaPlayCircle,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:8080/api";
const ADMIN_API = `${API_URL}/system-admin/admins`;

const CARD_SHADOW = "0 4px 20px rgba(15, 23, 42, 0.06)";
const CARD_RADIUS = "16px";

const EMPTY_ADMIN_STATS = {
  total: 0,
  pending: 0,
  approved: 0,
  suspended: 0,
};

function SuperDashboard() {
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const authHeaders = useCallback(() => {
    const token = localStorage.getItem("token");

    return {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        "Content-Type": "application/json",
      },
    };
  }, []);

  const showMessage = (message, variant = "success") => {
    setToastMessage(message);
    setToastVariant(variant);
    setShowToast(true);
  };

  // Load real admin records from the existing backend endpoint.
  const loadDashboardData = useCallback(
    async (showLoader = true) => {
      if (showLoader) {
        setLoading(true);
      }

      try {
        const response = await axios.get(ADMIN_API, authHeaders());

        if (!Array.isArray(response.data)) {
          throw new Error(
            "The admin API did not return a list. Check the backend response."
          );
        }

        setAdmins(response.data);
      } catch (error) {
        console.error("Error loading admin records:", error);

        let message =
          error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "Failed to load administrator records.";

        if (error.response?.status === 401) {
          message = "Your session may have expired. Please log in again.";
        } else if (error.response?.status === 403) {
          message =
            "Access denied. Check that you are logged in as a system administrator.";
        } else if (!error.response) {
          message =
            "Cannot connect to the backend. Make sure Spring Boot is running.";
        }

        showMessage(message, "danger");
      } finally {
        if (showLoader) {
          setLoading(false);
        }
      }
    },
    [authHeaders]
  );

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  // Derive statistics from the actual admin records.
  const pendingAdmins = admins.filter(
    (admin) => admin.approved === false
  );

  const approvedAdmins = admins.filter(
    (admin) => admin.approved === true
  );

  const suspendedAdmins = admins.filter(
    (admin) => admin.suspended === true
  );

  const activeAdmins = admins.filter(
    (admin) =>
      admin.approved === true && admin.suspended !== true
  );

  const stats = {
    ...EMPTY_ADMIN_STATS,
    total: admins.length,
    pending: pendingAdmins.length,
    approved: approvedAdmins.length,
    suspended: suspendedAdmins.length,
  };

  const openActionModal = (admin, action) => {
    setSelectedAdmin(admin);
    setModalAction(action);
    setShowModal(true);
  };

  const closeModal = () => {
    if (actionLoading) return;

    setShowModal(false);
    setSelectedAdmin(null);
    setModalAction("");
  };

  // Execute the existing backend admin-management endpoints.
  const confirmAction = async () => {
    if (!selectedAdmin || actionLoading) return;

    const admin = selectedAdmin;
    setActionLoading(true);

    try {
      switch (modalAction) {
        case "approve":
          await axios.put(
            `${API_URL}/auth/approve/${admin.id}`,
            {},
            authHeaders()
          );
          break;

        case "reject":
          await axios.put(
            `${ADMIN_API}/${admin.id}/reject`,
            {},
            authHeaders()
          );
          break;

        case "suspend":
          await axios.put(
            `${ADMIN_API}/${admin.id}/suspend`,
            {},
            authHeaders()
          );
          break;

        case "reactivate":
          await axios.put(
            `${ADMIN_API}/${admin.id}/reactivate`,
            {},
            authHeaders()
          );
          break;

        case "delete":
          await axios.delete(
            `${ADMIN_API}/${admin.id}`,
            authHeaders()
          );
          break;

        default:
          return;
      }

      setShowModal(false);
      setSelectedAdmin(null);
      setModalAction("");

      const successMessages = {
        approve: `${admin.username} has been approved.`,
        reject: `${admin.username}'s pending application was rejected.`,
        suspend: `${admin.username} has been suspended.`,
        reactivate: `${admin.username} has been reactivated.`,
        delete: `${admin.username} has been deleted.`,
      };

      // Refresh the records so all counts and lists stay accurate.
      await loadDashboardData(false);

      showMessage(
        successMessages[modalAction] || "Admin action completed.",
        modalAction === "reject" || modalAction === "delete"
          ? "danger"
          : modalAction === "suspend"
          ? "warning"
          : "success"
      );
    } catch (error) {
      console.error("Admin action failed:", error);

      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "The action failed. Please try again.";

      showMessage(message, "danger");
    } finally {
      setActionLoading(false);
    }
  };

  const getStatus = (admin) => {
    if (admin.suspended === true) {
      return { label: "Suspended", variant: "warning" };
    }

    if (admin.approved === true) {
      return { label: "Approved", variant: "success" };
    }

    return { label: "Pending", variant: "secondary" };
  };

  const getModalTitle = () => {
    const titles = {
      approve: "Confirm Approval",
      reject: "Confirm Rejection",
      suspend: "Confirm Suspension",
      reactivate: "Confirm Reactivation",
      delete: "Confirm Deletion",
    };

    return titles[modalAction] || "Confirm Action";
  };

  const getModalMessage = () => {
    const messages = {
      approve:
        "This will approve the administrator's account.",
      reject:
        "This rejects and removes the pending application. This action cannot be undone.",
      suspend:
        "This will suspend the account. The administrator should no longer be able to log in.",
      reactivate:
        "This will remove the suspension from the account. Approval is still required.",
      delete:
        "This will permanently remove the account. The backend may refuse if the account manages a subdivision.",
    };

    return messages[modalAction] || "Are you sure you want to continue?";
  };

  const statCards = [
    {
      label: "Total Admins",
      value: stats.total,
      color: "#6366f1",
      background: "#eef2ff",
      icon: FaUsers,
    },
    {
      label: "Pending Admins",
      value: stats.pending,
      color: "#d97706",
      background: "#fffbeb",
      icon: FaClock,
    },
    {
      label: "Approved Admins",
      value: stats.approved,
      color: "#059669",
      background: "#ecfdf5",
      icon: FaUserCheck,
    },
    {
      label: "Suspended Admins",
      value: stats.suspended,
      color: "#dc2626",
      background: "#fef2f2",
      icon: FaPauseCircle,
    },
  ];

  if (loading) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "70vh" }}
      >
        <Spinner animation="grow" variant="primary" />
        <p className="mt-3 text-muted fw-semibold">
          Loading administrator records...
        </p>
      </div>
    );
  }

  return (
    <Container
      fluid
      className="px-3 px-md-5 py-4"
      style={{ background: "#f8fafc", minHeight: "100vh" }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4"
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              color: "#fff",
              boxShadow: "0 8px 20px rgba(99,102,241,0.35)",
            }}
          >
            <FaShieldAlt size={22} />
          </div>

          <div>
            <h2
              className="fw-bold mb-0"
              style={{ color: "#0f172a", letterSpacing: "-0.5px" }}
            >
              Super Admin Dashboard
            </h2>
            <small className="text-muted">
              Manage administrator accounts and approvals
            </small>
          </div>
        </div>

        <Button
          variant="light"
          size="sm"
          onClick={() => loadDashboardData()}
          disabled={loading}
          className="d-flex align-items-center gap-2 fw-semibold"
          style={{
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            boxShadow: CARD_SHADOW,
          }}
        >
          <FaSyncAlt /> Refresh
        </Button>
      </motion.div>

      {/* Statistics calculated from the existing admin API */}
      <Row className="g-3 g-md-4">
        {statCards.map((stat, index) => (
          <Col xs={6} lg={3} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
            >
              <Card
                className="border-0 h-100 stat-card"
                style={{
                  borderRadius: CARD_RADIUS,
                  boxShadow: CARD_SHADOW,
                }}
              >
                <Card.Body className="p-3 p-md-4">
                  <div
                    className="d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: stat.background,
                      color: stat.color,
                    }}
                  >
                    <stat.icon size={20} />
                  </div>

                  <div
                    className="text-muted small fw-semibold text-uppercase"
                    style={{ letterSpacing: "0.5px" }}
                  >
                    {stat.label}
                  </div>

                  <div
                    className="fw-bold"
                    style={{
                      fontSize: "1.9rem",
                      color: "#0f172a",
                      lineHeight: 1.3,
                    }}
                  >
                    {stat.value}
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Account overview */}
      <Row className="mt-4 g-3 g-md-4">
        <Col lg={8}>
          <Card
            className="border-0 h-100"
            style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}
          >
            <Card.Header className="bg-white border-0 px-3 px-md-4 pt-4 pb-2">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "#0f172a" }}>
                    Administrator Accounts
                  </h5>
                </div>

                <Badge bg="light" text="dark" pill>
                  {admins.length} accounts
                </Badge>
              </div>
            </Card.Header>

            <Card.Body className="px-2 px-md-3">
              {admins.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead>
                      <tr className="small text-muted">
                        <th>Username</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>

                    <tbody>
                      {admins.map((admin) => {
                        const status = getStatus(admin);

                        return (
                          <tr key={admin.id}>
                            <td>
                              <div className="fw-semibold text-break">
                                {admin.username}
                              </div>
                              <small className="text-muted">
                                ID: {admin.id}
                              </small>
                            </td>

                            <td>
                              <Badge
                                bg={status.variant}
                                className="px-2 py-2"
                              >
                                {status.label}
                              </Badge>
                            </td>

                            <td>
                              <div className="d-flex justify-content-end flex-wrap gap-1">
                                {admin.approved === false && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline-success"
                                      title="Approve"
                                      onClick={() =>
                                        openActionModal(admin, "approve")
                                      }
                                    >
                                      <FaUserCheck />
                                    </Button>

                                    <Button
                                      size="sm"
                                      variant="outline-danger"
                                      title="Reject pending application"
                                      onClick={() =>
                                        openActionModal(admin, "reject")
                                      }
                                    >
                                      <FaUserTimes />
                                    </Button>
                                  </>
                                )}

                                {admin.approved === true &&
                                  admin.suspended !== true && (
                                    <Button
                                      size="sm"
                                      variant="outline-warning"
                                      title="Suspend"
                                      onClick={() =>
                                        openActionModal(admin, "suspend")
                                      }
                                    >
                                      <FaPauseCircle />
                                    </Button>
                                  )}

                                {admin.suspended === true && (
                                  <Button
                                    size="sm"
                                    variant="outline-success"
                                    title="Reactivate"
                                    onClick={() =>
                                      openActionModal(admin, "reactivate")
                                    }
                                  >
                                    <FaPlayCircle />
                                  </Button>
                                )}

                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  title="Delete account"
                                  onClick={() =>
                                    openActionModal(admin, "delete")
                                  }
                                >
                                  <FaTrash />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <FaUsers size={35} className="text-muted mb-3" />
                  <h6 className="fw-bold">No administrator accounts found</h6>
                  <p className="text-muted small mb-3">
                    The backend returned an empty admin list.
                  </p>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => loadDashboardData()}
                  >
                    <FaSyncAlt className="me-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Pending approvals */}
        <Col lg={4}>
          <Card
            className="border-0 h-100"
            style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}
          >
            <Card.Header className="bg-white border-0 px-4 pt-4 pb-2">
              <div className="d-flex justify-content-between align-items-center">
                <h6 className="fw-bold mb-0" style={{ color: "#0f172a" }}>
                  Pending Approvals
                </h6>
                <Badge bg="warning" text="dark" pill>
                  {pendingAdmins.length}
                </Badge>
              </div>
            </Card.Header>

            <Card.Body className="p-3">
              <AnimatePresence>
                {pendingAdmins.length > 0 ? (
                  pendingAdmins.map((admin) => (
                    <motion.div
                      key={admin.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      className="p-3 mb-2"
                      style={{
                        borderRadius: 12,
                        background: "#f8fafc",
                        border: "1px solid #eef2f7",
                      }}
                    >
                      <div className="fw-bold text-break">
                        {admin.username}
                      </div>
                      <small className="text-muted">
                        Admin ID: {admin.id}
                      </small>

                      <div className="d-flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="success"
                          className="flex-grow-1"
                          disabled={actionLoading}
                          onClick={() =>
                            openActionModal(admin, "approve")
                          }
                        >
                          <FaUserCheck className="me-1" />
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          disabled={actionLoading}
                          onClick={() =>
                            openActionModal(admin, "reject")
                          }
                        >
                          <FaUserTimes className="me-1" />
                          Reject
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-2"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background: "#ecfdf5",
                        color: "#10b981",
                      }}
                    >
                      <FaCheckCircle size={26} />
                    </div>

                    <p className="text-muted mb-0 fw-semibold">
                      No pending approvals
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card.Body>
          </Card>

          {/* Real summary calculated from the returned records */}
          <Card
            className="border-0 mt-3 mt-md-4"
            style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}
          >
            <Card.Header className="bg-white border-0 px-4 pt-4 pb-2">
              <h6 className="fw-bold mb-0" style={{ color: "#0f172a" }}>
                Account Summary
              </h6>
            </Card.Header>

            <Card.Body className="px-3 pb-3">
              {[
                {
                  label: "Total accounts",
                  value: stats.total,
                  color: "#6366f1",
                },
                {
                  label: "Approved",
                  value: stats.approved,
                  color: "#059669",
                },
                {
                  label: "Active and approved",
                  value: activeAdmins.length,
                  color: "#0ea5e9",
                },
                {
                  label: "Pending",
                  value: stats.pending,
                  color: "#d97706",
                },
                {
                  label: "Suspended",
                  value: stats.suspended,
                  color: "#dc2626",
                },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className="d-flex justify-content-between align-items-center px-3 py-2 mb-1"
                  style={{
                    borderRadius: 10,
                    background: index % 2 ? "#f8fafc" : "#fff",
                  }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: item.color,
                      }}
                    />
                    <span className="fw-semibold text-muted">
                      {item.label}
                    </span>
                  </div>

                  <span className="fw-bold" style={{ color: "#0f172a" }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation modal */}
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        backdrop={actionLoading ? "static" : true}
      >
        <Modal.Header closeButton={!actionLoading} className="border-0 pb-0">
          <Modal.Title className="fw-bold">
            {modalAction === "approve" && (
              <span className="text-success">
                <FaUserCheck className="me-2" />
                {getModalTitle()}
              </span>
            )}

            {modalAction === "reject" && (
              <span className="text-danger">
                <FaUserTimes className="me-2" />
                {getModalTitle()}
              </span>
            )}

            {modalAction === "suspend" && (
              <span className="text-warning">
                <FaPauseCircle className="me-2" />
                {getModalTitle()}
              </span>
            )}

            {modalAction === "reactivate" && (
              <span className="text-success">
                <FaPlayCircle className="me-2" />
                {getModalTitle()}
              </span>
            )}

            {modalAction === "delete" && (
              <span className="text-danger">
                <FaTrash className="me-2" />
                {getModalTitle()}
              </span>
            )}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="text-center py-2">
            <h5 className="fw-bold">
              {selectedAdmin?.username || "Administrator"}
            </h5>

            <p className="text-muted">{getModalMessage()}</p>

            <div
              className="text-start mx-auto mt-3 p-3"
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                maxWidth: 340,
              }}
            >
              <small className="d-block mb-1">
                <strong>Admin ID:</strong> {selectedAdmin?.id ?? "—"}
              </small>

              <small className="d-block">
                <strong>Status:</strong>{" "}
                {selectedAdmin ? getStatus(selectedAdmin).label : "—"}
              </small>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="border-0 pt-0">
          <Button
            variant="light"
            onClick={closeModal}
            disabled={actionLoading}
          >
            Cancel
          </Button>

          <Button
            variant={
              modalAction === "approve" || modalAction === "reactivate"
                ? "success"
                : modalAction === "suspend"
                ? "warning"
                : "danger"
            }
            onClick={confirmAction}
            disabled={actionLoading}
          >
            {actionLoading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  className="me-2"
                />
                Processing...
              </>
            ) : (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notifications */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          bg={toastVariant}
          className="border-0"
          style={{ borderRadius: 12, boxShadow: CARD_SHADOW }}
        >
          <Toast.Header closeButton className="border-0">
            <strong className="me-auto">
              {toastVariant === "success"
                ? "Success"
                : toastVariant === "warning"
                ? "Warning"
                : "Notice"}
            </strong>
          </Toast.Header>

          <Toast.Body
            className={
              toastVariant === "warning" ||
              toastVariant === "light"
                ? "text-dark fw-medium"
                : "text-white fw-medium"
            }
          >
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      <style>{`
        .stat-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(15,23,42,0.10) !important;
        }

        .table > :not(caption) > * > * {
          background: transparent;
        }

        .btn:focus {
          box-shadow: none;
        }
      `}</style>
    </Container>
  );
}

export default SuperDashboard;
