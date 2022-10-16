const {Review,Order_item,Product/*borrar product una vez refactoreadas las tablas*/} = require('../../db');

const serverError = {err:`Something happened and the request couldn't be completed`}

async function addReviewToProduct(req,res){
    const {userId, productName , review, score} = req.body;
    try {
        //consigo id del producto
        let product = await Product.findOne({
            where:{
                name:productName
            }
        })
        let prodId = product.dataValues.id;
        //chequear que el usuario no haya añadido review de este producto
        let isReviewed = await Review.findOne({
            where:{
                userId:userId,
                productId:prodId
            }
        })
        if(isReviewed) return res.status(400).send({err:'You can only review a product once.'})
        //chequear que el usuario haya comprado el producto
        let isBought = await Order_item.findOne({
            where:{
                userId:userId,
                productName:productName
            }
        })
        if(!isBought) return res.status(400).send({err:'You must buy this product in order to review it.'})
        //guardar review
        let result = await Review.create({
            userId:userId,
            productId:prodId,
            review:review,
            score:score
        })
        return res.status(201).send({success:'Review created.'})
    } catch (error) {
        console.log(error)
        return res.status(500).send(serverError)
    }
}

getMyReviews

async function addReviewToProduct(req,res){
    const {userId} = req.params;
}

module.exports={
    addReviewToProduct,
    getMyReviews
}