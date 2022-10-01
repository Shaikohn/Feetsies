const {DataTypes} = require('sequelize')



module.exports= (sequelize) => {
    sequelize.define('animal', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sex: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: true,
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'Unknown'
        },
        size: {
            type: DataTypes.ENUM('Large', 'Medium', 'Small'),
            allowNull: false,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

    })
}