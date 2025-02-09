import {Button, Col, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ContaApi from "../../api/ContaApi";
import {BsBagXFill, BsBagCheckFill, BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";
import { BsDashCircleFill, BsDashCircle  } from "react-icons/bs";
import { BsExclamationTriangleFill, BsExclamationCircle, BsExclamationCircleFill, BsGraphDown, BsXCircleFill,
    BsCheckLg, BsSearch, BsXCircle, BsCheckCircle, BsFillPlusCircleFill, BsFillPlusCircle} from "react-icons/bs";
import { CiCirclePlus } from "react-icons/ci";


function ContaList(){

    const [tipoPesquisa, setTipoPesquisa] = useState('titular');  // Inicializa com 'titular' como valor padrão

    // Função para alterar o tipo de pesquisa com base na seleção
    const handleTipoPesquisaChange = (e) => {
        setTipoPesquisa(e.target.value);
    };

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [contaList, setContaList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const contaApi = new ContaApi();

    const getConta = (id) => {
        if (id){
            const conta = contaList.find(conta => conta.id === id);
            return conta ? conta.descricao : "Conta não encontrada";
        }
        return null;
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
        contaApi.excluir(idDelete);
        console.log(`Excluido: ${idDelete}`);
        consultarEPrecherTable();
    }

    useEffect(() => {
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarEPrecherTable(){
        if (searchText.trim().length > 0){
            if (tipoPesquisa === "t"){
                contaApi.getContaByTextTitular(setContaList, searchText);
            }else{
                contaApi.getContaByTextDescricao(setContaList, searchText);
            }
        }else{
            contaApi.getContas(setContaList);
        }
    }

    function submitSearchConta(e) {
        e.preventDefault();
        consultarEPrecherTable();
    }

    return(
        <>
            <Container>
                <br/>
                <Row className="mb-3">
                    <Col xl={6}>
                        <h5 className="text-white">
                            Pesquisar Conta
                        </h5>
                    </Col>
                    <Col xl={3}>
                        <h5 className="text-white">
                            Pesquisar Por
                        </h5>
                    </Col>
                    <Col xl={3}>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col xl={6}>
                        <Form onChange={submitSearchConta}>
                            <Form.Group className="mb-3" controlId="searchText">
                                <Form.Control
                                    type="text"
                                    placeholder= { tipoPesquisa === "t" ? "Nome do Titular" : "Descrição da conta"}
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xl={3}>
                        {/* Seletor para tipo de pesquisa */}
                        <Form.Group controlId="tipoPesquisa" className="mb-3">
                            <Form.Select
                                value={tipoPesquisa}
                                onChange={handleTipoPesquisaChange}
                            >
                                <option value="t">Titular</option>
                                <option value="d">Descrição</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col xl={3}>
                        {/* Link para adicionar conta */}
                        <Link to="/conta/incluir">
                            <Button>
                                Adicionar Conta
                                &nbsp;
                                <BsFillPlusCircleFill />
                            </Button>
                        </Link>
                    </Col>
                </Row>

                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titular</th>
                        <th>Descrição</th>
                        <th>Data de vencimento</th>
                        <th>Situação</th>
                        <th>Alterar Conta</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(contaList) && contaList.map((conta) => (
                            <tr key={conta.id}>
                                <td className="text-start">{conta.id}</td>
                                <td className="text-start">{conta.titular}</td>
                                <td className="text-end">{conta.descricao}</td>
                                <td className="text-end">
                                    {new Date(conta.dtVencimento).toLocaleDateString('pt-BR').slice(0, 10)}
                                </td>
                                <td className="text-end">{conta.situacao}</td>
                                <td>
                                    <Stack direction="horizontal" gap={1}>
                                        <div className="ms-auto">
                                            <Button variant="warning" size="sm"
                                                    onClick={() => handleShow(conta.id)}>
                                                Excluir <BsFillTrashFill/>
                                            </Button>
                                        </div>
                                        <div>
                                            <Link to={`/conta/alterar/${conta.id}`}>
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
                    <Modal.Body className="fs-3">Confirma a <strong className="text-danger">exclusão</strong> da Conta <strong>{getConta(idDelete)}</strong> de Id <strong>{idDelete}</strong>?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleExcluir}>
                            Excluir <BsFillTrashFill/>
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default ContaList;
