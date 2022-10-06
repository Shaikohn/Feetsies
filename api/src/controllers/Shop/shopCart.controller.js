const {
    Cart_item,
    Product,
    User
} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function getCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let cartItems = await Cart_item.findAll({where:{userId:req.params.id}})
        //console.log('cart items', cartItems);
        if(!cartItems) return res.status(404).send({err:'There are no items in your cart!'});
        let items = [];
        let total = 0;
        for (let i = 0; i < cartItems.length; i++) {
            let product = await Product.findByPk(cartItems[i].dataValues.productId)
            //console.log(product.dataValues);
            let obj = {}
            obj.productId = product.dataValues.id;
            obj.cartItemid = cartItems[i].dataValues.id;
            obj.name = product.dataValues.name;
            obj.price = product.dataValues.price * cartItems[i].dataValues.quantity;
            obj.quantity = cartItems[i].dataValues.quantity;
            total +=product.dataValues.price * cartItems[i].dataValues.quantity;
            items.push(obj)
        }
        let answer = {items,total};
        return res.status(200).send(answer);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function deleteWholeCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        let cartItems = await Cart_item.destroy({where:{userId:req.params.id}})
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function deleteOneFromCart(req, res) {
    if (!req.params.id) return res.status(400).send(badReq);
    try {
        console.log(req.params.id)
        let cartItem = await Cart_item.destroy({where:{id:req.params.id}})
        return res.sendStatus(200);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function addCart(req,res){
    let {userId,productId,quantity} = req.body;
    try {
        let user = await User.findByPk(userId);
        let product = await Product.findByPk(productId);
        if(quantity>product.dataValues.stock) return res.status(400).send({err:'Not enough units of that product in stock!'});
        let cItem = await user.createCart_item({quantity});
        let rel = await product.setCart_item(cItem);
        return res.sendStatus(200)
    } catch (error) {
        console.log('log',error)
        return res.status(500).send(error);
    }
}

module.exports = {
    addCart,
    deleteOneFromCart,
    deleteWholeCart,
    getCart
}