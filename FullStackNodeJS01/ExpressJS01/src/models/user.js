"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User has many Favorites
      User.hasMany(models.Favorite, {
        foreignKey: "userId",
        as: "favorites",
      });
      // User has many ProductViews
      User.hasMany(models.ProductView, {
        foreignKey: "userId",
        as: "productViews",
      });
      // User has many Comments
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
