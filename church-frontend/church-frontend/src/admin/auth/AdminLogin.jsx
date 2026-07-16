import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import catholic from "../../assets/catholic.jpg";

function AdminLogin() {

  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    password: ""
  });


  const handleChange = (e) => {

    setLogin({
      ...login,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = (e) => {

    e.preventDefault();


    console.log(login);


    // Later connect to backend
    // axios.post("/api/auth/login", login)


    localStorage.setItem("token", "dummy-token");


    navigate("/admin/dashboard");

  };



  return (

    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{

        minHeight: "100vh",

        backgroundImage:
          `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${catholic})`,

        backgroundSize: "cover",

        backgroundPosition: "center",

        backgroundRepeat: "no-repeat"

      }}
    >




      <div
        className="card shadow-lg border-0"
        style={{

          width: "100%",

          maxWidth: "420px",

          borderRadius: "15px",

          background: "rgba(255,255,255,0.15)",

          backdropFilter: "blur(10px)",

          border: "1px solid rgba(255,255,255,0.3)"

        }}
      >





        <div className="card-body p-4 text-white">






          <div className="text-center mb-4">


            <h3 className="fw-bold text-white">

              Parish Admin Login

            </h3>



            <p className="text-white-50 mb-0">

              Sign in to access your parish dashboard.

            </p>



          </div>








          <form onSubmit={handleSubmit}>




            <div className="mb-3">


              <label className="form-label fw-semibold text-white">

                Username

              </label>




              <input

                type="text"

                name="username"

                className="form-control"

                placeholder="Enter username"

                value={login.username}

                onChange={handleChange}

                required

              />



            </div>









            <div className="mb-4">


              <label className="form-label fw-semibold text-white">

                Password

              </label>





              <input

                type="password"

                name="password"

                className="form-control"

                placeholder="Enter password"

                value={login.password}

                onChange={handleChange}

                required

              />



            </div>







            <button

              type="submit"

              className="btn btn-primary w-100"

            >

              Login

            </button>





          </form>









          <hr className="border-light" />









          <div className="text-center">



            <small className="text-white-50">

              Don't have an account?

            </small>




            <br />




            <Link

              to="/admin/register"

              className="fw-bold text-white text-decoration-none"

            >

              Register Here

            </Link>




          </div>





        </div>


      </div>





    </div>

  );

}


export default AdminLogin;