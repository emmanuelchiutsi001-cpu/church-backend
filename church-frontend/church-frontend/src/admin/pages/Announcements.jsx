import { useState } from "react";
import BackButton from "../BackButton";


function Announcements(){


const [announcement,setAnnouncement]=useState({

 title:"",
 category:"",
 message:"",
 publishDate:"",
 expiryDate:"",
 image:null

});



const submit=(e)=>{

 e.preventDefault();


const formData = new FormData();

formData.append("title", announcement.title);
formData.append("category", announcement.category);
formData.append("message", announcement.message);
formData.append("publishDate", announcement.publishDate);
formData.append("expiryDate", announcement.expiryDate);
formData.append("image", announcement.image);



console.log(announcement);


alert("Announcement Posted");


};



return(


<div className="container mt-4">

    <BackButton />


<h2 className="fw-bold text-primary">
Create Announcement
</h2>



<form onSubmit={submit}>


<div className="mb-3">

<label>
Title
</label>

<input
className="form-control"
placeholder="Announcement title"
value={announcement.title}
onChange={(e)=>
setAnnouncement({
...announcement,
title:e.target.value
})
}
/>

</div>




<div className="mb-3">

<label>
Category
</label>


<select
className="form-control"
onChange={(e)=>
setAnnouncement({
...announcement,
category:e.target.value
})
}
>

<option>
Select Category
</option>

<option>
General Notice
</option>

<option>
Meeting
</option>

<option>
Guild Event
</option>

<option>
Prayer
</option>

<option>
Important
</option>


</select>


</div>





<div className="mb-3">

<label>
Announcement Message
</label>


<textarea
className="form-control"
rows="5"
placeholder="Write announcement..."
value={announcement.message}
onChange={(e)=>
setAnnouncement({
...announcement,
message:e.target.value
})
}
/>


</div>





<div className="mb-3">

<label>
Announcement Image / Flyer
</label>


<input
type="file"
className="form-control"
accept="image/*"
onChange={(e)=>
setAnnouncement({
...announcement,
image:e.target.files[0]
})
}
/>


</div>





<div className="row">


<div className="col-md-6">

<label>
Publish Date
</label>


<input
type="date"
className="form-control"
onChange={(e)=>
setAnnouncement({
...announcement,
publishDate:e.target.value
})
}
/>


</div>




<div className="col-md-6">

<label>
Expiry Date
</label>


<input
type="date"
className="form-control"
onChange={(e)=>
setAnnouncement({
...announcement,
expiryDate:e.target.value
})
}
/>


</div>


</div>



<br/>


<button className="btn btn-primary">
Publish Announcement
</button>



</form>


</div>


)

}


export default Announcements;