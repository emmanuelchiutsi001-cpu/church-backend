import { Card, Row, Col, Table } from "react-bootstrap";
import {
  FaChurch,
  FaUsers,
  FaCalendarAlt,
  FaImages,
} from "react-icons/fa";

function SuperDashboard() {
  return (
    <>
      <h2 className="mb-4">Super Admin Dashboard</h2>

      <Row className="g-4">

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <FaChurch size={30} />
              <h5 className="mt-3">Deaneries</h5>
              <h3>11</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <FaUsers size={30} />
              <h5 className="mt-3">Pending Admins</h5>
              <h3>4</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <FaCalendarAlt size={30} />
              <h5 className="mt-3">Events</h5>
              <h3>12</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <FaImages size={30} />
              <h5 className="mt-3">Gallery</h5>
              <h3>208</h3>
            </Card.Body>
          </Card>
        </Col>

      </Row>

      <Row className="mt-5">

        <Col md={8}>

          <Card className="shadow-sm">

            <Card.Header>
              Recent Activity
            </Card.Header>

            <Card.Body>

              <Table hover>

                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td>New Event Uploaded</td>
                    <td>Today</td>
                  </tr>

                  <tr>
                    <td>Gallery Updated</td>
                    <td>Yesterday</td>
                  </tr>

                  <tr>
                    <td>About Page Updated</td>
                    <td>2 Days Ago</td>
                  </tr>

                </tbody>

              </Table>

            </Card.Body>

          </Card>

        </Col>

        <Col md={4}>

          <Card className="shadow-sm">

            <Card.Header>
              Quick Summary
            </Card.Header>

            <Card.Body>

              <p>Total Parishes : 52</p>

              <p>Total Deaneries : 11</p>

              <p>Total Leaders : 18</p>

              <p>Total Ministries : 9</p>

              <p>Total News : 35</p>

            </Card.Body>

          </Card>

        </Col>

      </Row>

    </>
  );
}

export default SuperDashboard;