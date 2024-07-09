import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const Dashboard: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const navigate = useNavigate();
  console.log("in the dasboard");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.log("No token found, redirecting to login");
          navigate("/login");
          return;
        }
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        console.log("Token validation failed, redirecting to login");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <h1 className="text-center">Welcome to the Dashboard</h1>
          {username && (
            <h3 className="text-center mt-3">Welcome, {username}!</h3>
          )}
          <Button variant="primary" className="mt-3" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
