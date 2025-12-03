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

const uploadImageApi = (imageFile) => {
  const URL_API = "/v1/api/upload-image";
  const formData = new FormData();
  formData.append("image", imageFile);
  return axios.post(URL_API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const createProductApi = (productData) => {
  const URL_API = "/v1/api/products";
  return axios.post(URL_API, productData);
};

const updateProductApi = (productId, productData) => {
  const URL_API = `/v1/api/products/${productId}`;
  return axios.put(URL_API, productData);
};

const deleteProductApi = (productId) => {
  const URL_API = `/v1/api/products/${productId}`;
  return axios.delete(URL_API);
};

// GraphQL API calls
const graphqlRequest = async (query, variables = {}) => {
  const URL_API = "/graphql";
  return axios.post(URL_API, {
    query,
    variables,
  });
};

// Cart GraphQL APIs
const getCartGraphQL = () => {
  const query = `
    query {
      cart {
        items {
          id
          productId
          quantity
          selected
          Product {
            id
            name
            price
            category
            description
            image
          }
          subtotal
        }
        totalItems
        totalAmount
        selectedTotalAmount
      }
    }
  `;
  return graphqlRequest(query);
};

const addToCartGraphQL = (productId, quantity = 1) => {
  const query = `
    mutation($productId: Int!, $quantity: Int) {
      addToCart(productId: $productId, quantity: $quantity) {
        id
        productId
        quantity
        selected
      }
    }
  `;
  return graphqlRequest(query, { productId, quantity });
};

const updateCartItemGraphQL = (cartId, quantity) => {
  const query = `
    mutation($cartId: Int!, $quantity: Int!) {
      updateCartItem(cartId: $cartId, quantity: $quantity) {
        id
        productId
        quantity
        Product {
          name
          price
        }
        subtotal
      }
    }
  `;
  return graphqlRequest(query, { cartId, quantity });
};

const removeFromCartGraphQL = (cartId) => {
  const query = `
    mutation($cartId: Int!) {
      removeFromCart(cartId: $cartId) {
        success
        message
      }
    }
  `;
  return graphqlRequest(query, { cartId });
};

const clearCartGraphQL = () => {
  const query = `
    mutation {
      clearCart {
        success
        message
      }
    }
  `;
  return graphqlRequest(query);
};

const toggleSelectCartItemGraphQL = (cartId, selected) => {
  const query = `
    mutation($cartId: Int!, $selected: Boolean!) {
      toggleSelectCartItem(cartId: $cartId, selected: $selected) {
        id
        productId
        selected
        Product {
          name
          price
        }
      }
    }
  `;
  return graphqlRequest(query, { cartId, selected });
};

const selectMultipleCartItemsGraphQL = (cartIds, selected) => {
  const query = `
    mutation($cartIds: [Int!]!, $selected: Boolean!) {
      selectMultipleCartItems(cartIds: $cartIds, selected: $selected) {
        id
        productId
        selected
      }
    }
  `;
  return graphqlRequest(query, { cartIds, selected });
};

const checkoutSelectedItemsGraphQL = (shippingAddress, phoneNumber, notes) => {
  const query = `
    mutation($shippingAddress: String!, $phoneNumber: String!, $notes: String) {
      checkoutSelectedItems(
        shippingAddress: $shippingAddress
        phoneNumber: $phoneNumber
        notes: $notes
      ) {
        id
        userId
        totalAmount
        status
        shippingAddress
        phoneNumber
        notes
        createdAt
        OrderItems {
          id
          productId
          productName
          quantity
          price
          subtotal
        }
      }
    }
  `;
  return graphqlRequest(query, { shippingAddress, phoneNumber, notes });
};

const checkoutCartGraphQL = (shippingAddress, phoneNumber, notes) => {
  const query = `
    mutation($shippingAddress: String!, $phoneNumber: String!, $notes: String) {
      checkoutCart(
        shippingAddress: $shippingAddress
        phoneNumber: $phoneNumber
        notes: $notes
      ) {
        id
        userId
        totalAmount
        status
        shippingAddress
        phoneNumber
        OrderItems {
          productName
          quantity
          price
          subtotal
        }
      }
    }
  `;
  return graphqlRequest(query, { shippingAddress, phoneNumber, notes });
};

export {
  createUserApi,
  loginApi,
  getUserApi,
  getProductsApi,
  uploadImageApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  // GraphQL APIs
  graphqlRequest,
  getCartGraphQL,
  addToCartGraphQL,
  updateCartItemGraphQL,
  removeFromCartGraphQL,
  clearCartGraphQL,
  toggleSelectCartItemGraphQL,
  selectMultipleCartItemsGraphQL,
  checkoutSelectedItemsGraphQL,
  checkoutCartGraphQL,
};
