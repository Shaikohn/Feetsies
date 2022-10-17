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
    console.log("these are the values",prods.items, userId)
    if(prods.items.length<1 || !userId)return res.status(500).send(badReq);
    try {
        // crear la orden de compra con id de usuario y total de gasto
        let totalCost = 0;
        for (let i = 0; i < prods.items.length; i++) {
            totalCost += prods.items[i].price
        }
        let po = await Purchase_order.create({total:totalCost,userId:userId})
        console.log('total', totalCost);
        console.log('total', po.dataValues);
        // CREAR ITEMS DE LA ORDEN DE COMPRA Y GUARDARLOS
        for (let i = 0; i < prods.items.length; i++) {
            let newTuple = {
                productName:prods.items[i].name,
                quantity:prods.items[i].quantity,
                subtotal:prods.items[i].price,
                purchaseOrderId: po.id,
                userId:userId
            }
            //console.log("new tuple was: ",newTuple)
            let saveTuple = await Order_item.create(newTuple);
        }
        res.send({success:'Data created successfully'})
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

async function getAllPOs(req,res){
    try {
        let pos = await Purchase_order.findAll({attributes: ['id', 'total','createdAt','userId',]});
        if(pos.length<1)return res.status(404).send(emptyDB);
        return res.status(200).send(pos);
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

module.exports = {
    addPurchaseOrder,
    getAllPOs,
    getPurchaseOrderById,
    getPOByUserId
}