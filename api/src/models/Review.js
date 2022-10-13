const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("review", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
            unique: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique:'userProductKey'
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique:'userProductKey'
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
            len: [8, 130],
            },
        },
    });
};