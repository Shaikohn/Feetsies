const {User} = require('../../db.js');
const bcrypt = require('bcryptjs');
const {tokenSign} = require('../../utils/User/generateToken.js');

async function createUser(req,res) {
    const {email, password,name,lastName} = req.body;
    try {
        if(email && password){
            const hashPassword = await bcrypt.hash(password,8)
            const user = await User.create({
                    email,
                    password:hashPassword,
                    name,
                    lastName
                })
            const token = await tokenSign(user)
         return res.status(200).send({response:"User create succesfull", token})
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