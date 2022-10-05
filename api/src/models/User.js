const {DataTypes} = require('sequelize')



module.exports= (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8,22]
            }
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'No phone number added'
        },
        location: {
            type: DataTypes.STRING,
            defaultValue: 'No location added',
            allowNull: true,
        },
        isBan: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
    })
}