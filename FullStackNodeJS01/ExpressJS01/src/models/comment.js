"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // Comment belongs to User
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
      // Comment belongs to Product
      Comment.belongsTo(models.Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  Comment.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      indexes: [
        {
          fields: ["productId"],
        },
        {
          fields: ["userId"],
        },
      ],
    }
  );
  return Comment;
};
