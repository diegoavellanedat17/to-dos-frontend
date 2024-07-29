import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
}

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    due_date: "",
  });
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userResponse = await axios.get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(userResponse.data.username);

        const tasksResponse = await axios.get("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(tasksResponse.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserData();
  }, [isAuthenticated, navigate]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/tasks", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks([...tasks, response.data]);
      setNewTask({ title: "", description: "", due_date: "" });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTask) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`/api/tasks/${editTask.id}`, editTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(
        tasks.map((task) => (task.id === editTask.id ? response.data : task))
      );
      setEditTask(null);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleShowEditModal = (task: Task) => {
    setEditTask(task);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditTask(null);
    setShowEditModal(false);
  };

  const handleShowDetailsModal = (task: Task) => {
    setSelectedTask(task);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedTask(null);
    setShowDetailsModal(false);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="8">
          <h1 className="text-center">Tablero</h1>
          {username && (
            <h3 className="text-center mt-3">Bienvenid@, {username}!</h3>
          )}

          <Form onSubmit={handleCreateTask} className="mb-4 mt-4">
            <h4>Crear nueva tarea</h4>
            <Form.Group controlId="formTitle" className="mb-3">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                required
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                placeholder="Descripción (opcional)"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDueDate" className="mb-3">
              <Form.Label>Fecha de vencimiento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha de vencimiento (opcional)"
                value={newTask.due_date}
                onChange={(e) =>
                  setNewTask({ ...newTask, due_date: e.target.value })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Crear Tarea
            </Button>
          </Form>

          <h4>Tareas</h4>
          <div className="table-responsive">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Descripción</th>
                  <th>Fecha de vencimiento</th>
                  <th>Completada</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.due_date}</td>
                    <td>{task.completed ? "Sí" : "No"}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleShowDetailsModal(task)}
                        className="mb-2"
                      >
                        Ver Detalles
                      </Button>
                      <br />
                      <Button
                        variant="warning"
                        onClick={() => handleShowEditModal(task)}
                        className="mb-2"
                      >
                        Editar
                      </Button>
                      <br />
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {selectedTask && (
            <Modal show={showDetailsModal} onHide={handleCloseDetailsModal}>
              <Modal.Header closeButton>
                <Modal.Title>Detalles de la Tarea</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>
                  <strong>ID:</strong> {selectedTask.id}
                </p>
                <p>
                  <strong>Título:</strong> {selectedTask.title}
                </p>
                <p>
                  <strong>Descripción:</strong> {selectedTask.description}
                </p>
                <p>
                  <strong>Fecha de vencimiento:</strong> {selectedTask.due_date}
                </p>
                <p>
                  <strong>Completada:</strong>{" "}
                  {selectedTask.completed ? "Sí" : "No"}
                </p>
              </Modal.Body>
            </Modal>
          )}

          {editTask && (
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
              <Modal.Header closeButton>
                <Modal.Title>Editar Tarea</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleUpdateTask}>
                  <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Título"
                      value={editTask.title}
                      onChange={(e) =>
                        setEditTask({ ...editTask, title: e.target.value })
                      }
                      required
                    />
                  </Form.Group>

                  <Form.Group controlId="formDescription" className="mb-3">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Descripción (opcional)"
                      value={editTask.description || ""}
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="formDueDate" className="mb-3">
                    <Form.Label>Fecha de vencimiento</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Fecha de vencimiento (opcional)"
                      value={
                        editTask.due_date
                          ? new Date(editTask.due_date)
                              .toISOString()
                              .substr(0, 10)
                          : ""
                      }
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          due_date: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formCompleted" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Completada"
                      checked={editTask.completed}
                      onChange={(e) =>
                        setEditTask({
                          ...editTask,
                          completed: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Guardar Cambios
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
