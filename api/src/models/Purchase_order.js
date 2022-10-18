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
        },
        createdAt:{
            type: DataTypes.DATE,
            allowNull:false,
            defaultValue: sequelize.NOW,
            get: function() {
                return this.getDataValue('createdAt')
                //.toUTCString();
                .toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
            }
        }
    },{
        timeStamps:true,
        createdAt:true,
        updatedAt:false,
    })
}