const {DataTypes} = require('sequelize')


module.exports= (sequelize) => {
    sequelize.define('product_animal_type', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
    },{
        timeStamps:false,
        createdAt:false,
        updatedAt:false,
    })
}