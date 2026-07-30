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

const API_URL = "http://localhost:8080/api/news";

function News() {


  const emptyForm = {
    headline: "",
    content: "",
    image: "",
    publishDate: "",
  };


  const [news, setNews] = useState(emptyForm);

  const [newsList, setNewsList] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [message, setMessage] = useState("");



  // Refresh after CRUD operations
  const loadNews = async () => {

    try {

      const res = await axios.get(API_URL);

      setNewsList(res.data);


    } catch (error) {

      console.error(error);

    }

  };



  // Initial loading
  useEffect(() => {


    const fetchNews = async () => {

      try {

        const res = await axios.get(API_URL);

        setNewsList(res.data);


      } catch (error) {

        console.error(error);

      }

    };


    fetchNews();


  }, []);







  const handleChange = (e) => {

    setNews({

      ...news,

      [e.target.name]: e.target.value,

    });

  };








  const clear = () => {

    setEditingId(null);

    setNews(emptyForm);

  };








  const submit = async (e) => {

    e.preventDefault();


    try {


      if (editingId) {


        await axios.put(
          `${API_URL}/${editingId}`,
          news
        );


        setMessage(
          "News updated successfully."
        );


      } else {


        await axios.post(
          API_URL,
          news
        );


        setMessage(
          "News published successfully."
        );


      }



      clear();

      loadNews();



    } catch (error) {


      console.error(error);


    }

  };







  const edit = (item) => {

    setEditingId(item.id);

    setNews(item);

  };







  const remove = async (id) => {


    if (!window.confirm("Delete article?")) {

      return;

    }



    try {


      await axios.delete(
        `${API_URL}/${id}`
      );


      setMessage(
        "News deleted successfully."
      );


      loadNews();



    } catch (error) {


      console.error(error);


    }

  };








  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          News Management
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



            <Col md={12}>


              <Form.Control

                className="mb-3"

                placeholder="Headline"

                name="headline"

                value={news.headline}

                onChange={handleChange}

              />


            </Col>







            <Col md={12}>


              <Form.Control

                as="textarea"

                rows={5}

                className="mb-3"

                placeholder="Article"

                name="content"

                value={news.content}

                onChange={handleChange}

              />


            </Col>







            <Col md={6}>


              <Form.Control

                className="mb-3"

                placeholder="Image URL"

                name="image"

                value={news.image}

                onChange={handleChange}

              />


            </Col>







            <Col md={6}>


              <Form.Control

                type="date"

                className="mb-3"

                name="publishDate"

                value={news.publishDate}

                onChange={handleChange}

              />


            </Col>




          </Row>







          <Button type="submit">


            {editingId 
              ? "Update News" 
              : "Publish News"}


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
                Headline
              </th>


              <th>
                Date
              </th>


              <th>
                Actions
              </th>


            </tr>


          </thead>






          <tbody>



            {newsList.map((item) => (


              <tr key={item.id}>


                <td>
                  {item.headline}
                </td>


                <td>
                  {item.publishDate}
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


export default News;