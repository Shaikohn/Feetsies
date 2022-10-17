const {
  Review,
  Order_item,
  Product /*borrar product una vez refactoreadas las tablas*/,
} = require("../../db");

const serverError = {
  err: `Something happened and the request couldn't be completed`,
};

async function addReviewToProduct(req, res) {
  const { userId, productName, review, score, author } = req.body;
  try {
    //consigo id del producto
    let product = await Product.findOne({
      where: {
        name: productName,
      },
    });
    let prodId = product.dataValues.id;
    //chequear que el usuario no haya añadido review de este producto
    let isReviewed = await Review.findOne({
      where: {
        userId: userId,
        productId: prodId,
      },
    });
    if (isReviewed)
      return res
        .status(400)
        .send({ err: "You can only review a product once." });
    //chequear que el usuario haya comprado el producto
    let isBought = await Order_item.findOne({
      where: {
        userId: userId,
        productName: productName,
      },
    });
    if (!isBought)
      return res
        .status(400)
        .send({ err: "You must buy this product in order to review it." });
    //guardar review
    let result = await Review.create({
      userId: userId,
      productId: prodId,
      review: review,
      score: score,
      author,
    });
    return res.status(201).send({ success: "Review created." });
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError);
  }
}

async function getMyReviews(req, res) {
  const { userId } = req.params;
  try {
    let revData = await Review.findAll({ where: { userId: userId } });
    if (!revData || revData.length < 1)
      return res
        .status(404)
        .send({ warning: "There are no reviews available." });
    let result = [];
    for (let i = 0; i < revData.length; i++) {
      let item = await Product.findOne({ where: { id: revData[i].productId } });
      result.push({
        reviewId: revData[i].id,
        score: revData[i].score,
        productName: item.name,
        comment: revData[i].review,
      });
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(serverError);
  }
}

module.exports = {
  addReviewToProduct,
  getMyReviews,
};
