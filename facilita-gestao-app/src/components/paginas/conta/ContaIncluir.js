import {Link} from "react-router-dom";
import ContaForm from "./ContaForm";

function ContaIncluir(){
    return(
        <div className={"colorWhite"}>
            <Link to={"/"}>Home</Link> / <Link to={"/conta/list"}>Lista Conta</Link> / Incluir Conta

            <h1>Incluir Conta:</h1>
            <br/>
            <ContaForm />
        </div>

    );
}

export default ContaIncluir;
