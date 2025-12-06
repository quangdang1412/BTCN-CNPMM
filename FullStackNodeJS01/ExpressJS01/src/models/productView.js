"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class ProductView extends Model {
    static associate(models) {
      // ProductView belongs to User
      ProductView.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      // ProductView belongs to Product
      ProductView.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  ProductView.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allow null for anonymous users
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      viewedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "ProductView",
      indexes: [
        {
          fields: ["userId", "productId"],
        },
        {
          fields: ["productId"],
        },
      ],
    }
  );
  return ProductView;
};
