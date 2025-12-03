export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Products",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 1,
        },
      },
      selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "Carts",
      timestamps: true,
    }
  );

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Cart.belongsTo(models.Product, { foreignKey: "productId", as: "product" });
  };

  return Cart;
};
