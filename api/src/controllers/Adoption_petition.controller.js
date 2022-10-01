const {Adoption_petition} = require('../db');
const {User} = require('../db');

async function addPetition(req, res) {
    const userId = req.body.userId;
    const obj = {
        topic:req.body.topic,
        description:req.body.description
    }
    try {
        const newRow = await Adoption_petition.create(obj);
        const user = await User.findOne({where:{id:userId}});
        let aux = await user.addAdoption_petition(newRow);
        return res.status(201).send('Information uploaded succesfully');
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}

module.exports={addPetition}








