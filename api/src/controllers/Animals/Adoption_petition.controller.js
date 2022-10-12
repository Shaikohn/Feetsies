const {Adoption_petition, User, Animal} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addPetition(req, res) {
    let {userId, animId} = req.body
    try {
        const newRow = await Adoption_petition.create({
            topic: topic,
            description: description,
            include: [User, Animal]
        });

        const user = await User.findOne({
            where: {
                id: userId 
            }
        });
        await user.addAdoption_petition(newRow);
        let anim = await Animal.findOne({ 
            where: {
                id: animId
            }
        });
        await anim.addAdoption_petition(newRow);
        return res.status(201).send('Information uploaded succesfully');
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

async function deletePetition(req, res) {
    let {petitionid} = req.body
    if (!petitionid) return res.status(400).send(badReq);
    try {
        let petition = await Adoption_petition.findOne({
                where: {
                    id: petitionid
                }
            })
        if(!petition) return res.status(404).send(notFound);
        await petition.destroy()
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getPetitionDetail(req, res) {
    let {petitionid} = req.params
    if (!petitionid) return res.status(400).send(badReq);
    try {
        let petition = await Adoption_petition.findOne({
                where: {
                    id: petitionid
                },
                include:[Animal, User]})
        if(!petition) return res.status(404).send(notFound);
        petition.user.password = '********';
        return res.status(200).send(petition);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getAllPetitions(req, res) {
    try {
        let petitions = await Adoption_petition.findAll({include:[Animal, User]})
        if(!petitions || petitions.length<1) return res.status(404).send(emptyDB);
        return res.send(petitions);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function setPetitionAsRead(req,res){
    let {petitionid} = req.params
    console.log(req.params)
    if(!petitionid)return res.status(400).send(badReq);
    try {
        let petition = await Adoption_petition.findOne({
            where: {
                id: petitionid
            }
        });
        petition.read = true;
        await petition.save()
        return res.status(200).send({success:"Petition set as read"});
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function toggleImportantPetition(req,res){
    let {petitionid} = req.params
    if(!petitionid)return res.status(400).send(badReq);
    try {
        let petition = Adoption_petition.findOne({
            where: {
                id: petitionid
            }
        });
        petition.isImportant = !petition.isImportant;
        await petition.save()
        return res.status(200).send({success:"Petition important status changed"});
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports={
    addPetition,
    deletePetition,
    getAllPetitions,
    getPetitionDetail,
    setPetitionAsRead,
    toggleImportantPetition
}








