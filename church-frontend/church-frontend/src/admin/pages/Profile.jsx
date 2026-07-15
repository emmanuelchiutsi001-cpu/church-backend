import { useState } from "react";
import BackButton from "../BackButton";


function Profile(){


const [profile,setProfile]=useState({

photo:null,
name:"",
email:"",
phone:"",
password:"",
confirmPassword:""

});



const submit=(e)=>{

e.preventDefault();


const formData = new FormData();


Object.keys(profile).forEach((key)=>{

formData.append(key, profile[key]);

});


console.log(profile);


alert("Profile Updated");


};



return(


<div className="container mt-4">

      <BackButton />


<h2 className="fw-bold text-primary">
My Profile
</h2>



<form onSubmit={submit}>


{/* Profile Picture */}

<div className="mb-3">


<label>
Profile Picture
</label>


<input
type="file"
className="form-control"
accept="image/*"
onChange={(e)=>
setProfile({
...profile,
photo:e.target.files[0]
})
}
/>


</div>





{/* Name */}

<div className="mb-3">

<label>
Full Name
</label>


<input
className="form-control"
placeholder="Enter full name"
value={profile.name}
onChange={(e)=>
setProfile({
...profile,
name:e.target.value
})
}
/>


</div>





{/* Email */}

<div className="mb-3">

<label>
Email
</label>


<input
type="email"
className="form-control"
placeholder="Email address"
value={profile.email}
onChange={(e)=>
setProfile({
...profile,
email:e.target.value
})
}
/>


</div>





{/* Phone */}

<div className="mb-3">

<label>
Phone Number
</label>


<input
className="form-control"
placeholder="Phone number"
value={profile.phone}
onChange={(e)=>
setProfile({
...profile,
phone:e.target.value
})
}
/>


</div>






<hr/>


<h5>
Change Password
</h5>



<div className="mb-3">

<input
type="password"
className="form-control"
placeholder="New Password"
onChange={(e)=>
setProfile({
...profile,
password:e.target.value
})
}
/>


</div>





<div className="mb-3">

<input
type="password"
className="form-control"
placeholder="Confirm Password"
onChange={(e)=>
setProfile({
...profile,
confirmPassword:e.target.value
})
}
/>


</div>





<button className="btn btn-primary">
Update Profile
</button>



</form>



</div>


)

}


export default Profile;