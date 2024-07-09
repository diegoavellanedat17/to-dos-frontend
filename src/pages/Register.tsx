import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("/users/register", {
        username,
        email,
        password,
      });
      setShowModal(true);
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <Container>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Registration Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your account has been created successfully. Please log in to continue.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center">Register</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
