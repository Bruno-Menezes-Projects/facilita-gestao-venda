import {Button, Col, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ProdutoApi from "../../api/ProdutoApi";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {BsBagXFill, BsBagCheckFill, BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import { BsDashCircleFill } from "react-icons/bs";
import { BsExclamationTriangleFill, BsExclamationCircle, BsExclamationCircleFill, BsGraphDown, BsXCircleFill } from "react-icons/bs";
import { BsCheckLg} from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import { BsCheckCircle } from "react-icons/bs";


function ProdutoList(){

    const margem = 5;

    const [showOk, setShowOk] = useState(false);
    const [showAlerta, setShowAlerta] = useState(false);
    const [showCritico, setShowCritico] = useState(false);
    const [showEsgotado, setShowEsgotado] = useState(false);

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [produtoList, setProdutoList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const produtoApi = new ProdutoApi();

    function  handleCloseEstado(){
        setShowOk(false);
        setShowAlerta(false);
        setShowCritico(false);
        setShowEsgotado(false)
    }

    function handleShowEstado(id) {
        const produto = produtoList.find(produto => produto.idProduto === id);
        setIdDelete(id);
        if (produto.quantidade > produto.quantidadeMinima + margem){
            setShowOk(true);
        }else if(produto.quantidade >= produto.quantidadeMinima){
            setShowAlerta(true);
        }else if(produto.quantidade > 0){
            setShowCritico(true);
        }else{
            setShowEsgotado(true);
        }
    }

    function incrementarQuantEstoque(produto){
        produto.quantidade = produto.quantidade + 1;
        produtoApi.alterarProduto(produto);
        consultarEPrecherTable();
    }

    function decrementarQuantEstoque(produto){
        var quant = produto.quantidade;
        if (quant > 0){
            produto.quantidade = quant - 1;
            produtoApi.alterarProduto(produto);
            consultarEPrecherTable();
        }else{
            setIdDelete(produto.idProduto);
            setShowEsgotado(true);
        }
    }

    const getProdutoNome = (id) => {
        const produto = produtoList.find(produto => produto.idProduto === id);
        return produto ? produto.nome : "Produto não encontrado";
    };

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

    function submitSearchProduto(e) {
        e.preventDefault();
        consultarEPrecherTable();
    }

    return(
        <>
            <Container>
                <br/>
                <Row>
                    <h5 className="tituloPesquisa">Pesquisar produto</h5>
                    <Col xl={8}>
                        <Form onChange={submitSearchProduto}>
                            <Form.Group className="mb-3" controlId="searchText">
                                <Form.Control type="text" placeholder="Nome do produto"
                                              onChange={(e) => setSearchText(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Col>
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
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Em estoque</th>
                        <th>Mínimo esperado</th>
                        <th>Controle de estoque</th>
                        <th>Alterar Produto</th>
                        <th>Estado</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(produtoList) && produtoList.map((produto) => (
                            <tr key={produto.idProduto}>
                                <td className="text-start">{produto.idProduto}</td>
                                <td className="text-start">{produto.nome}</td>
                                <td className="text-end">{produto.quantidade}</td>
                                <td className="text-end">{produto.quantidadeMinima}</td>
                                <td>
                                    <Stack direction="horizontal" gap={1}>
                                        <div className="ms-auto">
                                            <Button variant="danger" size="sm"
                                                    onClick={() => decrementarQuantEstoque(produto)}>
                                                Subtrair <BsDashCircleFill/>
                                            </Button>
                                        </div>
                                        <div className="ms-auto">
                                            <Button variant="success" size="sm"
                                                    onClick={() => incrementarQuantEstoque(produto)}>
                                                Acrescentar  <BsFillPlusCircleFill/>
                                            </Button>
                                        </div>
                                    </Stack>
                                </td>
                                <td>
                                    <Stack direction="horizontal" gap={1}>
                                        <div className="ms-auto">
                                            <Button variant="danger" size="sm"
                                                    onClick={() => handleShow(produto.idProduto)}>
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
                                <td className="text-end">
                                    <div>
                                        <Button variant=
                                                    {produto.quantidade > produto.quantidadeMinima + margem ?
                                                        "success" :
                                                        (produto.quantidade >= produto.quantidadeMinima ?
                                                            "warning" :
                                                            (produto.quantidade > 0 ?
                                                                "danger" :
                                                                "dark"))}
                                            size="sm" onClick={() => handleShowEstado(produto.idProduto)}>
                                            <BsSearch/>
                                            &nbsp;
                                            {produto.quantidade > produto.quantidadeMinima + margem ?
                                                    <BsCheckCircle /> :
                                                    (produto.quantidade >= produto.quantidadeMinima ?
                                                        <BsExclamationCircle/> :
                                                        (produto.quantidade > 0 ?
                                                                <BsExclamationCircle />:
                                                                <BsXCircle />
                                                        )
                                                    )}
                                        </Button>
                                    </div>
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
                    <Modal.Body>Confirma a exclusao do Produto <strong>{getProdutoNome(idDelete)}</strong> de Id <strong>{idDelete}</strong>?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="danger" onClick={handleExcluir}>
                            Excluir
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showOk} onHide={handleCloseEstado}>
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-3 text-success" >Estoque suficiente ✔️</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="fs-3">A quantide de estoque do produto <strong>{getProdutoNome(idDelete)}</strong> de
                        Id <strong>{idDelete}</strong> está <strong className="text-success" >OK</strong> <strong>(acima do mínimo esperado)</strong>.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleCloseEstado}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal  show={showAlerta} onHide={handleCloseEstado}>
                    <Modal.Header className="bg-secondary" closeButton>
                        <Modal.Title className="fs-3 text-warning">Estoque em Alerta
                            &nbsp; <BsExclamationTriangleFill/>  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="fs-3">A quantide de estoque do produto <strong>{getProdutoNome(idDelete)}</strong> de
                        Id <strong>{idDelete}</strong> está <strong>próxima do mínimo esperado</strong>.
                    </Modal.Body>
                    <Modal.Footer >
                        <Button variant="warning" onClick={handleCloseEstado}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showCritico} onHide={handleCloseEstado}>
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-3 text-danger">Estoque em estado Crítico
                            &nbsp; <BsExclamationTriangleFill />
                        </Modal.Title> {/* Título em vermelho */}
                    </Modal.Header>
                    <Modal.Body className="fs-3">
                        A quantidade de estoque do produto <strong>{getProdutoNome(idDelete)}</strong> de
                        Id <strong>{idDelete}</strong> está em estado crítico <strong>(abaixo do mínimo)</strong>.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseEstado}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEsgotado} onHide={handleCloseEstado}>
                    <Modal.Header closeButton>
                        <Modal.Title className="fs-3 text-danger">Estoque esgotado
                            &nbsp;
                        </Modal.Title> {/* Título em vermelho */}
                    </Modal.Header>
                    <Modal.Body className="fs-3">
                        O produto <strong>{getProdutoNome(idDelete)}</strong> de
                        Id <strong>{idDelete}</strong> está <strong className="text-danger">esgotado</strong>.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseEstado}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>


            </Container>
        </>
    );
}

export default ProdutoList;
