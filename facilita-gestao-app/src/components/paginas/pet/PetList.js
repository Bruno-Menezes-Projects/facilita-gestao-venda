import {Button, Col, Form, Modal, Row, Stack, Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import PetApi from "../../api/PetApi";
import {BsFillPencilFill, BsFillTrashFill} from "react-icons/bs";

function PetList(){

    const [modoDeleteAll, setDeleteAll] = useState(false);
    const [show, setShow] = useState(false);
    const [idDelete, setIdDelete] = useState(false);
    const [petList, setPetList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const location = useLocation();

    const petApi = new PetApi();

    function handleShow(id) {
        setIdDelete(id);
        setShow(true);
    }

    function handleShowDeleteAll(){
        setShow(true);
        setDeleteAll(true);
    }

    function handleClose() {
        setShow(false);
        setDeleteAll(false);
    }

    function handleExcluir() {
        setShow(false);
        petApi.excluir(idDelete);
        console.log(`Excluido o pet id: ${idDelete}`);
        consultarEPrecherTable();
    }

    function handleExcluirTodos() {
        setShow(false)
        setDeleteAll(true);
        petApi.excluirTodosOsPets();
        console.log(`Excluido Todos os pets`);
        consultarEPrecherTable();
    }


    function submitSearchPet(e) {
        e.preventDefault();
        consultarEPrecherTable();
    }

    useEffect(() => {
        consultarEPrecherTable();
    }, [location.pathname]);

    function consultarEPrecherTable(){
        if (searchText.trim().length > 0){
            petApi.getPetsByText(setPetList, searchText);
        }else{
            petApi.getPets(setPetList);
        }
    }

    return(
        <>
            <Container>
                <br/>
                <Row>
                    <h5 className="tituloPesquisa">Pesquisar Pet</h5>
                    <Col xl={10}>
                        <Form onChange={submitSearchPet}>
                            <Form.Group className="mb-3" controlId="searchText">
                                <Form.Control type="text" placeholder="Nome ou Dono"
                                              onChange={(e) => setSearchText(e.target.value)}/>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xl={2}>
                        <Link to="/pet/incluir">
                            <Button>Adicionar Pet +</Button>
                        </Link>
                    </Col>
                </Row>
                <br/>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Id.</th>
                        <th>Nome</th>
                        <th>Dono</th>
                        <th className="d-flex justify-content-end">
                            Gerenciar Pets
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        petList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.dono}</td>
                                <td>
                                    <Stack direction="horizontal" gap={3}>
                                        <div className="ms-auto">
                                            <Button variant="danger" size="sm" onClick={() => handleShow(item.id)}>
                                                Excluir <BsFillTrashFill/>
                                            </Button>
                                        </div>
                                        <div>
                                            <Link to={`/pet/alterar/${item.id}`}>
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
                    <Modal.Body>
                        {modoDeleteAll
                            ? `Confirma a exclusão de Todos os Pets?`
                            : `Confirma a exclusão do Pet ${idDelete}?`}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Fechar
                        </Button>
                        <Button variant="danger" onClick={modoDeleteAll ? handleExcluirTodos : handleExcluir}>
                            {modoDeleteAll
                                ? `Sim, Excluir TODOS os Pets`
                                : `Excluir`}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default PetList;
