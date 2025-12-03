import express from "express";
import userController from "../controllers/userController.js";
import productController from "../controllers/productController.js";
import cartController from "../controllers/cartController.js";
import orderController from "../controllers/orderController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import delay from "../middleware/delay.js";
import upload from "../middleware/upload.js";
import rateLimit from "express-rate-limit";
import { body, validationResult } from "express-validator";

const routerAPI = express.Router();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

routerAPI.use(limiter);

routerAPI.use(auth);

routerAPI.get("/", (req, res) => {
  return res.status(200).json("Hello world api");
});

// User routes
routerAPI.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("name").notEmpty().withMessage("Name is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.createUser
);

routerAPI.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  userController.handleLogin
);

routerAPI.get("/user", userController.getUser);
routerAPI.get("/account", delay, userController.getAccount);

// Product routes
routerAPI.get("/products", productController.getProductsByCategory);
routerAPI.post(
  "/upload-image",
  authorize(["Admin"]),
  upload.single("image"),
  productController.uploadImage
);
routerAPI.post(
  "/products",
  authorize(["Admin"]),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.createProduct
);
routerAPI.put(
  "/products/:productId",
  authorize(["Admin"]),
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("price")
      .isFloat({ min: 0 })
      .withMessage("Price must be a positive number"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  productController.updateProduct
);
routerAPI.delete(
  "/products/:productId",
  authorize(["Admin"]),
  productController.deleteProduct
);

// Cart routes
routerAPI.get("/cart", cartController.getCart);
routerAPI.post(
  "/cart",
  [
    body("productId").isInt().withMessage("Product ID must be an integer"),
    body("quantity")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  cartController.addToCart
);
routerAPI.put(
  "/cart/:cartId",
  [
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  cartController.updateCartItem
);
routerAPI.delete("/cart/:cartId", cartController.removeFromCart);
routerAPI.delete("/cart", cartController.clearCart);

// Order routes
routerAPI.post(
  "/orders/from-cart",
  [
    body("shippingAddress")
      .notEmpty()
      .withMessage("Shipping address is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  orderController.createOrderFromCart
);
routerAPI.post(
  "/orders",
  [
    body("items").isArray({ min: 1 }).withMessage("Items array is required"),
    body("items.*.productId")
      .isInt()
      .withMessage("Product ID must be an integer"),
    body("items.*.quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
    body("shippingAddress")
      .notEmpty()
      .withMessage("Shipping address is required"),
    body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  orderController.createOrder
);
routerAPI.get("/orders", orderController.getUserOrders);
routerAPI.get("/orders/:orderId", orderController.getOrderById);
routerAPI.patch("/orders/:orderId/cancel", orderController.cancelOrder);

// Admin order routes
routerAPI.get(
  "/admin/orders",
  authorize(["Admin"]),
  orderController.getAllOrders
);
routerAPI.patch(
  "/admin/orders/:orderId/status",
  authorize(["Admin"]),
  [body("status").notEmpty().withMessage("Status is required")],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  orderController.updateOrderStatus
);

export default routerAPI;
