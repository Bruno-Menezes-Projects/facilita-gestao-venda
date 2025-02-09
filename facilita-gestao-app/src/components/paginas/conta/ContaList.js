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

    const margem = 5;

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
            contaApi.getContaByText(setContaList, searchText);
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
                <Row>
                    <Col xl={3}>
                        <Link to="/conta/incluir">
                            <Button>
                                Adicionar Conta
                                 &nbsp;
                                <BsFillPlusCircleFill/>
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
                                <td className="text-end">{conta.dtVencimento}</td>
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
