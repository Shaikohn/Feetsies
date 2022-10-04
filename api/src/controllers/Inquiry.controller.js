const {Inquiry,User} = require('../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function deleteInquiry(req, res) {
    if (!req.body.id) return res.status(400).send(badReq);
    try {
        let inq = await Inquiry.destroy({where:{id:req.body.id}})
        if(!inq) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function addInquiry(req, res) {
    if(
        !req.body.userId ||
        !req.body.topic ||
        !req.body.description
    ){
        return res.status(400).send(badReq)
    }
    try {
        const newRow = await Inquiry.create({
            topic:req.body.topic,
            description:req.body.description
        });
        const user = await User.findOne({where:{id:req.body.userId}});
        let aux = await user.addInquiry(newRow);
        return res.status(201).send('Information uploaded succesfully');
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getInquiryDetail(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let inq = await Inquiry.findOne({where:{id:req.params.id}})
        if(!inq) return res.status(404).send(notFound);
        let user = await User.findOne({where:{id:inq.dataValues.userId}})
        if(!user) return res.status(404).send(notFound);
        result = {
            user:{
                id:user.dataValues.id,
                email:user.dataValues.email,
                phoneNumber:user.dataValues.phone_number,
            },
            inquiry:{
                id: inq.dataValues.id,
                topic: inq.dataValues.topic,
                description: inq.dataValues.description,
                read: inq.dataValues.read,
                isImportant: inq.dataValues.isImportant,
                createdAt: inq.dataValues.createdAt,
            }
        }
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports={
    addInquiry,
    deleteInquiry,
    getInquiryDetail
}