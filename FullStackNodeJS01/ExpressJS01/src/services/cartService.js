import { Cart, Product } from "../config/configdb.js";

const cartService = {
  // Get all cart items for a user
  getCartByUserId: async (userId) => {
    try {
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            as: "product",
            attributes: [
              "id",
              "name",
              "price",
              "category",
              "description",
              "image",
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });

      // Calculate totals
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.quantity * parseFloat(item.product.price);
      }, 0);

      const selectedTotalAmount = cartItems
        .filter((item) => item.selected)
        .reduce((sum, item) => {
          return sum + item.quantity * parseFloat(item.product.price);
        }, 0);

      return {
        items: cartItems,
        totalItems: cartItems.length,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        selectedTotalAmount: parseFloat(selectedTotalAmount.toFixed(2)),
      };
    } catch (error) {
      throw error;
    }
  },

  // Add item to cart
  addToCart: async (userId, productId, quantity = 1) => {
    try {
      // Check if product exists
      const product = await Product.findByPk(productId);
      if (!product) {
        throw new Error("Product not found");
      }

      // Check if item already exists in cart
      const existingItem = await Cart.findOne({
        where: { userId, productId },
      });

      if (existingItem) {
        // Update quantity
        existingItem.quantity += quantity;
        await existingItem.save();
        return existingItem;
      } else {
        // Create new cart item
        const cartItem = await Cart.create({
          userId,
          productId,
          quantity,
        });
        return cartItem;
      }
    } catch (error) {
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (userId, cartId, quantity) => {
    try {
      const cartItem = await Cart.findOne({
        where: { id: cartId, userId },
      });

      if (!cartItem) {
        throw new Error("Cart item not found");
      }

      if (quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }

      cartItem.quantity = quantity;
      await cartItem.save();

      return cartItem;
    } catch (error) {
      throw error;
    }
  },

  // Remove item from cart
  removeFromCart: async (userId, cartId) => {
    try {
      const cartItem = await Cart.findOne({
        where: { id: cartId, userId },
      });

      if (!cartItem) {
        throw new Error("Cart item not found");
      }

      await cartItem.destroy();
      return { message: "Item removed from cart" };
    } catch (error) {
      throw error;
    }
  },

  // Clear cart
  clearCart: async (userId) => {
    try {
      await Cart.destroy({
        where: { userId },
      });
      return { message: "Cart cleared" };
    } catch (error) {
      throw error;
    }
  },

  // Toggle select cart item
  toggleSelectCartItem: async (userId, cartId, selected) => {
    try {
      const cartItem = await Cart.findOne({
        where: { id: cartId, userId },
        include: [
          {
            model: Product,
            as: "product",
          },
        ],
      });

      if (!cartItem) {
        throw new Error("Cart item not found");
      }

      cartItem.selected = selected;
      await cartItem.save();

      return cartItem;
    } catch (error) {
      throw error;
    }
  },

  // Select multiple cart items
  selectMultipleCartItems: async (userId, cartIds, selected) => {
    try {
      const cartItems = await Cart.findAll({
        where: {
          id: cartIds,
          userId,
        },
        include: [
          {
            model: Product,
            as: "product",
          },
        ],
      });

      if (cartItems.length === 0) {
        throw new Error("No cart items found");
      }

      // Update all items
      await Promise.all(
        cartItems.map(async (item) => {
          item.selected = selected;
          await item.save();
        })
      );

      return cartItems;
    } catch (error) {
      throw error;
    }
  },
};

export default cartService;
