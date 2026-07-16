import { Link } from "react-router-dom";
import { FaClock, FaCheckCircle } from "react-icons/fa";

function WaitingApproval() {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fc"
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{
          maxWidth: "550px",
          width: "100%",
          borderRadius: "15px"
        }}
      >
        <div className="card-body p-5 text-center">

          <FaCheckCircle
            size={70}
            className="text-success mb-3"
          />

          <h2 className="fw-bold text-primary">
            Registration Submitted
          </h2>

          <p className="text-muted mt-3">
            Your request to become a Parish Administrator has been received successfully.
          </p>

          <div
            className="alert alert-warning mt-4"
            role="alert"
          >
            <FaClock className="me-2" />

            Your account is currently
            <strong> awaiting approval </strong>
            from the System Administrator.

            <br /><br />

            You will only be able to log in once your account has been approved.
          </div>

          <div className="d-grid gap-2 mt-4">

            <Link
              to="/admin/login"
              className="btn btn-primary"
            >
              Go to Login
            </Link>

            <Link
              to="/"
              className="btn btn-outline-secondary"
            >
              Back to Website
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default WaitingApproval;