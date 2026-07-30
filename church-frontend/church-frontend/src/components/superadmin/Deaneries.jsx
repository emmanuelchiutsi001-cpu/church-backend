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


  const emptyForm = {
    name: "",
    description: "",
    dean: "",
    location: "",
    parishCount: "",
    image: "",
  };


  const [deanery, setDeanery] = useState(emptyForm);

  const [deaneries, setDeaneries] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");



  // Used after save/update/delete
  const loadDeaneries = async () => {

    try {

      const res = await axios.get(API_URL);

      setDeaneries(res.data);


    } catch (err) {

      console.error(err);

    }

  };



  // Initial loading
  useEffect(() => {


    const fetchDeaneries = async () => {

      try {

        const res = await axios.get(API_URL);

        setDeaneries(res.data);


      } catch (err) {

        console.error(err);

      }

    };


    fetchDeaneries();


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

  };






  const saveDeanery = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {


        await axios.put(
          `${API_URL}/${editingId}`,
          deanery
        );


        setMessage(
          "Deanery updated successfully."
        );


      } else {


        await axios.post(
          API_URL,
          deanery
        );


        setMessage(
          "Deanery added successfully."
        );


      }




      clearForm();

      loadDeaneries();



    } catch (err) {


      console.error(err);


    }

  };







  const editDeanery = (item) => {

    setEditingId(item.id);

    setDeanery(item);

  };







  const deleteDeanery = async (id) => {


    if (!window.confirm("Delete this deanery?")) {

      return;

    }



    try {


      await axios.delete(
        `${API_URL}/${id}`
      );


      setMessage(
        "Deanery deleted successfully."
      );


      loadDeaneries();



    } catch (err) {


      console.error(err);


    }


  };







  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          Deanery Management
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






        <Form onSubmit={saveDeanery}>


          <Row>




            <Col md={6}>

              <Form.Group className="mb-3">

                <Form.Label>
                  Deanery Name
                </Form.Label>


                <Form.Control

                  name="name"

                  value={deanery.name}

                  onChange={handleChange}

                />

              </Form.Group>


            </Col>






            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Dean
                </Form.Label>


                <Form.Control

                  name="dean"

                  value={deanery.dean}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>






            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Location
                </Form.Label>


                <Form.Control

                  name="location"

                  value={deanery.location}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>






            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Number of Parishes
                </Form.Label>


                <Form.Control

                  type="number"

                  name="parishCount"

                  value={deanery.parishCount}

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

                  rows={4}

                  name="description"

                  value={deanery.description}

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

                  value={deanery.image}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>




          </Row>






          <Button type="submit">

            {editingId 
              ? "Update Deanery" 
              : "Save Deanery"}

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
                Name
              </th>


              <th>
                Dean
              </th>


              <th>
                Location
              </th>


              <th>
                Parishes
              </th>


              <th width="170">
                Actions
              </th>


            </tr>


          </thead>






          <tbody>



            {deaneries.map((item) => (


              <tr key={item.id}>


                <td>
                  {item.name}
                </td>


                <td>
                  {item.dean}
                </td>


                <td>
                  {item.location}
                </td>


                <td>
                  {item.parishCount}
                </td>




                <td>


                  <Button

                    size="sm"

                    onClick={() => editDeanery(item)}

                  >

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