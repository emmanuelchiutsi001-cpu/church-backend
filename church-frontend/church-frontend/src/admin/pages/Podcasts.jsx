import { useState } from "react";
import BackButton from "../BackButton";


function Podcasts(){


const [podcast,setPodcast]=useState({

title:"",
category:"",
description:"",
speaker:"",
coverImage:null,
audio:null,
publishDate:""

});



const submit=(e)=>{

e.preventDefault();


const formData = new FormData();


Object.keys(podcast).forEach((key)=>{

formData.append(
key,
podcast[key]
);

});


console.log(podcast);


alert("Podcast published successfully");


};



return(


<div className="container mt-4">
      <BackButton />


<h2 className="fw-bold text-primary">
Create Podcast
</h2>



<form onSubmit={submit}>


<div className="mb-3">

<label>
Podcast Title
</label>


<input
className="form-control"
placeholder="Enter podcast title"
onChange={(e)=>
setPodcast({
...podcast,
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
setPodcast({
...podcast,
category:e.target.value
})
}
>


<option>
Select Category
</option>

<option>
Sermon
</option>

<option>
Sunday Reflection
</option>

<option>
Youth Talk
</option>

<option>
Interview
</option>

<option>
Catechism
</option>


</select>


</div>






<div className="mb-3">

<label>
Speaker
</label>


<input
className="form-control"
placeholder="Priest / Speaker name"
onChange={(e)=>
setPodcast({
...podcast,
speaker:e.target.value
})
}
/>


</div>






<div className="mb-3">

<label>
Description
</label>


<textarea
className="form-control"
rows="4"
placeholder="Podcast description"
onChange={(e)=>
setPodcast({
...podcast,
description:e.target.value
})
}
/>


</div>






<div className="mb-3">

<label>
Podcast Cover Image
</label>


<input
type="file"
accept="image/*"
className="form-control"
onChange={(e)=>
setPodcast({
...podcast,
coverImage:e.target.files[0]
})
}
/>


</div>







<div className="mb-3">

<label>
Audio File
</label>


<input
type="file"
accept="audio/*"
className="form-control"
onChange={(e)=>
setPodcast({
...podcast,
audio:e.target.files[0]
})
}
/>


</div>






<div className="mb-3">

<label>
Publish Date
</label>


<input
type="date"
className="form-control"
onChange={(e)=>
setPodcast({
...podcast,
publishDate:e.target.value
})
}
/>


</div>






<button className="btn btn-primary">
Publish Podcast
</button>



</form>


</div>


)

}


export default Podcasts;