const {Inquiry,User} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function deleteInquiry(req, res) {
    let {id} = req.params
    if (!id) return res.status(400).send(badReq);
    try {
        let inq = await Inquiry.findOne({
            where: { 
                id:id
            }
        })

        await inq.destroy()
        if(!inq) return res.status(404).send(notFound);
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function getAllInquiries(req, res) {

    try {
        let inqs = await Inquiry.findAll({include: User})
        if(!inqs || inqs.length<1) return res.status(404).send(emptyDB);
        return res.send(inqs);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function addInquiry(req, res) {
    let {userId, topic, description} = req.body
    if(
        !userId ||
        !topic ||
        !description
    ){
        return res.status(400).send(badReq)
    }
    try {
        const newRow = await Inquiry.create({
            topic: topic,
            description: description
        });
        const user = await User.findOne({
            where: {
                id: userId
            }
        });
        await user.addInquiry(newRow);
        return res.status(201).send('Information uploaded succesfully');
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getInquiryDetail(req, res) {
    let {id} = req.oarams
    if (!id) return res.status(400).send(badReq);
    try {
        let inq = await Inquiry.findOne({
            where: {
                id: id
            },
            include: User
        })
        if(!inq) return res.status(404).send(notFound)
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function setInquiryAsRead(req,res){
    if(!req.params.inquiryid)return res.status(400).send(badReq);
    try {
        let inq = Inquiry.findByPk(req.params.inquiryid);
        inq.read = true;
        let aux = await inq.save()
        return res.status(200).send({success:"Inquiry set as read"});
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function toggleImportantInquiry(req,res){
    if(!req.params.inquiryid)return res.status(400).send(badReq);
    try {
        let inq = Inquiry.findByPk(req.params.inquiryid);
        inq.isImportant = !inq.isImportant;
        let aux = await inq.save()
        return res.status(200).send({success:"Inquiry important status changed"});
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports={
    addInquiry,
    deleteInquiry,
    getAllInquiries,
    getInquiryDetail,
    setInquiryAsRead,
    toggleImportantInquiry
}