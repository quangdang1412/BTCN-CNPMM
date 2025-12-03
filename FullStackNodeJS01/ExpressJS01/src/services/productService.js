import { Product } from "../config/configdb.js";
import {
  syncProductToMeili,
  deleteProductFromMeili,
  searchProductsInMeili,
} from "../config/meilisearch.js";

export const getProductsByCategoryService = async (
  category,
  page = 1,
  limit = 10,
  search = "",
  minPrice,
  maxPrice
) => {
  try {
    // Use MeiliSearch for search
    const result = await searchProductsInMeili(
      search,
      category,
      minPrice,
      maxPrice,
      page,
      limit
    );

    if (result) {
      return result;
    }

    // Fallback to database if MeiliSearch fails
    console.log("MeiliSearch failed, falling back to database");
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createProductService = async (
  name,
  description,
  price,
  category,
  image
) => {
  try {
    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
    });

    await syncProductToMeili(product);

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateProductService = async (
  productId,
  name,
  description,
  price,
  category,
  image
) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return null;
    }

    const updateData = {
      name,
      description,
      price,
      category,
    };

    if (image) {
      updateData.image = image;
    }

    await product.update(updateData);

    await syncProductToMeili(product);

    return product;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteProductService = async (productId) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return null;
    }

    await product.destroy();

    await deleteProductFromMeili(productId);

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
