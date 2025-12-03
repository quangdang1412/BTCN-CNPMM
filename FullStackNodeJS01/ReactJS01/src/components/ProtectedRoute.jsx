import { useContext, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./context/auth.context";
import { Spin } from "antd";
import axios from "../util/axios.customize";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchAccount = async () => {
      if (auth.isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("/v1/api/account");
        if (res && !res.message) {
          setAuth({
            isAuthenticated: true,
            user: {
              email: res.email,
              name: res.name,
              role: res.role,
            },
          });
        }
      } catch (error) {
        console.log("Error fetching user:", error.message);
      }
      setLoading(false);
    };

    fetchAccount();
  }, [auth.isAuthenticated, setAuth]);

  if (loading) {
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && auth.user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
