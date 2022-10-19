const {DataTypes} = require('sequelize')
const defaultImgUrl = `https://photoshop-kopona.com/uploads/posts/2018-07/1531754924_2.jpg`;
//

module.exports= (sequelize) => {
    sequelize.define('animalImage', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true,
            unique:true
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue:defaultImgUrl,
        },
    },{
        timeStamps:false,
        createdAt:false,
        updatedAt:false,
    })
}