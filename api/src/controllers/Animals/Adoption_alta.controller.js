const {Adoption_alta,User} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function deleteAlta(req, res) {
    if (!req.params.altaid) return res.status(400).send(badReq);
    try {
        let alta = await Adoption_alta.destroy({where:{id:req.params.altaid}})
        if(!alta) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function addAlta(req, res) {
    if(
        !req.body.userId ||
        !req.body.name ||
        !req.body.description
    ){
        return res.status(400).send(badReq)
    }
    try {
        const newRow = await Adoption_alta.create({
            name:req.body.name,
            description:req.body.description
        });
        const user = await User.findOne({where:{id:req.body.userId}});
        let aux = await user.addAdoption_alta(newRow);
        return res.status(201).send('Information uploaded succesfully');
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getAltaDetail(req, res) {
    if (!req.params.altaid) return res.status(400).send(badReq);
    try {
        let alta = await Adoption_alta.findOne({where:{id:req.params.altaid}})
        if(!alta) return res.status(404).send(notFound);
        let user = await User.findOne({where:{id:alta.dataValues.userId}})
        if(!user) return res.status(404).send(notFound);
        result = {
            user:{
                id:user.dataValues.id,
                email:user.dataValues.email,
                phoneNumber:user.dataValues.phone_number,
            },
            alta:{
                id: alta.dataValues.id,
                name: alta.dataValues.name,
                description: alta.dataValues.description,
                read: alta.dataValues.read,
                isImportant: alta.dataValues.isImportant,
                createdAt: alta.dataValues.createdAt,
            }
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getAllAltas(req, res) {
    try {
        let altas = await Adoption_alta.findAll()
        if(!altas || altas.length<1) return res.status(404).send(emptyDB);
        return res.send(altas);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports={
    addAlta,
    deleteAlta,
    getAllAltas,
    getAltaDetail
}