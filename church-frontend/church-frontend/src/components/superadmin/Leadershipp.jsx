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
  Image,
} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/leaders";

function Leadership() {


  const emptyForm = {
    name: "",
    position: "",
    biography: "",
    image: "",
  };


  const [leader, setLeader] = useState(emptyForm);

  const [leaders, setLeaders] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");



  // Refresh after CRUD operations
  const loadLeaders = async () => {

    try {

      const res = await axios.get(API_URL);

      setLeaders(res.data);


    } catch (err) {

      console.error(err);

    }

  };



  // Initial loading
  useEffect(() => {


    const fetchLeaders = async () => {

      try {

        const res = await axios.get(API_URL);

        setLeaders(res.data);


      } catch (err) {

        console.error(err);

      }

    };


    fetchLeaders();


  }, []);







  const handleChange = (e) => {

    setLeader({

      ...leader,

      [e.target.name]: e.target.value,

    });

  };








  const clearForm = () => {

    setEditingId(null);

    setLeader(emptyForm);

  };








  const saveLeader = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {


        await axios.put(
          `${API_URL}/${editingId}`,
          leader
        );


        setMessage(
          "Leader updated successfully."
        );


      } else {


        await axios.post(
          API_URL,
          leader
        );


        setMessage(
          "Leader added successfully."
        );


      }




      clearForm();

      loadLeaders();



    } catch (err) {


      console.error(err);


    }

  };









  const editLeader = (item) => {

    setEditingId(item.id);

    setLeader(item);

  };









  const deleteLeader = async (id) => {


    if (!window.confirm("Delete this leader?")) {

      return;

    }



    try {


      await axios.delete(
        `${API_URL}/${id}`
      );


      setMessage(
        "Leader deleted successfully."
      );


      loadLeaders();



    } catch (err) {


      console.error(err);


    }


  };








  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          Leadership Management
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






        <Form onSubmit={saveLeader}>


          <Row>




            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Leader Name
                </Form.Label>


                <Form.Control

                  name="name"

                  value={leader.name}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>







            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Position
                </Form.Label>


                <Form.Control

                  name="position"

                  value={leader.position}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>







            <Col md={12}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Biography
                </Form.Label>


                <Form.Control

                  as="textarea"

                  rows={5}

                  name="biography"

                  value={leader.biography}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>







            <Col md={12}>


              <Form.Group className="mb-4">


                <Form.Label>
                  Photo URL
                </Form.Label>


                <Form.Control

                  name="image"

                  value={leader.image}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>




          </Row>






          <Button type="submit">

            {editingId 
              ? "Update Leader" 
              : "Save Leader"}

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
                Photo
              </th>


              <th>
                Name
              </th>


              <th>
                Position
              </th>


              <th width="170">
                Actions
              </th>


            </tr>


          </thead>






          <tbody>



            {leaders.map((item) => (


              <tr key={item.id}>


                <td>


                  <Image

                    src={item.image}

                    width={60}

                    roundedCircle

                  />


                </td>




                <td>
                  {item.name}
                </td>




                <td>
                  {item.position}
                </td>





                <td>



                  <Button

                    size="sm"

                    onClick={() => editLeader(item)}

                  >

                    Edit

                  </Button>





                  <Button

                    size="sm"

                    variant="danger"

                    className="ms-2"

                    onClick={() => deleteLeader(item.id)}

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


export default Leadership;