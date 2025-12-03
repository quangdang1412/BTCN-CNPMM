import orderService from "../services/orderService.js";

const orderController = {
  // Create order from cart
  createOrderFromCart: async (req, res) => {
    try {
      const userId = req.user.id;
      const { shippingAddress, phoneNumber, notes } = req.body;

      if (!shippingAddress) {
        return res.status(400).json({
          success: false,
          message: "Shipping address is required",
        });
      }

      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required",
        });
      }

      const order = await orderService.createOrderFromCart(userId, {
        shippingAddress,
        phoneNumber,
        notes,
      });

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Create order directly
  createOrder: async (req, res) => {
    try {
      const userId = req.user.id;
      const { items, shippingAddress, phoneNumber, notes } = req.body;

      if (!items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Order items are required",
        });
      }

      if (!shippingAddress) {
        return res.status(400).json({
          success: false,
          message: "Shipping address is required",
        });
      }

      if (!phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "Phone number is required",
        });
      }

      const order = await orderService.createOrder(userId, {
        items,
        shippingAddress,
        phoneNumber,
        notes,
      });

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    } catch (error) {
      console.error("Error creating order:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Get user's orders
  getUserOrders: async (req, res) => {
    try {
      const userId = req.user.id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await orderService.getUserOrders(userId, page, limit);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error getting orders:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Get order by id
  getOrderById: async (req, res) => {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;

      const order = await orderService.getOrderById(userId, orderId);

      return res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      console.error("Error getting order:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Cancel order
  cancelOrder: async (req, res) => {
    try {
      const userId = req.user.id;
      const { orderId } = req.params;

      const order = await orderService.cancelOrder(userId, orderId);

      return res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        data: order,
      });
    } catch (error) {
      console.error("Error cancelling order:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Get all orders (Admin)
  getAllOrders: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const status = req.query.status;

      const result = await orderService.getAllOrders(page, limit, status);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error getting all orders:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },

  // Update order status (Admin)
  updateOrderStatus: async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;

      if (!status) {
        return res.status(400).json({
          success: false,
          message: "Status is required",
        });
      }

      const order = await orderService.updateOrderStatus(orderId, status);

      return res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        data: order,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  },
};

export default orderController;
