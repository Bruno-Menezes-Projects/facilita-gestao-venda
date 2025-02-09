import {Link} from "react-router-dom";
import ContaForm from "./ContaForm";

function ContaIncluir(){
    return(
        <div className={"colorWhite"}>
            <Link to={"/"}>Home</Link> / <Link to={"/produto/list"}>Lista Produto</Link> / Incluir Produto

            <h1>Incluir Produto:</h1>
            <br/>
            <ContaForm />
        </div>

    );
}

export default ContaIncluir;
