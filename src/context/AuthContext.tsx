import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "../api/axios";
import { jwtDecode } from "jwt-decode";

type AuthContextType = {
  isAuthenticated: boolean;
  username: string | null;
  login: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  username: null,
  login: async (username: string, email: string, password: string) => {},
  logout: () => {},
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const login = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post("/users/login", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.access_token);
      setIsAuthenticated(true);
      setUsername(username);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername(null);
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        console.log("decooded", username);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
          setUsername(decodedToken.username);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsAuthenticated(false);
        setUsername(null);
      }
    }
  }, []);

  console.log("AuthProvider isAuthenticated:", { isAuthenticated, username }); // Logging isAuthenticated value

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
