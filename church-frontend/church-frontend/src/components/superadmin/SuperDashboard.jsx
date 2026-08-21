import { useState, useEffect } from "react";
import { Card, Row, Col, Table, Badge, Button, Toast, ToastContainer, Modal, Spinner } from "react-bootstrap";
import {
  FaChurch,
  FaUsers,
  FaCalendarAlt,
  FaImages,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_URL = "http://localhost:8080/api";

function SuperDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    deaneries: 0,
    pendingAdmins: 0,
    events: 0,
    gallery: 0,
  });
  const [pendingAdmins, setPendingAdmins] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [quickSummary, setQuickSummary] = useState({
    parishes: 0,
    deaneries: 0,
    leaders: 0,
    ministries: 0,
    news: 0,
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState(null);

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

  // Load all dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch pending admins
      const adminsRes = await axios.get(`${API_URL}/auth/pending`, authHeaders());
      setPendingAdmins(adminsRes.data);

      // Fetch dashboard stats from your backend
      // Adjust these endpoints based on your actual API
      const statsRes = await axios.get(`${API_URL}/dashboard/stats`, authHeaders());
      setStats(statsRes.data);

      // Fetch recent activities
      const activitiesRes = await axios.get(`${API_URL}/dashboard/recent-activities`, authHeaders());
      setRecentActivities(activitiesRes.data);

      // Fetch quick summary
      const summaryRes = await axios.get(`${API_URL}/dashboard/summary`, authHeaders());
      setQuickSummary(summaryRes.data);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setToastMessage("Failed to load dashboard data");
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Approve admin
  const handleApproveClick = (admin) => {
    setSelectedAdmin(admin);
    setModalAction("approve");
    setShowModal(true);
  };

  // Reject admin
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
          `${API_URL}/auth/approve/${selectedAdmin.id}`,
          {},
          authHeaders()
        );

        setToastMessage(`✅ ${selectedAdmin.username} has been approved successfully!`);
        setToastVariant("success");
        setShowToast(true);

        // Update pending list
        setPendingAdmins(pendingAdmins.filter(a => a.id !== selectedAdmin.id));
        
        // Add to recent activities
        setRecentActivities([
          {
            id: Date.now(),
            activity: `Admin ${selectedAdmin.username} approved`,
            date: "Just now",
            status: "completed"
          },
          ...recentActivities
        ]);

      } else {
        await axios.delete(
          `${API_URL}/auth/${selectedAdmin.id}`,
          authHeaders()
        );

        setToastMessage(`🗑️ ${selectedAdmin.username} has been rejected.`);
        setToastVariant("danger");
        setShowToast(true);

        // Update pending list
        setPendingAdmins(pendingAdmins.filter(a => a.id !== selectedAdmin.id));
        
        setRecentActivities([
          {
            id: Date.now(),
            activity: `Admin ${selectedAdmin.username} rejected`,
            date: "Just now",
            status: "pending"
          },
          ...recentActivities
        ]);
      }
      
      setShowModal(false);
      setSelectedAdmin(null);
      
    } catch (error) {
      console.error("Action failed:", error);
      setToastMessage(`❌ Action failed: ${error.response?.data || error.message}`);
      setToastVariant("danger");
      setShowToast(true);
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading dashboard...</p>
      </div>
    );
  }

  const statCards = [
    { icon: FaChurch, label: "Deaneries", value: stats.deaneries || 0, color: "primary" },
    { icon: FaUsers, label: "Pending Admins", value: pendingAdmins.length || 0, color: "warning" },
    { icon: FaCalendarAlt, label: "Events", value: stats.events || 0, color: "success" },
    { icon: FaImages, label: "Gallery", value: stats.gallery || 0, color: "info" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4">Super Admin Dashboard</h2>
      </motion.div>

      <Row className="g-4">
        {statCards.map((stat, idx) => (
          <Col md={3} key={idx}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="shadow-sm border-0 hover-card">
                <Card.Body>
                  <div className={`text-${stat.color} mb-2`}>
                    <stat.icon size={30} />
                  </div>
                  <h5 className="mt-3">{stat.label}</h5>
                  <h3 className="fw-bold">{stat.value}</h3>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col md={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white fw-bold d-flex justify-content-between align-items-center">
              <span>Recent Activity</span>
              <Button 
                variant="outline-primary" 
                size="sm" 
                onClick={loadDashboardData}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Refresh
              </Button>
            </Card.Header>
            <Card.Body>
              {recentActivities.length > 0 ? (
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((activity) => (
                      <motion.tr
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td>{activity.activity}</td>
                        <td>{activity.date}</td>
                        <td>
                          <Badge
                            bg={activity.status === "completed" ? "success" : "warning"}
                            className="px-3 py-2"
                          >
                            {activity.status === "completed" ? (
                              <><FaCheckCircle className="me-1" /> Completed</>
                            ) : (
                              <><FaClock className="me-1" /> Pending</>
                            )}
                          </Badge>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted">
                  <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                  No recent activities
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-white fw-bold d-flex justify-content-between align-items-center">
              <span>Pending Admin Approvals</span>
              <Badge bg="warning">{pendingAdmins.length}</Badge>
            </Card.Header>
            <Card.Body>
              <AnimatePresence>
                {pendingAdmins.length > 0 ? (
                  pendingAdmins.map((admin) => (
                    <motion.div
                      key={admin.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="border-bottom pb-3 mb-3"
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1 fw-bold">{admin.username}</h6>
                          <small className="text-muted d-block">{admin.email}</small>
                          {admin.parish && (
                            <Badge bg="info" className="mt-1">{admin.parish}</Badge>
                          )}
                          <div>
                            <small className="text-muted">
                              <FaClock className="me-1" size={12} />
                              {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "Recent"}
                            </small>
                          </div>
                        </div>
                        <div className="d-flex flex-column gap-1">
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleApproveClick(admin)}
                            className="px-3"
                          >
                            <FaUserCheck className="me-1" /> Approve
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRejectClick(admin)}
                            className="px-3"
                          >
                            <FaUserTimes className="me-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-4"
                  >
                    <FaCheckCircle size={40} className="text-success mb-2" />
                    <p className="text-muted mb-0">🎉 All admins approved!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card.Body>
          </Card>

          <Card className="shadow-sm border-0 mt-4">
            <Card.Header className="bg-white fw-bold">
              Quick Summary
            </Card.Header>
            <Card.Body>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
              >
                <p><strong>Total Parishes :</strong> {quickSummary.parishes || 0}</p>
                <p><strong>Total Deaneries :</strong> {quickSummary.deaneries || 0}</p>
                <p><strong>Total Leaders :</strong> {quickSummary.leaders || 0}</p>
                <p><strong>Total Ministries :</strong> {quickSummary.ministries || 0}</p>
                <p><strong>Total News :</strong> {quickSummary.news || 0}</p>
              </motion.div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalAction === "approve" ? (
              <span className="text-success"><FaUserCheck className="me-2" /> Confirm Approval</span>
            ) : (
              <span className="text-danger"><FaUserTimes className="me-2" /> Confirm Rejection</span>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center py-3">
            {modalAction === "approve" ? (
              <>
                <FaCheckCircle size={50} className="text-success mb-3" />
                <h5>Are you sure you want to approve <strong>{selectedAdmin?.username}</strong>?</h5>
                <p className="text-muted">This will give them access to the admin dashboard.</p>
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
                <h5>Are you sure you want to reject <strong>{selectedAdmin?.username}</strong>?</h5>
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

      <style jsx>{`
        .hover-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(13, 71, 161, 0.12) !important;
        }
      `}</style>
    </>
  );
}

export default SuperDashboard;