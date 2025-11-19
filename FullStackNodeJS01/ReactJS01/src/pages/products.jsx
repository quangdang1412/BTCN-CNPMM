import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
} from "antd";
import { getProductsApi, createProductApi } from "../util/api";
import { AuthContext } from "../components/context/auth.context";
import InfiniteScroll from "react-infinite-scroll-component";

const { Option } = Select;
const { TextArea } = Input;

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(1);
  const [category, setCategory] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { auth } = useContext(AuthContext);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchProducts = async (
    currentPage,
    currentCategory,
    append = false
  ) => {
    setLoading(true);
    try {
      const res = await getProductsApi(currentCategory, currentPage, 10);
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
  };

  useEffect(() => {
    pageRef.current = 1;
    fetchProducts(1, category, false);
  }, [category]);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/login");
    }
  }, [auth.isAuthenticated, navigate]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      fetchProducts(nextPage, category, true);
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
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
        message.success("Product created successfully");
        setIsModalVisible(false);
        form.resetFields();
        fetchProducts(1, category, false);
      }
    } catch {
      message.error("Failed to create product");
    }
  };

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col>
          <Select
            placeholder="Select category"
            style={{ width: 200 }}
            onChange={handleCategoryChange}
            allowClear
          >
            <Option value="electronics">Electronics</Option>
            <Option value="clothing">Clothing</Option>
            <Option value="books">Books</Option>
            <Option value="home">Home</Option>
          </Select>
        </Col>
        {auth.user.role === "Admin" && (
          <Col>
            <Button type="primary" onClick={showModal}>
              Add Product
            </Button>
          </Col>
        )}
      </Row>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more products</p>}
      >
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image || "https://via.placeholder.com/300"}
                  />
                }
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <>
                      <p>{product.description}</p>
                      <p>
                        <strong>Price:</strong> ${product.price}
                      </p>
                      <p>
                        <strong>Category:</strong> {product.category}
                      </p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
      <Modal
        title="Add New Product"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateProduct}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <InputNumber min={0} step={0.01} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select placeholder="Select category">
              <Option value="electronics">Electronics</Option>
              <Option value="clothing">Clothing</Option>
              <Option value="books">Books</Option>
              <Option value="home">Home</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input placeholder="Optional image URL" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Product
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsPage;
