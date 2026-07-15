import { useState } from "react";
import BackButton from "../BackButton";


function ParishProfile(){


const [parish,setParish]=useState({

name:"",
logo:null,
cover:null,
description:"",
history:"",
address:"",
city:"",
phone:"",
email:"",
patronSaint:"",
established:"",
priest:"",
assistantPriest:"",
sundayMass:"",
weekdayMass:"",
facebook:"",
youtube:"",
instagram:"",
officeHours:""

});



const submit=(e)=>{

e.preventDefault();


const formData = new FormData();


Object.keys(parish).forEach((key)=>{

formData.append(key, parish[key]);

});


console.log(parish);


alert("Parish Profile Saved");


};



return(


<div className="container mt-4">

      <BackButton />


<h2 className="fw-bold text-primary">
Parish Profile
</h2>



<form onSubmit={submit}>


<h5 className="mt-4">
Basic Information
</h5>


<input
className="form-control mb-3"
placeholder="Parish Name"
onChange={(e)=>
setParish({
...parish,
name:e.target.value
})
}
/>



<label>
Parish Logo
</label>

<input
type="file"
className="form-control mb-3"
accept="image/*"
onChange={(e)=>
setParish({
...parish,
logo:e.target.files[0]
})
}
/>



<label>
Cover Image
</label>

<input
type="file"
className="form-control mb-3"
accept="image/*"
onChange={(e)=>
setParish({
...parish,
cover:e.target.files[0]
})
}
/>




<textarea
className="form-control mb-3"
rows="3"
placeholder="Short Description"
onChange={(e)=>
setParish({
...parish,
description:e.target.value
})
}
/>




<textarea
className="form-control mb-3"
rows="5"
placeholder="Parish History"
onChange={(e)=>
setParish({
...parish,
history:e.target.value
})
}
/>





<h5 className="mt-4">
Contact Information
</h5>



<input
className="form-control mb-3"
placeholder="Address"
onChange={(e)=>
setParish({
...parish,
address:e.target.value
})
}
/>




<input
className="form-control mb-3"
placeholder="Phone Number"
onChange={(e)=>
setParish({
...parish,
phone:e.target.value
})
}
/>



<input
className="form-control mb-3"
placeholder="Email"
onChange={(e)=>
setParish({
...parish,
email:e.target.value
})
}
/>





<h5 className="mt-4">
Church Details
</h5>



<input
className="form-control mb-3"
placeholder="Patron Saint"
onChange={(e)=>
setParish({
...parish,
patronSaint:e.target.value
})
}
/>




<input
className="form-control mb-3"
placeholder="Parish Priest"
onChange={(e)=>
setParish({
...parish,
priest:e.target.value
})
}
/>




<input
className="form-control mb-3"
placeholder="Assistant Priest"
onChange={(e)=>
setParish({
...parish,
assistantPriest:e.target.value
})
}
/>





<h5 className="mt-4">
Mass Schedule
</h5>



<textarea
className="form-control mb-3"
placeholder="Sunday Mass Times"
onChange={(e)=>
setParish({
...parish,
sundayMass:e.target.value
})
}
/>



<textarea
className="form-control mb-3"
placeholder="Weekday Mass Times"
onChange={(e)=>
setParish({
...parish,
weekdayMass:e.target.value
})
}
/>





<h5>
Social Media
</h5>



<input
className="form-control mb-3"
placeholder="Facebook Link"
/>


<input
className="form-control mb-3"
placeholder="YouTube Link"
/>


<input
className="form-control mb-3"
placeholder="Instagram Link"
/>





<button className="btn btn-primary">
Save Parish Profile
</button>



</form>


</div>


)

}


export default ParishProfile;