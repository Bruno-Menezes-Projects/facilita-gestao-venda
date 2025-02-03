import {Col, Row, Form, Button, Stack} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import ProdutoApi from "../../api/ProdutoApi";

function ProdutoForm({id}){

    const[nome, setNome] = useState("");
    const [valor, setValor] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const navigate = useNavigate();

    function setProduto(produto){
        setNome(produto.nome)
        setValor(produto.valor);
        setQuantidade(produto.quantidade)
    }

    useEffect(() => {
        if(id){
            console.log("Consultar o produto pelo id: " + id);
            const produtoApi = new ProdutoApi();
            produtoApi.getProduto(setProduto, id);
        }
    }, [id]);

    function cadastrarProduto(e) {
        e.preventDefault();
        var produto = {id: id, nome: nome, valor: valor, quantidade: quantidade};
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
            <Form onSubmit={cadastrarProduto}>
                <Row>
                    <Col sm="6">
                        {id && (
                            <Form.Group as={Row} className="mb-3" controlId="id">
                                <Form.Label column sm="2">
                                    Id.
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control plaintext readOnly defaultValue={id} />
                                </Col>
                            </Form.Group>
                        )}

                        <Form.Group as={Row} className="mb-3" controlId="nome">
                            <Form.Label column sm="">
                                Nome do produto:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Nome do produto" defaultValue={nome} onChange={(e) => setNome(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="valor">
                            <Form.Label column sm="">
                                Valor do produto:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Valor do produto" defaultValue={valor} onChange={(e) => setValor(e.target.value)}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="quantidade">
                            <Form.Label column sm="">
                                Quantidade de estoque:
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Quantidade de estoque" defaultValue={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
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
            {valor}:
            {quantidade}
        </Container>
    );
}

export default ProdutoForm;