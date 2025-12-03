import { Outlet, Navigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../components/context/auth.context";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  LogoutOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Sider, Content } = Layout;

const AdminLayout = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is admin
  if (!auth.isAuthenticated || auth.user.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

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

  const menuItems = [
    {
      key: "/admin",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin"),
    },
    {
      key: "/admin/users",
      icon: <UserOutlined />,
      label: "Quản Lý Users",
      onClick: () => navigate("/admin/users"),
    },
    {
      key: "/admin/products",
      icon: <ShoppingOutlined />,
      label: "Quản Lý Sản Phẩm",
      onClick: () => navigate("/admin/products"),
    },
    { type: "divider" },
    {
      key: "home",
      icon: <HomeOutlined />,
      label: "Về Trang Chủ",
      onClick: () => navigate("/"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng Xuất",
      danger: true,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: "#001529",
        }}
      >
        <div
          style={{
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ marginTop: "20px" }}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            background: "#f0f2f5",
            minHeight: "100vh",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
