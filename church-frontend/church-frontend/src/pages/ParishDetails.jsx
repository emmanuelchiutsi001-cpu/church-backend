import { useParams } from "react-router-dom";
import { parishes } from "../data/parishes";


function ParishDetails() {

    const { slug } = useParams();

    const parish = parishes[slug];


    if (!parish) {

        return (

            <div className="container py-5">

                <h2 className="text-danger">
                    Parish not found
                </h2>

            </div>

        );

    }


    return (

        <>

            {/* Hero */}
            <section
                className="text-white py-5"
                style={{
                    backgroundImage:
                    `linear-gradient(rgba(13,71,161,0.7),rgba(13,71,161,0.7)), url(${parish.image})`,
                    backgroundSize:"cover",
                    backgroundPosition:"center"
                }}
            >

                <div className="container">

                    <h1 className="fw-bold">

                        {parish.name}

                    </h1>


                    <p className="lead">

                        {parish.deanery}

                    </p>


                    <p>

                        {parish.location}

                    </p>

                </div>


            </section>



            {/* History */}
            <section className="py-5">

                <div className="container">

                    <h2 className="text-primary fw-bold">

                        Our History

                    </h2>


                    <p>

                        {parish.history}

                    </p>

                </div>

            </section>



            {/* Mission Vision */}

            <section className="bg-light py-5">

                <div className="container">


                    <div className="row">


                        <div className="col-md-6">

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h4 className="text-primary">

                                        Mission

                                    </h4>


                                    <p>

                                        {parish.mission}

                                    </p>


                                </div>

                            </div>

                        </div>




                        <div className="col-md-6">

                            <div className="card shadow-sm h-100">

                                <div className="card-body">

                                    <h4 className="text-primary">

                                        Vision

                                    </h4>


                                    <p>

                                        {parish.vision}

                                    </p>


                                </div>

                            </div>

                        </div>


                    </div>


                </div>

            </section>




            {/* Leadership */}

            <section className="py-5">

                <div className="container">


                    <h2 className="text-primary fw-bold mb-4">

                        Parish Leadership

                    </h2>



                    <div className="row">


                        <div className="col-md-4">

                            <div className="card shadow-sm">

                                <div className="card-body">

                                    <h5>
                                        Parish Priest
                                    </h5>

                                    <p>
                                        {parish.leadership.priest}
                                    </p>

                                </div>

                            </div>

                        </div>



                        <div className="col-md-4">

                            <div className="card shadow-sm">

                                <div className="card-body">

                                    <h5>
                                        Chairperson
                                    </h5>

                                    <p>
                                        {parish.leadership.chairperson}
                                    </p>

                                </div>

                            </div>

                        </div>



                        <div className="col-md-4">

                            <div className="card shadow-sm">

                                <div className="card-body">

                                    <h5>
                                        Secretary
                                    </h5>

                                    <p>
                                        {parish.leadership.secretary}
                                    </p>

                                </div>

                            </div>

                        </div>


                    </div>


                </div>

            </section>


        </>

    );

}


export default ParishDetails;