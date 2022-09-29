const {Product_type} = require('../db');

async function getTypes(){
    let data = await Product_type.findAll();
    return  data;
}

function writeProductTypes(){
    let mock = [
        {
            name:'Food',
        },
        {
            name:'Toy',
        },
        {
            name:'Clothing',
        },
        {
            name:'Other',
        }
    ]
    console.log('+ Writing ProductTypes into database...')
    return Product_type.bulkCreate(mock)
    .then(()=>{console.log('- Wrote ProductTypes into database.')})
    .catch((e)=>{console.log('An error occurred while ProductTypes: ',e)})
}

module.exports={
    writeProductTypes,
    getTypes
}