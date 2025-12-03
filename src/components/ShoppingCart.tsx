import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import Card from "./Card";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string | null;
}

export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  selected: boolean;
  Product: Product;
  subtotal: number;
}

export interface CartData {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  selectedTotalAmount: number;
}

interface ShoppingCartProps {
  cart?: CartData;
  onUpdateQuantity?: (itemId: number, quantity: number) => void;
  onToggleSelect?: (itemId: number) => void;
  onRemoveItem?: (itemId: number) => void;
  className?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  onUpdateQuantity,
  onToggleSelect,
  onRemoveItem,
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [newQuantity, setNewQuantity] = useState(1);

  // Debug: Kiểm tra dữ liệu nhận được từ props
  console.log("🛒 ShoppingCart Props:", {
    cart,
    hasCart: !!cart,
    itemsCount: cart?.items?.length || 0,
    totalAmount: cart?.totalAmount,
    callbacks: {
      onUpdateQuantity: !!onUpdateQuantity,
      onToggleSelect: !!onToggleSelect,
      onRemoveItem: !!onRemoveItem,
    },
  });

  const handleUpdateQuantity = () => {
    if (editingItem && onUpdateQuantity && newQuantity > 0) {
      onUpdateQuantity(editingItem.id, newQuantity);
      setIsModalOpen(false);
      setEditingItem(null);
    }
  };

  const handleEdit = (item: CartItem) => {
    setEditingItem(item);
    setNewQuantity(item.quantity);
    setIsModalOpen(true);
  };

  const handleDelete = (itemId: number) => {
    if (onRemoveItem) {
      onRemoveItem(itemId);
    }
  };

  const handleToggleSelect = (itemId: number) => {
    if (onToggleSelect) {
      onToggleSelect(itemId);
    }
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className={`shopping-cart max-w-6xl mx-auto px-4 py-8 ${className}`}>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-6">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              Giỏ hàng trống
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </p>
            <Button size="large" className="shadow-lg hover:shadow-xl">
              <svg
                className="w-5 h-5 mr-2 inline"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Tiếp tục mua sắm
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`shopping-cart max-w-6xl mx-auto px-4 py-8 ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 mb-8">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg backdrop-blur-sm">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Giỏ hàng của bạn</h2>
              <p className="text-blue-100 text-sm mt-1">
                {cart.totalItems} sản phẩm
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-sm">Tổng tiền hàng</p>
            <p className="text-3xl font-bold">
              {cart.totalAmount.toLocaleString()}₫
            </p>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {cart.items.map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200"
          >
            <div className="flex items-start gap-6">
              {/* Checkbox */}
              <div className="flex items-center pt-2">
                <input
                  type="checkbox"
                  checked={item.selected}
                  onChange={() => handleToggleSelect(item.id)}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
                />
              </div>

              {/* Product Image */}
              <div className="flex-shrink-0">
                <img
                  src={item.Product.image || "/default-product.png"}
                  alt={item.Product.name}
                  className="w-32 h-32 object-cover rounded-xl shadow-md"
                  style={{ width: 128, height: 128 }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {item.Product.name}
                    </h3>
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
                      {item.Product.category}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.Product.description}
                </p>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Đơn giá:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {item.Product.price.toLocaleString()}₫
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Số lượng:</span>
                    <span className="px-3 py-1 bg-gray-100 rounded-lg font-semibold text-gray-900">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Thành tiền:</span>
                    <span className="text-xl font-bold text-blue-600">
                      {item.subtotal.toLocaleString()}₫
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() => handleEdit(item)}
                  className="whitespace-nowrap hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-4 h-4 mr-1 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Sửa SL
                </Button>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => handleDelete(item.id)}
                  className="whitespace-nowrap hover:scale-105 transition-transform"
                >
                  <svg
                    className="w-4 h-4 mr-1 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Xóa
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Section */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl shadow-xl p-8 border-2 border-blue-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg
            className="w-7 h-7 mr-3 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          Thông tin thanh toán
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-lg text-gray-600">Tổng tiền hàng:</span>
            <span className="text-2xl font-bold text-gray-900">
              {cart.totalAmount.toLocaleString()}₫
            </span>
          </div>

          {cart.selectedTotalAmount > 0 && (
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-xl font-semibold">
                    Tổng thanh toán:
                  </span>
                </div>
                <span className="text-4xl font-bold">
                  {cart.selectedTotalAmount.toLocaleString()}₫
                </span>
              </div>
            </div>
          )}

          <Button
            size="large"
            className="w-full shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-lg py-4 mt-6"
          >
            <svg
              className="w-6 h-6 mr-2 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Tiến hành thanh toán
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        title="Cập nhật số lượng"
      >
        <div className="space-y-4">
          {editingItem && (
            <div className="mb-4">
              <p className="font-semibold">{editingItem.Product.name}</p>
              <p className="text-sm text-gray-600">
                Giá: {editingItem.Product.price.toLocaleString()} VND
              </p>
            </div>
          )}
          <Input
            value={newQuantity.toString()}
            onChange={(value) => setNewQuantity(parseInt(value) || 1)}
            type="number"
            placeholder="Số lượng"
          />
          <div className="flex space-x-2">
            <Button onClick={handleUpdateQuantity}>Cập nhật</Button>
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setEditingItem(null);
              }}
            >
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
