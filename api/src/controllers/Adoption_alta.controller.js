const {Adoption_alta,User} = require('../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function deleteAlta(req, res) {
    if (!req.body.id) return res.status(400).send(badReq);
    try {
        let alta = await Adoption_alta.destroy({where:{id:req.body.id}})
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

module.exports={
    addAlta,
    deleteAlta
}