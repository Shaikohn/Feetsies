const {Animal} = require('../db.js')
const {Op} = require('sequelize')

const errorVar = {
    err: 500,
    message: 'Something went wrong',
}

const notFoundVar = {
    err: 'No animal was found, try again later'
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
    let {id} = req.params;
   
    try {
        let animalDetail = await Animal.findOne({
            where: {
                id: id
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

async function createAnimal(req,res) {
    let {name, description, sex, breed, size, age} = req.body
    
    try {
        let newAnimal = await Animal.create({
            name: name,
            description: description,
            size: size,
            sex: sex,
            breed: breed,
            age: age
        })
        return res.status(201).send(newAnimal)
    } catch (error) {
        return res.status(500).send(errorVar)
    }
}

async function delateAnimal(req,res) {
    let {id} = req.params
    try {
        let queryAnimal = await Animal.findOne({
            where: {
                id: id
            }
        })
        if (queryAnimal.length === 0 || !queryAnimal) {
            return res.status(404).send(notFoundVar)
        } else {
            queryAnimal.destroy()
            res.status(204).json({
                msg: 'The content has been deleted successfully'
            })
        }
    } catch (error) {
        res.status(500).send(errorVar)
    }
}

async function searchAnimal(req, res) {
    let {search} = req.query
    try {
        let queryAnimal = await Animal.findAll({
            where: {
                [Op.and]: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    },
                    size: {
                        [Op.iLike]: `%${search}%`
                    },
                    sex: {
                        [Op.iLike]: `%${search}`
                    }, 
                    breed: {
                        [Op.iLike]: `%${search}`
                    },
                    age: {
                        [Op.iLike]: `%${search}`
                    }
                }
            }
        })
        if(queryAnimal.length === 0 || !queryAnimal) {
            return res.status(404).send(notFoundVar)
        } else {
            return res.status(200).send(queryAnimal)
        }
    } catch (error) {
         return res.status(500).send(errorVar)
    }
}






module.exports = {
    getAllAnimals,
    getAnimalDetail,
    createAnimal,
    delateAnimal,
    searchAnimal

}