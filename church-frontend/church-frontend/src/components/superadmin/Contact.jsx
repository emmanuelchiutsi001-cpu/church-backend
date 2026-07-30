import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";

const API_URL = "http://localhost:8080/api/contact";

function Contact() {

  const emptyForm = {
    officeName: "",
    address: "",
    phone: "",
    email: "",
    website: "",
    facebook: "",
    youtube: "",
  };


  const [contact, setContact] = useState(emptyForm);

  const [contacts, setContacts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");



  // Refresh contacts after changes
  const loadContacts = async () => {

    try {

      const res = await axios.get(API_URL);

      setContacts(res.data);


    } catch (err) {

      console.error(err);

    }

  };



  // Initial loading
  useEffect(() => {


    const fetchContacts = async () => {

      try {

        const res = await axios.get(API_URL);

        setContacts(res.data);


      } catch (err) {

        console.error(err);

      }

    };


    fetchContacts();


  }, []);




  const handleChange = (e) => {

    setContact({

      ...contact,

      [e.target.name]: e.target.value,

    });

  };





  const clearForm = () => {

    setEditingId(null);

    setContact(emptyForm);

  };





  const saveContact = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {


        await axios.put(
          `${API_URL}/${editingId}`,
          contact
        );


        setMessage(
          "Contact updated successfully."
        );


      } else {


        await axios.post(
          API_URL,
          contact
        );


        setMessage(
          "Contact saved successfully."
        );

      }



      clearForm();

      loadContacts();



    } catch (err) {


      console.error(err);


    }

  };





  const editContact = (item) => {

    setEditingId(item.id);

    setContact(item);

  };






  const deleteContact = async (id) => {


    if (!window.confirm("Delete this contact?")) {

      return;

    }



    try {


      await axios.delete(
        `${API_URL}/${id}`
      );


      setMessage(
        "Contact deleted successfully."
      );


      loadContacts();



    } catch (err) {


      console.error(err);


    }

  };






  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          Contact Management
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





        <Form onSubmit={saveContact}>


          <Row>


            <Col md={6}>

              <Form.Group className="mb-3">

                <Form.Label>
                  Office Name
                </Form.Label>


                <Form.Control

                  name="officeName"

                  value={contact.officeName}

                  onChange={handleChange}

                />

              </Form.Group>


            </Col>




            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Email
                </Form.Label>


                <Form.Control

                  name="email"

                  value={contact.email}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>





            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Phone
                </Form.Label>


                <Form.Control

                  name="phone"

                  value={contact.phone}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>





            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Website
                </Form.Label>


                <Form.Control

                  name="website"

                  value={contact.website}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>





            <Col md={12}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Address
                </Form.Label>


                <Form.Control

                  as="textarea"

                  rows={3}

                  name="address"

                  value={contact.address}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>





            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  Facebook
                </Form.Label>


                <Form.Control

                  name="facebook"

                  value={contact.facebook}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>





            <Col md={6}>


              <Form.Group className="mb-3">


                <Form.Label>
                  YouTube
                </Form.Label>


                <Form.Control

                  name="youtube"

                  value={contact.youtube}

                  onChange={handleChange}

                />


              </Form.Group>


            </Col>


          </Row>





          <Button type="submit">

            {editingId 
              ? "Update Contact" 
              : "Save Contact"}

          </Button>




          <Button

            variant="secondary"

            className="ms-2"

            onClick={clearForm}

          >

            Clear

          </Button>



        </Form>





        {/* Contact List */}

        <hr />


        <h5>
          Saved Contacts
        </h5>



        {contacts.map((item) => (

          <div
            key={item.id}
            className="border p-3 mb-2"
          >

            <strong>
              {item.officeName}
            </strong>

            <br />

            {item.email}

            <br />

            {item.phone}


            <div className="mt-2">


              <Button

                size="sm"

                onClick={() => editContact(item)}

              >

                Edit

              </Button>



              <Button

                size="sm"

                variant="danger"

                className="ms-2"

                onClick={() => deleteContact(item.id)}

              >

                Delete

              </Button>


            </div>


          </div>


        ))}



      </Card.Body>


    </Card>

  );

}


export default Contact;