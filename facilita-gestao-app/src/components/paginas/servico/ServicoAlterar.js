import {Link, useParams} from "react-router-dom";
import ServicoForm from "./ServicoForm";

function ServicoAlterar(){
    const {id} = useParams(); //Utilizado a partir da versao 6 do react-router.

    return(
        <div className="colorWhite">
            <Link to={"/"}>Home</Link> / <Link to={"/servico/list"}>Servico Lista</Link> / Sevico Alterar

            <h1>Alterar Serviço:</h1>
            <br/>
            <ServicoForm id={id}/>
        </div>

    );
}

export default ServicoAlterar;