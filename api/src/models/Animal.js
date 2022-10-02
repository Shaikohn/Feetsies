const {DataTypes} = require('sequelize')
const defaultpic = `https://photoshop-kopona.com/uploads/posts/2018-07/1531754924_2.jpg`;
//
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
        animal_typeId: {
            type: DataTypes.INTEGER,
            defaultValue:4,
        },
        main_image:{
            type: DataTypes.TEXT,
            defaultValue:defaultpic,
        }
    },{
        timeStamps:false,
        createdAt:false,
    })
}