import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import {
  FaCalendar,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";

const API_URL = "http://localhost:8080/api/eventsection";

function Event() {

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchEvents = async () => {

      try {

        const response = await axios.get(API_URL);

        setEvents(response.data);


      } catch (error) {

        console.error(
          "Failed to load events:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchEvents();


  }, []);



  if (loading) {

    return (

      <Container className="py-5 text-center">

        <h3>
          Loading Events...
        </h3>

      </Container>

    );

  }



  return (

    <Container className="py-5">


      <div className="text-center mb-5">

        <h1 className="fw-bold text-primary">

          Parish Events

        </h1>


        <p className="text-muted">

          Stay updated with upcoming parish activities.

        </p>


      </div>





      <Row>


        {
          events.length > 0 ? (


            events.map((event) => (


              <Col
                key={event.id}
                lg={4}
                md={6}
                className="mb-4"
              >


                <Card
                  className="h-100 shadow border-0"
                >



                  {
                    event.image && (

                      <Card.Img

                        variant="top"

                        src={
                          `http://localhost:8080/uploads/${event.image}`
                        }

                        style={{
                          height:"220px",
                          objectFit:"cover"
                        }}

                      />

                    )
                  }





                  <Card.Body>


                    {
                      event.category && (

                        <Badge
                          bg="warning"
                          text="dark"
                          className="mb-3"
                        >

                          {event.category}

                        </Badge>

                      )
                    }





                    <Card.Title className="fw-bold">

                      {event.title}

                    </Card.Title>





                    <div className="text-muted mb-3">


                      <p className="mb-2">

                        <FaCalendar className="me-2 text-warning"/>

                        {event.eventDate}

                      </p>



                      <p className="mb-2">

                        <FaClock className="me-2 text-warning"/>

                        {event.eventTime || "Time TBA"}

                      </p>




                      <p className="mb-2">

                        <FaMapMarkerAlt className="me-2 text-warning"/>

                        {event.location}

                      </p>


                    </div>






                    <Card.Text className="text-muted">

                      {event.description}

                    </Card.Text>



                  </Card.Body>



                </Card>



              </Col>


            ))


          ) : (


            <Col>

              <div className="text-center">

                <h4>
                  No events available
                </h4>

              </div>


            </Col>


          )

        }


      </Row>



    </Container>

  );

}


export default Event;