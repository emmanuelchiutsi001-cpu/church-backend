function DocumentSection(){

  const documents = [
    {
      title: "Parish Bulletin",
      type: "PDF"
    },
    {
      title: "Parish Constitution",
      type: "PDF"
    }
  ];


  return (

    <div className="mb-5">

      <h2 className="text-primary fw-bold">
        Parish Documents
      </h2>


      <div className="row">

        {documents.map((doc,index)=>(

          <div
            className="col-md-4 mb-3"
            key={index}
          >

            <div className="card shadow-sm">

              <div className="card-body">

                <h5>
                  {doc.title}
                </h5>


                <p className="text-muted">
                  File Type: {doc.type}
                </p>


                <button className="btn btn-primary btn-sm">
                  View Document
                </button>


              </div>

            </div>

          </div>

        ))}


      </div>


    </div>

  );

}


export default DocumentSection;