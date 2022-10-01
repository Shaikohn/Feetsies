const {Animal_type} = require('../db');

const errorVar = {
    err: 500,
    message: 'Something went wrong...',
}
//
const emptyDB = {
    err: 'Database is empty'
}

async function getAllTypes(req, res) {
    try {
        let data = await Animal_type.findAll()
        if(!data) {
            return res.status(404).send(emptyDB)
        } else {
            data = data.map(e=>e['dataValues'].name)
            return res.send(data)
        }
    } catch (error) {
        return res.status(500).send(errorVar)
    }
}

function writeAnimalTypes(){
    let mock = [
        {
            name:'Dog',
        },
        {
            name:'Cat',
        },
        {
            name:'Rodent',
        },
        {
            name:'Other',
        }
    ]
    console.log('+ Writing animal types into database...')
    return Animal_type.bulkCreate(mock)
    .then(()=>{console.log('- Wrote animal types into database.')})
    .catch((e)=>{console.log('An error occurred while animal types: ',e)})
}

module.exports={
    writeAnimalTypes,
    getAllTypes
}