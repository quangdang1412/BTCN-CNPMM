import favoriteService from "../services/favoriteService.js";

// Add to favorites
const addToFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    const result = await favoriteService.addToFavorites(userId, productId);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(result.created ? 201 : 200).json({
      success: true,
      message: result.created
        ? "Product added to favorites"
        : "Product already in favorites",
      favorite: result.favorite,
    });
  } catch (error) {
    console.error("Error in addToFavorites:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Remove from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await favoriteService.removeFromFavorites(userId, productId);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      message: result.deleted
        ? "Product removed from favorites"
        : "Product not found in favorites",
    });
  } catch (error) {
    console.error("Error in removeFromFavorites:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get user favorites
const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await favoriteService.getUserFavorites(userId, page, limit);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      favorites: result.favorites,
      pagination: {
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error("Error in getUserFavorites:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Check if product is favorited
const checkFavoriteStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.params;

    const result = await favoriteService.isFavorited(userId, productId);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      isFavorited: result.isFavorited,
    });
  } catch (error) {
    console.error("Error in checkFavoriteStatus:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  checkFavoriteStatus,
};
