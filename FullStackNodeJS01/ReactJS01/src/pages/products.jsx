import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Select,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Typography,
  Space,
  Divider,
} from "antd";
import {
  ShoppingOutlined,
  SearchOutlined,
  PlusOutlined,
  DollarOutlined,
  TagOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { getProductsApi, createProductApi } from "../util/api";
import { AuthContext } from "../components/context/auth.context";
import InfiniteScroll from "react-infinite-scroll-component";

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || ""
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { auth } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  const fetchProducts = useCallback(
    async (
      currentPage,
      currentCategory,
      currentSearch,
      currentMinPrice,
      currentMaxPrice,
      append = false
    ) => {
      setLoading(true);
      try {
        const res = await getProductsApi(
          currentCategory,
          currentPage,
          10,
          currentSearch,
          currentMinPrice,
          currentMaxPrice
        );
        if (res && res.products) {
          if (append) {
            setProducts((prev) => [...prev, ...res.products]);
          } else {
            setProducts(res.products);
          }
          setHasMore(currentPage < res.totalPages);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    pageRef.current = 1;

    // Update URL params
    const params = {};
    if (category) params.category = category;
    if (search) params.search = search;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    setSearchParams(params);

    fetchProducts(1, category, search, minPrice, maxPrice, false);
  }, [category, search, minPrice, maxPrice, fetchProducts, setSearchParams]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      fetchProducts(nextPage, category, search, minPrice, maxPrice, true);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Debounce search - wait 500ms after user stops typing
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 500);
  };

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCreateProduct = async (values) => {
    try {
      const res = await createProductApi(values);
      if (res) {
        message.success("Sản phẩm đã được tạo thành công!");
        setIsModalVisible(false);
        form.resetFields();
        fetchProducts(1, category, search, minPrice, maxPrice, false);
      }
    } catch {
      message.error("Không thể tạo sản phẩm!");
    }
  };

  if (!auth.isAuthenticated) {
    return null;
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
        {/* Header */}
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
            <ShoppingOutlined style={{ marginRight: "15px" }} />
            Danh Sách Sản Phẩm
          </Title>
          <Text style={{ fontSize: "1.1rem", color: "#666" }}>
            Khám phá và quản lý các sản phẩm của chúng tôi
          </Text>
        </div>

        {/* Filters and Search */}
        <div
          style={{
            background: "#f8f9fa",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
            border: "1px solid #e9ecef",
          }}
        >
          <Row gutter={[24, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <SearchOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong>Tìm kiếm sản phẩm</Text>
              </div>
              <Input
                placeholder="Nhập tên sản phẩm..."
                value={searchInput}
                onChange={handleSearchChange}
                allowClear
                onClear={() => {
                  setSearchInput("");
                  setSearch("");
                }}
                style={{
                  borderRadius: "10px",
                  border: "2px solid #d9d9d9",
                  transition: "all 0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#1890ff")}
                onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
              />
            </Col>
            <Col xs={24} sm={8} md={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <FilterOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong>Lọc theo danh mục</Text>
              </div>
              <Select
                placeholder="Chọn danh mục"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "2px solid #d9d9d9",
                }}
                value={category || undefined}
                onChange={handleCategoryChange}
                allowClear
              >
                <Option value="electronics">Điện tử</Option>
                <Option value="clothing">Quần áo</Option>
                <Option value="books">Sách</Option>
                <Option value="home">Đồ gia dụng</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} md={5}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <DollarOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong>Giá từ</Text>
              </div>
              <InputNumber
                placeholder="Giá tối thiểu"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "2px solid #d9d9d9",
                }}
                min={0}
                value={minPrice}
                onChange={handleMinPriceChange}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫"
                }
                parser={(value) => value.replace(/₫|\s|(,*)/g, "")}
              />
            </Col>
            <Col xs={24} sm={8} md={5}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <DollarOutlined
                  style={{ color: "#1890ff", marginRight: "8px" }}
                />
                <Text strong>Giá đến</Text>
              </div>
              <InputNumber
                placeholder="Giá tối đa"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  border: "2px solid #d9d9d9",
                }}
                min={0}
                value={maxPrice}
                onChange={handleMaxPriceChange}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫"
                }
                parser={(value) => value.replace(/₫|\s|(,*)/g, "")}
              />
            </Col>
            {auth.user.role === "Admin" && (
              <Col xs={24} sm={4} md={4}>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={showModal}
                  size="large"
                  style={{
                    borderRadius: "10px",
                    height: "48px",
                    width: "100%",
                    fontWeight: "bold",
                    boxShadow: "0 4px 12px rgba(24, 144, 255, 0.3)",
                  }}
                >
                  Thêm sản phẩm
                </Button>
              </Col>
            )}
          </Row>
        </div>

        {/* Products Grid */}
        <InfiniteScroll
          dataLength={products.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div style={{ fontSize: "1.2rem", color: "#1890ff" }}>
                Đang tải thêm sản phẩm...
              </div>
            </div>
          }
          endMessage={
            <Divider style={{ margin: "40px 0", borderColor: "#d9d9d9" }}>
              <Text style={{ color: "#666", fontSize: "1.1rem" }}>
                Không còn sản phẩm nào khác
              </Text>
            </Divider>
          }
        >
          <Row gutter={[32, 32]}>
            {products.map((product) => (
              <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
                    transition: "all 0.3s ease",
                    border: "1px solid #f0f0f0",
                  }}
                  bodyStyle={{
                    padding: "20px",
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
                  }}
                  cover={
                    <div
                      style={{
                        height: "220px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        alt={product.name}
                        src={
                          product.image ||
                          "https://via.placeholder.com/300x220?text=Không+có+hình+ảnh"
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.transform = "scale(1.1)")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "10px",
                          right: "10px",
                          background: "rgba(24, 144, 255, 0.9)",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "20px",
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                        }}
                      >
                        {product.category}
                      </div>
                    </div>
                  }
                >
                  <Card.Meta
                    title={
                      <div
                        style={{
                          fontSize: "1.2rem",
                          fontWeight: "bold",
                          color: "#1890ff",
                          marginBottom: "10px",
                          lineHeight: "1.4",
                        }}
                      >
                        {product.name}
                      </div>
                    }
                    description={
                      <div>
                        <Text
                          style={{
                            color: "#666",
                            fontSize: "0.95rem",
                            lineHeight: "1.5",
                            marginBottom: "15px",
                            display: "block",
                          }}
                        >
                          {product.description.length > 80
                            ? `${product.description.substring(0, 80)}...`
                            : product.description}
                        </Text>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "15px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontSize: "1.3rem",
                              fontWeight: "bold",
                              color: "#52c41a",
                            }}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.price)}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: "#1890ff",
                              fontSize: "0.9rem",
                            }}
                          >
                            <TagOutlined style={{ marginRight: "5px" }} />
                            {product.category}
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>

        {/* Add Product Modal */}
        <Modal
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "1.5rem",
              }}
            >
              <PlusOutlined style={{ color: "#1890ff", marginRight: "10px" }} />
              Thêm Sản Phẩm Mới
            </div>
          }
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={700}
          centered
          bodyStyle={{
            borderRadius: "15px",
            padding: "30px",
          }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreateProduct}
            size="large"
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên sản phẩm!" },
                  ]}
                >
                  <Input placeholder="Nhập tên sản phẩm" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="category"
                  label="Danh mục"
                  rules={[
                    { required: true, message: "Vui lòng chọn danh mục!" },
                  ]}
                >
                  <Select placeholder="Chọn danh mục">
                    <Option value="electronics">Điện tử</Option>
                    <Option value="clothing">Quần áo</Option>
                    <Option value="books">Sách</Option>
                    <Option value="home">Đồ gia dụng</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="description"
              label="Mô tả"
              rules={[
                { required: true, message: "Vui lòng nhập mô tả sản phẩm!" },
              ]}
            >
              <TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Giá"
                  rules={[
                    { required: true, message: "Vui lòng nhập giá sản phẩm!" },
                  ]}
                >
                  <InputNumber
                    min={0}
                    step={1000}
                    style={{ width: "100%" }}
                    placeholder="Nhập giá"
                    formatter={(value) =>
                      `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ₫"
                    }
                    parser={(value) => value.replace(/₫|\s|(,*)/g, "")}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="image" label="URL hình ảnh">
                  <Input placeholder="Nhập URL hình ảnh (tùy chọn)" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item style={{ textAlign: "right", marginBottom: 0 }}>
              <Space>
                <Button onClick={handleCancel} size="large">
                  Hủy
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<PlusOutlined />}
                  style={{
                    borderRadius: "8px",
                    fontWeight: "bold",
                  }}
                >
                  Tạo sản phẩm
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProductsPage;
