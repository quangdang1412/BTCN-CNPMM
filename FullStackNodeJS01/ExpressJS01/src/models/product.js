"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Favorite, {
        foreignKey: "productId",
        as: "favorites",
      });
      Product.hasMany(models.ProductView, {
        foreignKey: "productId",
        as: "views",
      });
      Product.hasMany(models.Comment, {
        foreignKey: "productId",
        as: "comments",
      });
      Product.hasMany(models.OrderItem, {
        foreignKey: "productId",
        as: "orderItems",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.FLOAT,
      category: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
