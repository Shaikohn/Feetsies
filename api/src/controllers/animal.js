const {Animal} = require('../db.js')

const errorVar = {
    err: 500,
    message: 'Something went wrong',
}

const notFoundVar = {
    err: 'Any Animal got found, try again later'
}
async function getAllAnimals(req, res) {
    try {
        let animals = await Animal.findAll()
        if(animals.length === 0) {
           return res.status(404).send(notFoundVar)
        } else {
            return res.status(200).send(animals)
        }
    } catch (error) {
        return res.status(500).send(errorVar)
    }
}

async function getAnimalDetail(req, res) {
    let {id, name} = req.params;
    try {
        let animalDetail = await Animal.findOne({
            where: {
                id: id,
                name: name
            }
        })
        if(!animalDetail || animalDetail.length === 0) {
            return res.status(404).send(notFoundVar)
        } else {
            return res.status(200).send(animalDetail)
        
        }

    } catch (error) {
        return res.status(500).send(errorVar)
    }
}





module.exports = {
    getAllAnimals,
    getAnimalDetail,
  
}