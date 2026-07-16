function ExecutiveSection(){

  const leaders=[

    {
      position:"Chairperson",
      name:"John Chirwa",
      image:"https://via.placeholder.com/150"
    },

    {
      position:"Vice Chairperson",
      name:"Mary Moyo",
      image:"https://via.placeholder.com/150"
    },

    {
      position:"Secretary",
      name:"Peter Banda",
      image:"https://via.placeholder.com/150"
    },

    {
      position:"Treasurer",
      name:"Agnes Dube",
      image:"https://via.placeholder.com/150"
    }

  ];


  return(

    <div className="mb-5">


      <h2 className="text-primary fw-bold">
        Parish Executive
      </h2>


      <div className="row">


        {
          leaders.map((leader,index)=>(

            <div
              className="col-md-3 mb-3"
              key={index}
            >

              <div className="card shadow-sm text-center">


                <img
                  src={leader.image}
                  className="rounded-circle mx-auto mt-3"
                  width="100"
                  alt={leader.name}
                />


                <div className="card-body">

                  <h6>
                    {leader.position}
                  </h6>


                  <p>
                    {leader.name}
                  </p>


                </div>


              </div>


            </div>

          ))
        }


      </div>


    </div>

  );

}


export default ExecutiveSection;