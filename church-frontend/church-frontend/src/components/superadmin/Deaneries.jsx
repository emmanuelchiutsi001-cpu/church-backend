import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/deaneries";

function Deaneries() {
  // 1. Updated to match the API's expected POST/PUT body
  const emptyForm = {
    name: "",
    description: "",
    territory: "",
    archdioceseId: 1, // Defaulting to 1 based on your API example
    status: "ACTIVE",
    deanId: null,
    viceDeanId: null,
  };

  const [deanery, setDeanery] = useState(emptyForm);
  const [deaneries, setDeaneries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState(""); // Added to catch API errors

  // 2. Helper function to get the Admin Token
  const getAuthHeader = () => {
    const token = localStorage.getItem("token"); // Assuming you store it here
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  // Used after save/update/delete
  const loadDeaneries = async () => {
    try {
      // GET is public, no token needed
      const res = await axios.get(API_URL);
      setDeaneries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Initial loading
  useEffect(() => {
    loadDeaneries();
  }, []);

  const handleChange = (e) => {
    setDeanery({
      ...deanery,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setEditingId(null);
    setDeanery(emptyForm);
    setErrorMsg("");
  };

  const saveDeanery = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      if (editingId) {
        // 3. Added Auth Header to PUT
        await axios.put(`${API_URL}/${editingId}`, deanery, getAuthHeader());
        setMessage("Deanery updated successfully.");
      } else {
        // 3. Added Auth Header to POST
        await axios.post(API_URL, deanery, getAuthHeader());
        setMessage("Deanery added successfully.");
      }

      clearForm();
      loadDeaneries();
    } catch (err) {
      console.error(err);
      // Catch 401/403 or 400 errors from the backend
      if (err.response && err.response.status === 403) {
        setErrorMsg("Unauthorized. Only System Admins can perform this action.");
      } else if (err.response && err.response.status === 400) {
        setErrorMsg("Invalid input data. Please check your fields.");
      } else {
        setErrorMsg("An error occurred while saving.");
      }
    }
  };

  const editDeanery = (item) => {
    setEditingId(item.id);
    // Map the returned item safely to our form fields
    setDeanery({
      name: item.name || "",
      description: item.description || "",
      territory: item.territory || "",
      archdioceseId: item.archdioceseId || 1,
      status: item.status || "ACTIVE",
      deanId: item.dean ? item.dean.id : null, // Handle nested objects if returned
      viceDeanId: item.viceDean ? item.viceDean.id : null,
    });
  };

  const deleteDeanery = async (id) => {
    if (!window.confirm("Delete this deanery?")) {
      return;
    }
    setErrorMsg("");

    try {
      // 3. Added Auth Header to DELETE
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      setMessage("Deanery deleted successfully.");
      loadDeaneries();
    } catch (err) {
      console.error(err);
      // Handle the 409 Conflict mentioned in your API docs
      if (err.response && err.response.status === 409) {
        setErrorMsg("Cannot delete: This deanery still contains parishes.");
      } else if (err.response && err.response.status === 403) {
        setErrorMsg("Unauthorized. Only System Admins can delete.");
      } else {
        setErrorMsg("An error occurred while deleting.");
      }
    }
  };

  return (
    <Card className="shadow">
      <Card.Header>
        <h3>Deanery Management</h3>
      </Card.Header>

      <Card.Body>
        {/* Success Message */}
        {message && (
          <Alert variant="success" dismissible onClose={() => setMessage("")}>
            {message}
          </Alert>
        )}

        {/* Error Message */}
        {errorMsg && (
          <Alert variant="danger" dismissible onClose={() => setErrorMsg("")}>
            {errorMsg}
          </Alert>
        )}

        <Form onSubmit={saveDeanery}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Deanery Name</Form.Label>
                <Form.Control
                  name="name"
                  value={deanery.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Territory</Form.Label>
                <Form.Control
                  name="territory"
                  value={deanery.territory}
                  onChange={handleChange}
                  placeholder="e.g. Gweru and surrounding areas"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Dean ID (Optional)</Form.Label>
                <Form.Control
                  type="number"
                  name="deanId"
                  value={deanery.deanId || ""}
                  onChange={handleChange}
                  placeholder="e.g. 4"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={deanery.status}
                  onChange={handleChange}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={deanery.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit">
            {editingId ? "Update Deanery" : "Save Deanery"}
          </Button>

          <Button variant="secondary" className="ms-2" onClick={clearForm}>
            Clear
          </Button>
        </Form>

        <hr />

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Territory</th>
              <th>Status</th>
              <th>Parishes</th> {/* This comes from the GET request's parishCount */}
              <th width="170">Actions</th>
            </tr>
          </thead>

          <tbody>
            {deaneries.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.territory}</td>
                <td>{item.status}</td>
                <td>{item.parishCount !== undefined ? item.parishCount : 0}</td>
                <td>
                  <Button size="sm" onClick={() => editDeanery(item)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="ms-2"
                    onClick={() => deleteDeanery(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Deaneries;