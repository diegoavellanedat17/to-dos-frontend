import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the AuthContext for testing purposes
jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    login: jest.fn(),
    isAuthenticated: false,
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  it("renders correctly", async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    expect(getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(getByLabelText("Nombre de usuario")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Contraseña")).toBeInTheDocument();
    expect(getByText("Iniciar")).toBeInTheDocument();
  });

  it("shows error when fields are empty", async () => {
    const { getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.click(getByText("Iniciar"));

    await waitFor(() => {
      expect(getByText("Todos los campos son requeridos")).toBeInTheDocument();
    });
  });
});
