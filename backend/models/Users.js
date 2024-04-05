const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Users = sequelize.define(
  "users",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userAvatar: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNum: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    branch: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    absenceReason: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    cardNum: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    cardExpirationDate: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);

module.exports = Users;