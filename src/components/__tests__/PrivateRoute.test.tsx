import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "../PrivateRoute";

jest.mock("jwt-decode", () => ({
  __esModule: true,
  jwtDecode: jest.fn().mockReturnValue({ exp: Date.now() / 1000 + 3600 }), // Mock token expiration in the future
}));

describe("PrivateRoute Component", () => {
  it("renders Login component when not authenticated", async () => {
    const { queryByText } = render(
      <Router>
        <PrivateRoute component={() => <div>Dashboard</div>} />
      </Router>
    );

    // Wait for any asynchronous operations to complete
    await waitFor(() => {
      expect(queryByText("Iniciar Sesión")).toBeInTheDocument(); // Assuming "Iniciar Sesión" text is in the Login component
    });
  });
});
