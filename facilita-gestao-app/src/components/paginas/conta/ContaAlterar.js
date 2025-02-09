import {Link, useParams} from "react-router-dom";
import ContaForm from "./ContaForm";

function ContaAlterar(){
    const {id} = useParams(); //Utilizado a partir da versao 6 do react-router.

    return(
        <div className={"colorWhite"}>
            <Link to={"/"}>Home</Link> / <Link to={"/produto/list"}>Lista Produto</Link> / Alterar Produto

            <h1>Alterar Produto:</h1>
            <br/>
            <ContaForm id={id}/>
        </div>

    );
}

export default ContaAlterar;