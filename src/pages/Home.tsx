import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Assuming you have an AuthContext

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          <h1 className="text-center">Bienvenido a la App de Tareas</h1>
          <p className="text-center mt-4">
            Esta es una aplicación para crear y actualizar tareas. Puedes
            registrarte y acceder para gestionar tus tareas de manera sencilla y
            eficiente.
          </p>
          <div className="text-center mt-5">
            {isAuthenticated ? (
              <Button
                variant="primary"
                className="me-3"
                onClick={() => navigate("/dashboard")}
              >
                Tablero
              </Button>
            ) : (
              <>
                <Button
                  variant="primary"
                  className="me-3"
                  onClick={handleRegister}
                >
                  Registrarse
                </Button>
                <Button variant="secondary" onClick={handleLogin}>
                  Iniciar Sesión
                </Button>
              </>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
