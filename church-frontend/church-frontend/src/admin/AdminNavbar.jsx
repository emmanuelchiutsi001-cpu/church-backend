import { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUser
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const API_URL = "http://localhost:8080/api/auth";


function AdminNavbar() {

  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

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

        console.log(
          "Failed loading user",
          error
        );

      }

    };


    fetchUser();


  }, []);




  const logout = () => {

    localStorage.removeItem("token");

    navigate("/admin/login");

  };



  return (

    <nav

      className="navbar navbar-expand-lg bg-white shadow-sm"

      style={{
        height:"70px",
        position:"sticky",
        top:0,
        zIndex:1000
      }}

    >


      <div className="container-fluid">



        {/* Parish Name */}

        <div>


          <h5 className="mb-0 fw-bold text-primary">

            {user?.parish?.name || "Parish Portal"}

          </h5>


          <small className="text-muted">

            Parish Administration Portal

          </small>


        </div>




        {/* Right Side */}

        <div className="d-flex align-items-center gap-4">


          {/* Notifications */}

          <div

            className="position-relative"

            style={{
              cursor:"pointer",
              fontSize:"20px"
            }}

          >

            <FaBell />


            <span

              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"

              style={{
                fontSize:"10px"
              }}

            >

              3

            </span>


          </div>




          {/* Profile */}


          <div className="position-relative">


            <div

              className="d-flex align-items-center"

              style={{
                cursor:"pointer"
              }}

              onClick={() =>
                setShowProfile(!showProfile)
              }

            >


              <FaUserCircle

                size={38}

                className="text-primary me-2"

              />


              <div>


                <h6 className="mb-0">

                  {user?.username || "Loading..."}

                </h6>


                <small className="text-muted">

                  {user?.role || ""}

                </small>


              </div>



            </div>





            {
              showProfile && (


                <div

                  className="position-absolute end-0 mt-3 bg-white shadow rounded"

                  style={{
                    width:"220px",
                    zIndex:2000
                  }}

                >



                  <button

                    className="btn w-100 text-start p-3"

                    onClick={() =>
                      navigate("/admin/profile")
                    }

                  >

                    <FaUser className="me-2"/>

                    My Profile

                  </button>






                  <button

                    className="btn w-100 text-start p-3"

                    onClick={() =>
                      navigate("/admin/settings")
                    }

                  >

                    <FaCog className="me-2"/>

                    Settings

                  </button>





                  <hr className="m-0"/>





                  <button

                    className="btn w-100 text-start p-3 text-danger"

                    onClick={logout}

                  >

                    <FaSignOutAlt className="me-2"/>

                    Logout


                  </button>



                </div>


              )

            }


          </div>


        </div>



      </div>


    </nav>

  );

}


export default AdminNavbar;