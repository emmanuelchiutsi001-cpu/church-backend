import { useNavigate } from "react-router-dom";


function BackButton(){

  const navigate = useNavigate();


  return (

    <button
      type="button"
      className="btn btn-outline-primary mb-4"
      onClick={() => navigate("/admin/dashboard")}
    >

      ← Back to Dashboard

    </button>

  );

}


export default BackButton;