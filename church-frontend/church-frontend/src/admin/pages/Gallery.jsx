import { useState } from "react";
import BackButton from "../BackButton";


function Gallery(){


const [gallery,setGallery]=useState({

albumName:"",
category:"",
description:"",
coverImage:null,
photos:[]

});



const handlePhotos=(e)=>{

setGallery({

...gallery,

photos:Array.from(e.target.files)

});

};



const submit=(e)=>{

e.preventDefault();


const formData = new FormData();


formData.append(
"albumName",
gallery.albumName
);


formData.append(
"category",
gallery.category
);


formData.append(
"description",
gallery.description
);



formData.append(
"coverImage",
gallery.coverImage
);



gallery.photos.forEach((photo)=>{

formData.append(
"photos[]",
photo
);

});



console.log(gallery);


alert("Gallery uploaded successfully");


};



return(


<div className="container mt-4">

      <BackButton />


<h2 className="fw-bold text-primary">
Gallery Management
</h2>



<form onSubmit={submit}>



<div className="mb-3">

<label>
Album Name
</label>


<input
className="form-control"
placeholder="Example: St Alois Feast 2026"
onChange={(e)=>
setGallery({
...gallery,
albumName:e.target.value
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
setGallery({
...gallery,
category:e.target.value
})
}
>


<option>
Select Category
</option>

<option>
Feast Celebration
</option>

<option>
Mass
</option>

<option>
Youth Activities
</option>

<option>
Charity
</option>

<option>
Church Events
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
placeholder="Album description"
onChange={(e)=>
setGallery({
...gallery,
description:e.target.value
})
}
/>


</div>






<div className="mb-3">

<label>
Album Cover Image
</label>


<input
type="file"
className="form-control"
accept="image/*"
onChange={(e)=>
setGallery({
...gallery,
coverImage:e.target.files[0]
})
}
/>


</div>






<div className="mb-3">

<label>
Upload Photos
</label>


<input
type="file"
multiple
className="form-control"
accept="image/*"
onChange={handlePhotos}
/>


</div>





<button className="btn btn-primary">
Create Gallery Album
</button>



</form>


</div>


)

}


export default Gallery;