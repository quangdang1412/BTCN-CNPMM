export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
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
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "processing", "completed", "cancelled"),
        defaultValue: "pending",
      },
      shippingAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "Orders",
      timestamps: true,
    }
  );

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Order.hasMany(models.OrderItem, { foreignKey: "orderId", as: "items" });
  };

  return Order;
};
