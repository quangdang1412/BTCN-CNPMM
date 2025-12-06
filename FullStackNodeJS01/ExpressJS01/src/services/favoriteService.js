import { db } from "../config/configdb.js";
import { Op } from "sequelize";

// Add product to favorites
const addToFavorites = async (userId, productId) => {
  try {
    const [favorite, created] = await db.Favorite.findOrCreate({
      where: { userId, productId },
    });
    return { success: true, favorite, created };
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return { success: false, error: error.message };
  }
};

// Remove product from favorites
const removeFromFavorites = async (userId, productId) => {
  try {
    const result = await db.Favorite.destroy({
      where: { userId, productId },
    });
    return { success: true, deleted: result > 0 };
  } catch (error) {
    console.error("Error removing from favorites:", error);
    return { success: false, error: error.message };
  }
};

// Get user's favorite products
const getUserFavorites = async (userId, page = 1, limit = 10) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await db.Favorite.findAndCountAll({
      where: { userId },
      include: [
        {
          model: db.Product,
          as: "product",
        },
      ],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      success: true,
      favorites: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
  } catch (error) {
    console.error("Error getting user favorites:", error);
    return { success: false, error: error.message };
  }
};

// Check if product is favorited by user
const isFavorited = async (userId, productId) => {
  try {
    const favorite = await db.Favorite.findOne({
      where: { userId, productId },
    });
    return { success: true, isFavorited: !!favorite };
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return { success: false, error: error.message };
  }
};

// Get favorite count for a product
const getFavoriteCount = async (productId) => {
  try {
    const count = await db.Favorite.count({
      where: { productId },
    });
    return { success: true, count };
  } catch (error) {
    console.error("Error getting favorite count:", error);
    return { success: false, error: error.message };
  }
};

export default {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  isFavorited,
  getFavoriteCount,
};
