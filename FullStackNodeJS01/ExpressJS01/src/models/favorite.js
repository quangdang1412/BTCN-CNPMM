"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      // Favorite belongs to User
      Favorite.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      // Favorite belongs to Product
      Favorite.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Favorite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
      indexes: [
        {
          unique: true,
          fields: ["userId", "productId"],
        },
      ],
    }
  );
  return Favorite;
};
