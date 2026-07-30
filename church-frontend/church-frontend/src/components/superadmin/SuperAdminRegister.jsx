import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/auth";

function SuperAdminRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setSuccess("");
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {

      const response = await axios.post(
        `${API_URL}/register-system-admin`,
        {
          username: form.username,
          password: form.password,
        }
      );

      setSuccess(response.data);

      setTimeout(() => {
        navigate("/superadmin/login");
      }, 1500);

    } catch (err) {

      setError(
        err.response?.data ||
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
      }}
    >

      <Row>

        <Col>

          <Card
            className="shadow"
            style={{
              width: "430px",
            }}
          >

            <Card.Body>

              <h3 className="text-center mb-4">
                Super Admin Registration
              </h3>

              {success && (
                <Alert variant="success">
                  {success}
                </Alert>
              )}

              {error && (
                <Alert variant="danger">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Username
                  </Form.Label>

                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

                <Form.Group className="mb-3">

                  <Form.Label>
                    Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

                <Form.Group className="mb-4">

                  <Form.Label>
                    Confirm Password
                  </Form.Label>

                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    required
                  />

                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >

                  {loading
                    ? "Creating Account..."
                    : "Register"}

                </Button>

              </Form>

              <hr />

              <div className="text-center">

                Already have an account?

                <br />

                <Link
                  to="/superadmin/login"
                >
                  Login Here
                </Link>

              </div>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </Container>

  );

}

export default SuperAdminRegister;