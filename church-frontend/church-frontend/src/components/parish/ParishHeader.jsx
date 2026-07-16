function ParishHeader() {

  return (

    <section
      style={{
        background: "#0D47A1",
        color: "white",
        padding: "70px 20px",
        textAlign: "center"
      }}
    >

      <div className="container">


        <img
          src="/logo.png"
          alt="Parish Logo"
          style={{
            width: "100px",
            height: "100px",
            objectFit: "contain",
            marginBottom: "20px"
          }}
        />


        <h1 className="fw-bold">
          St. Alois Catholic Parish
        </h1>


        <p className="mb-1 fs-5">
          Agnes & Alois Youth Guild
        </p>


        <p className="mb-1">
          Chitungwiza Deanery
        </p>


        <p>
          📍 St. Alois Catholic Parish, Chitungwiza
        </p>


      </div>


    </section>

  );

}


export default ParishHeader;