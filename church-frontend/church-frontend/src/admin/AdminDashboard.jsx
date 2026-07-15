import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";


function AdminDashboard() {


  return (

    <div>


      {/* Sidebar */}
      <AdminSidebar />



      {/* Main Content */}

      <div
        style={{
          marginLeft:"260px"
        }}
      >


        {/* Navbar */}
        <AdminNavbar />




        <div className="container-fluid p-4">



          <div
            className="card shadow-sm border-0"
            style={{
              minHeight:"400px"
            }}
          >


            <div
              className="card-body d-flex flex-column justify-content-center align-items-center text-center"
            >


              <h1 className="fw-bold text-primary mb-3">
                Welcome to Agnes & Alois Parish Portal
              </h1>



              <p className="text-muted fs-5">
                Manage your parish profile, events, announcements,
                gallery, podcasts, executive members and documents
                from this administration portal.
              </p>



              <p className="text-secondary mt-3">
                You are logged in as a Parish Administrator.
              </p>



            </div>


          </div>



        </div>



      </div>



    </div>

  );

}


export default AdminDashboard;