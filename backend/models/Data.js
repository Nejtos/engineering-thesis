const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Data = sequelize.define(
  "data",
  {
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    defaultPrice: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
    },
    price: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false,
    },
    details: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    size: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Data;