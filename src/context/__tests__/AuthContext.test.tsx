import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import axios from "../../api/axios";

// Mock axios post for login
jest.mock("../../api/axios", () => ({
  post: jest.fn(),
}));

// Mock jwt-decode library
jest.mock("jwt-decode", () => ({
  __esModule: true,
  jwtDecode: jest
    .fn()
    .mockReturnValue({ exp: Date.now() / 1000 + 3600, username: "testuser" }), // Mock token expiration in the future
}));

describe("AuthProvider", () => {
  it("sets isAuthenticated and username after successful login", async () => {
    // Mock axios response for successful login
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { access_token: "mocked_token" },
    });

    const TestComponent: React.FC = () => {
      const { isAuthenticated, username, login } = useAuth();

      const handleLogin = async () => {
        try {
          await login("testuser", "test@example.com", "password");
        } catch (error) {
          // Handle login error
        }
      };

      return (
        <>
          <div data-testid="auth-status">
            {isAuthenticated ? "Authenticated" : "Not Authenticated"}
          </div>
          {username && <div data-testid="username">{username}</div>}
          <button onClick={handleLogin}>Login</button>
        </>
      );
    };

    const { getByText, queryByText, getAllByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Check initial state (not authenticated)
    expect(queryByText("Not Authenticated")).toBeInTheDocument();
    expect(queryByText("")).toBeNull(); // Ensure username is initially null

    // Trigger login action
    fireEvent.click(getByText("Login"));

    // Wait for login process to complete
    await waitFor(() => {
      expect(getByText("Authenticated")).toBeInTheDocument();
      expect(getAllByText("testuser")).toHaveLength(1); // Ensure username is displayed once
    });
  });

  it("clears isAuthenticated and username after logout", async () => {
    const TestComponent: React.FC = () => {
      const { isAuthenticated, username, logout } = useAuth();

      const handleLogout = () => {
        logout();
      };

      return (
        <>
          <div data-testid="auth-status">
            {isAuthenticated ? "Authenticated" : "Not Authenticated"}
          </div>
          {username && <div data-testid="username">{username}</div>}
          <button onClick={handleLogout}>Logout</button>
        </>
      );
    };

    const { getByText, queryByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Check initial state (not authenticated)
    expect(queryByText("Not Authenticated")).toBeInTheDocument();
    expect(queryByText("")).toBeNull(); // Ensure username is initially null

    // Trigger logout action
    fireEvent.click(getByText("Logout"));

    // Wait for logout process to complete
    await waitFor(() => {
      expect(queryByText("Not Authenticated")).toBeInTheDocument();
      expect(queryByText("")).toBeNull(); // Ensure username is cleared
    });
  });
});
