import {Col, Row, Form, Button, Stack, Modal} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ContaApi from "../../api/ContaApi";

function ContaForm({id}){

    const [show, setShow] = useState(false);

    const[titular, setTitular] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dtVencimento, setDtVencimento] = useState("");
    const[situacao, setSituacao] = useState("Pendente");

    const[titularAnt, setTitularAnt] = useState("");
    const [descricaoAnt, setDescricaoAnt] = useState("");
    const [dtVencimentoAnt, setDtVencimentoAnt] = useState("");
    const [situacaoAnt, setSituacaoAnt] = useState("");
    const navigate = useNavigate();

    function handleShow(e) {
        e.preventDefault()
        if (id){
            setShow(true);
        }else{
            cadastrarConta();
        }
    }

    function handleClose() {
        setShow(false);
    }

    function handleAlterar() {
        setShow(false);
        cadastrarConta()
    }

    function setConta(conta){
        setTitular(conta.titular)
        setDescricao(conta.descricao)
        setDtVencimento(conta.dtVencimento)
        setSituacao(conta.situacao)

        setTitularAnt(conta.titular);
        setDescricaoAnt(conta.descricao);
        setDtVencimentoAnt(conta.dtVencimento);
        setSituacaoAnt(conta.situacao);
    }

    useEffect(() => {
        if(id){
            console.log("Consultar o conta pelo id: " + id);
            const contaApi = new ContaApi();
            contaApi.getConta(setConta, id);
        }
    }, [id]);

    function cadastrarConta() {
        var conta = {id: id, titular: titular, descricao: descricao, dtVencimento: dtVencimento, situacao: situacao};
        console.log(JSON.stringify(conta));
        console.log("cadastrarConta exec.....");

        const contaApi = new ContaApi();
        if (id){
            contaApi.alterarConta(conta);
        }else{
            contaApi.incluirConta(conta);
        }

        navigate(`/conta/list`);
    }

    return(
        <Container>
            <Form onSubmit={handleShow}>
                <Row>
                    <Col sm="6">
                        {id && (
                            <Form.Group as={Row} className="mb-3" controlId="id">
                                <Row className="justify-content-md-center">
                                    <Col xl={12}>
                                        <Stack direction="horizontal" gap={3}>
                                            <h3>
                                                Id da conta em alteração: &nbsp;&nbsp;&nbsp; <strong>{id}</strong>
                                            </h3>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Form.Group>
                        )}

                        <Form.Group as={Row} className="mb-3" controlId="nome">
                            <Form.Label column sm="10">
                                Titular:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Titular" defaultValue={titular} onChange={(e) => setTitular(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="quantidade">
                            <Form.Label column sm="10">
                                Descricao:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Descricao" defaultValue={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="dataVencimento">
                            <Form.Label column sm="10">
                                Data de Vencimento:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control
                                    type="date"
                                    value={dtVencimento}
                                    onChange={(e) => setDtVencimento(e.target.value)}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="situacao">
                            <Form.Label column sm="10">
                                Situação:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Select value={situacao} onChange={(e) => setSituacao(e.target.value)}>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Paga">Paga</option>
                                    <option value="Vencida">Vencida</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>


                        <br/>


                        <Row className="justify-content-md-center">
                            <Col xl={12}>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="p-2">
                                        <Link to="/produto/list">
                                            <Button variant="primary">
                                                Cancelar
                                            </Button>
                                        </Link>
                                    </div>
                                    <div className="p-2 ms-auto">
                                        <Button variant="success" type="submit">
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
            {titular} :
            {descricao}:
            {dtVencimento}:
            {situacao}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Anterior:</h3>
                    <h4>Titular:
                        &nbsp;&nbsp;
                        <strong>
                            {titularAnt}
                        </strong>
                        <br/>

                        Descrição:
                        &nbsp;&nbsp;
                        <strong>
                            {descricaoAnt}
                        </strong>
                        <br/>

                        Data de vencimento:
                        &nbsp;&nbsp;
                        <strong>
                            {dtVencimentoAnt}
                        </strong>
                        <br/>

                        Situação:
                        &nbsp;&nbsp;
                        <strong>
                            {situacaoAnt}
                        </strong>
                    </h4>
                    <br/>

                    <h3>Alteração:</h3>
                    <h4>Titular:
                        &nbsp;&nbsp;
                        <strong>
                            {titular}
                        </strong>
                        <br/>

                        Descrição:
                        &nbsp;&nbsp;
                        <strong>
                            {descricao}
                        </strong>
                        <br/>

                        Data de vencimento:
                        &nbsp;&nbsp;
                        <strong>
                            {dtVencimento}
                        </strong>
                        <br/>

                        Situação:
                        &nbsp;&nbsp;
                        <strong>
                            {situacao}
                        </strong>
                    </h4>
                </Modal.Body>

                <Modal.Footer>
                    <Button  variant="warning" onClick={handleAlterar}>
                        Alterar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ContaForm;