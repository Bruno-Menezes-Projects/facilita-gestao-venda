import {Link} from "react-router-dom";
import PetForm from "./PetForm";

function PetIncluir(){
    return(
        <div className="colorWhite">
            <Link to={"/"}>Home</Link> / <Link to={"/pet/list"}>Pet Lista</Link> / Pet Incluir

            <h1>Pet Incluir:</h1>
            <br/>
            <PetForm />
        </div>

    );
}

export default PetIncluir;
