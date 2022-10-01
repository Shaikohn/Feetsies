const {Product,Product_type,Animal_type} = require('../db');
const {Op} = require('sequelize');
const sequelize = require('sequelize');

const emptyDB={err:"Database empty"};
const badReq={err:"Bad request"};
const notFound={err:"Not Found"};

async function getAllProducts(req,res){
        try {
            let data = await Product.findAll();
            let result =[];
            for (let i = 0; i < data.length; i++) {
                result.push(await createElementWithTypes(data[i]))
            }
            if(result.length>0)return res.status(404).send(emptyDB);
            return res.send(result)
        } catch (error) {
            return res.status(500).send(error);
        }

    }
    
async function searchProducts(req,res){
    if(!req.query.str)return res.status(400).send('Bad request');
    let str = req.query.str.toLowerCase();
    const searchValue = '%'+str+'%';
    try {
        const lecture = await Product.findAll({
            where:{
                name:sequelize.where(sequelize.fn('LOWER', sequelize.col('name')),{ //aplico funcion a columna para pasar a minusculas
                    [Op.like]:searchValue
                })
            }
        })
        if(lecture.length > 0){
            let result =[];
            for (let i = 0; i < lecture.length; i++) {
                result.push(await createElementWithTypes(lecture[i]))
            }
            return res.send(result)
        }else{
            return res.status(404).send(notFound)
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

async function getDetail(req,res){
    if(!req.params.id){
        return res.status(400).send('Bad request')
    }
    try {
        let reg = await Product.findOne({where:{id:req.params.id}});
        if(!reg) return res.status(400).send(notFound);
        let aux = await createElementWithTypes(reg);
        return res.send(aux);
    } catch (error) {
        return res.status(500).send(error);
    } 
}

async function createProduct(req,res){
    const {name,description,price} = req.body;
    if(!name || !description || !price) return res.status(400).send(badReq);
    let obj = {name,description,price}
    const {stock,image,productTypes,animalTypes}=req.body;
    if(stock) obj.stock=stock;
    if(image) obj.image=image;
    if(!productTypes || productTypes.length>0){
        obj.productTypes=['Other'];
    }else{
        obj.productTypes=productTypes;
    }
    if(!animalTypes ||animalTypes.length>0){
        obj.animalTypes=['Other'];
    }else{
        obj.animalTypes=animalTypes;
    }
    try {
        const newProd = await Product.create(obj);
        for (let i = 0; i < obj.animalTypes.length; i++) {
            const aType = await Animal_type.findOne({where:{name:obj.animalTypes[i]}});
            const aux = await newProd.addAnimal_types(aType);
        }
        for (let i = 0; i < obj.productTypes.length; i++) {
            const pType = await Product_type.findOne({where:{name:obj.productTypes[i]}});
            const aux = await newProd.addProduct_types(pType);
        }
        const reg = await Product.findOne({where:{name:obj.name}});
        return res.status(201).send(reg);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function createElementWithTypes(element){
    let productTypes = await element.getProduct_types();
    let animalTypes = await element.getAnimal_types();
    productTypes=productTypes.map(e=>e.dataValues.name)
    animalTypes=animalTypes.map(e=>e.dataValues.name)
    return {
        ...element.dataValues,
        productTypes,
        animalTypes
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
    product.addProduct_types(productType);
}

module.exports={
    writeProducts,
    getAllProducts,
    initialRelations,
    createProduct,
    getDetail,
    searchProducts
}