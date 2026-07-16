function AnnouncementList(){

const announcements=[

{
title:"Youth Meeting",
date:"25 July 2026",
message:"All youths are invited for the monthly meeting."
}

];


return(

<div className="mb-5">


<h2 className="text-primary">
Latest Announcements
</h2>


{
announcements.map((item,index)=>(

<div
key={index}
className="card shadow-sm mb-3"
>

<div className="card-body">


<h5>
{item.title}
</h5>


<small>
{item.date}
</small>


<p>
{item.message}
</p>


</div>

</div>


))

}


</div>

)

}


export default AnnouncementList;