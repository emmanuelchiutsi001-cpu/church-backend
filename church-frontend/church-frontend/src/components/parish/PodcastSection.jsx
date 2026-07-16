function PodcastSection(){

  const podcasts = [
    {
      title:"Sunday Gospel Reflection",
      speaker:"Fr. Michael"
    },
    {
      title:"Youth Spiritual Talk",
      speaker:"Youth Ministry"
    }
  ];


  return(

    <div className="mb-5">


      <h2 className="text-primary fw-bold">
        Podcasts
      </h2>


      {
        podcasts.map((podcast,index)=>(

          <div
            className="card shadow-sm mb-3"
            key={index}
          >

            <div className="card-body">


              <h5>
                🎧 {podcast.title}
              </h5>


              <p>
                Speaker: {podcast.speaker}
              </p>


              <button className="btn btn-primary btn-sm">
                Play Podcast
              </button>


            </div>


          </div>

        ))
      }


    </div>

  );

}


export default PodcastSection;