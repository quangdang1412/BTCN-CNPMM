import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Card,
  List,
  InputNumber,
  Checkbox,
  Modal,
  Form,
  Input,
  message,
  Space,
  Button,
  Tag,
  Divider,
  Empty,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import {
  getCartGraphQL,
  updateCartItemGraphQL,
  removeFromCartGraphQL,
  clearCartGraphQL,
  toggleSelectCartItemGraphQL,
  selectMultipleCartItemsGraphQL,
  checkoutSelectedItemsGraphQL,
} from "../util/api";

const ShoppingCartGraphQL = forwardRef((props, ref) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await getCartGraphQL();
      if (res.data && res.data.data) {
        setCart(res.data.data.cart);
      }
    } catch (error) {
      console.error("Lỗi khi tải giỏ hàng:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Expose fetchCart method via ref
  useImperativeHandle(ref, () => ({
    fetchCart,
  }));

  const handleUpdateQuantity = async (cartId, quantity) => {
    if (quantity < 1) {
      message.warning("Số lượng phải lớn hơn 0");
      return;
    }
    try {
      await updateCartItemGraphQL(cartId, quantity);
      message.success("Đã cập nhật số lượng!");
      fetchCart();
    } catch (error) {
      message.error("Lỗi: " + error.message);
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await removeFromCartGraphQL(cartId);
      message.success("Đã xóa sản phẩm!");
      fetchCart();
    } catch (error) {
      message.error("Lỗi: " + error.message);
    }
  };

  const handleClearCart = async () => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa toàn bộ giỏ hàng?",
      onOk: async () => {
        try {
          await clearCartGraphQL();
          message.success("Đã xóa toàn bộ giỏ hàng!");
          fetchCart();
        } catch (error) {
          message.error("Lỗi: " + error.message);
        }
      },
    });
  };

  const handleToggleSelect = async (cartId, selected) => {
    try {
      await toggleSelectCartItemGraphQL(cartId, selected);
      fetchCart();
    } catch (error) {
      message.error("Lỗi: " + error.message);
    }
  };

  const handleSelectAll = async (selected) => {
    try {
      const cartIds = cart.items.map((item) => item.id);
      await selectMultipleCartItemsGraphQL(cartIds, selected);
      message.success(selected ? "Đã chọn tất cả!" : "Đã bỏ chọn tất cả!");
      fetchCart();
    } catch (error) {
      message.error("Lỗi: " + error.message);
    }
  };

  const handleCheckout = async (values) => {
    try {
      const res = await checkoutSelectedItemsGraphQL(
        values.shippingAddress,
        values.phoneNumber,
        values.notes
      );
      if (res.data && res.data.data) {
        message.success("Đặt hàng thành công!");
        setCheckoutModalVisible(false);
        form.resetFields();
        fetchCart();
      }
    } catch (error) {
      message.error("Lỗi khi đặt hàng: " + error.message);
    }
  };

  const selectedItems = cart?.items?.filter((item) => item.selected) || [];
  const hasSelectedItems = selectedItems.length > 0;
  const allSelected =
    cart?.items?.length > 0 && cart?.items?.every((item) => item.selected);

  return (
    <div>
      <Card
        title={
          <Space>
            <ShoppingCartOutlined
              style={{ fontSize: "20px", color: "#1890ff" }}
            />
            <span style={{ fontWeight: "bold" }}>Giỏ Hàng</span>
            <Tag color="blue">{cart?.totalItems || 0} sản phẩm</Tag>
          </Space>
        }
        extra={
          <Space>
            <Button size="small" onClick={fetchCart} loading={loading}>
              Làm mới
            </Button>
            <Button
              size="small"
              danger
              icon={<ClearOutlined />}
              onClick={handleClearCart}
              disabled={!cart?.items?.length}
            >
              Xóa
            </Button>
          </Space>
        }
        style={{
          height: "100%",
          maxHeight: "calc(100vh - 100px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
        bodyStyle={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        {/* Select All */}
        {cart?.items?.length > 0 && (
          <div style={{ marginBottom: "12px" }}>
            <Checkbox
              checked={allSelected}
              indeterminate={selectedItems.length > 0 && !allSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
            >
              <strong>Chọn tất cả</strong>
            </Checkbox>
          </div>
        )}

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "16px" }}>
          {!cart?.items?.length ? (
            <Empty description="Giỏ hàng trống" />
          ) : (
            <List
              loading={loading}
              dataSource={cart.items}
              renderItem={(item) => (
                <Card
                  size="small"
                  style={{
                    marginBottom: "12px",
                    background: item.selected ? "#f6ffed" : "white",
                    border: item.selected
                      ? "1px solid #52c41a"
                      : "1px solid #f0f0f0",
                  }}
                >
                  <Space
                    direction="vertical"
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Space
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <Checkbox
                        checked={item.selected}
                        onChange={(e) =>
                          handleToggleSelect(item.id, e.target.checked)
                        }
                      >
                        <strong>{item.Product.name}</strong>
                      </Checkbox>
                      {item.selected && (
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                          Đã chọn
                        </Tag>
                      )}
                    </Space>

                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {item.Product.category}
                    </div>

                    <Space
                      style={{ width: "100%", justifyContent: "space-between" }}
                    >
                      <div>
                        <div
                          style={{
                            color: "#52c41a",
                            fontWeight: "bold",
                            fontSize: "14px",
                          }}
                        >
                          ${item.Product.price}
                        </div>
                        <div style={{ fontSize: "12px", color: "#999" }}>
                          Tổng: ${item.subtotal.toFixed(2)}
                        </div>
                      </div>

                      <Space>
                        <InputNumber
                          min={1}
                          size="small"
                          value={item.quantity}
                          onChange={(value) =>
                            handleUpdateQuantity(item.id, value)
                          }
                          style={{ width: "70px" }}
                        />
                        <Button
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemove(item.id)}
                        />
                      </Space>
                    </Space>
                  </Space>
                </Card>
              )}
            />
          )}
        </div>

        {/* Summary */}
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "16px",
            borderRadius: "8px",
            color: "white",
          }}
        >
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <DollarOutlined style={{ fontSize: "32px" }} />
            </div>

            <Divider
              style={{ borderColor: "rgba(255,255,255,0.3)", margin: "8px 0" }}
            />

            <div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                Tổng giá trị:
              </div>
              <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                ${cart?.totalAmount?.toFixed(2) || "0.00"}
              </div>
            </div>

            {hasSelectedItems && (
              <>
                <Divider
                  style={{
                    borderColor: "rgba(255,255,255,0.3)",
                    margin: "8px 0",
                  }}
                />
                <div>
                  <div style={{ fontSize: "12px", opacity: 0.9 }}>
                    Đã chọn ({selectedItems.length} sản phẩm):
                  </div>
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#52c41a",
                      textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    ${cart?.selectedTotalAmount?.toFixed(2) || "0.00"}
                  </div>
                </div>
              </>
            )}

            <Button
              type="primary"
              size="large"
              block
              disabled={!hasSelectedItems}
              onClick={() => setCheckoutModalVisible(true)}
              style={{
                marginTop: "8px",
                fontWeight: "bold",
                background: hasSelectedItems ? "#52c41a" : undefined,
                borderColor: hasSelectedItems ? "#52c41a" : undefined,
              }}
            >
              Thanh Toán
            </Button>

            {!hasSelectedItems && (
              <div
                style={{
                  fontSize: "11px",
                  textAlign: "center",
                  opacity: 0.8,
                }}
              >
                Chọn sản phẩm để thanh toán
              </div>
            )}
          </Space>
        </div>
      </Card>

      {/* Checkout Modal */}
      <Modal
        title="Thông Tin Đặt Hàng"
        open={checkoutModalVisible}
        onCancel={() => setCheckoutModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleCheckout}>
          <Form.Item
            label="Địa chỉ giao hàng"
            name="shippingAddress"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ giao hàng" },
            ]}
          >
            <Input.TextArea rows={3} placeholder="Nhập địa chỉ đầy đủ" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input placeholder="0901234567" />
          </Form.Item>

          <Form.Item label="Ghi chú" name="notes">
            <Input.TextArea
              rows={2}
              placeholder="Ghi chú cho đơn hàng (không bắt buộc)"
            />
          </Form.Item>

          <div
            style={{
              background: "#f0f2f5",
              padding: "12px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span>Số sản phẩm:</span>
              <strong>{selectedItems.length}</strong>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "18px",
                fontWeight: "bold",
                color: "#52c41a",
              }}
            >
              <span>Tổng tiền:</span>
              <span>${cart?.selectedTotalAmount?.toFixed(2) || "0.00"}</span>
            </div>
          </div>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setCheckoutModalVisible(false)}>
                Hủy
              </Button>
              <Button type="primary" htmlType="submit">
                Xác Nhận Đặt Hàng
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

ShoppingCartGraphQL.displayName = "ShoppingCartGraphQL";

export default ShoppingCartGraphQL;
