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

const API_URL = "http://localhost:8080/api/ministries";

function Ministries() {


  const emptyForm = {
    name: "",
    leader: "",
    description: "",
    image: "",
  };


  const [ministry, setMinistry] = useState(emptyForm);

  const [ministries, setMinistries] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");



  // Refresh after CRUD actions
  const loadMinistries = async () => {

    try {

      const res = await axios.get(API_URL);

      setMinistries(res.data);


    } catch (error) {

      console.error(error);

    }

  };



  // Initial loading
  useEffect(() => {


    const fetchMinistries = async () => {

      try {

        const res = await axios.get(API_URL);

        setMinistries(res.data);


      } catch (error) {

        console.error(error);

      }

    };


    fetchMinistries();


  }, []);






  const handleChange = (e) => {

    setMinistry({

      ...ministry,

      [e.target.name]: e.target.value,

    });

  };







  const clear = () => {

    setEditingId(null);

    setMinistry(emptyForm);

  };







  const submit = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {


        await axios.put(
          `${API_URL}/${editingId}`,
          ministry
        );


        setMessage(
          "Ministry updated successfully."
        );


      } else {


        await axios.post(
          API_URL,
          ministry
        );


        setMessage(
          "Ministry added successfully."
        );


      }




      clear();

      loadMinistries();



    } catch (error) {


      console.error(error);


    }

  };







  const edit = (item) => {

    setEditingId(item.id);

    setMinistry(item);

  };








  const remove = async (id) => {


    if (!window.confirm("Delete ministry?")) {

      return;

    }



    try {


      await axios.delete(
        `${API_URL}/${id}`
      );


      setMessage(
        "Ministry deleted successfully."
      );


      loadMinistries();



    } catch (error) {


      console.error(error);


    }


  };







  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          Ministries Management
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







        <Form onSubmit={submit}>


          <Row>



            <Col md={6}>


              <Form.Control

                className="mb-3"

                placeholder="Ministry Name"

                name="name"

                value={ministry.name}

                onChange={handleChange}

              />


            </Col>







            <Col md={6}>


              <Form.Control

                className="mb-3"

                placeholder="Leader"

                name="leader"

                value={ministry.leader}

                onChange={handleChange}

              />


            </Col>







            <Col md={12}>


              <Form.Control

                as="textarea"

                rows={4}

                className="mb-3"

                placeholder="Description"

                name="description"

                value={ministry.description}

                onChange={handleChange}

              />


            </Col>







            <Col md={12}>


              <Form.Control

                className="mb-4"

                placeholder="Image URL"

                name="image"

                value={ministry.image}

                onChange={handleChange}

              />


            </Col>




          </Row>







          <Button type="submit">

            {editingId 
              ? "Update Ministry" 
              : "Save Ministry"}

          </Button>




          <Button

            variant="secondary"

            className="ms-2"

            onClick={clear}

          >

            Clear

          </Button>




        </Form>







        <hr />







        <Table hover bordered responsive>



          <thead>

            <tr>

              <th>
                Name
              </th>


              <th>
                Leader
              </th>


              <th>
                Actions
              </th>


            </tr>


          </thead>







          <tbody>



            {ministries.map((item) => (


              <tr key={item.id}>


                <td>
                  {item.name}
                </td>


                <td>
                  {item.leader}
                </td>




                <td>



                  <Button

                    size="sm"

                    onClick={() => edit(item)}

                  >

                    Edit

                  </Button>





                  <Button

                    variant="danger"

                    size="sm"

                    className="ms-2"

                    onClick={() => remove(item.id)}

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


export default Ministries;