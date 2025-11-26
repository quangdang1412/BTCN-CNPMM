import {
  getProductsByCategoryService,
  createProductService,
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

const createProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body;
  const data = await createProductService(
    name,
    description,
    price,
    category,
    image
  );
  return res.status(200).json(data);
};

export default {
  getProductsByCategory,
  createProduct,
};
