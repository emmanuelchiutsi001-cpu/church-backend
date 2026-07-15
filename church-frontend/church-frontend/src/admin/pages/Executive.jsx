import { useState } from "react";
import BackButton from "../BackButton";


function Executive(){


const [member,setMember]=useState({

name:"",
position:"",
phone:"",
picture:null,
yearStarted:"",
yearEnded:"",
status:"CURRENT"

});



const submit=(e)=>{

e.preventDefault();


const formData = new FormData();


Object.keys(member).forEach((key)=>{

formData.append(
key,
member[key]
);

});


console.log(member);


alert("Executive member added");


};



return(


<div className="container mt-4">
      <BackButton />


<h2 className="fw-bold text-primary">
Executive Management
</h2>



<form onSubmit={submit}>


<div className="mb-3">

<label>
Full Name
</label>


<input
className="form-control"
placeholder="Enter name"
onChange={(e)=>
setMember({
...member,
name:e.target.value
})
}
/>


</div>





<div className="mb-3">

<label>
Position
</label>


<select
className="form-control"
onChange={(e)=>
setMember({
...member,
position:e.target.value
})
}
>


<option>
Select Position
</option>


<option>
Chairperson
</option>


<option>
Vice Chairperson
</option>


<option>
Secretary
</option>


<option>
Vice Secretary
</option>


<option>
Chief Organiser
</option>


<option>
Organiser 1
</option>


<option>
Organiser 2
</option>


<option>
Committee Member 1
</option>


<option>
Committee Member 2
</option>


<option>
Committee Member 3
</option>


<option>
Treasurer
</option>


<option>
Finance Secretary
</option>


</select>


</div>






<div className="mb-3">

<label>
Picture
</label>


<input
type="file"
accept="image/*"
className="form-control"
onChange={(e)=>
setMember({
...member,
picture:e.target.files[0]
})
}
/>


</div>






<div className="row">


<div className="col-md-6">


<label>
Year Started
</label>


<input
type="number"
className="form-control"
onChange={(e)=>
setMember({
...member,
yearStarted:e.target.value
})
}
/>


</div>



<div className="col-md-6">


<label>
Year Ended
</label>


<input
type="number"
className="form-control"
onChange={(e)=>
setMember({
...member,
yearEnded:e.target.value
})
}
/>


</div>


</div>





<div className="mb-3 mt-3">


<label>
Committee Status
</label>


<select
className="form-control"
onChange={(e)=>
setMember({
...member,
status:e.target.value
})
}
>


<option>
CURRENT
</option>


<option>
PAST
</option>


</select>


</div>






<button className="btn btn-primary">
Save Executive Member
</button>



</form>



</div>


)

}


export default Executive;