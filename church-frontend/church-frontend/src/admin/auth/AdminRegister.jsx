import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import catholic from "../../assets/catholic.jpg";


function AdminRegister() {

  const navigate = useNavigate();


  const [form, setForm] = useState({

    username: "",
    email: "",
    parish: "",
    password: "",
    confirmPassword: "",

  });



  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };





  const handleSubmit = async (e) => {

    e.preventDefault();



    if(form.password !== form.confirmPassword){

      alert("Passwords do not match");

      return;

    }



    setLoading(true);



    try{


      const response = await axios.post(

        "http://localhost:8080/api/auth/register",

        {

          username: form.username,

          email: form.email,

          parish: form.parish,

          password: form.password,

        }

      );



      alert(response.data);



      navigate("/admin/waiting");



    }catch(error){


      console.log(error);


      alert(
        error.response?.data ||
        "Server connection failed"
      );


    }finally{

      setLoading(false);

    }


  };





return (

<div
className="container-fluid d-flex justify-content-center align-items-center"
style={{
minHeight:"100vh",
backgroundImage:`linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url(${catholic})`,
backgroundSize:"cover"
}}
>



<div
className="card shadow-lg"
style={{
width:"420px",
background:"rgba(255,255,255,.15)",
backdropFilter:"blur(10px)"
}}
>


<div className="card-body p-4 text-white">



<h3 className="text-center mb-4">

Parish Admin Registration

</h3>




<form onSubmit={handleSubmit}>


<div className="mb-3">

<label>
Username
</label>

<input

className="form-control"

name="username"

value={form.username}

onChange={handleChange}

required

/>

</div>





<div className="mb-3">

<label>
Email
</label>

<input

type="email"

className="form-control"

name="email"

value={form.email}

onChange={handleChange}

required

/>

</div>





<div className="mb-3">

<label>
Parish
</label>


<input

className="form-control"

name="parish"

value={form.parish}

onChange={handleChange}

required

/>

</div>






<div className="mb-3">

<label>
Password
</label>


<input

type="password"

className="form-control"

name="password"

value={form.password}

onChange={handleChange}

required

/>

</div>





<div className="mb-3">

<label>
Confirm Password
</label>


<input

type="password"

className="form-control"

name="confirmPassword"

value={form.confirmPassword}

onChange={handleChange}

required

/>

</div>





<button

className="btn btn-primary w-100"

disabled={loading}

>


{
loading ?
"Registering..." :
"Register"
}


</button>



</form>




<hr/>

<div className="text-center">

Already approved?


<br/>

<Link to="/admin/login">

Login

</Link>


</div>



</div>

</div>


</div>

);


}


export default AdminRegister;