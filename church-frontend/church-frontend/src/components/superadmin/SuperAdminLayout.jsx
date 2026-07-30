import { Outlet } from "react-router-dom";

import SuperAdminSideNav from "./SuperAdminSideNav";


function SuperAdminLayout() {


  return (

    <div className="d-flex">


      <SuperAdminSideNav />


      <div
        className="flex-grow-1"
        style={{
          marginLeft: "260px",
          minHeight: "100vh",
          background: "#f8f9fa"
        }}
      >


        <div className="container-fluid p-4">

          <Outlet />

        </div>


      </div>


    </div>

  );

}


export default SuperAdminLayout;