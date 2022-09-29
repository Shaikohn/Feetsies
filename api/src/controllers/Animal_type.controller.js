const {Animal_type} = require('../db');

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
}