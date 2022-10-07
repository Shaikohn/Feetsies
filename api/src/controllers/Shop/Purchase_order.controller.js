const {
    Cart_item,
    Order_item,
    Product,
    Purchase_order,
    User
} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addPurchaseOrder(req,res){
    let {prods,userId} = req.body; //esto deberia ser un arreglo, de un elemento minimo.
    if(prods.length<1 || !userId)return res.status(500).send(badReq);
    try {
        let po = await Purchase_order.create({userId});
        let orderItems = [];
        let total = 0;
        for (let i = 0; i < prods.length; i++) {
            let product = await Product.findByPk(prods[i].productId)
            if (product.dataValues.stock<prods[i].quantity) return res.status(500).send({err:`There are not enough ${prods[i].name} in stock. Remove item from cart or try again later`});
            let obj = {};
            obj.productName = prods[i].name;
            obj.quantity = prods[i].quantity
            obj.subtotal = prods[i].price
            obj.purchaseOrderId = po.dataValues.id;
            orderItems.push(obj);
            total += prods[i].price;
        }
        Order_item.bulkCreate(orderItems);
        po.total = total;
        po.save();
        return res.status(201).send(po);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getPurchaseOrderById(req,res){
    try {
        let {orderid} = req.params;
        let po = await Purchase_order.findByPk(orderid);
        let prods = await Order_item.findAll({where:{purchaseOrderId:orderid}})
        let result = {order:po,elements:prods}
        return res.status(200).send(result);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

async function getPOByUserId(req,res){
    try {
        let {userid} = req.params;
        let pos = await Purchase_order.findAll({where:{userId:userid}});
        if(pos.length<1)return res.status(404).send(notFound);
        return res.status(200).send(pos);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports = {
    addPurchaseOrder,
    getPurchaseOrderById,
    getPOByUserId
}