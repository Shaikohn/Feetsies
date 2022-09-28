const {DataTypes} = require('sequelize')



module.exports= (sequelize) => {
    sequelize.define('user', {
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
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isNumeric: true
            }
        }
    })
}