import {Button, Col, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ServicoApi from "../../api/ServicoApi";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";

function ServicoList(){

    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [servicoList, setServicoList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const servicoApi = new ServicoApi();

    function handleShow(id) {
        setIdDelete(id);
        setShow(true);
    }

    function handleClose() {
        setShow(false);
    }

    function handleExcluir() {
        setShow(false);
        servicoApi.excluir(idDelete);
        console.log(`Excluido o servico id: ${idDelete}`);
        consultarEPrecherTable();
    }

    function submitSearchServico(e) {
        e.preventDefault();
        consultarEPrecherTable();
    }

    useEffect(() => {
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarEPrecherTable(){
        if (searchText.trim().length > 0){
            servicoApi.getServicosByText(setServicoList, searchText);
        }else{
            servicoApi.getServicos(setServicoList);
        }
    }

    return(
        <>
            <Container>
                <br/>
                <Row>
                    <h5 className="tituloPesquisa">Pesquisar Serviço</h5>
                    <Col xl={9}>
                        <Form onChange={submitSearchServico}>
                            <Form.Group className="mb-3" controlId="searchText">
                                <Form.Control type="text" placeholder="Descrição do Serviço" onChange={(e)=>setSearchText(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xl={3}>
                        <Link to="/servico/incluir">
                            <Button>Adicionar Serviço +</Button>
                        </Link>
                    </Col>
                </Row>
                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th className="d-flex justify-content-end">
                            Gerenciar Serviços
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                    Array.isArray(servicoList) && servicoList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.descricao}</td>
                                <td>{"R$ "+item.valor}</td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className="ms-auto">
                                            <Button variant="danger" size="sm" onClick={() => handleShow(item.id)}>
                                                Excluir <BsFillTrashFill/>
                                            </Button>
                                        </div>
                                        <div>
                                            <Link to={`/servico/alterar/${item.id}`}>
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
                    <Modal.Body>Confirma a exclusao do Servico {idDelete}?</Modal.Body>
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

export default ServicoList;
