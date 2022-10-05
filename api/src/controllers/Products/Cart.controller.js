const {
    Product,
    User,
    Cart,
} = require("../../db");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addToCart(req, res) {
    let {userId,productId,quantity} = req.body;
    try {
        let cart = await Cart.findOne({where:{userId:userId}});
        let product = await Product.findOne({where:{userId:userId}});
        if(quantity<product.dataValues.stock) return res.status(400).send({err:'Not enough units of that product in stock!'});
    } catch (error) {
        return res.status(500).send(error);
    }
    

}

module.exports = {
    addToCart
};