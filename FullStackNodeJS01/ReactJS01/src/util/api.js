import axios from "./axios.customize";

const createUserApi = (name, email, password) => {
  const URL_API = "/v1/api/register";
  const data = {
    name,
    email,
    password,
  };

  return axios.post(URL_API, data);
};

const loginApi = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = {
    email,
    password,
  };

  return axios.post(URL_API, data);
};

const getUserApi = () => {
  const URL_API = "/v1/api/user";
  return axios.get(URL_API);
};

const getProductsApi = (
  category,
  page = 1,
  limit = 10,
  search = "",
  minPrice,
  maxPrice
) => {
  let URL_API = `/v1/api/products?category=${category}&page=${page}&limit=${limit}&search=${encodeURIComponent(
    search
  )}`;
  if (minPrice !== undefined && minPrice !== null && minPrice !== "") {
    URL_API += `&minPrice=${minPrice}`;
  }
  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== "") {
    URL_API += `&maxPrice=${maxPrice}`;
  }
  return axios.get(URL_API);
};

const createProductApi = (productData) => {
  const URL_API = "/v1/api/products";
  return axios.post(URL_API, productData);
};

export {
  createUserApi,
  loginApi,
  getUserApi,
  getProductsApi,
  createProductApi,
};
