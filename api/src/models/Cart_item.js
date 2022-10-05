const {DataTypes} = require('sequelize')

module.exports= (sequelize) => {
    sequelize.define('cart_item', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },{
        timeStamps:false,
        createdAt:false,
        updatedAt:false,
    })
}