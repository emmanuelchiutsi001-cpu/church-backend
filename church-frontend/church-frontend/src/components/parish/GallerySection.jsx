function GallerySection(){

  const images = [
    {
      title:"Youth Mass",
      image:"https://via.placeholder.com/300"
    },
    {
      title:"Parish Feast",
      image:"https://via.placeholder.com/300"
    },
    {
      title:"Church Activities",
      image:"https://via.placeholder.com/300"
    }
  ];


  return(

    <div className="mb-5">

      <h2 className="text-primary fw-bold">
        Parish Gallery
      </h2>


      <div className="row">

        {
          images.map((item,index)=>(

            <div
              className="col-md-4 mb-3"
              key={index}
            >

              <div className="card shadow-sm">

                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.title}
                />


                <div className="card-body">

                  <h6>
                    {item.title}
                  </h6>

                </div>

              </div>

            </div>

          ))
        }


      </div>


    </div>

  );

}


export default GallerySection;