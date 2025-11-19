import express from "express";
import userController from "../controllers/userController.js";
import productController from "../controllers/productController.js";
import auth from "../middleware/auth.js";
import authorize from "../middleware/authorize.js";
import delay from "../middleware/delay.js";
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

export default routerAPI;
