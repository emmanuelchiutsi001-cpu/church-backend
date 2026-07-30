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

const API_URL = "http://localhost:8080/api/gallery";

function Gallery() {


  const emptyForm = {
    title: "",
    description: "",
    image: "",
  };


  const [gallery, setGallery] = useState(emptyForm);

  const [galleryList, setGalleryList] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");



  // Used after create/update/delete
  const loadGallery = async () => {

    try {

      const res = await axios.get(API_URL);

      setGalleryList(res.data);


    } catch (err) {

      console.error(err);

    }

  };



  // Initial page loading
  useEffect(() => {


    const fetchGallery = async () => {

      try {

        const res = await axios.get(API_URL);

        setGalleryList(res.data);


      } catch (err) {

        console.error(err);

      }

    };


    fetchGallery();


  }, []);






  const handleChange = (e) => {

    setGallery({

      ...gallery,

      [e.target.name]: e.target.value,

    });

  };






  const clearForm = () => {

    setEditingId(null);

    setGallery(emptyForm);

  };







  const saveGallery = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {


        await axios.put(
          `${API_URL}/${editingId}`,
          gallery
        );


        setMessage(
          "Gallery item updated successfully."
        );


      } else {


        await axios.post(
          API_URL,
          gallery
        );


        setMessage(
          "Gallery item created successfully."
        );


      }



      clearForm();

      loadGallery();



    } catch (err) {


      console.error(err);


    }

  };







  const editGallery = (item) => {

    setEditingId(item.id);

    setGallery(item);

  };







  const deleteGallery = async (id) => {


    if (!window.confirm("Delete this image?")) {

      return;

    }



    try {


      await axios.delete(
        `${API_URL}/${id}`
      );


      setMessage(
        "Gallery item deleted successfully."
      );


      loadGallery();



    } catch (err) {


      console.error(err);


    }


  };







  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          Gallery Management
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






        <Form onSubmit={saveGallery}>


          <Row>



            <Col md={12}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Image Title
                </Form.Label>


                <Form.Control

                  name="title"

                  value={gallery.title}

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

                  rows={3}

                  name="description"

                  value={gallery.description}

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

                  value={gallery.image}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>




          </Row>






          <Button type="submit">

            {editingId 
              ? "Update Image" 
              : "Save Image"}

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
                Preview
              </th>

              <th>
                Title
              </th>

              <th>
                Description
              </th>

              <th width="170">
                Actions
              </th>

            </tr>


          </thead>






          <tbody>



            {galleryList.map((item) => (


              <tr key={item.id}>


                <td>


                  <Image

                    src={item.image}

                    width={80}

                    rounded

                  />


                </td>



                <td>
                  {item.title}
                </td>



                <td>
                  {item.description}
                </td>




                <td>


                  <Button

                    size="sm"

                    onClick={() => editGallery(item)}

                  >

                    Edit

                  </Button>





                  <Button

                    size="sm"

                    variant="danger"

                    className="ms-2"

                    onClick={() => deleteGallery(item.id)}

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


export default Gallery;