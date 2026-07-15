import { useState } from "react";
import BackButton from "../BackButton";


function Events() {


  const [event, setEvent] = useState({

    title: "",
    date: "",
    description: "",
    image: null

  });



  const handleSubmit = (e) => {

    e.preventDefault();


    const formData = new FormData();


    formData.append("title", event.title);
    formData.append("date", event.date);
    formData.append("description", event.description);
    formData.append("image", event.image);



    console.log(event);


    alert("Event created successfully");

  };



  return (

    <div className="container mt-4">


      <BackButton />



      <h2 className="fw-bold text-primary mb-4">
        Create Event
      </h2>




      <form onSubmit={handleSubmit}>


        <div className="mb-3">

          <label className="form-label">
            Event Name
          </label>


          <input
            className="form-control"
            placeholder="Enter event name"
            value={event.title}
            onChange={(e)=>
              setEvent({
                ...event,
                title:e.target.value
              })
            }
          />

        </div>





        <div className="mb-3">

          <label className="form-label">
            Event Date
          </label>


          <input
            type="date"
            className="form-control"
            value={event.date}
            onChange={(e)=>
              setEvent({
                ...event,
                date:e.target.value
              })
            }
          />

        </div>





        <div className="mb-3">

          <label className="form-label">
            Description
          </label>


          <textarea
            className="form-control"
            rows="4"
            placeholder="Describe event"
            value={event.description}
            onChange={(e)=>
              setEvent({
                ...event,
                description:e.target.value
              })
            }
          />

        </div>






        <div className="mb-3">

          <label className="form-label">
            Event Picture
          </label>


          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={(e)=>
              setEvent({
                ...event,
                image:e.target.files[0]
              })
            }
          />

        </div>





        <button className="btn btn-primary">

          Create Event

        </button>



      </form>


    </div>

  );

}


export default Events;