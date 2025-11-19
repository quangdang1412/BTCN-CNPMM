import { Product } from "../config/configdb.js";

export const getProductsByCategoryService = async (
  category,
  page = 1,
  limit = 10
) => {
  try {
    const offset = (page - 1) * limit;
    const whereClause = category ? { category } : {};

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
