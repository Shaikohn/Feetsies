const {User} = require('../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function userInitLoad(){
    const aux = [
        {
            email:'lioandres@afa.com',
            password:'lapelotaal10',
        },
        {
            email:'linustorvalds@mit.com',
            password:'vamoslinux',
        },
        {
            email:'succaritas@evilcorp.com',
            password:'nosoyunlagarto',
        }
    ]
    console.log('+ Writing mock Users into database...')
    return User.bulkCreate(aux)
    .then(()=>{console.log('- Wrote mock Users into database.')})
    .catch((e)=>{console.log('An error occurred while mock Users: ',e)})
}

async function deleteUser(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let user = await User.destroy({where:{id:req.params.id}})
        if(!user) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports={
    userInitLoad,
    deleteUser
}