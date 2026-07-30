import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


import {
FaTachometerAlt,
FaInfoCircle,
FaUserShield,
FaAddressBook,
FaChurch,
FaCalendarAlt,
FaImages,
FaUsers,
FaHandsHelping,
FaNewspaper,
FaSignOutAlt

} from "react-icons/fa";



function SuperAdminSideNav(){


const location = useLocation();



const menuItems = [


{
title:"Dashboard",
path:"/superadmin/dashboard",
icon:<FaTachometerAlt/>
},


{
title:"About",
path:"/superadmin/about",
icon:<FaInfoCircle/>
},


{
title:"Authentication",
path:"/superadmin/auth",
icon:<FaUserShield/>
},


{
title:"Contact",
path:"/superadmin/contact",
icon:<FaAddressBook/>
},


{
title:"Deaneries",
path:"/superadmin/deaneries",
icon:<FaChurch/>
},


{
title:"Events",
path:"/superadmin/events",
icon:<FaCalendarAlt/>
},


{
title:"Gallery",
path:"/superadmin/gallery",
icon:<FaImages/>
},


{
title:"Leadership",
path:"/superadmin/leadership",
icon:<FaUsers/>
},


{
title:"Ministries",
path:"/superadmin/ministries",
icon:<FaHandsHelping/>
},


{
title:"News",
path:"/superadmin/news",
icon:<FaNewspaper/>
}


];



return (


<div

style={{

width:"260px",
height:"100vh",
position:"fixed",
left:0,
top:0,
background:"#1E3A8A",
color:"#fff",
overflowY:"auto"

}}

>



<div className="text-center py-4 border-bottom">


<h4>
Super Admin
</h4>


<small>
Archdiocese CMS
</small>


</div>




<Nav className="flex-column mt-3">


{

menuItems.map((item)=>(


<Nav.Link

key={item.path}

as={Link}

to={item.path}

style={{

color:"#fff",

padding:"14px 20px",

background:

location.pathname === item.path

?

"#2563EB"

:

"transparent"

}}

>


<span className="me-3">

{item.icon}

</span>


{item.title}


</Nav.Link>


))


}



</Nav>





<div

style={{

position:"absolute",
bottom:0,
width:"100%"

}}

>


<Nav.Link

as={Link}

to="/admin/login"

style={{

background:"#DC2626",

color:"#fff",

padding:"15px 20px"

}}

>


<FaSignOutAlt className="me-2"/>


Logout


</Nav.Link>


</div>



</div>


);


}


export default SuperAdminSideNav;