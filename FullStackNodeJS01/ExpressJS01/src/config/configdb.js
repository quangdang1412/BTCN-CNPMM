import { Sequelize } from "sequelize";
import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";

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
export { sequelize, User, Product };
