import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MyNavbar from "./components/MyNavbar";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <MyNavbar />
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
      </AuthProvider>
    </Router>
  );
};

export default App;
