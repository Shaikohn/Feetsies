const {DataTypes} = require('sequelize')


module.exports= (sequelize) => {
    sequelize.define('adoption_alta', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'Unnamed animal'
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'Default value'
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false,
        },
        isImportant: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue:false,
        }
    },{
        timeStamps:true,
        createdAt:true,
        updatedAt:false,
    })
}