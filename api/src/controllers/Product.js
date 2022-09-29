const {Product} = require('../db');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

async function getProducts(str){
    if(!str){
        let data = await Product.findAll();
        const result = data.map((elem)=>{return elem['dataValues']});
        return result;
    }else{
        str = str.toLowerCase();
        const searchValue = '%'+str+'%';
        const lecture = await Product.findAll({
            where:{
                name:sequelize.where(sequelize.fn('LOWER', sequelize.col('name')),{ //aplico funcion a columna para pasar a minusculas
                    [Op.like]:searchValue
                })
            }
        })
        if(lecture.length > 0){
            const result = lecture.map((elem)=>{return elem['dataValues']});
            return result;
        }else{
            return 'Not found';
        }
    }
}

function writeProducts(){
    let mock = [
        {
            name:'product 1',
        },
        {
            name:'product 2',
        },
        {
            name:'other stuff',
        },
        {
            name:'testing',
        },
        {
            name:'exactString',
        },
    ]
    console.log('Writing products into database...')
    return Product.bulkCreate(mock)
    .then(()=>{console.log('products written into database.')})
    .catch((e)=>{console.log('An error occurred while diet types recipes: ',e)})
}

module.exports={
    writeProducts,
    getProducts
}