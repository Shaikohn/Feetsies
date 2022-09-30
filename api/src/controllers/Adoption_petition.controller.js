const {Adoption_petition} = require('../db');
const {User} = require('../db');

async function addPetition(userId,obj){
    try {
        const newRow = await Adoption_petition.create(obj);
        const user = await User.findOne({where:{id:userId}});
        let aux = await user.addAdoption_petition(newRow);
        return 'Information uploaded succesfully';
    } catch (error) {
        console.log(error)
        return error;
    }
}

module.exports={addPetition}








