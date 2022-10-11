const {DataTypes} = require('sequelize')

module.exports= (sequelize) => {
    sequelize.define('cart_item_products', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        }
    },{
        timeStamps:false,
        createdAt:false,
        updatedAt:false,
    })
}