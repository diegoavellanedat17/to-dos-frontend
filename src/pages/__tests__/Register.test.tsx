import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Register";
import { BrowserRouter as Router } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockRegisterAPI = jest.fn((username, email, password) => {
  return new Promise((resolve, reject) => {
    if (
      username === "testuser" &&
      email === "test@example.com" &&
      password === "password"
    ) {
      resolve({});
    } else {
      reject(new Error("Registration failed"));
    }
  });
});

describe("Register Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <Register />
      </Router>
    );

    expect(getByText("Registro")).toBeInTheDocument();
    expect(getByLabelText("Nombre de Usuario")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Contraseña")).toBeInTheDocument();
    expect(getByText("Registrarse")).toBeInTheDocument();
  });

  it("shows error when fields are empty", async () => {
    const { getByText } = render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.click(getByText("Registrarse"));

    await waitFor(() => {
      expect(getByText("All fields are required.")).toBeInTheDocument();
    });
  });
  jest.mock("../Register", () => ({
    __esModule: true,
    default: () => null,
    mockRegisterAPI: mockRegisterAPI,
  }));
});
