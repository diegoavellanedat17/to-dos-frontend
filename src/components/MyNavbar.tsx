import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const MyNavbar: React.FC<{
  isAuthenticated: boolean;
  username: string | null;
  onLogout: () => void;
}> = ({ isAuthenticated, username, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Mis Tareas</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && (
              <LinkContainer to="/dashboard">
                <Nav.Link>Tablero</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <>
                <NavDropdown title={username || "User"} id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Iniciar Sesión</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Registrarse</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
