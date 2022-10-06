const {User} = require('../../db.js');
const bcrypt = require('bcryptjs');


async function createUser(req,res) {
    const {email, password,name,lastName} = req.body;
    try {
        if(email && password){
            const hashPassword = await bcrypt.hash(password,8)
            await User.create({
                    email,
                    password:hashPassword,
                    name,
                    lastName
                })
         return res.status(200).send("User create succesfull")
        }
        else{
            throw new Error("Complete both fields")
        }
    } catch (error) {
        return res.status(404).send(error.message)
    }
    
}

module.exports={
    createUser
}