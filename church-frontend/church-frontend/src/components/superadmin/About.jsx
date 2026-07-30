import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Table,
  Alert,
} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/about";

function About() {
  const [about, setAbout] = useState({
    title: "",
    history: "",
    mission: "",
    vision: "",
    image: "",
  });

  const [aboutList, setAboutList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAbout();
  }, []);

function fetchAbout() {
   axios.get(API_URL)
        .then(res => setAboutList(res.data))
        .catch(console.error);
}

useEffect(() => {
   fetchAbout();
}, []);

  const handleChange = (e) => {
    setAbout({
      ...about,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setAbout({
      title: "",
      history: "",
      mission: "",
      vision: "",
      image: "",
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, about);
        setMessage("About information updated successfully.");
      } else {
        await axios.post(API_URL, about);
        setMessage("About information saved successfully.");
      }

      clearForm();
      fetchAbout();
    } catch (error) {
      console.error(error);
    }
  };

  const editAbout = (item) => {
    setEditingId(item.id);

    setAbout({
      title: item.title,
      history: item.history,
      mission: item.mission,
      vision: item.vision,
      image: item.image,
    });
  };

  const deleteAbout = async (id) => {
    if (!window.confirm("Delete this About information?")) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchAbout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid>

      <Card className="shadow">

        <Card.Header>
          <h3>About Management</h3>
        </Card.Header>

        <Card.Body>

          {message && (
            <Alert
              variant="success"
              onClose={() => setMessage("")}
              dismissible
            >
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <Row>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>

                  <Form.Control
                    type="text"
                    name="title"
                    value={about.title}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>History</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="history"
                    value={about.history}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Mission</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="mission"
                    value={about.mission}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Vision</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="vision"
                    value={about.vision}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group className="mb-4">
                  <Form.Label>Image URL</Form.Label>

                  <Form.Control
                    type="text"
                    name="image"
                    value={about.image}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

            </Row>

            <Button type="submit">
              {editingId ? "Update About" : "Save About"}
            </Button>

            <Button
              className="ms-2"
              variant="secondary"
              onClick={clearForm}
            >
              Clear
            </Button>

          </Form>

        </Card.Body>

      </Card>

      <Card className="shadow mt-4">

        <Card.Header>
          Existing About Information
        </Card.Header>

        <Card.Body>

          <Table bordered hover responsive>

            <thead>

              <tr>
                <th>Title</th>
                <th>Mission</th>
                <th>Vision</th>
                <th width="170">Actions</th>
              </tr>

            </thead>

            <tbody>

              {aboutList.map((item) => (

                <tr key={item.id}>

                  <td>{item.title}</td>

                  <td>{item.mission}</td>

                  <td>{item.vision}</td>

                  <td>

                    <Button
                      size="sm"
                      onClick={() => editAbout(item)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      className="ms-2"
                      onClick={() => deleteAbout(item.id)}
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

    </Container>
  );
}

export default About;