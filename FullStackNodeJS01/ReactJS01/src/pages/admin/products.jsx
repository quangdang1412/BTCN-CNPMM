import { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Space,
  Image,
  Tag,
} from "antd";
import {
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  getProductsApi,
  uploadImageApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
} from "../../util/api";

const { Option } = Select;

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProductsApi("", 1, 100);
      if (res && res.products) {
        setProducts(res.products);
      }
    } catch (error) {
      message.error("Lỗi khi tải sản phẩm");
    }
    setLoading(false);
  };

  const handleCreateProduct = async (values) => {
    setSubmitting(true);
    try {
      let imageUrl = editingProduct?.image || null;

      // Upload ảnh mới nếu có
      if (fileList.length > 0 && fileList[0].originFileObj) {
        message.loading("Đang upload ảnh...", 0);
        const uploadRes = await uploadImageApi(fileList[0].originFileObj);
        message.destroy();
        if (uploadRes && uploadRes.url) {
          imageUrl = uploadRes.url;
        }
      }

      const productData = {
        name: values.name,
        price: values.price,
        category: values.category,
        description: values.description || "",
        image: imageUrl,
      };

      if (editingProduct) {
        // Update existing product
        const updatedProduct = await updateProductApi(
          editingProduct.id,
          productData
        );
        message.success("Cập nhật sản phẩm thành công!");

        // Update local state immediately
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p.id === editingProduct.id ? { ...p, ...updatedProduct } : p
          )
        );
      } else {
        // Create new product
        const newProduct = await createProductApi(productData);
        message.success("Tạo sản phẩm thành công!");

        // Add to local state immediately
        setProducts((prevProducts) => [newProduct, ...prevProducts]);
      }

      setModalVisible(false);
      setEditingProduct(null);
      form.resetFields();
      setFileList([]);

      // Refresh from server to ensure sync
      setTimeout(() => {
        fetchProducts();
      }, 500);
    } catch (error) {
      message.error(
        `Lỗi khi ${editingProduct ? "cập nhật" : "tạo"} sản phẩm: ${
          error.message || "Unknown error"
        }`
      );
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image, record) => (
        <Image
          width={60}
          height={60}
          src={image || "https://via.placeholder.com/60"}
          alt={record.name}
          style={{ objectFit: "cover", borderRadius: "8px" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(price),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Hành động",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEditingProduct(record);
    form.setFieldsValue({
      name: record.name,
      price: record.price,
      category: record.category,
      description: record.description,
    });
    if (record.image) {
      setFileList([
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: record.image,
        },
      ]);
    }
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteProductApi(id);
          message.success("Xóa sản phẩm thành công!");

          // Update local state immediately
          setProducts((prevProducts) =>
            prevProducts.filter((p) => p.id !== id)
          );

          // Refresh from server to ensure sync
          setTimeout(() => {
            fetchProducts();
          }, 500);
        } catch (error) {
          message.error("Lỗi khi xóa sản phẩm: " + error.message);
        }
      },
    });
  };

  const uploadProps = {
    fileList,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("Chỉ được upload file ảnh!");
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("Kích thước ảnh phải nhỏ hơn 5MB!");
        return false;
      }
      // Tạo file object với cấu trúc đúng của Ant Design
      setFileList([
        {
          uid: file.uid || `-${Date.now()}`,
          name: file.name,
          status: "done",
          originFileObj: file,
        },
      ]);
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
  };

  return (
    <div style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Card
          title={
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>
              Quản Lý Sản Phẩm
            </h1>
          }
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
              size="large"
            >
              Thêm Sản Phẩm
            </Button>
          }
        >
          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} sản phẩm`,
            }}
          />
        </Card>

        <Modal
          title={editingProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingProduct(null);
            form.resetFields();
            setFileList([]);
          }}
          footer={null}
          width={600}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateProduct}>
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                { required: true, message: "Vui lòng nhập tên sản phẩm" },
              ]}
            >
              <Input placeholder="Nhập tên sản phẩm" />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                placeholder="Nhập giá sản phẩm"
              />
            </Form.Item>

            <Form.Item
              label="Danh mục"
              name="category"
              rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
            >
              <Select placeholder="Chọn danh mục">
                <Option value="electronics">Điện tử</Option>
                <Option value="clothing">Quần áo</Option>
                <Option value="books">Sách</Option>
                <Option value="home">Đồ gia dụng</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={4} placeholder="Nhập mô tả sản phẩm" />
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <Upload {...uploadProps} listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                <Button
                  onClick={() => {
                    setModalVisible(false);
                    setEditingProduct(null);
                    form.resetFields();
                    setFileList([]);
                  }}
                  disabled={submitting}
                >
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  {editingProduct ? "Cập Nhật" : "Tạo Sản Phẩm"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default AdminProductsPage;
