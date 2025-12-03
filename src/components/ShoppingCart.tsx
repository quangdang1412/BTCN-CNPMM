import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import Card from "./Card";

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  className?: string;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ className = "" }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    quantity: 1,
  });

  const addProduct = () => {
    if (newProduct.name && newProduct.price > 0) {
      const product: Product = {
        id: Date.now().toString(),
        ...newProduct,
      };
      setCart([...cart, product]);
      setNewProduct({ name: "", price: 0, quantity: 1 });
      setIsModalOpen(false);
    }
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setIsModalOpen(true);
  };

  const updateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price > 0) {
      setCart(
        cart.map((p) =>
          p.id === editingProduct.id ? { ...p, ...newProduct } : p
        )
      );
      setEditingProduct(null);
      setNewProduct({ name: "", price: 0, quantity: 1 });
      setIsModalOpen(false);
    }
  };

  const deleteProduct = (id: string) => {
    setCart(cart.filter((p) => p.id !== id));
  };

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className={`shopping-cart ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng</h2>
      <Button
        onClick={() => {
          setEditingProduct(null);
          setIsModalOpen(true);
        }}
        className="mb-4"
      >
        Thêm sản phẩm
      </Button>
      <div className="space-y-4">
        {cart.map((product) => (
          <Card key={product.id} className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p>Giá: {product.price} VND</p>
              <p>Số lượng: {product.quantity}</p>
              <p>Tổng: {product.price * product.quantity} VND</p>
            </div>
            <div className="space-x-2">
              <Button
                variant="secondary"
                size="small"
                onClick={() => editProduct(product)}
              >
                Sửa
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => deleteProduct(product.id)}
              >
                Xóa
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-4 text-xl font-bold">Tổng cộng: {total} VND</div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}
      >
        <div className="space-y-4">
          <Input
            value={newProduct.name}
            onChange={(value) => setNewProduct({ ...newProduct, name: value })}
            placeholder="Tên sản phẩm"
          />
          <Input
            value={newProduct.price.toString()}
            onChange={(value) =>
              setNewProduct({ ...newProduct, price: parseFloat(value) || 0 })
            }
            type="number"
            placeholder="Giá"
          />
          <Input
            value={newProduct.quantity.toString()}
            onChange={(value) =>
              setNewProduct({ ...newProduct, quantity: parseInt(value) || 1 })
            }
            type="number"
            placeholder="Số lượng"
          />
          <div className="flex space-x-2">
            <Button onClick={editingProduct ? updateProduct : addProduct}>
              {editingProduct ? "Cập nhật" : "Thêm"}
            </Button>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Hủy
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShoppingCart;
