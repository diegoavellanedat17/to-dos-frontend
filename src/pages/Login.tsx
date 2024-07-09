import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("/users/login", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center">Login</h1>
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
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
