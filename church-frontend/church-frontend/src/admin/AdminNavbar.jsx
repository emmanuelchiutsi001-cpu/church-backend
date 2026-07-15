import { useState } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaUser
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function AdminNavbar() {


  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);



  const logout = () => {

    // later clear token/session

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

            St. Alois Catholic Parish

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


          <div

            className="position-relative"

          >



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

                  Tanaka

                </h6>


                <small className="text-muted">

                  Parish Admin

                </small>


              </div>



            </div>









            {/* Dropdown */}


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