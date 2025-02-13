import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <Navbar className="navbar" data-bs-theme="dark">
                <Container  className="navbar">
                    <Navbar.Brand as={Link} to="/">Facilita Gestão</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/produto/list">Produto</Nav.Link>
                        <Nav.Link as={Link} to="/conta/list">Contas</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;