import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MyNavbar from "../MyNavbar";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext"; // Assuming AuthProvider wraps MyNavbar

describe("MyNavbar Component", () => {
  it("renders correctly when not authenticated", () => {
    const { getByText } = render(
      <Router>
        <AuthProvider>
          <MyNavbar />
        </AuthProvider>
      </Router>
    );

    expect(getByText("Mis Tareas")).toBeInTheDocument();
    expect(getByText("Iniciar Sesión")).toBeInTheDocument();
    expect(getByText("Registrarse")).toBeInTheDocument();
  });
});
