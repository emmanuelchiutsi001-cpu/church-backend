function Statistics(){

    const stats = [
        {
            number:"52",
            label:"Parishes"
        },

        {
            number:"2",
            label:"System Administrators"
        },

        {
            number:"1000+",
            label:"Members"
        },

        {
            number:"Many",
            label:"Years of Service"
        }
    ];


    return(

        <section
        className="py-5 text-white"
        style={{
            background:"#0D47A1"
        }}
        >

            <div className="container">


                <div className="text-center mb-5">

                    <h2 className="fw-bold">
                        Our Community
                    </h2>


                    <div
                    className="mx-auto"
                    style={{
                        width:"80px",
                        height:"4px",
                        background:"#D4AF37"
                    }}
                    >

                    </div>


                </div>



                <div className="row text-center">


                    {
                        stats.map((stat,index)=>(

                            <div 
                            className="col-md-3 col-6 mb-4"
                            key={index}
                            >

                                <h1 
                                className="fw-bold text-warning"
                                >
                                    {stat.number}
                                </h1>


                                <p className="lead">
                                    {stat.label}
                                </p>


                            </div>

                        ))
                    }


                </div>


            </div>


        </section>

    );

}


export default Statistics;