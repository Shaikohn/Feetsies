const {
    Cart_item,
    Order_item,
    Purchase_order,
    User
} = require('../../db');

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addPurchaseOrder(req,res){
    let {prods,userId} = body.req; //esto deberia ser un arreglo, de un elemento minimo.
    let po = await Purchase_order.create({userId});
    console.log('log',po);
    /*for (let i = 0; i < prods.length; i++) {
        
    }*/
}