const {Product,Product_type,Animal_type} = require('../db');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

async function getProducts(str){
    if(!str){
        let data = await Product.findAll();
        return data;
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
            name:'Cat Hat',
        },
        {
            name:'Doggo mix',
        },
        {
            name:'Hamster wheel',
        },
        {
            name:'testing',
        },
        {
            name:'exactString',
        },
    ]
    console.log('+ Writing products into database...')
    return Product.bulkCreate(mock)
    .then(()=>{console.log('- Wrote products  into database.')})
    .catch((e)=>{console.log('An error occurred while diet types recipes: ',e)})
}

async function initialRelations(){
    let product = await Product.findOne({where:{name:'Cat Hat'}});
    let productType = await Product_type.findOne({where:{name:'Clothing'}});
    let animalType = await Animal_type.findOne({where:{name:'Cat'}});
    product.addProduct_types(productType);
    product.addAnimal_types(animalType);
    product = await Product.findOne({where:{name:'Doggo mix'}});
    productType = await Product_type.findOne({where:{name:'Food'}});
    animalType = await Animal_type.findOne({where:{name:'Dog'}});
    product.addProduct_types(productType);
    product.addAnimal_types(animalType);
    product = await Product.findOne({where:{name:'Hamster wheel'}});
    productType = await Product_type.findOne({where:{name:'Toy'}});
    animalType = await Animal_type.findOne({where:{name:'Rodent'}});
    product.addAnimal_types(animalType);
    product.addProduct_types(productType);
    product = await Product.findOne({where:{name:'testing'}});
    productType = await Product_type.findAll();
    animalType = await Animal_type.findAll();
    product.addAnimal_types(animalType);
}

module.exports={
    writeProducts,
    getProducts,
    initialRelations
}