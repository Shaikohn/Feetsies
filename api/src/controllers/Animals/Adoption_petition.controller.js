const {Adoption_petition,User,Animal} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addPetition(req, res) {
    const userId = req.body.userId;
    const animId = req.body.animId;
    const obj = {
        topic:req.body.topic,
        description:req.body.description
    }
    try {
        const newRow = await Adoption_petition.create(obj);
        const user = await User.findOne({where:{id:userId}});
        let aux = await user.addAdoption_petition(newRow);
        let anim = await Animal.findOne({where:{id:animId}});
        let aux2 = await anim.addAdoption_petition(newRow);
        return res.status(201).send('Information uploaded succesfully');
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

async function deletePetition(req, res) {
    if (!req.body.id) return res.status(400).send(badReq);
    try {
        let petition = await Adoption_petition.destroy({where:{id:req.body.id}})
        if(!petition) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getPetitionDetail(req, res) {
    if (!req.params.petitionid) return res.status(400).send(badReq);
    try {
        let petition = await Adoption_petition.findOne({where:{id:req.params.petitionid}})
        if(!petition) return res.status(404).send(notFound);
        let animal = await Animal.findOne({where:{id:petition.dataValues.animalId}})
        if(!animal) return res.status(404).send(notFound);
        let user = await User.findOne({where:{id:petition.dataValues.userId}})
        if(!user) return res.status(404).send(notFound);
        result = {
            user:{
                id:user.dataValues.id,
                email:user.dataValues.email,
                phoneNumber:user.dataValues.phone_number,
            },
            animal:{
                id:animal.dataValues.id,
                name:animal.dataValues.name,
                main_image:animal.dataValues.main_image
            },
            petition:{
                id: petition.dataValues.id,
                topic: petition.dataValues.topic,
                description: petition.dataValues.description,
                read: petition.dataValues.read,
                isImportant: petition.dataValues.isImportant,
                createdAt: petition.dataValues.createdAt,
            }
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getAllPetitions(req, res) {
    try {
        let petitions = await Adoption_petition.findAll()
        if(!petitions || petitions.length<1) return res.status(404).send(emptyDB);
        return res.send(petitions);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports={
    addPetition,
    deletePetition,
    getAllPetitions,
    getPetitionDetail
}








