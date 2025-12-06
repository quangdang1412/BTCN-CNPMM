import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Typography,
  Space,
  Button,
  Empty,
  message,
  Spin,
} from "antd";
import {
  HeartFilled,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getUserFavoritesApi,
  removeFromFavoritesApi,
  addToCartGraphQL,
} from "../util/api";
import { AuthContext } from "../components/context/auth.context";

const { Title, Text } = Typography;

const FavoritesPage = () => {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchFavorites();
  }, [auth.isAuthenticated, navigate]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await getUserFavoritesApi(1, 100);
      if (res && res.success) {
        setFavorites(res.favorites);
      }
    } catch (error) {
      message.error("Không thể tải danh sách yêu thích");
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    try {
      await removeFromFavoritesApi(productId);
      message.success("Đã xóa khỏi yêu thích");
      setFavorites(favorites.filter((fav) => fav.productId !== productId));
    } catch (error) {
      message.error("Không thể xóa khỏi yêu thích");
      console.error("Error removing favorite:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await addToCartGraphQL(productId, 1);
      message.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      message.error("Không thể thêm vào giỏ hàng");
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title
            level={1}
            style={{
              color: "#1890ff",
              marginBottom: "10px",
              fontSize: "3rem",
              fontWeight: "bold",
            }}
          >
            <HeartFilled style={{ marginRight: "15px", color: "#ff4d4f" }} />
            Sản Phẩm Yêu Thích
          </Title>
          <Text style={{ fontSize: "1.1rem", color: "#666" }}>
            Danh sách các sản phẩm bạn đã lưu
          </Text>
        </div>

        {favorites.length === 0 ? (
          <Empty
            description="Bạn chưa có sản phẩm yêu thích nào"
            style={{ padding: "60px 0" }}
          >
            <Button type="primary" onClick={() => navigate("/products")}>
              Khám phá sản phẩm
            </Button>
          </Empty>
        ) : (
          <Row gutter={[32, 32]}>
            {favorites.map((favorite) => (
              <Col xs={24} sm={12} md={8} lg={6} key={favorite.id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    border: "1px solid #f0f0f0",
                  }}
                  bodyStyle={{
                    padding: "20px",
                  }}
                  cover={
                    <div
                      style={{
                        height: "220px",
                        overflow: "hidden",
                        position: "relative",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate(`/product/${favorite.product.id}`)
                      }
                    >
                      <img
                        alt={favorite.product.name}
                        src={
                          favorite.product.image ||
                          "https://via.placeholder.com/300x220?text=Không+có+hình+ảnh"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <div
                        style={{
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          color: "#1890ff",
                          marginBottom: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          navigate(`/product/${favorite.product.id}`)
                        }
                      >
                        {favorite.product.name}
                      </div>
                    }
                    description={
                      <div>
                        <Text
                          style={{
                            color: "#666",
                            fontSize: "0.9rem",
                            display: "block",
                            marginBottom: "10px",
                          }}
                        >
                          {favorite.product.description?.length > 60
                            ? `${favorite.product.description.substring(
                                0,
                                60
                              )}...`
                            : favorite.product.description}
                        </Text>
                        <div
                          style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#52c41a",
                            marginBottom: "15px",
                          }}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(favorite.product.price)}
                        </div>
                        <Space direction="vertical" style={{ width: "100%" }}>
                          <Button
                            type="primary"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleAddToCart(favorite.product.id)}
                            block
                          >
                            Thêm vào giỏ
                          </Button>
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() =>
                              handleRemoveFavorite(favorite.product.id)
                            }
                            block
                          >
                            Xóa khỏi yêu thích
                          </Button>
                        </Space>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
