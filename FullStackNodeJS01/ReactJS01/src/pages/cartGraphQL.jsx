import React, { useRef } from "react";
import { Typography } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import CartGraphQLAdapter from "../components/CartGraphQLAdapter";

const { Title, Text } = Typography;

const CartGraphQLPage = () => {
  const cartRef = useRef();

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      {/* Page Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "40px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <Title
          level={1}
          style={{
            color: "white",
            fontSize: "2.5rem",
            marginBottom: "10px",
            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          <ShoppingCartOutlined style={{ marginRight: "15px" }} />
          Giỏ Hàng
        </Title>
        <Text style={{ color: "rgba(255,255,255,0.9)", fontSize: "1.2rem" }}>
          Quản lý giỏ hàng của bạn
        </Text>
      </div>

      {/* Main Content */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        <CartGraphQLAdapter ref={cartRef} />
      </div>
    </div>
  );
};

export default CartGraphQLPage;
