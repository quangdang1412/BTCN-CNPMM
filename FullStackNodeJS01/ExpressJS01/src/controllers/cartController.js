import cartService from "../services/cartService.js";

const cartController = {
  // Get user's cart
  getCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const cart = await cartService.getCartByUserId(userId);

      return res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error) {
      console.error("Error getting cart:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Add item to cart
  addToCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;

      if (!productId) {
        return res.status(400).json({
          success: false,
          message: "Product ID is required",
        });
      }

      const cartItem = await cartService.addToCart(
        userId,
        productId,
        quantity || 1
      );

      return res.status(201).json({
        success: true,
        message: "Item added to cart",
        data: cartItem,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Update cart item
  updateCartItem: async (req, res) => {
    try {
      const userId = req.user.id;
      const { cartId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: "Valid quantity is required",
        });
      }

      const cartItem = await cartService.updateCartItem(
        userId,
        cartId,
        quantity
      );

      return res.status(200).json({
        success: true,
        message: "Cart item updated",
        data: cartItem,
      });
    } catch (error) {
      console.error("Error updating cart item:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Remove item from cart
  removeFromCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { cartId } = req.params;

      const result = await cartService.removeFromCart(userId, cartId);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Clear cart
  clearCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const result = await cartService.clearCart(userId);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },
};

export default cartController;
