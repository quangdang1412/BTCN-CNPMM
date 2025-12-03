import React, { useContext, useState, useRef } from "react";
import { Input, Badge, Dropdown, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        name: "",
        role: "",
      },
    });
    navigate("/");
  };

  const userMenuItems = auth?.isAuthenticated
    ? [
        {
          key: "email",
          label: <span style={{ fontWeight: "bold" }}>{auth.user.email}</span>,
          disabled: true,
        },
        { type: "divider" },
        ...(auth.user.role === "Admin"
          ? [
              {
                key: "admin",
                icon: <TeamOutlined />,
                label: "Quản Trị",
                onClick: () => navigate("/admin"),
              },
            ]
          : []),
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: "Đăng xuất",
          onClick: handleLogout,
        },
      ]
    : [
        {
          key: "login",
          label: "Đăng nhập",
          onClick: () => navigate("/login"),
        },
        {
          key: "register",
          label: "Đăng ký",
          onClick: () => navigate("/register"),
        },
      ];

  return (
    <header
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "12px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            minWidth: "180px",
          }}
        >
          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "white",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
            }}
          >
            <ShoppingCartOutlined />
            <span>E-Shop</span>
          </div>
        </Link>

        {/* Search Bar */}
        <div style={{ flex: 1, maxWidth: "600px", margin: "0 auto" }}>
          <Input
            size="large"
            placeholder="Bạn cần tìm gì?"
            prefix={<SearchOutlined style={{ color: "#999" }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => {
              if (searchText.trim()) {
                navigate(`/products?search=${searchText}`);
              }
            }}
            style={{
              borderRadius: "25px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>

        {/* Right Icons */}
        <Space size="large">
          {/* Cart Icon */}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <Badge count={0} showZero={false}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  color: "white",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <ShoppingCartOutlined
                  style={{ fontSize: "28px", marginBottom: "4px" }}
                />
                <span style={{ fontSize: "12px" }}>Giỏ hàng</span>
              </div>
            </Badge>
          </Link>

          {/* User Icon */}
          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                color: "white",
                transition: "all 0.3s",
                padding: "0 10px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <UserOutlined style={{ fontSize: "28px", marginBottom: "4px" }} />
              <span style={{ fontSize: "12px" }}>
                {auth?.isAuthenticated ? "Tài khoản" : "Đăng nhập"}
              </span>
            </div>
          </Dropdown>
        </Space>
      </div>
    </header>
  );
};

export default Header;
