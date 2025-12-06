import { db } from "../config/configdb.js";
import { Op } from "sequelize";

// Record a product view
const recordProductView = async (productId, userId = null) => {
  try {
    await db.ProductView.create({
      productId,
      userId,
      viewedAt: new Date(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error recording product view:", error);
    return { success: false, error: error.message };
  }
};

// Get recently viewed products for a user
const getRecentlyViewed = async (userId, limit = 10) => {
  try {
    const views = await db.ProductView.findAll({
      where: { userId },
      include: [
        {
          model: db.Product,
          as: "product",
        },
      ],
      order: [["viewedAt", "DESC"]],
      limit,
      distinct: true,
      group: ["productId"],
    });

    // Remove duplicates and get only products
    const uniqueProducts = [];
    const seenIds = new Set();

    for (const view of views) {
      if (!seenIds.has(view.productId)) {
        seenIds.add(view.productId);
        uniqueProducts.push(view.product);
      }
    }

    return {
      success: true,
      products: uniqueProducts.slice(0, limit),
    };
  } catch (error) {
    console.error("Error getting recently viewed products:", error);
    return { success: false, error: error.message };
  }
};

// Get view count for a product
const getViewCount = async (productId) => {
  try {
    const count = await db.ProductView.count({
      where: { productId },
    });
    return { success: true, count };
  } catch (error) {
    console.error("Error getting view count:", error);
    return { success: false, error: error.message };
  }
};

// Get similar products based on category
const getSimilarProducts = async (productId, limit = 6) => {
  try {
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return { success: false, error: "Product not found" };
    }

    const similarProducts = await db.Product.findAll({
      where: {
        category: product.category,
        id: { [Op.ne]: productId },
      },
      limit,
      order: [["createdAt", "DESC"]],
    });

    return { success: true, products: similarProducts };
  } catch (error) {
    console.error("Error getting similar products:", error);
    return { success: false, error: error.message };
  }
};

// Get buyer count for a product (unique users who purchased)
const getBuyerCount = async (productId) => {
  try {
    const count = await db.OrderItem.count({
      where: { productId },
      distinct: true,
      col: "orderId",
      include: [
        {
          model: db.Order,
          as: "order",
          attributes: [],
        },
      ],
    });

    return { success: true, count };
  } catch (error) {
    console.error("Error getting buyer count:", error);
    return { success: false, error: error.message };
  }
};

export default {
  recordProductView,
  getRecentlyViewed,
  getViewCount,
  getSimilarProducts,
  getBuyerCount,
};
