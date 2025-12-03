import React, {
  useState,
  useEffect,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  message,
  Modal,
  Form,
  Input,
  Button,
  Space,
  Checkbox,
  Card,
  List,
  Image,
  InputNumber,
  Typography,
  Divider,
  Empty,
  Tag,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  DollarOutlined,
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

const { Title, Text } = Typography;

const CartGraphQLAdapter = forwardRef((props, ref) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchCart = useCallback(async () => {
    try {
      const res = await getCartGraphQL();
      if (res.data && res.data.data && res.data.cart) {
        const transformedItems = res.data.cart.items.map((item) => ({
          id: item.id.toString(),
          name: item.Product.name,
          price: item.Product.price,
          quantity: item.quantity,
          selected: item.selected || false,
          productId: item.productId,
          category: item.Product.category,
          subtotal: item.subtotal,
          image: item.Product.image || "/default-product.png",
        }));
        setCartItems(transformedItems);
      } else {
        ("❌ fetchCart: Không tìm thấy dữ liệu giỏ hàng trong response");
      }
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      message.error("Không thể tải giỏ hàng");
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    const loadCart = async () => {
      try {
        console.log("🚀 useEffect: Component mounted, loading cart...");
        const res = await getCartGraphQL();

        console.log("✅ useEffect: Cart data tìm thấy:", res.data.cart);

        const transformedItems = res.data.cart.items.map((item) => ({
          id: item.id.toString(),
          name: item.Product.name,
          price: item.Product.price,
          quantity: item.quantity,
          selected: item.selected || false,
          productId: item.productId,
          category: item.Product.category,
          subtotal: item.subtotal,
          image: item.Product.image || "/default-product.png",
        }));

        console.log("🔄 useEffect: Transformed items:", transformedItems);
        console.log("🔄 useEffect: Số lượng items:", transformedItems.length);
        setCartItems(transformedItems);
      } catch (error) {
        if (mounted) {
          console.error("❌ useEffect: Lỗi khi tải giỏ hàng:", error);
          console.error(
            "❌ useEffect: Error details:",
            error.response || error
          );
          message.error("Không thể tải giỏ hàng");
        }
      }
    };
    loadCart();
    return () => {
      console.log("🔚 useEffect: Component unmounting");
      mounted = false;
    };
  }, []);

  // Expose fetchCart via ref
  useImperativeHandle(ref, () => ({
    fetchCart,
  }));

  // Handle add item (from your library's UI)
  const handleAddItem = async () => {
    // This would be called if user uses the "Add" button in the library
    // But we'll handle adding from product list instead
    message.info("Vui lòng thêm sản phẩm từ danh sách sản phẩm");
  };

  // Handle edit/update quantity
  const handleEditItem = async (itemId, newQuantity) => {
    console.log("📝 handleEditItem called:", { itemId, newQuantity });
    try {
      await updateCartItemGraphQL(parseInt(itemId), newQuantity);
      message.success("Đã cập nhật số lượng!");
      fetchCart();
    } catch (error) {
      message.error("Lỗi khi cập nhật: " + error.message);
    }
  };

  // Handle delete item
  const handleDeleteItem = async (itemId) => {
    try {
      await removeFromCartGraphQL(parseInt(itemId));
      message.success("Đã xóa sản phẩm!");
      fetchCart();
    } catch (error) {
      message.error("Lỗi khi xóa: " + error.message);
    }
  };

  // Handle toggle select
  const handleToggleSelect = async (itemId) => {
    console.log("✅ handleToggleSelect called for itemId:", itemId);
    try {
      // Tìm item hiện tại để biết trạng thái selected
      const currentItem = cartItems.find(
        (item) => item.id === itemId.toString()
      );
      const newSelectedState = !currentItem?.selected;

      await toggleSelectCartItemGraphQL(parseInt(itemId), newSelectedState);
      fetchCart();
    } catch (error) {
      message.error("Lỗi: " + error.message);
    }
  };

  // Handle select all
  const handleSelectAll = async (selected) => {
    try {
      const cartIds = cartItems.map((item) => parseInt(item.id));
      await selectMultipleCartItemsGraphQL(cartIds, selected);
      message.success(selected ? "Đã chọn tất cả!" : "Đã bỏ chọn tất cả!");
      fetchCart();
    } catch (error) {
      message.error("Lỗi: " + error.message);
    }
  };

  // Handle checkout
  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    if (selectedItems.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán");
      return;
    }
    setCheckoutModalVisible(true);
  };

  const handleCheckoutSubmit = async (values) => {
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

  const handleClearAll = async () => {
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

  const selectedItems = cartItems.filter((item) => item.selected);
  const selectedTotalAmount = selectedItems.reduce(
    (sum, item) => sum + item.subtotal,
    0
  );

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <div
        style={{
          background: "#f5f6fa",
          borderRadius: "12px",
          padding: "24px",
          marginBottom: "32px",
        }}
      >
        <ShoppingCart
          cart={{
            items: cartItems.map((item) => ({
              id: item.id,
              quantity: item.quantity,
              selected: item.selected,
              subtotal: item.subtotal,
              Product: {
                id: item.productId,
                name: item.name,
                price: item.price,
                category: item.category,
                image: item.image,
                description: item.description || "",
              },
            })),
            totalItems: cartItems.length,
            totalAmount: cartItems.reduce(
              (sum, item) => sum + item.subtotal,
              0
            ),
            selectedTotalAmount: selectedTotalAmount,
          }}
          onUpdateQuantity={handleEditItem}
          onToggleSelect={handleToggleSelect}
          onRemoveItem={handleDeleteItem}
        />
      </div>

      {/* Checkout Button - Fixed at bottom when items selected */}
      {selectedItems.length > 0 && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            padding: "20px",
            boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <div>
              <div style={{ fontSize: "14px", opacity: 0.9 }}>
                Đã chọn {selectedItems.length} sản phẩm
              </div>
              <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                ${selectedTotalAmount.toFixed(2)}
              </div>
            </div>
            <Button
              type="primary"
              size="large"
              onClick={handleCheckout}
              style={{
                background: "white",
                color: "#667eea",
                border: "none",
                height: "56px",
                padding: "0 48px",
                fontSize: "18px",
                fontWeight: "bold",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              }}
              icon={<CheckCircleOutlined />}
            >
              Tiến Hành Thanh Toán
            </Button>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      <Modal
        title={
          <div
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#667eea",
              textAlign: "center",
              padding: "10px 0",
            }}
          >
            <DollarOutlined style={{ marginRight: "12px" }} />
            Thông Tin Đặt Hàng
          </div>
        }
        open={checkoutModalVisible}
        onCancel={() => setCheckoutModalVisible(false)}
        footer={null}
        width={600}
        centered
        style={{ top: 20 }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, #667eea15 0%, #764ba215 100%)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}
              >
                Số sản phẩm đã chọn
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#667eea",
                }}
              >
                {selectedItems.length} sản phẩm
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "4px" }}
              >
                Tổng thanh toán
              </div>
              <div
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  color: "#52c41a",
                }}
              >
                ${selectedTotalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        <Form form={form} layout="vertical" onFinish={handleCheckoutSubmit}>
          <Form.Item
            label={
              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                Địa chỉ giao hàng
              </span>
            }
            name="shippingAddress"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ giao hàng" },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder="Nhập địa chỉ đầy đủ (Số nhà, đường, phường, quận, thành phố)"
              style={{
                fontSize: "15px",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                Số điện thoại
              </span>
            }
            name="phoneNumber"
            rules={[
              { required: true, message: "Vui lòng nhập số điện thoại" },
              {
                pattern: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            ]}
          >
            <Input
              placeholder="0901234567"
              prefix="📱"
              style={{
                fontSize: "15px",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontSize: "16px", fontWeight: "600" }}>
                Ghi chú (Không bắt buộc)
              </span>
            }
            name="notes"
          >
            <Input.TextArea
              rows={2}
              placeholder="Ghi chú thêm cho đơn hàng..."
              style={{
                fontSize: "15px",
                borderRadius: "8px",
                padding: "12px",
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: "32px" }}>
            <Space
              style={{ width: "100%", justifyContent: "space-between" }}
              size="large"
            >
              <Button
                onClick={() => setCheckoutModalVisible(false)}
                size="large"
                style={{
                  borderRadius: "8px",
                  padding: "0 32px",
                  height: "48px",
                  fontSize: "16px",
                }}
              >
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                icon={<CheckCircleOutlined />}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0 48px",
                  height: "48px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                }}
              >
                Xác Nhận Đặt Hàng
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
});

CartGraphQLAdapter.displayName = "CartGraphQLAdapter";

export default CartGraphQLAdapter;
