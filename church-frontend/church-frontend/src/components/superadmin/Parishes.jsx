import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Form, Button, Row, Col, Table, Alert } from "react-bootstrap";

const API_URL = "http://localhost:8080/api/parishes";
const DEANERY_URL = "http://localhost:8080/api/deaneries";

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

function Parishes() {
  const [parish, setParish] = useState(emptyForm);
  const [parishes, setParishes] = useState([]);
  const [deaneries, setDeaneries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  const loadDeaneries = async () => {
    try {
      const res = await axios.get(DEANERY_URL);
      setDeaneries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadParishes = async () => {
    try {
      const res = await axios.get(API_URL);
      setParishes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadDeaneries();
    loadParishes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParish({
      ...parish,
      [name]:
        name === "deaneryId" || name === "yearEstablished" || name === "catholicCount"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    });
  };

  const clearForm = () => {
    setEditingId(null);
    setParish(emptyForm);
    setErrorMsg("");
  };

  const saveParish = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");

    try {
      const payload = { ...parish };

      if (payload.deaneryId === "") delete payload.deaneryId;
      if (payload.yearEstablished === "") delete payload.yearEstablished;
      if (payload.catholicCount === "") delete payload.catholicCount;

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, payload, getAuthHeader());
        setMessage("Parish updated successfully.");
      } else {
        await axios.post(API_URL, payload, getAuthHeader());
        setMessage("Parish added successfully.");
      }

      clearForm();
      loadParishes();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        setErrorMsg("Unauthorized. Only System Admins can do this.");
      } else if (err.response && err.response.status === 409) {
        setErrorMsg("A parish with this name already exists.");
      } else if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("An error occurred while saving the parish.");
      }
    }
  };

  const editParish = (item) => {
    setEditingId(item.id);
    setParish({
      deaneryId: item.deaneryId ?? "",
      name: item.name ?? "",
      address: item.address ?? "",
      phone: item.phone ?? "",
      email: item.email ?? "",
      yearEstablished: item.yearEstablished ?? "",
      imageUrl: item.imageUrl ?? "",
      facebookPageUrl: item.facebookPageUrl ?? "",
      catholicCount: item.catholicCount ?? 0,
    });
  };

  const deleteParish = async (id) => {
    if (!window.confirm("Delete this parish?")) return;
    setErrorMsg("");

    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeader());
      setMessage("Parish deleted successfully.");
      loadParishes();
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 403) {
        setErrorMsg("Unauthorized. Only System Admins can delete this parish.");
      } else if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
      } else {
        setErrorMsg("An error occurred while deleting the parish.");
      }
    }
  };

  const getDeaneryName = (id) => {
    const deanery = deaneries.find((item) => item.id === id);
    return deanery ? deanery.name : "Unassigned";
  };

  return (
    <Card className="shadow">
      <Card.Header>
        <h3>Parish Management</h3>
      </Card.Header>

      <Card.Body>
        {message && (
          <Alert variant="success" dismissible onClose={() => setMessage("")}>
            {message}
          </Alert>
        )}

        {errorMsg && (
          <Alert variant="danger" dismissible onClose={() => setErrorMsg("")}>
            {errorMsg}
          </Alert>
        )}

        <Form onSubmit={saveParish}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Deanery</Form.Label>
                <Form.Select
                  name="deaneryId"
                  value={parish.deaneryId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select deanery</option>
                  {deaneries.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Parish Name</Form.Label>
                <Form.Control
                  name="name"
                  value={parish.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  value={parish.address}
                  onChange={handleChange}
                  placeholder="e.g. 14 Main Road, Harare"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="phone"
                  value={parish.phone}
                  onChange={handleChange}
                  placeholder="+263..."
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={parish.email}
                  onChange={handleChange}
                  placeholder="parish@example.org"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Year Established</Form.Label>
                <Form.Control
                  type="number"
                  name="yearEstablished"
                  value={parish.yearEstablished}
                  onChange={handleChange}
                  placeholder="1950"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  name="imageUrl"
                  value={parish.imageUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Facebook Page URL</Form.Label>
                <Form.Control
                  name="facebookPageUrl"
                  value={parish.facebookPageUrl}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Catholic Count</Form.Label>
                <Form.Control
                  type="number"
                  name="catholicCount"
                  value={parish.catholicCount}
                  onChange={handleChange}
                  min="0"
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit">{editingId ? "Update Parish" : "Save Parish"}</Button>
          <Button variant="secondary" className="ms-2" onClick={clearForm} type="button">
            Clear
          </Button>
        </Form>

        <hr />

        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Deanery</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Catholics</th>
              <th width="170">Actions</th>
            </tr>
          </thead>
          <tbody>
            {parishes.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{getDeaneryName(item.deaneryId)}</td>
                <td>{item.address || "-"}</td>
                <td>{item.phone || "-"}</td>
                <td>{item.catholicCount || 0}</td>
                <td>
                  <Button size="sm" onClick={() => editParish(item)}>
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="ms-2"
                    onClick={() => deleteParish(item.id)}
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

export default Parishes;
