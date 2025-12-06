import { Sequelize } from "sequelize";
import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";
import CartModel from "../models/cart.js";
import OrderModel from "../models/order.js";
import OrderItemModel from "../models/orderItem.js";
import FavoriteModel from "../models/favorite.js";
import ProductViewModel from "../models/productView.js";
import CommentModel from "../models/comment.js";

// Create connection without specifying database first
const sequelizeInit = new Sequelize("mysql", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

const sequelize = new Sequelize("node_fulltask", "root", "12345", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Initialize models
const User = UserModel(sequelize, Sequelize.DataTypes);
const Product = ProductModel(sequelize, Sequelize.DataTypes);
const Cart = CartModel(sequelize, Sequelize.DataTypes);
const Order = OrderModel(sequelize, Sequelize.DataTypes);
const OrderItem = OrderItemModel(sequelize, Sequelize.DataTypes);
const Favorite = FavoriteModel(sequelize, Sequelize.DataTypes);
const ProductView = ProductViewModel(sequelize, Sequelize.DataTypes);
const Comment = CommentModel(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  User,
  Product,
  Cart,
  Order,
  OrderItem,
  Favorite,
  ProductView,
  Comment,
};

// Define associations
User.hasMany(Cart, { foreignKey: "userId", as: "carts" });
Cart.belongsTo(User, { foreignKey: "userId", as: "user" });

Product.hasMany(Cart, { foreignKey: "productId", as: "carts" });
Cart.belongsTo(Product, { foreignKey: "productId", as: "product" });

User.hasMany(Order, { foreignKey: "userId", as: "orders" });
Order.belongsTo(User, { foreignKey: "userId", as: "user" });

Order.hasMany(OrderItem, { foreignKey: "orderId", as: "items" });
OrderItem.belongsTo(Order, { foreignKey: "orderId", as: "order" });

// Note: Product-OrderItem association is defined in Product.associate()
OrderItem.belongsTo(Product, { foreignKey: "productId", as: "product" });

// Call associate methods for new models
if (Favorite.associate) {
  Favorite.associate(db);
}
if (ProductView.associate) {
  ProductView.associate(db);
}
if (Comment.associate) {
  Comment.associate(db);
}
if (User.associate) {
  User.associate(db);
}
if (Product.associate) {
  Product.associate(db);
}

const connectDB = async () => {
  try {
    // Create database if not exists
    await sequelizeInit.query("CREATE DATABASE IF NOT EXISTS node_fulltask");
    console.log("Database 'node_fulltask' exists or created.");

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync models
    await sequelize.sync({ alter: true });
    console.log("Database models synced.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connectDB;
export {
  sequelize,
  User,
  Product,
  Cart,
  Order,
  OrderItem,
  Favorite,
  ProductView,
  Comment,
  db,
};
