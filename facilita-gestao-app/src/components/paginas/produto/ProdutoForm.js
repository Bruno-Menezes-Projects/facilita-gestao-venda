import {Col, Row, Form, Button, Stack, Modal} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProdutoApi from "../../api/ProdutoApi";

function ProdutoForm({id}){

    const [show, setShow] = useState(false);

    const[nome, setNome] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [quantidadeMinima, setQuantidadeMinima] = useState("");

    const[nomeAnt, setNomeAnt] = useState("");
    const [quantidadeAnt, setQuantidadeAnt] = useState("");
    const [quantidadeMinimaAnt, setQuantidadeMinimaAnt] = useState("");

    const navigate = useNavigate();

    function handleShow(e) {
        e.preventDefault()
        if (id){
            setShow(true);
        }else{
            cadastrarProduto();
        }
    }

    function handleClose() {
        setShow(false);
    }

    function handleAlterar() {
        setShow(false);
        cadastrarProduto()
    }

    function setProduto(produto){
        setNome(produto.nome)
        setQuantidade(produto.quantidade)
        setQuantidadeMinima(produto.quantidadeMinima)

        setNomeAnt(produto.nome)
        setQuantidadeAnt(produto.quantidade)
        setQuantidadeMinimaAnt(produto.quantidadeMinima)
    }

    useEffect(() => {
        if(id){
            console.log("Consultar o produto pelo id: " + id);
            const produtoApi = new ProdutoApi();
            produtoApi.getProduto(setProduto, id);
        }
    }, [id]);

    function cadastrarProduto() {
        var produto = {idProduto: id, nome: nome, quantidade: quantidade, quantidadeMinima: quantidadeMinima};
        console.log(JSON.stringify(produto));
        console.log("cadastrarProduto exec.....");

        const produtoApi = new ProdutoApi();
        if (id){
            produtoApi.alterarProduto(produto);
        }else{
            produtoApi.incluirProduto(produto);
        }

        navigate(`/produto/list`);
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
                                                Id do Produto em alteração: &nbsp;&nbsp;&nbsp; <strong>{id}</strong>
                                            </h3>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Form.Group>
                        )}

                        <Form.Group as={Row} className="mb-3" controlId="nome">
                            <Form.Label column sm="10">
                                Nome do produto:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Nome do produto" defaultValue={nome} onChange={(e) => setNome(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="quantidade">
                            <Form.Label column sm="10">
                                Quantidade de estoque:
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Quantidade de estoque" defaultValue={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="quantidadeMinima">
                            <Form.Label column sm="10">
                                Quantidade Mínima (para alerta):
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control type="text" placeholder="Quantidade de alerta" defaultValue={quantidadeMinima} onChange={(e) => setQuantidadeMinima(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <br/>


                        <Row className="justify-content-md-center">
                            <Col xl={12}>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="p-2">
                                        <Link to="/produto/list">
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
            {nome} :
            {quantidade}:
            {quantidadeMinima}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Anterior:</h3>
                    <h4>Nome do produto:
                        &nbsp;&nbsp;
                        <strong>
                            {nomeAnt}
                        </strong>
                        <br/>

                        Quantidade de estoque:
                        &nbsp;&nbsp;
                        <strong>
                            {quantidadeAnt}
                        </strong>
                        <br/>

                        Quantidade mínima:
                        &nbsp;&nbsp;
                        <strong>
                            {quantidadeMinimaAnt}
                        </strong>
                    </h4>
                    <br/>

                    <h3>Alteração:</h3>
                    <h4>Nome do produto:
                        &nbsp;&nbsp;
                        <strong>
                            {nome}
                        </strong>
                        <br/>

                        Quantidade de estoque:
                        &nbsp;&nbsp;
                        <strong>
                            {quantidade}
                        </strong>
                        <br/>

                        Quantidade mínima:
                        &nbsp;&nbsp;
                        <strong>
                            {quantidadeMinima}
                        </strong>
                    </h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleAlterar}>
                        Alterar
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ProdutoForm;