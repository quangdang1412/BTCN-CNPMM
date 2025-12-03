import {
  getProductsByCategoryService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../services/productService.js";

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
