import {Link} from "react-router-dom";
import ProdutoForm from "./ProdutoForm";

function ProdutoIncluir(){
    return(
        <>
            <Link to={"/"}>Home</Link> / <Link to={"/produto/list"}>Produto Lista</Link> / Produto Incluir

            <h1>Produto Incluir:</h1>
            <br/>
            <ProdutoForm />
        </>

    );
}

export default ProdutoIncluir;
