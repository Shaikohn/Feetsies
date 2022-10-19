const {Animal, Adoption_petition, Animal_type,AnimalImage} = require('../../db.js')
const {Op} = require('sequelize')
const sequelize = require('sequelize')

const errorVar = {
    err: 500,
    message: 'Something went wrong',
}

const notFoundVar = {
    err: 'No animal was found, try again later'
}
async function getAllAnimals(req, res) {
    try {
        //let animals = await Animal.findAll();
        let animals = await Animal.findAll({include:[Animal_type]})
        /*for (let i = 0; i < animals.length; i++) {
            animals[i].main_image = animals[i].animalImages[0].image;
        }*/
        if(animals.length === 0) {
            return res.status(404).send(notFoundVar)
        } else {
            return res.status(200).send(animals)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function getAnimalDetail(req, res) {
    let {id} = req.params;
    try {
        let animalDetail = await Animal.findOne({
            where: {
                id: id
            },
            include: [Animal_type, Adoption_petition]
        })
        if(!animalDetail || animalDetail.length === 0) {
            return res.status(404).send(notFoundVar)
        } else {
            return res.status(200).send(animalDetail)
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send(errorVar)
    }
}

async function createAnimal(req,res) {
    let {name, description,image, sex, breed, size, age, Types} = req.body
    try {
        let type = await Animal_type.findOne({
            where: {
                name: Types
            }
        });
        let newAnimal = await Animal.create({
            name: name,
            description: description,
            size: size,
            sex: sex,
            breed: breed,
            age: age,
            main_image:image
        })
        await newAnimal.setAnimal_type(type)
        return res.status(201).send(newAnimal)
    } catch (error) {
        console.log(error)
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
    console.log(search);
    let str = search.toLowerCase();
    const searchValue = "%" + str + "%";
    try {
        const queryAnimal = await Animal.findAll({
            where: {
                name: sequelize.where(sequelize.fn("LOWER", sequelize.col("animal.name")), {
                //aplico funcion a columna para pasar a minusculas
                    [Op.like]: searchValue,
                }),
            },
            include: Animal_type
        });
        if(queryAnimal.length === 0 || !queryAnimal) {
            return res.status(404).send(notFoundVar)
        } else {
            return res.status(200).send(queryAnimal)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(errorVar)
    }
}


async function updateAnimal(req, res) {
    let {id} = req.params
    let {name, description} = req.body
    try {
        let queryAnimal = await Animal.findOne({
            where: {
                id: id
            }
        })
        if(queryAnimal.length === 0 || !queryAnimal) {
            return res.status(404).send(notFoundVar)
        } else {
            queryAnimal.name = name
            queryAnimal.description = description
            queryAnimal.save()
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
    searchAnimal,
    updateAnimal

}