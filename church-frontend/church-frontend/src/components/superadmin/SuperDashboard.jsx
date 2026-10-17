import { useState, useEffect } from "react";
import { Card, Row, Col, Table, Badge, Button, Toast, ToastContainer, Modal, Spinner, Container } from "react-bootstrap";
import {
  FaChurch, FaUsers, FaCalendarAlt, FaImages, FaCheckCircle, FaTimesCircle,
  FaClock, FaUserCheck, FaUserTimes, FaTrash, FaPauseCircle, FaPlayCircle,
  FaShieldAlt, FaSyncAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:8080/api";
const ADMIN_API = `${API_URL}/system-admin/admins`;

// --- Design tokens ---
const CARD_SHADOW = "0 4px 20px rgba(15, 23, 42, 0.06)";
const CARD_RADIUS = "16px";

function SuperDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ deaneries: 0, pendingAdmins: 0, events: 0, gallery: 0 });
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [quickSummary, setQuickSummary] = useState({ parishes: 0, deaneries: 0, leaders: 0, ministries: 0, news: 0 });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    };
  };

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const adminsRes = await axios.get(`${API_URL}/auth/pending`, authHeaders());
      setPendingAdmins(adminsRes.data || []);

      const statsRes = await axios.get(`${API_URL}/dashboard/stats`, authHeaders());
      setStats(statsRes.data || { deaneries: 0, pendingAdmins: 0, events: 0, gallery: 0 });

      const activitiesRes = await axios.get(`${API_URL}/dashboard/recent-activities`, authHeaders());
      setRecentActivities(activitiesRes.data || []);

      const summaryRes = await axios.get(`${API_URL}/dashboard/summary`, authHeaders());
      setQuickSummary(summaryRes.data || { parishes: 0, deaneries: 0, leaders: 0, ministries: 0, news: 0 });
    } catch (error) {
      console.error("Error loading dashboard data:", error);

      let errorMessage = "Failed to load dashboard data";
      if (error.response) {
        if (error.response.status === 401) errorMessage = "Session expired. Please login again.";
        else if (error.response.status === 403) errorMessage = "You don't have permission to access this data.";
        else if (error.response.data?.message) errorMessage = error.response.data.message;
        else if (error.response.data?.error) errorMessage = error.response.data.error;
      } else if (error.request) {
        errorMessage = "Cannot connect to server. Please check your connection.";
      } else {
        errorMessage = error.message || "An error occurred";
      }

      setToastMessage(`❌ ${errorMessage}`);
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadDashboardData(); }, []);

  const handleApproveClick    = (a) => { setSelectedAdmin(a); setModalAction("approve");    setShowModal(true); };
  const handleRejectClick     = (a) => { setSelectedAdmin(a); setModalAction("reject");     setShowModal(true); };
  const handleDeleteClick     = (a) => { setSelectedAdmin(a); setModalAction("delete");     setShowModal(true); };
  const handleSuspendClick    = (a) => { setSelectedAdmin(a); setModalAction("suspend");    setShowModal(true); };
  const handleReactivateClick = (a) => { setSelectedAdmin(a); setModalAction("reactivate"); setShowModal(true); };

  const confirmAction = async () => {
    if (!selectedAdmin) return;
    try {
      if (modalAction === "approve") {
        await axios.put(`${API_URL}/auth/approve/${selectedAdmin.id}`, {}, authHeaders());
        setToastMessage(`✅ ${selectedAdmin.username} has been approved successfully!`);
        setToastVariant("success");
        setPendingAdmins(pendingAdmins.filter(a => a.id !== selectedAdmin.id));
        setRecentActivities([{ id: Date.now(), activity: `Admin ${selectedAdmin.username} approved`, date: "Just now", status: "completed" }, ...recentActivities]);
      } else if (modalAction === "reject") {
        await axios.put(`${ADMIN_API}/${selectedAdmin.id}/reject`, {}, authHeaders());
        setToastMessage(`🗑️ ${selectedAdmin.username} has been rejected.`);
        setToastVariant("danger");
        setPendingAdmins(pendingAdmins.filter(a => a.id !== selectedAdmin.id));
      } else if (modalAction === "suspend") {
        await axios.put(`${ADMIN_API}/${selectedAdmin.id}/suspend`, {}, authHeaders());
        setToastMessage(`⏸️ ${selectedAdmin.username} has been suspended.`);
        setToastVariant("warning");
        setPendingAdmins(pendingAdmins.filter(a => a.id !== selectedAdmin.id));
      } else if (modalAction === "reactivate") {
        await axios.put(`${ADMIN_API}/${selectedAdmin.id}/reactivate`, {}, authHeaders());
        setToastMessage(`▶️ ${selectedAdmin.username} has been reactivated.`);
        setToastVariant("success");
        setPendingAdmins(pendingAdmins.filter(a => a.id !== selectedAdmin.id));
      } else if (modalAction === "delete") {
        await axios.delete(`${ADMIN_API}/${selectedAdmin.id}`, authHeaders());
        setToastMessage(`🗑️ ${selectedAdmin.username} has been permanently deleted.`);
        setToastVariant("danger");
        setPendingAdmins(pendingAdmins.filter(a => a.id !== selectedAdmin.id));
      }
      setShowToast(true);
      setShowModal(false);
      setSelectedAdmin(null);
    } catch (error) {
      console.error("Action failed:", error);
      const errorMessage =
        error.response?.data?.message || error.response?.data?.error || error.message || "Action failed. Please try again.";
      setToastMessage(`❌ ${errorMessage}`);
      setToastVariant("danger");
      setShowToast(true);
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "70vh" }}>
        <Spinner animation="grow" variant="primary" />
        <p className="mt-3 text-muted fw-semibold">Loading dashboard…</p>
      </div>
    );
  }

  const statCards = [
    { icon: FaChurch,        label: "Deaneries",      value: stats.deaneries || 0,       color: "#6366f1", bg: "#eef2ff" },
    { icon: FaUsers,         label: "Pending Admins", value: pendingAdmins.length || 0,  color: "#f59e0b", bg: "#fff7ed" },
    { icon: FaCalendarAlt,   label: "Events",         value: stats.events || 0,          color: "#10b981", bg: "#ecfdf5" },
    { icon: FaImages,        label: "Gallery",        value: stats.gallery || 0,         color: "#0ea5e9", bg: "#f0f9ff" },
  ];

  const renderModalTitle = () => {
    switch (modalAction) {
      case "approve":    return <span className="text-success"><FaUserCheck className="me-2" /> Confirm Approval</span>;
      case "reject":     return <span className="text-danger"><FaUserTimes className="me-2" /> Confirm Rejection</span>;
      case "suspend":    return <span className="text-warning"><FaPauseCircle className="me-2" /> Confirm Suspension</span>;
      case "reactivate": return <span className="text-success"><FaPlayCircle className="me-2" /> Confirm Reactivation</span>;
      case "delete":     return <span className="text-danger"><FaTrash className="me-2" /> Confirm Deletion</span>;
      default: return null;
    }
  };

  return (
    <Container fluid className="px-3 px-md-5 py-4" style={{ background: "#f8fafc", minHeight: "100vh" }}>
      {/* ---------- Header ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="d-flex flex-wrap justify-content-between align-items-center mb-4"
      >
        <div className="d-flex align-items-center gap-3">
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", boxShadow: "0 8px 20px rgba(99,102,241,0.35)" }}
          >
            <FaShieldAlt size={22} />
          </div>
          <div>
            <h2 className="fw-bold mb-0" style={{ color: "#0f172a", letterSpacing: "-0.5px" }}>Super Admin Dashboard</h2>
            <small className="text-muted">Manage administrators & monitor platform activity</small>
          </div>
        </div>

        <Button
          variant="light"
          size="sm"
          onClick={loadDashboardData}
          className="d-flex align-items-center gap-2 fw-semibold"
          style={{ borderRadius: 10, border: "1px solid #e2e8f0", boxShadow: CARD_SHADOW }}
        >
          <FaSyncAlt /> Refresh
        </Button>
      </motion.div>

      {/* ---------- Stat Cards ---------- */}
      <Row className="g-3 g-md-4">
        {statCards.map((stat, idx) => (
          <Col xs={6} lg={3} key={idx}>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.06 }}>
              <Card
                className="border-0 h-100 stat-card"
                style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW, overflow: "hidden" }}
              >
                <Card.Body className="p-3 p-md-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{ width: 44, height: 44, borderRadius: 12, background: stat.bg, color: stat.color }}
                    >
                      <stat.icon size={20} />
                    </div>
                  </div>
                  <div className="text-muted small fw-semibold text-uppercase" style={{ letterSpacing: "0.6px" }}>{stat.label}</div>
                  <div className="fw-bold" style={{ fontSize: "1.9rem", color: "#0f172a", lineHeight: 1.1 }}>{stat.value}</div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* ---------- Main content ---------- */}
      <Row className="mt-4 g-3 g-md-4">
        {/* Recent Activity */}
        <Col lg={8} className="order-2 order-lg-1">
          <Card className="border-0 h-100" style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}>
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4 pb-2">
              <h6 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Recent Activity</h6>
              <Badge pill bg="light" text="dark" className="fw-semibold">{recentActivities.length}</Badge>
            </Card.Header>
            <Card.Body className="px-2 px-md-3 pb-3">
              {recentActivities.length > 0 ? (
                <div className="table-responsive">
                  <Table hover borderless className="align-middle mb-0">
                    <thead>
                      <tr style={{ fontSize: "0.75rem", letterSpacing: "0.6px", textTransform: "uppercase", color: "#94a3b8" }}>
                        <th className="ps-3">Activity</th>
                        <th className="d-none d-sm-table-cell">Date</th>
                        <th className="pe-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivities.map((activity) => (
                        <motion.tr key={activity.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>
                          <td className="ps-3 text-wrap fw-medium" style={{ color: "#0f172a" }}>{activity.activity}</td>
                          <td className="d-none d-sm-table-cell text-muted">{activity.date}</td>
                          <td className="pe-3">
                            <Badge
                              pill
                              bg={activity.status === "completed" ? "success" : "warning"}
                              className="px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1"
                            >
                              {activity.status === "completed"
                                ? <><FaCheckCircle size={11} /> Completed</>
                                : <><FaClock size={11} /> Pending</>}
                            </Badge>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5 text-muted">
                  <i className="bi bi-inbox fs-1 d-block mb-2" style={{ opacity: 0.4 }}></i>
                  <small className="fw-semibold">No recent activities</small>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar */}
        <Col lg={4} className="order-1 order-lg-2">
          {/* Pending Approvals */}
          <Card className="border-0" style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}>
            <Card.Header className="bg-white border-0 d-flex justify-content-between align-items-center px-4 pt-4 pb-2">
              <h6 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Pending Approvals</h6>
              <Badge pill bg="warning" className="fw-bold px-3">{pendingAdmins.length}</Badge>
            </Card.Header>
            <Card.Body className="p-3">
              <AnimatePresence>
                {pendingAdmins.length > 0 ? (
                  pendingAdmins.map((admin, idx) => (
                    <motion.div
                      key={admin.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.25 }}
                      className="p-3 mb-2"
                      style={{
                        borderRadius: 12,
                        background: "#f8fafc",
                        border: "1px solid #eef2f7",
                      }}
                    >
                      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
                        <div className="flex-grow-1" style={{ minWidth: 0 }}>
                          <h6 className="mb-1 fw-bold text-truncate" style={{ color: "#0f172a" }}>{admin.username}</h6>
                          {admin.email && <small className="text-muted d-block text-truncate">{admin.email}</small>}
                          <div className="d-flex flex-wrap gap-1 mt-2">
                            {admin.parish && <Badge bg="info" pill className="fw-semibold">{admin.parish}</Badge>}
                            <Badge bg="light" text="dark" pill className="fw-semibold d-inline-flex align-items-center gap-1">
                              <FaClock size={10} />
                              {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "Recent"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex flex-wrap gap-2 mt-3">
                        <Button size="sm" variant="success" onClick={() => handleApproveClick(admin)} className="d-inline-flex align-items-center gap-1 fw-semibold" style={{ borderRadius: 8 }}>
                          <FaUserCheck /> Approve
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleRejectClick(admin)} className="d-inline-flex align-items-center gap-1 fw-semibold" style={{ borderRadius: 8 }}>
                          <FaUserTimes /> Reject
                        </Button>
                        <Button size="sm" variant="outline-warning" onClick={() => handleSuspendClick(admin)} className="d-inline-flex align-items-center gap-1 fw-semibold" style={{ borderRadius: 8 }}>
                          <FaPauseCircle />
                        </Button>
                        <Button size="sm" variant="outline-info" onClick={() => handleReactivateClick(admin)} className="d-inline-flex align-items-center gap-1 fw-semibold" style={{ borderRadius: 8 }}>
                          <FaPlayCircle />
                        </Button>
                        <Button size="sm" variant="outline-secondary" onClick={() => handleDeleteClick(admin)} className="d-inline-flex align-items-center gap-1 fw-semibold ms-auto" style={{ borderRadius: 8 }} title="Delete permanently">
                          <FaTrash />
                        </Button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center mb-2"
                      style={{ width: 56, height: 56, borderRadius: "50%", background: "#ecfdf5", color: "#10b981" }}
                    >
                      <FaCheckCircle size={26} />
                    </div>
                    <p className="text-muted mb-0 fw-semibold">All admins approved 🎉</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card.Body>
          </Card>

          {/* Quick Summary */}
          <Card className="border-0 mt-3 mt-md-4" style={{ borderRadius: CARD_RADIUS, boxShadow: CARD_SHADOW }}>
            <Card.Header className="bg-white border-0 px-4 pt-4 pb-2">
              <h6 className="fw-bold mb-0" style={{ color: "#0f172a" }}>Quick Summary</h6>
            </Card.Header>
            <Card.Body className="px-3 pb-3">
              {[
                { label: "Parishes",  value: quickSummary.parishes,  color: "#6366f1" },
                { label: "Deaneries", value: quickSummary.deaneries, color: "#8b5cf6" },
                { label: "Leaders",   value: quickSummary.leaders,   color: "#10b981" },
                { label: "Ministries",value: quickSummary.ministries,color: "#f59e0b" },
                { label: "News",      value: quickSummary.news,      color: "#0ea5e9" },
              ].map((row, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between align-items-center px-3 py-2 mb-1"
                  style={{ borderRadius: 10, background: i % 2 ? "#f8fafc" : "#fff" }}
                >
                  <div className="d-flex align-items-center gap-2">
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: row.color }}></span>
                    <span className="fw-semibold" style={{ color: "#334155" }}>{row.label}</span>
                  </div>
                  <span className="fw-bold" style={{ color: "#0f172a" }}>{row.value || 0}</span>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ---------- Modal ---------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered contentClassName="border-0" style={{ borderRadius: 18 }}>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold">{renderModalTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <div className="text-center py-2">
            {modalAction === "approve" && (<><FaCheckCircle size={44} className="text-success mb-3" /><h5 className="fw-bold">Approve <span style={{ color: "#0f172a" }}>{selectedAdmin?.username}</span>?</h5><p className="text-muted small">This will give them access to the admin dashboard.</p></>)}
            {modalAction === "reject" && (<><FaTimesCircle size={44} className="text-danger mb-3" /><h5 className="fw-bold">Reject <span style={{ color: "#0f172a" }}>{selectedAdmin?.username}</span>?</h5><p className="text-muted small">This action cannot be undone.</p></>)}
            {modalAction === "suspend" && (<><FaPauseCircle size={44} className="text-warning mb-3" /><h5 className="fw-bold">Suspend <span style={{ color: "#0f172a" }}>{selectedAdmin?.username}</span>?</h5><p className="text-muted small">They will not be able to log in until reactivated.</p></>)}
            {modalAction === "reactivate" && (<><FaPlayCircle size={44} className="text-success mb-3" /><h5 className="fw-bold">Reactivate <span style={{ color: "#0f172a" }}>{selectedAdmin?.username}</span>?</h5><p className="text-muted small">They will be able to log in again.</p></>)}
            {modalAction === "delete" && (<><FaTrash size={44} className="text-danger mb-3" /><h5 className="fw-bold">Delete <span style={{ color: "#0f172a" }}>{selectedAdmin?.username}</span>?</h5><p className="text-muted small">This will remove the account from the system completely.</p></>)}

            <div className="text-start mx-auto mt-3 p-3" style={{ background: "#f8fafc", borderRadius: 12, maxWidth: 340 }}>
              <small className="d-block mb-1"><strong>Email:</strong> {selectedAdmin?.email || "—"}</small>
              <small className="d-block"><strong>Parish:</strong> {selectedAdmin?.parish || "N/A"}</small>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          <Button variant="light" onClick={() => setShowModal(false)} className="fw-semibold" style={{ borderRadius: 10 }}>Cancel</Button>
          <Button
            variant={modalAction === "approve" || modalAction === "reactivate" ? "success" : modalAction === "suspend" ? "warning" : "danger"}
            onClick={confirmAction}
            className="fw-semibold px-4"
            style={{ borderRadius: 10 }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------- Toast ---------- */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={5000} autohide bg={toastVariant} className="border-0" style={{ borderRadius: 12, boxShadow: CARD_SHADOW }}>
          <Toast.Header closeButton={false} className="border-0 bg-transparent">
            <strong className="me-auto">
              {toastVariant === "success" ? "✅ Success" : toastVariant === "warning" ? "⚠️ Warning" : "❌ Error"}
            </strong>
          </Toast.Header>
          <Toast.Body className="text-white fw-medium">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>

      {/* ---------- Local styles ---------- */}
      <style>{`
        .stat-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(15,23,42,0.10) !important; }
        .table > :not(caption) > * > * { background: transparent; }
        .form-control:focus, .btn:focus { box-shadow: none; }
      `}</style>
    </Container>
  );
}

export default SuperDashboard;