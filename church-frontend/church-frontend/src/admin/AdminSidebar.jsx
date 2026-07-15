import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUser,
  FaChurch,
  FaCalendarAlt,
  FaBullhorn,
  FaImages,
  FaPodcast,
  FaUsers,
  FaFileAlt,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";


function AdminSidebar() {


  const menuItems = [

    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaHome />
    },

    {
      name: "My Profile",
      path: "/admin/profile",
      icon: <FaUser />
    },

    {
      name: "Parish Profile",
      path: "/admin/parish",
      icon: <FaChurch />
    },

    {
      name: "Events",
      path: "/admin/events",
      icon: <FaCalendarAlt />
    },

    {
      name: "Announcements",
      path: "/admin/announcements",
      icon: <FaBullhorn />
    },

    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: <FaImages />
    },

    {
      name: "Podcasts",
      path: "/admin/podcasts",
      icon: <FaPodcast />
    },

    {
      name: "Executive",
      path: "/admin/executive",
      icon: <FaUsers />
    },

    {
      name: "Documents",
      path: "/admin/documents",
      icon: <FaFileAlt />
    },

    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />
    }

  ];



  return (


    <div

      className="bg-primary text-white vh-100 p-3"

      style={{
        width: "260px",
        position:"fixed",
        left:0,
        top:0
      }}

    >



      {/* Logo */}

      <div className="text-center mb-4">


        <h5 className="fw-bold">
          Agnes & Alois
        </h5>


        <small>
          Parish Admin Portal
        </small>


      </div>





      {/* Navigation */}

      <ul className="nav flex-column">


        {
          menuItems.map((item,index)=>(


            <li
              className="nav-item mb-2"
              key={index}
            >



              <NavLink

                to={item.path}

                className={({isActive}) =>

                  isActive

                  ?

                  "nav-link text-white bg-dark rounded"

                  :

                  "nav-link text-white"

                }

              >



                <span className="me-3">

                  {item.icon}

                </span>



                {item.name}



              </NavLink>



            </li>


          ))
        }


      </ul>





      {/* Logout */}

      <div

        style={{

          position:"absolute",
          bottom:"20px",
          left:"20px"

        }}

      >


        <button

          className="btn btn-light"

        >


          <FaSignOutAlt className="me-2"/>


          Logout


        </button>



      </div>



    </div>


  );

}


export default AdminSidebar;