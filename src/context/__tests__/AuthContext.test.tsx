import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import axios from "../../api/axios";

jest.mock("../../api/axios", () => ({
  post: jest.fn(),
}));

jest.mock("jwt-decode", () => ({
  __esModule: true,
  jwtDecode: jest
    .fn()
    .mockReturnValue({ exp: Date.now() / 1000 + 3600, username: "testuser" }),
}));

describe("AuthProvider", () => {
  it("sets isAuthenticated and username after successful login", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { access_token: "mocked_token" },
    });

    const TestComponent: React.FC = () => {
      const { isAuthenticated, username, login } = useAuth();

      const handleLogin = async () => {
        try {
          await login("testuser", "test@example.com", "password");
        } catch (error) {}
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

    const { getByText, queryByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(queryByText("Not Authenticated")).toBeInTheDocument();

    fireEvent.click(getByText("Login"));

    await waitFor(() => {
      expect(queryByText("Authenticated")).toBeInTheDocument();
      expect(queryByText("testuser")).toBeInTheDocument();
    });
  });
});
