import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../../context/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: false,
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Home Component", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    expect(getByText("Bienvenido a la App de Tareas")).toBeInTheDocument();
  });

  it("navigates to Register page on Register button click", () => {
    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.click(getByText("Registrarse"));
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });

  it("navigates to Login page on Login button click", () => {
    const { getByText } = render(
      <Router>
        <Home />
      </Router>
    );

    fireEvent.click(getByText("Iniciar Sesión"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
