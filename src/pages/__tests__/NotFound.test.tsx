import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotFound from "../NotFound";
import { BrowserRouter as Router } from "react-router-dom";

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("NotFound Component", () => {
  it("renders correctly", () => {
    const { getByText, getByRole } = render(
      <Router>
        <NotFound />
      </Router>
    );

    expect(getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(
      getByText("The page you are looking for does not exist.")
    ).toBeInTheDocument();
    expect(getByRole("button")).toBeInTheDocument();
    expect(getByRole("button")).toHaveTextContent("Go to Home");
  });

  it("navigates to home on button click", () => {
    const { getByRole } = render(
      <Router>
        <NotFound />
      </Router>
    );

    fireEvent.click(getByRole("button", { name: "Go to Home" }));

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
