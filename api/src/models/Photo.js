const {DataTypes} = require('sequelize')



module.exports= (sequelize) => {
    sequelize.define('photo', {
        url: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            validate: {
                isUrl: true
            }
        },
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }
    })
}