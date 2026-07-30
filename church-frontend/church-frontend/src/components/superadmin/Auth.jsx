import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  Table,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";


const API_URL = "http://localhost:8080/api/auth";


function Authentication() {


  const [admins, setAdmins] = useState([]);

  const [message, setMessage] = useState("");



  // JWT Authorization Header

  const authHeaders = () => {

    const token = localStorage.getItem("token");


    return {

      headers: {

        Authorization: `Bearer ${token}`

      }

    };

  };






  // Load pending admin requests

  const loadAdmins = async () => {


    try {


      const response = await axios.get(

        `${API_URL}/pending`,

        authHeaders()

      );


      setAdmins(response.data);



    } catch (error) {


      console.error(
        "Failed loading admin requests",
        error.response?.data || error.message
      );


    }


  };






  useEffect(() => {


    loadAdmins();


  }, []);







  // Approve admin

  const approveAdmin = async (id) => {


    try {


      await axios.put(

        `${API_URL}/approve/${id}`,

        {},

        authHeaders()

      );



      setMessage(
        "Parish admin approved successfully."
      );



      loadAdmins();



    } catch (error) {


      console.error(
        "Approval failed",
        error.response?.data || error.message
      );


    }


  };







  // Reject admin

  const rejectAdmin = async (id) => {


    const confirmDelete = window.confirm(
      "Reject this registration?"
    );



    if (!confirmDelete) {

      return;

    }





    try {


      await axios.delete(

        `${API_URL}/${id}`,

        authHeaders()

      );



      setMessage(
        "Registration rejected."
      );



      loadAdmins();



    } catch (error) {


      console.error(
        "Reject failed",
        error.response?.data || error.message
      );


    }


  };








  return (

    <Card className="shadow">


      <Card.Header>

        <h3>
          Parish Admin Approval Requests
        </h3>

      </Card.Header>





      <Card.Body>


        {
          message && (

            <Alert

              variant="success"

              dismissible

              onClose={() => setMessage("")}

            >

              {message}

            </Alert>

          )
        }





        <Table

          bordered

          hover

          responsive

        >



          <thead>

            <tr>

              <th>
                Username
              </th>


              <th>
                Email
              </th>


              <th>
                Parish
              </th>


              <th>
                Status
              </th>


              <th>
                Actions
              </th>


            </tr>

          </thead>






          <tbody>


            {
              admins.length > 0 ? (


                admins.map((admin) => (


                  <tr key={admin.id}>


                    <td>

                      {admin.username}

                    </td>




                    <td>

                      {admin.email}

                    </td>





                    <td>

                      {admin.parish}

                    </td>





                    <td>


                      <Badge bg="warning">

                        Pending

                      </Badge>


                    </td>






                    <td>



                      <Button

                        size="sm"

                        variant="success"

                        onClick={() => approveAdmin(admin.id)}

                      >

                        Approve

                      </Button>






                      <Button

                        size="sm"

                        variant="danger"

                        className="ms-2"

                        onClick={() => rejectAdmin(admin.id)}

                      >

                        Reject

                      </Button>




                    </td>



                  </tr>


                ))



              ) : (


                <tr>


                  <td

                    colSpan="5"

                    className="text-center"

                  >

                    No pending admin requests

                  </td>


                </tr>


              )

            }



          </tbody>



        </Table>



      </Card.Body>



    </Card>


  );


}


export default Authentication;