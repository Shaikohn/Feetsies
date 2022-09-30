const {User} = require('../db');

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

module.exports={
    userInitLoad
}