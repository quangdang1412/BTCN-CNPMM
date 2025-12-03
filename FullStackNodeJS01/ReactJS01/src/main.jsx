import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RegisterPage from "./pages/register.jsx";
import UserPage from "./pages/user.jsx";
import HomePage from "./pages/home.jsx";
import LoginPage from "./pages/login.jsx";
import ProductsPage from "./pages/products.jsx";
import CartGraphQLPage from "./pages/cartGraphQL.jsx";
import AdminLayout from "./components/layout/AdminLayout.jsx";
import AdminDashboardPage from "./pages/admin/dashboard.jsx";
import AdminUsersPage from "./pages/admin/users.jsx";
import AdminProductsPage from "./pages/admin/products.jsx";
import { AuthWrapper } from "./components/context/auth.context.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "user",
        element: <UserPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "cart",
        element: <CartGraphQLPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: "users",
        element: <AdminUsersPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthWrapper>
      <RouterProvider router={router} />
    </AuthWrapper>
  </React.StrictMode>
);
