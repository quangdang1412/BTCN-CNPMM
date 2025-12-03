import {
  Order,
  OrderItem,
  Cart,
  Product,
  sequelize,
} from "../config/configdb.js";

const orderService = {
  // Create order from cart
  createOrderFromCart: async (userId, shippingAddress, phoneNumber, notes) => {
    const transaction = await sequelize.transaction();

    try {
      // Get cart items
      const cartItems = await Cart.findAll({
        where: { userId },
        include: [
          {
            model: Product,
            as: "product",
          },
        ],
      });

      if (!cartItems || cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      // Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.quantity * parseFloat(item.product.price);
      }, 0);

      // Create order
      const order = await Order.create(
        {
          userId,
          totalAmount: totalAmount.toFixed(2),
          status: "pending",
          shippingAddress,
          phoneNumber,
          notes,
        },
        { transaction }
      );

      // Create order items
      const orderItems = await Promise.all(
        cartItems.map((cartItem) =>
          OrderItem.create(
            {
              orderId: order.id,
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              price: cartItem.product.price,
              productName: cartItem.product.name,
            },
            { transaction }
          )
        )
      );

      // Clear cart
      await Cart.destroy({
        where: { userId },
        transaction,
      });

      await transaction.commit();

      // Fetch complete order with items
      const completeOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            as: "OrderItems",
          },
        ],
      });

      return completeOrder;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  // Create order from selected cart items
  createOrderFromSelectedCartItems: async (
    userId,
    shippingAddress,
    phoneNumber,
    notes
  ) => {
    const transaction = await sequelize.transaction();

    try {
      // Get selected cart items
      const cartItems = await Cart.findAll({
        where: {
          userId,
          selected: true,
        },
        include: [
          {
            model: Product,
            as: "product",
          },
        ],
      });

      if (!cartItems || cartItems.length === 0) {
        throw new Error("No items selected for checkout");
      }

      // Calculate total amount
      const totalAmount = cartItems.reduce((sum, item) => {
        return sum + item.quantity * parseFloat(item.product.price);
      }, 0);

      // Create order
      const order = await Order.create(
        {
          userId,
          totalAmount: totalAmount.toFixed(2),
          status: "pending",
          shippingAddress,
          phoneNumber,
          notes,
        },
        { transaction }
      );

      // Create order items
      await Promise.all(
        cartItems.map((cartItem) =>
          OrderItem.create(
            {
              orderId: order.id,
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              price: cartItem.product.price,
              productName: cartItem.product.name,
            },
            { transaction }
          )
        )
      );

      // Remove selected items from cart
      await Cart.destroy({
        where: {
          userId,
          selected: true,
        },
        transaction,
      });

      await transaction.commit();

      // Fetch complete order with items
      const completeOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            as: "OrderItems",
          },
        ],
      });

      return completeOrder;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  // Create order directly (without cart)
  createOrder: async (userId, orderData) => {
    const transaction = await sequelize.transaction();

    try {
      const { items, shippingAddress, phoneNumber, notes } = orderData;

      if (!items || items.length === 0) {
        throw new Error("Order items are required");
      }

      // Validate products and calculate total
      let totalAmount = 0;
      const validatedItems = [];

      for (const item of items) {
        const product = await Product.findByPk(item.productId);
        if (!product) {
          throw new Error(`Product with id ${item.productId} not found`);
        }

        totalAmount += item.quantity * parseFloat(product.price);
        validatedItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
          productName: product.name,
        });
      }

      // Create order
      const order = await Order.create(
        {
          userId,
          totalAmount: totalAmount.toFixed(2),
          status: "pending",
          shippingAddress,
          phoneNumber,
          notes,
        },
        { transaction }
      );

      // Create order items
      await Promise.all(
        validatedItems.map((item) =>
          OrderItem.create(
            {
              orderId: order.id,
              ...item,
            },
            { transaction }
          )
        )
      );

      await transaction.commit();

      // Fetch complete order with items
      const completeOrder = await Order.findByPk(order.id, {
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["id", "name", "category", "description"],
              },
            ],
          },
        ],
      });

      return completeOrder;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  // Get all orders for a user
  getUserOrders: async (userId, page = 1, limit = 10) => {
    try {
      const offset = (page - 1) * limit;

      const { count, rows } = await Order.findAndCountAll({
        where: { userId },
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["id", "name", "category"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      return {
        orders: rows,
        totalOrders: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      throw error;
    }
  },

  // Get order by id
  getOrderById: async (userId, orderId) => {
    try {
      const order = await Order.findOne({
        where: { id: orderId, userId },
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
              },
            ],
          },
        ],
      });

      if (!order) {
        throw new Error("Order not found");
      }

      return order;
    } catch (error) {
      throw error;
    }
  },

  // Update order status
  updateOrderStatus: async (orderId, status) => {
    try {
      const order = await Order.findByPk(orderId);

      if (!order) {
        throw new Error("Order not found");
      }

      const validStatuses = ["pending", "processing", "completed", "cancelled"];
      if (!validStatuses.includes(status)) {
        throw new Error("Invalid status");
      }

      order.status = status;
      await order.save();

      return order;
    } catch (error) {
      throw error;
    }
  },

  // Cancel order
  cancelOrder: async (userId, orderId) => {
    try {
      const order = await Order.findOne({
        where: { id: orderId, userId },
      });

      if (!order) {
        throw new Error("Order not found");
      }

      if (order.status === "completed") {
        throw new Error("Cannot cancel completed order");
      }

      if (order.status === "cancelled") {
        throw new Error("Order is already cancelled");
      }

      order.status = "cancelled";
      await order.save();

      return order;
    } catch (error) {
      throw error;
    }
  },

  // Get all orders (Admin)
  getAllOrders: async (page = 1, limit = 10, status = null) => {
    try {
      const offset = (page - 1) * limit;
      const whereClause = status ? { status } : {};

      const { count, rows } = await Order.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: OrderItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["id", "name", "category"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      return {
        orders: rows,
        totalOrders: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      };
    } catch (error) {
      throw error;
    }
  },
};

export default orderService;
