const { DataTypes } = require("sequelize");

const defaultImg =
  "https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE=";

module.exports = (sequelize) => {
  sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "No phone number added",
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: "No location added",
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      enum: ["Pending", "Active"],
      defaultValue: "Pending",
    },
    confirmationCode: {
      type: DataTypes.STRING,
      unique: true,
    },
    user_products: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    isBan: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: defaultImg,
    },
    google: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
