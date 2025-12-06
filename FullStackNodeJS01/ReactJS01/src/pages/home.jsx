import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Carousel,
  Tag,
  Space,
  Statistic,
  message,
} from "antd";
import {
  ShoppingCartOutlined,
  FireOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  StarOutlined,
  RocketOutlined,
  HeartOutlined,
  GiftOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { getProductsApi, addToCartGraphQL } from "../util/api";

const { Title, Text, Paragraph } = Typography;

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingToCart, setAddingToCart] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsApi("", 1, 20);
      if (res && res.products) {
        setFeaturedProducts(res.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleAddToCart = async (productId, event) => {
    // Prevent card click event
    if (event) {
      event.stopPropagation();
    }
    setAddingToCart((prev) => ({ ...prev, [productId]: true }));
    try {
      await addToCartGraphQL(productId, 1);
      message.success("Đã thêm vào giỏ hàng!");
    } catch (error) {
      message.error("Lỗi khi thêm vào giỏ hàng: " + error.message);
    } finally {
      setAddingToCart((prev) => ({ ...prev, [productId]: false }));
    }
  };

  const categories = [
    {
      name: "Điện tử",
      icon: <ThunderboltOutlined />,
      color: "#1890ff",
      value: "electronics",
    },
    {
      name: "Quần áo",
      icon: <CrownOutlined />,
      color: "#eb2f96",
      value: "clothing",
    },
    {
      name: "Sách",
      icon: <StarOutlined />,
      color: "#52c41a",
      value: "books",
    },
    {
      name: "Đồ gia dụng",
      icon: <GiftOutlined />,
      color: "#fa8c16",
      value: "home",
    },
  ];

  return (
    <div style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Title
            level={1}
            style={{
              color: "white",
              fontSize: "3.5rem",
              marginBottom: 0,
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <ShoppingCartOutlined style={{ marginRight: "15px" }} />
            Chào Mừng Đến E-Shop
          </Title>
          <Paragraph
            style={{
              color: "white",
              fontSize: "1.5rem",
              maxWidth: "800px",
              margin: "0 auto",
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Khám phá hàng ngàn sản phẩm chất lượng cao với giá tốt nhất
          </Paragraph>
          <Row
            gutter={[32, 32]}
            justify="center"
            style={{
              marginTop: "30px",
              maxWidth: "1000px",
              margin: "30px auto 0",
            }}
          >
            <Col xs={12} sm={8} md={6}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "15px",
                }}
                bodyStyle={{ padding: "20px" }}
              >
                <Statistic
                  title={
                    <span style={{ color: "white", fontSize: "1rem" }}>
                      Sản phẩm
                    </span>
                  }
                  value={1000}
                  suffix="+"
                  valueStyle={{ color: "white", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "15px",
                }}
                bodyStyle={{ padding: "20px" }}
              >
                <Statistic
                  title={
                    <span style={{ color: "white", fontSize: "1rem" }}>
                      Khách hàng
                    </span>
                  }
                  value={50}
                  suffix="K+"
                  valueStyle={{ color: "white", fontWeight: "bold" }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={8} md={6}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "15px",
                }}
                bodyStyle={{ padding: "20px" }}
              >
                <Statistic
                  title={
                    <span style={{ color: "white", fontSize: "1rem" }}>
                      Đánh giá
                    </span>
                  }
                  value={4.8}
                  suffix="/5"
                  valueStyle={{ color: "white", fontWeight: "bold" }}
                  prefix={<StarOutlined />}
                />
              </Card>
            </Col>
          </Row>
          <Button
            type="primary"
            size="large"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate("/products")}
            style={{
              height: "50px",
              fontSize: "1.2rem",
              borderRadius: "25px",
              padding: "0 40px",
              background: "white",
              color: "#667eea",
              border: "none",
              fontWeight: "bold",
              boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
              marginTop: "20px",
            }}
          >
            Mua Sắm Ngay
          </Button>
        </Space>
      </div>

      {/* Categories Section */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "-50px auto 0",
          padding: "0 20px 60px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Card
          style={{
            borderRadius: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
          bodyStyle={{ padding: "40px" }}
        >
          <Title
            level={2}
            style={{
              textAlign: "center",
              color: "#1890ff",
              marginBottom: "40px",
            }}
          >
            <FireOutlined style={{ marginRight: "10px" }} />
            Danh Mục Sản Phẩm
          </Title>
          <Row gutter={[24, 24]}>
            {categories.map((category, index) => (
              <Col xs={12} sm={6} md={6} key={index}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "15px",
                    background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}30 100%)`,
                    border: `2px solid ${category.color}`,
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                  bodyStyle={{ padding: "30px 20px" }}
                  onClick={() => navigate("/products")}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      color: category.color,
                      marginBottom: "15px",
                    }}
                  >
                    {category.icon}
                  </div>
                  <Title
                    level={4}
                    style={{
                      color: category.color,
                      margin: 0,
                      fontWeight: "bold",
                    }}
                  >
                    {category.name}
                  </Title>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>
      </div>

      {/* Featured Products */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Products Section - Full Width */}
        <div style={{ marginBottom: "30px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <Title
                level={2}
                style={{
                  color: "#1890ff",
                  fontSize: "2rem",
                  marginBottom: "5px",
                }}
              >
                <RocketOutlined style={{ marginRight: "10px" }} />
                Danh Sách Sản Phẩm
              </Title>
              <Text style={{ fontSize: "1rem", color: "#666" }}>
                {featuredProducts.length} sản phẩm có sẵn
              </Text>
            </div>
            <Button
              type="primary"
              onClick={fetchFeaturedProducts}
              loading={loading}
              size="large"
            >
              Làm mới
            </Button>
          </div>
        </div>

        <Row gutter={[24, 24]}>
          {featuredProducts.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                loading={loading}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{
                  borderRadius: "15px",
                  overflow: "hidden",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                  border: "1px solid #f0f0f0",
                  height: "100%",
                  cursor: "pointer",
                }}
                bodyStyle={{ padding: "20px" }}
                cover={
                  <div
                    style={{
                      height: "220px",
                      overflow: "hidden",
                      position: "relative",
                      background: "#f5f5f5",
                    }}
                  >
                    <img
                      alt={product.name}
                      src={
                        product.image ||
                        "https://via.placeholder.com/300x220?text=Product"
                      }
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Tag
                      icon={<FireOutlined />}
                      color="red"
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                      }}
                    >
                      HOT
                    </Tag>
                  </div>
                }
              >
                <Card.Meta
                  title={
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#333",
                        marginBottom: "10px",
                      }}
                    >
                      {product.name}
                    </div>
                  }
                  description={
                    <div>
                      <Tag color="blue" style={{ marginBottom: "10px" }}>
                        {product.category}
                      </Tag>
                      <div
                        style={{
                          fontSize: "1.3rem",
                          fontWeight: "bold",
                          color: "#52c41a",
                          marginTop: "10px",
                        }}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </div>
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        loading={addingToCart[product.id]}
                        style={{
                          width: "100%",
                          marginTop: "15px",
                          borderRadius: "8px",
                          height: "40px",
                          fontWeight: "bold",
                        }}
                        onClick={(e) => handleAddToCart(product.id, e)}
                      >
                        Thêm vào giỏ
                      </Button>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {featuredProducts.length === 0 && !loading && (
          <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
            Không có sản phẩm nào
          </div>
        )}
      </div>

      {/* Features Section */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "60px 20px",
          marginTop: "60px",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Title
            level={2}
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "50px",
              fontSize: "2.5rem",
            }}
          >
            <TrophyOutlined style={{ marginRight: "10px" }} />
            Tại Sao Chọn Chúng Tôi?
          </Title>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={12} md={6}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                }}
                bodyStyle={{ padding: "30px" }}
              >
                <RocketOutlined
                  style={{
                    fontSize: "3rem",
                    color: "white",
                    marginBottom: "20px",
                  }}
                />
                <Title
                  level={4}
                  style={{ color: "white", marginBottom: "10px" }}
                >
                  Giao Hàng Nhanh
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                  Giao hàng trong 24h
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                }}
                bodyStyle={{ padding: "30px" }}
              >
                <HeartOutlined
                  style={{
                    fontSize: "3rem",
                    color: "white",
                    marginBottom: "20px",
                  }}
                />
                <Title
                  level={4}
                  style={{ color: "white", marginBottom: "10px" }}
                >
                  Chất Lượng Đảm Bảo
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                  Sản phẩm chính hãng 100%
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                }}
                bodyStyle={{ padding: "30px" }}
              >
                <GiftOutlined
                  style={{
                    fontSize: "3rem",
                    color: "white",
                    marginBottom: "20px",
                  }}
                />
                <Title
                  level={4}
                  style={{ color: "white", marginBottom: "10px" }}
                >
                  Ưu Đãi Hấp Dẫn
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                  Giảm giá đến 50%
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "15px",
                  textAlign: "center",
                  height: "100%",
                }}
                bodyStyle={{ padding: "30px" }}
              >
                <TrophyOutlined
                  style={{
                    fontSize: "3rem",
                    color: "white",
                    marginBottom: "20px",
                  }}
                />
                <Title
                  level={4}
                  style={{ color: "white", marginBottom: "10px" }}
                >
                  Hỗ Trợ 24/7
                </Title>
                <Text style={{ color: "rgba(255,255,255,0.9)" }}>
                  Tư vấn nhiệt tình
                </Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
