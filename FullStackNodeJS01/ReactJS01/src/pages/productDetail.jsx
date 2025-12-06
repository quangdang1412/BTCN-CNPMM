import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  Row,
  Col,
  Button,
  InputNumber,
  Typography,
  Divider,
  Space,
  Rate,
  Spin,
  message,
  Tabs,
  Empty,
  Avatar,
  Input,
  Form,
} from "antd";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  EyeOutlined,
  MessageOutlined,
  UserOutlined,
  StarOutlined,
} from "@ant-design/icons";
import {
  getProductDetailsApi,
  getSimilarProductsApi,
  getProductCommentsApi,
  addToFavoritesApi,
  removeFromFavoritesApi,
  addCommentApi,
  addToCartGraphQL,
} from "../util/api";
import { AuthContext } from "../components/context/auth.context";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [stats, setStats] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProductDetails();
    fetchSimilarProducts();
    fetchComments();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const res = await getProductDetailsApi(productId);
      if (res && res.success) {
        setProduct(res.product);
        setStats(res.stats);
        setIsFavorited(res.stats.isFavorited);
      }
    } catch (error) {
      message.error("Không thể tải thông tin sản phẩm");
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const res = await getSimilarProductsApi(productId, 6);
      if (res && res.success) {
        setSimilarProducts(res.products);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getProductCommentsApi(productId, 1, 10);
      if (res && res.success) {
        setComments(res.comments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!auth.isAuthenticated) {
      message.warning("Vui lòng đăng nhập để thêm yêu thích");
      navigate("/login");
      return;
    }

    try {
      if (isFavorited) {
        await removeFromFavoritesApi(productId);
        message.success("Đã xóa khỏi yêu thích");
        setIsFavorited(false);
        setStats((prev) => ({ ...prev, favorites: prev.favorites - 1 }));
      } else {
        await addToFavoritesApi(productId);
        message.success("Đã thêm vào yêu thích");
        setIsFavorited(true);
        setStats((prev) => ({ ...prev, favorites: prev.favorites + 1 }));
      }
    } catch (error) {
      message.error("Có lỗi xảy ra");
      console.error("Error toggling favorite:", error);
    }
  };

  const handleAddToCart = async () => {
    if (!auth.isAuthenticated) {
      message.warning("Vui lòng đăng nhập để thêm vào giỏ hàng");
      navigate("/login");
      return;
    }

    try {
      await addToCartGraphQL(productId, quantity);
      message.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      message.error("Không thể thêm vào giỏ hàng");
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddComment = async (values) => {
    if (!auth.isAuthenticated) {
      message.warning("Vui lòng đăng nhập để bình luận");
      navigate("/login");
      return;
    }

    try {
      setCommentLoading(true);
      await addCommentApi(productId, values.content, values.rating);
      message.success("Đã thêm bình luận");
      form.resetFields();
      fetchComments();
      fetchProductDetails(); // Refresh to update comment count and rating
    } catch (error) {
      message.error("Không thể thêm bình luận");
      console.error("Error adding comment:", error);
    } finally {
      setCommentLoading(false);
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

  if (!product) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <Empty description="Không tìm thấy sản phẩm" />
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
        {/* Product Main Info */}
        <Row gutter={[40, 40]}>
          <Col xs={24} md={10}>
            <img
              src={
                product.image ||
                "https://via.placeholder.com/500?text=Không+có+hình+ảnh"
              }
              alt={product.name}
              style={{
                width: "100%",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              }}
            />
          </Col>
          <Col xs={24} md={14}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Title level={2} style={{ marginBottom: "10px" }}>
                  {product.name}
                </Title>
                <Space size="large">
                  <Space>
                    <Rate disabled value={parseFloat(stats.averageRating)} />
                    <Text>
                      {stats.averageRating} ({stats.ratingCount} đánh giá)
                    </Text>
                  </Space>
                  <Space>
                    <EyeOutlined />
                    <Text>{stats.views} lượt xem</Text>
                  </Space>
                  <Space>
                    <MessageOutlined />
                    <Text>{stats.comments} bình luận</Text>
                  </Space>
                </Space>
              </div>

              <Divider />

              <div>
                <Title level={3} style={{ color: "#52c41a", margin: 0 }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)}
                </Title>
              </div>

              <div>
                <Text strong>Danh mục: </Text>
                <Text>{product.category}</Text>
              </div>

              <div>
                <Text strong>Mô tả:</Text>
                <Paragraph style={{ marginTop: "10px" }}>
                  {product.description}
                </Paragraph>
              </div>

              <div>
                <Space>
                  <Text strong>Số lượng:</Text>
                  <InputNumber
                    min={1}
                    value={quantity}
                    onChange={setQuantity}
                    style={{ width: "100px" }}
                  />
                </Space>
              </div>

              <Space size="large">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  style={{ width: "200px" }}
                >
                  Thêm vào giỏ
                </Button>
                <Button
                  size="large"
                  icon={isFavorited ? <HeartFilled /> : <HeartOutlined />}
                  onClick={handleToggleFavorite}
                  style={{
                    color: isFavorited ? "#ff4d4f" : undefined,
                    borderColor: isFavorited ? "#ff4d4f" : undefined,
                  }}
                >
                  {isFavorited ? "Đã yêu thích" : "Yêu thích"} (
                  {stats.favorites})
                </Button>
              </Space>

              <div
                style={{
                  padding: "15px",
                  background: "#f0f2f5",
                  borderRadius: "10px",
                }}
              >
                <Space>
                  <UserOutlined />
                  <Text>
                    <Text strong>{stats.buyers}</Text> người đã mua sản phẩm này
                  </Text>
                </Space>
              </div>
            </Space>
          </Col>
        </Row>

        <Divider />

        {/* Tabs for Comments and Similar Products */}
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: "1",
              label: `Đánh giá (${stats.comments})`,
              children: (
                <div>
                  {/* Add Comment Form */}
                  {auth.isAuthenticated && (
                    <Card
                      style={{ marginBottom: "20px" }}
                      title="Viết đánh giá của bạn"
                    >
                      <Form
                        form={form}
                        onFinish={handleAddComment}
                        layout="vertical"
                      >
                        <Form.Item
                          name="rating"
                          label="Đánh giá"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn số sao",
                            },
                          ]}
                        >
                          <Rate />
                        </Form.Item>
                        <Form.Item
                          name="content"
                          label="Nội dung"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập nội dung đánh giá",
                            },
                          ]}
                        >
                          <TextArea rows={4} placeholder="Nhập đánh giá..." />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={commentLoading}
                          >
                            Gửi đánh giá
                          </Button>
                        </Form.Item>
                      </Form>
                    </Card>
                  )}

                  {/* Comments List */}
                  <Space
                    direction="vertical"
                    size="middle"
                    style={{ width: "100%" }}
                  >
                    {comments.length === 0 ? (
                      <Empty description="Chưa có đánh giá nào" />
                    ) : (
                      comments.map((comment) => (
                        <Card key={comment.id}>
                          <Space direction="vertical" style={{ width: "100%" }}>
                            <Space>
                              <Avatar icon={<UserOutlined />} />
                              <div>
                                <Text strong>{comment.user.name}</Text>
                                <br />
                                <Text
                                  type="secondary"
                                  style={{ fontSize: "12px" }}
                                >
                                  {new Date(comment.createdAt).toLocaleString(
                                    "vi-VN"
                                  )}
                                </Text>
                              </div>
                            </Space>
                            {comment.rating && (
                              <Rate disabled value={comment.rating} />
                            )}
                            <Paragraph>{comment.content}</Paragraph>
                          </Space>
                        </Card>
                      ))
                    )}
                  </Space>
                </div>
              ),
            },
            {
              key: "2",
              label: "Sản phẩm tương tự",
              children: (
                <Row gutter={[16, 16]}>
                  {similarProducts.length === 0 ? (
                    <Col span={24}>
                      <Empty description="Không có sản phẩm tương tự" />
                    </Col>
                  ) : (
                    similarProducts.map((item) => (
                      <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                        <Card
                          hoverable
                          cover={
                            <img
                              alt={item.name}
                              src={
                                item.image || "https://via.placeholder.com/200"
                              }
                              style={{ height: "200px", objectFit: "cover" }}
                            />
                          }
                          onClick={() => navigate(`/product/${item.id}`)}
                        >
                          <Card.Meta
                            title={item.name}
                            description={
                              <div>
                                <Text strong style={{ color: "#52c41a" }}>
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(item.price)}
                                </Text>
                              </div>
                            }
                          />
                        </Card>
                      </Col>
                    ))
                  )}
                </Row>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
