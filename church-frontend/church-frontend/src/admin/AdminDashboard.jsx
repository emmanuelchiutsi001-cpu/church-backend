import { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

const API_URL = "http://localhost:8080/api/auth";

function AdminDashboard() {

  const [user, setUser] = useState(null);


  useEffect(() => {

    const fetchUser = async () => {

      try {

        const token = localStorage.getItem("token");


        const response = await axios.get(
          `${API_URL}/me`,
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        setUser(response.data);


      } catch(error){

        console.log("Failed to load user", error);

      }

    };


    fetchUser();


  }, []);



  return (

    <div>

      <AdminSidebar />


      <div
        style={{
          marginLeft:"260px"
        }}
      >

        <AdminNavbar />


        <div className="container-fluid p-4">


          <div
            className="card shadow-sm border-0"
            style={{
              minHeight:"400px"
            }}
          >


            <div
              className="card-body d-flex flex-column justify-content-center align-items-center text-center"
            >


              <h1 className="fw-bold text-primary mb-2">

                Welcome 
                {" "}
                {user ? user.username : "Loading..."}

              </h1>



              <p className="text-muted fs-4">

                Manage your parish profile, events,
                announcements, gallery, podcasts,
                executive members and documents.

              </p>



              {user && (

                <>

                <p className="text-secondary mt-3">

                  Role:
                  {" "}
                  {user.role}

                </p>


                <p className="text-secondary">

                  Parish:
                  {" "}
                  {user.parish?.name || "Not Assigned"}

                </p>


                </>

              )}



            </div>


          </div>


        </div>


      </div>


    </div>

  );

}


export default AdminDashboard;