import {Col, Row, Form, Button, Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ServicoApi from "../../api/ServicoApi";

function ServicoForm({id}){

    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");
    const navigate = useNavigate();

    function setServico(servico){
        setDescricao(servico.descricao);
        setValor(servico.valor);
    }

    useEffect(() => {
        if(id){
            console.log("Consultar o servico pelo id: " + id);
            const servicoApi = new ServicoApi();
            servicoApi.getServico(setServico, id);
        }
    }, [id]);

    function cadastrarServico(e) {
        e.preventDefault();
        var servico = {id: id, descricao: descricao, valor: valor};
        console.log(JSON.stringify(servico));
        console.log("cadastrarServico exec.....");

        const servicoApi = new ServicoApi();
        if (id){
            servicoApi.alterarServico(servico);
        }else{
            servicoApi.incluirServico(servico);
        }

        navigate(`/servico/list`);
    }

    return(
        <Container>
            <Form onSubmit={cadastrarServico}>
                <Row>
                    <Col sm="6">
                        <Row className="justify-content-md-center">
                            <Col xl={12}>
                                <Stack direction="horizontal" gap={3}>
                                    <p>
                                        Id do Serviço em alteração: &nbsp;&nbsp;&nbsp; {id}
                                    </p>
                                </Stack>
                            </Col>
                        </Row>
                        <Form.Group as={Row} className="mb-3" controlId="descricao">
                            <Form.Label column sm="12">
                                Descricao:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Descricao Servico" defaultValue={descricao} onChange={(e) => setDescricao(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="valor">
                            <Form.Label column sm="12">
                                Valor:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Valor Servico" defaultValue={valor} onChange={(e) => setValor(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <br/>


                        <Row className="justify-content-md-center">
                            <Col xl={12}>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="p-2">
                                        <Link to="/servico/list">
                                            <Button variant="danger">
                                                Cancelar
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="p-2 ms-auto">
                                        <Button variant="primary" type="submit">
                                            Confirmar
                                        </Button>
                                    </div>
                                </Stack>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>

            {id} :
            {descricao} :
            {valor}
        </Container>
    );
}

export default ServicoForm;