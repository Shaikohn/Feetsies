const {DataTypes} = require('sequelize')

module.exports= (sequelize) => {
    sequelize.define('purchase_order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        total: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:0
        }
    },{
        timeStamps:true,
        createdAt:true,
        updatedAt:false,
    })
}