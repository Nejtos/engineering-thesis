const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Orders = sequelize.define(
  "orders",
  {
    customer_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    payment: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    delivery_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    products: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    quantity: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    category: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    amount: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    date: { 
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn('now'),
   },
  },
  { timestamps: false }
);

module.exports = Orders;
