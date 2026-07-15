import { useState } from "react";


function Documents(){


const [document,setDocument]=useState({

title:"",
category:"",
description:"",
file:null

});



const submit=(e)=>{

e.preventDefault();


const formData = new FormData();


formData.append(
"title",
document.title
);


formData.append(
"category",
document.category
);


formData.append(
"description",
document.description
);


formData.append(
"file",
document.file
);



console.log(document);


alert("Document uploaded successfully");


};



return(


<div className="container mt-4">


<h2 className="fw-bold text-primary">
Document Management
</h2>



<form onSubmit={submit}>


<div className="mb-3">

<label>
Document Title
</label>


<input
className="form-control"
placeholder="Example: June Parish Newsletter"
onChange={(e)=>
setDocument({
...document,
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
setDocument({
...document,
category:e.target.value
})
}
>


<option>
Select Category
</option>


<option>
Newsletter
</option>


<option>
Forms
</option>


<option>
Letters
</option>


<option>
Meeting Minutes
</option>


<option>
Reports
</option>


<option>
Catechism
</option>


<option>
Guild Documents
</option>


<option>
Other
</option>


</select>


</div>






<div className="mb-3">

<label>
Description
</label>


<textarea
className="form-control"
rows="4"
placeholder="Describe this document"
onChange={(e)=>
setDocument({
...document,
description:e.target.value
})
}
/>


</div>







<div className="mb-3">

<label>
Upload Document
</label>


<input
type="file"
className="form-control"
accept=".pdf,.doc,.docx"
onChange={(e)=>
setDocument({
...document,
file:e.target.files[0]
})
}
/>


</div>






<button className="btn btn-primary">
Upload Document
</button>



</form>


</div>


)

}


export default Documents;