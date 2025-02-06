import {Col, Row, Form, Button, Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import PetApi from "../../api/PetApi";

function PetForm({id}){

    const [nome, setNome] = useState("");
    const [dono, setDono] = useState("");
    const navigate = useNavigate();

    function setPet(pet){
        setNome(pet.nome);
        setDono(pet.dono);
    }

    useEffect(() => {
        if(id){
            console.log("Consultar o pet pelo id: " + id);
            const petApi = new PetApi();
            petApi.getPet(setPet, id);
        }
    }, [id]);

    function cadastrarPet(e) {
        e.preventDefault();
        var pet = {id: id, nome: nome, dono: dono};
        console.log(JSON.stringify(pet));
        console.log("cadastrarPet exec.....");

        const petApi = new PetApi();
        if (id){
            petApi.alterarPet(pet);
        }else{
            petApi.incluirPet(pet);
        }

        navigate(`/pet/list`);
    }

    return(
        <Container>
            <Form onSubmit={cadastrarPet}>
                <Row>
                    <Col sm="6">
                        {id && (
                            <Form.Group as={Row} className="mb-3" controlId="id">
                                <Row className="justify-content-md-center">
                                    <Col xl={12}>
                                        <Stack direction="horizontal" gap={3}>
                                            <p>
                                                Id do Pet em alteração: &nbsp;&nbsp;&nbsp; {id}
                                            </p>
                                        </Stack>
                                    </Col>
                                </Row>
                            </Form.Group>
                        )}

                        <Form.Group as={Row} className="mb-3" controlId="nome">
                            <Form.Label column sm="2">
                                Nome
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Nome Pet" defaultValue={nome} onChange={(e) => setNome(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="dono">
                            <Form.Label column sm="2">
                                Dono
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text"  placeholder="Nome Dono" defaultValue={dono} onChange={(e) => setDono(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <br/>


                        <Row className="justify-content-md-center">
                            <Col xl={12}>
                                <Stack direction="horizontal" gap={3}>
                                    <div className="p-2">
                                        <Link to="/pet/list">
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
            {dono}
        </Container>
    );
}

export default PetForm;