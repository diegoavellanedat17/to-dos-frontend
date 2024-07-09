import React, { useEffect, useState } from "react";
import Login from "../pages/Login";
import { jwtDecode } from "jwt-decode";

interface PrivateRouteProps {
  component: React.FC;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            setIsAuthenticated(false);
            localStorage.removeItem("token");
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Error decoding token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  console.log("is autheticated", isAuthenticated);

  return isAuthenticated ? <Component {...rest} /> : <Login />;
};

export default PrivateRoute;
