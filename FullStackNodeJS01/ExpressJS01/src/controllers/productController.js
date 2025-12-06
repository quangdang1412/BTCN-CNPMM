import {
  getProductsByCategoryService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/productService.js";
import productViewService from "../services/productViewService.js";
import favoriteService from "../services/favoriteService.js";
import commentService from "../services/commentService.js";
import { db } from "../config/configdb.js";

const getProductsByCategory = async (req, res) => {
  const {
    category,
    page = 1,
    limit = 10,
    search = "",
    minPrice,
    maxPrice,
  } = req.query;
  const data = await getProductsByCategoryService(
    category,
    parseInt(page),
    parseInt(limit),
    search,
    minPrice,
    maxPrice
  );
  return res.status(200).json(data);
};

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image file provided",
      });
    }

    const imageUrl = req.file.path;
    return res.status(200).json({
      url: imageUrl,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return res.status(500).json({
      message: "Error uploading image",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const data = await createProductService(
      name,
      description,
      parseFloat(price),
      category,
      image || null
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, image } = req.body;

    console.log("Update product:", {
      productId,
      name,
      description,
      price,
      category,
      image,
    });

    const data = await updateProductService(
      parseInt(productId),
      name,
      description,
      parseFloat(price),
      category,
      image || null
    );

    if (!data) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = await deleteProductService(productId);

    if (!data) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

export default {
  getProductsByCategory,
  uploadImage,
  createProduct,
  updateProduct,
  deleteProduct,
};

// Get product details with stats
const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user?.id;

    // Get product
    const product = await db.Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Record view
    if (userId) {
      await productViewService.recordProductView(productId, userId);
    }

    // Get stats in parallel
    const [
      viewCount,
      favoriteCount,
      commentCount,
      averageRating,
      buyerCount,
      isFavorited,
    ] = await Promise.all([
      productViewService.getViewCount(productId),
      favoriteService.getFavoriteCount(productId),
      commentService.getCommentCount(productId),
      commentService.getAverageRating(productId),
      productViewService.getBuyerCount(productId),
      userId
        ? favoriteService.isFavorited(userId, productId)
        : { isFavorited: false },
    ]);

    return res.status(200).json({
      success: true,
      product,
      stats: {
        views: viewCount.count || 0,
        favorites: favoriteCount.count || 0,
        comments: commentCount.count || 0,
        averageRating: averageRating.averageRating || 0,
        ratingCount: averageRating.ratingCount || 0,
        buyers: buyerCount.count || 0,
        isFavorited: isFavorited.isFavorited || false,
      },
    });
  } catch (error) {
    console.error("Error in getProductDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get similar products
const getSimilarProducts = async (req, res) => {
  try {
    const { productId } = req.params;
    const limit = parseInt(req.query.limit) || 6;

    const result = await productViewService.getSimilarProducts(
      productId,
      limit
    );

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      products: result.products,
    });
  } catch (error) {
    console.error("Error in getSimilarProducts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get recently viewed products
const getRecentlyViewed = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    const result = await productViewService.getRecentlyViewed(userId, limit);

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      products: result.products,
    });
  } catch (error) {
    console.error("Error in getRecentlyViewed:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export {
  getProductsByCategory,
  uploadImage,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  getSimilarProducts,
  getRecentlyViewed,
};
