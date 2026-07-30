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

const API_URL = "http://localhost:8080/api/events";

function Events() {


  const emptyForm = {
    title: "",
    description: "",
    venue: "",
    eventDate: "",
    eventTime: "",
    image: "",
  };


  const [event, setEvent] = useState(emptyForm);

  const [events, setEvents] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");



  // Refresh after CRUD operations
  const loadEvents = async () => {

    try {

      const res = await axios.get(API_URL);

      setEvents(res.data);


    } catch (err) {

      console.error(err);

    }

  };



  // First page load
  useEffect(() => {


    const fetchEvents = async () => {

      try {

        const res = await axios.get(API_URL);

        setEvents(res.data);


      } catch (err) {

        console.error(err);

      }

    };


    fetchEvents();


  }, []);






  const handleChange = (e) => {

    setEvent({

      ...event,

      [e.target.name]: e.target.value,

    });

  };







  const clearForm = () => {

    setEditingId(null);

    setEvent(emptyForm);

  };








  const saveEvent = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {


        await axios.put(
          `${API_URL}/${editingId}`,
          event
        );


        setMessage(
          "Event updated successfully."
        );


      } else {


        await axios.post(
          API_URL,
          event
        );


        setMessage(
          "Event created successfully."
        );


      }



      clearForm();

      loadEvents();



    } catch (err) {


      console.error(err);


    }

  };








  const editEvent = (item) => {

    setEditingId(item.id);

    setEvent(item);

  };







  const deleteEvent = async (id) => {


    if (!window.confirm("Delete this event?")) {

      return;

    }



    try {


      await axios.delete(
        `${API_URL}/${id}`
      );


      setMessage(
        "Event deleted successfully."
      );


      loadEvents();



    } catch (err) {


      console.error(err);


    }


  };








  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          Event Management
        </h3>

      </Card.Header>




      <Card.Body>




        {message && (

          <Alert

            variant="success"

            dismissible

            onClose={() => setMessage("")}

          >

            {message}

          </Alert>

        )}







        <Form onSubmit={saveEvent}>


          <Row>



            <Col md={6}>

              <Form.Group className="mb-3">

                <Form.Label>
                  Event Title
                </Form.Label>


                <Form.Control

                  name="title"

                  value={event.title}

                  onChange={handleChange}

                />

              </Form.Group>


            </Col>






            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Venue
                </Form.Label>


                <Form.Control

                  name="venue"

                  value={event.venue}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>






            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Date
                </Form.Label>


                <Form.Control

                  type="date"

                  name="eventDate"

                  value={event.eventDate}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>






            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Time
                </Form.Label>


                <Form.Control

                  type="time"

                  name="eventTime"

                  value={event.eventTime}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>






            <Col md={12}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Description
                </Form.Label>


                <Form.Control

                  as="textarea"

                  rows={5}

                  name="description"

                  value={event.description}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>






            <Col md={12}>


              <Form.Group className="mb-4">


                <Form.Label>
                  Image URL
                </Form.Label>


                <Form.Control

                  name="image"

                  value={event.image}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>




          </Row>






          <Button type="submit">

            {editingId 
              ? "Update Event" 
              : "Save Event"}

          </Button>





          <Button

            variant="secondary"

            className="ms-2"

            onClick={clearForm}

          >

            Clear

          </Button>




        </Form>






        <hr />






        <Table bordered hover responsive>



          <thead>

            <tr>

              <th>
                Title
              </th>


              <th>
                Date
              </th>


              <th>
                Venue
              </th>


              <th width="170">
                Actions
              </th>


            </tr>


          </thead>







          <tbody>



            {events.map((item) => (


              <tr key={item.id}>


                <td>
                  {item.title}
                </td>


                <td>
                  {item.eventDate}
                </td>


                <td>
                  {item.venue}
                </td>




                <td>


                  <Button

                    size="sm"

                    onClick={() => editEvent(item)}

                  >

                    Edit

                  </Button>





                  <Button

                    size="sm"

                    variant="danger"

                    className="ms-2"

                    onClick={() => deleteEvent(item.id)}

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


export default Events;