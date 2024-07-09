import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyNavbar from "./components/MyNavbar";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import { jwtDecode } from "jwt-decode";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUsername(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsAuthenticated(true);
          setUsername(decodedToken.username);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);
  return (
    <Router>
      <MyNavbar
        isAuthenticated={isAuthenticated}
        username={username}
        onLogout={handleLogout}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
