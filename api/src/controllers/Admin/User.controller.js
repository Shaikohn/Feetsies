const { where } = require('sequelize');
const {
    User,
} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addUser(req, res) {
    if (
        !req.body.email ||
        !req.body.password
        )
    return res.status(400).send(badReq);
    let newRow = {
        email:req.body.email,
        password:req.body.password,
        phone_number:req.body.phone_number,
        location:req.body.location
    }
    try {
        let user = await User.create(newRow)
        if(!user) return res.status(500).send({err:'An error ocurred while creating user...'});
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
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

async function updateUser(req, res) {
    let {id, email, password,phone_number,location} = req.body
    try {
        let user = await User.findOne({
            where: {
                id: id
            }
        })
        if(user.length === 0 || !user) {
            return res.status(404).send(notFoundVar)
        } else {
            if(email)user.email = email
            if(password)user.password = password
            if(phone_number)user.phone_number = phone_number
            if(location)user.location = location
            user.save()
            return res.status(200).send('User Updated.')
        }
    } catch (error) {
        return res.status(500).send(errorVar)
    }
}

async function getUserDetail(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let user = await User.findOne({where:{id:req.params.id}})
        if(!user) return res.status(404).send(notFound);
        result = {
                id:user.dataValues.id,
                email:user.dataValues.email,
                phoneNumber:user.dataValues.phone_number,
                location:user.dataValues.location,
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports={
    addUser,
    deleteUser,
    getUserDetail,
    updateUser,
}