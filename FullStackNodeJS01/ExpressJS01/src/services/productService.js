import { Product } from "../config/configdb.js";
import { Op } from "sequelize";

export const getProductsByCategoryService = async (
  category,
  page = 1,
  limit = 10,
  search = "",
  minPrice,
  maxPrice
) => {
  try {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    if (search) {
      const searchTerms = search.split(" ").filter((term) => term.length > 0);
      const searchConditions = [];

      searchTerms.forEach((term) => {
        searchConditions.push(
          { name: { [Op.iLike]: `%${term}%` } },
          { description: { [Op.iLike]: `%${term}%` } }
        );
      });

      whereClause[Op.or] = searchConditions;
    }

    if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
      whereClause.price = {
        ...whereClause.price,
        [Op.gte]: parseFloat(minPrice),
      };
    }

    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
      whereClause.price = {
        ...whereClause.price,
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    const { count, rows } = await Product.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return {
      products: rows,
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
    };
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
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.log(error);
    return null;
  }
};
