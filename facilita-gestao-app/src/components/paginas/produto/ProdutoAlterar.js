import {Link, useParams} from "react-router-dom";
import ProdutoForm from "./ProdutoForm";

function ProdutoAlterar(){
    const {id} = useParams(); //Utilizado a partir da versao 6 do react-router.

    return(
        <div className={"colorWhite"}>
            <Link to={"/"}>Home</Link> / <Link to={"/produto/list"}>Lista Produto</Link> / Alterar Produto

            <h1>Alterar Produto:</h1>
            <br/>
            <ProdutoForm id={id}/>
        </div>

    );
}

export default ProdutoAlterar;