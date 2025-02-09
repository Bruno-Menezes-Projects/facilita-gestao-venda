import {Link, useParams} from "react-router-dom";
import ContaForm from "./ContaForm";

function ContaAlterar(){
    const {id} = useParams(); //Utilizado a partir da versao 6 do react-router.

    return(
        <div className={"colorWhite"}>
            <br/>
            <Link to={"/"}>Home</Link> / <Link to={"/conta/list"}>Lista Conta</Link> / Alterar Conta
            <br/>
            <br/>

            <h1>Alterar Conta:</h1>
            <br/>
            <ContaForm id={id}/>
        </div>

    );
}

export default ContaAlterar;