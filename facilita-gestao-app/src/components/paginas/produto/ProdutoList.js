import {Button, Col, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import ProdutoApi from "../../api/ProdutoApi";

function ProdutoList(){

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [produtoList, setProdutoList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const produtoApi = new ProdutoApi();

    function handleShow(id) {
        setIdDelete(id);
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handleExcluir() {
        setShow(false);
        produtoApi.excluir(idDelete);
        console.log(`Excluido o produto id: ${idDelete}`);
        consultarEPrecherTable();
    }

    useEffect(() => {
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarEPrecherTable(){
        if (searchText.trim().length > 0){
            produtoApi.getProdutosByText(setProdutoList, searchText);
        }else{
            produtoApi.getProdutos(setProdutoList);
        }
    }

    return(
        <>
            <Container>
                <br/>
                <Row>
                    <Col xl={3}>
                        <Link to="/produto/incluir">
                            <Button>Adicionar Produto +</Button>
                        </Link>
                    </Col>
                </Row>
                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(produtoList) && produtoList.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.idProduto}</td>
                                <td>{produto.nome}</td>
                                <td>{"R$ "+produto.valor}</td>
                                <td>{produto.quantidade}</td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className="ms-auto">
                                            <Button variant="danger" size="sm" onClick={() => handleShow(produto.idProduto)}>
                                                Excluir <BsFillTrashFill/>
                                            </Button>
                                        </div>
                                        <div>
                                            <Link to={`/produto/alterar/${produto.idProduto}`}>
                                                <Button size="sm">
                                                    Editar <BsFillPencilFill/>
                                                </Button>
                                            </Link>
                                        </div>
                                    </Stack>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>

                </Table>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmação</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Confirma a exclusao do Produto {idDelete}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="danger" onClick={handleExcluir}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default ProdutoList;
