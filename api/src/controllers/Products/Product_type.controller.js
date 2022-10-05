const {Product_type} = require('../../db');
const emptyDB="Database empty";

async function getAllTypes(req,res){
    try {
        let data = await Product_type.findAll();
        if(!data) return res.status(404).send(emptyDB)
        data = data.map(e=>e.dataValues.name)
        return res.send(data)
    } catch (error) {
        return res.status(500).send(error)
    }
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
    getAllTypes
}