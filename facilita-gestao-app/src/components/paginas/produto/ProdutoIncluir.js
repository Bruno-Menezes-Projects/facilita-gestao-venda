import {Link} from "react-router-dom";
import ProdutoForm from "./ProdutoForm";

function ProdutoIncluir(){
    return(
        <div className={"colorWhite"}>
            <Link to={"/"}>Home</Link> / <Link to={"/produto/list"}>Lista Produto</Link> / Incluir Produto

            <h1>Incluir Produto:</h1>
            <br/>
            <ProdutoForm />
        </div>

    );
}

export default ProdutoIncluir;
