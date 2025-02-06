import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand as={Link} to="/">Mercado Campos</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/pet/list">Pet</Nav.Link>
                    <Nav.Link as={Link} to="/servico/list">Servico</Nav.Link>
                    <Nav.Link as={Link} to="/produto/list">Produto</Nav.Link>
                </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;