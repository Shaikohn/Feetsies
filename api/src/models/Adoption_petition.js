const {DataTypes} = require('sequelize')
//

module.exports= (sequelize) => {
    sequelize.define('adoption_petition', {
        userId: {
            type: DataTypes.INTEGER,
            unique:'animalUser'
        },
        animalId: {
            type: DataTypes.INTEGER,
            unique:'animalUser'
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
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