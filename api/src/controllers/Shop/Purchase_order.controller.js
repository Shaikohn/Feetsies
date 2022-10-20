const {
  Cart_item,
  Order_item,
  Product,
  Purchase_order,
  User,
} = require("../../db");

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function addPurchaseOrder(req, res) {
  let { prods, userId } = req.body; //esto deberia ser un arreglo, de un elemento minimo.
  console.log("these are the values", prods, userId);
  if (prods.items.length < 1 || !userId) return res.status(400).send(badReq);
  try {
    //verifica stock de todos los elementos de la orden de compra
    let noStockFlag = false;
    let productStockFail = [];
    for (let i = 0; i < prods.items.length; i++) {
      let product = await Product.findByPk(prods.items[i].productId);
      if (product.stock < prods.items[i].quantity) {
        noStockFlag = true;
        productStockFail.push(prods.items[i].name);
      }
    }
    if (noStockFlag)
      return res
        .status(500)
        .send({
          err: `We don't have enough units of the following products: ${productStockFail}. Please change the quantities of you purchase order or try again later`,
        });
    // crear la orden de compra con id de usuario, total de gasto y restar stock de productos
    let totalCost = 0;
    for (let i = 0; i < prods.items.length; i++) {
      totalCost += prods.items[i].price;
      let product = await Product.findByPk(prods.items[i].productId);
      product.stock =
        parseInt(product.stock) - parseInt(prods.items[i].quantity);
      await product.save();
    }
    let po = await Purchase_order.create({ total: totalCost, userId: userId });
    console.log("total", totalCost);
    console.log("total", po.dataValues);
    // CREAR ITEMS DE LA ORDEN DE COMPRA Y GUARDARLOS
    for (let i = 0; i < prods.items.length; i++) {
      let newTuple = {
        productName: prods.items[i].name,
        quantity: prods.items[i].quantity,
        subtotal: prods.items[i].price,
        purchaseOrderId: po.id,
        userId: userId,
      };
      //console.log("new tuple was: ",newTuple)
      let saveTuple = await Order_item.create(newTuple);
    }
    res.send({ success: "Data created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function addOnePurchaseOrder(req, res) {
  let { prods, userId } = req.body; //esto deberia ser un arreglo, de un elemento minimo.
  console.log("these are the values", prods, userId);
  if (prods.length < 1 || !userId) return res.status(500).send(badReq);
  try {
    let product = await Product.findByPk(prods.id);
    if (product.stock - 1 < 0)
      return res
        .status(500)
        .send({
          err: `We don't have enough units of ${product.name}.Please change the quantities of your purchase or try again later`,
        });
    // crear la orden de compra con id de usuario y total de gasto
    let totalCost = prods.price;
    let po = await Purchase_order.create({ total: totalCost, userId: userId });
    product.stock = product.stock - 1;
    await product.save();
    //console.log('total', totalCost);
    //console.log('total', po.dataValues);
    //CREAR ITEMS DE LA ORDEN DE COMPRA Y GUARDARLOS
    let newTuple = {
      productName: prods.name,
      quantity: 1,
      subtotal: prods.price,
      purchaseOrderId: po.id,
      userId: userId,
    };
    let saveTuple = await Order_item.create(newTuple);
    res.send({ success: "Data created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function getPurchaseOrderById(req, res) {
  try {
    let { orderid } = req.params;
    let po = await Purchase_order.findByPk(orderid);
    let prods = await Order_item.findAll({
      where: { purchaseOrderId: orderid },
    });
    let result = { order: po, elements: prods };
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function getPOByUserId(req, res) {
  try {
    let { userid } = req.params;
    let pos = await Purchase_order.findAll({ where: { userId: userid } });
    if (pos.length < 1) return res.status(404).send(notFound);
    return res.status(200).send(pos);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function getAllPOs(req, res) {
  try {
    let pos = await Purchase_order.findAll({
      attributes: ["id", "total", "createdAt", "userId"],
      include: User,
    });
    if (pos.length < 1) return res.status(404).send(emptyDB);
    return res.status(200).send(pos);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

module.exports = {
  addPurchaseOrder,
  getAllPOs,
  getPurchaseOrderById,
  getPOByUserId,
  addOnePurchaseOrder,
};
