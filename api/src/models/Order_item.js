const {DataTypes} = require('sequelize')

module.exports= (sequelize) => {
    sequelize.define('order_item', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        productName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },{
        timeStamps:true,
        createdAt:true,
        updatedAt:false,
    })
}