const {
  Product,
  ProductImage,
  Product_type,
  Animal_type,
  Review
} = require("../../db");
const { Op, Sequelize } = require("sequelize");
const sequelize = require("sequelize");

const emptyDB = { err: "Database empty" };
const badReq = { err: "Bad request" };
const notFound = { err: "Not Found" };

async function getAllProducts(req, res) {
  try {
    let data = await Product.findAll({include:ProductImage});
    let result = [];
    for (let i = 0; i < data.length; i++) {
      result.push(await createElementWithTypes(data[i]));
    }
    if (result.length < 0) return res.status(404).send(emptyDB);
    return res.send(result);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function searchProducts(req, res) {
  if (!req.query.str) return res.status(400).send("Bad request");
  let str = req.query.str.toLowerCase();
  const searchValue = "%" + str + "%";
  try {
    const lecture = await Product.findAll({
      where: {
        name: sequelize.where(sequelize.fn("LOWER", sequelize.col("name")), {
          //aplico funcion a columna para pasar a minusculas
          [Op.like]: searchValue,
        }),
      },
      include:ProductImage 
    });
    if (lecture.length > 0) {
      let result = [];
      for (let i = 0; i < lecture.length; i++) {
        result.push(await createElementWithTypes(lecture[i]));
      }
      return res.send(result);
    } else {
      return res.status(404).send(notFound);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function getDetail(req, res) {
  if (!req.params.id) {
    return res.status(400).send("Bad request");
  }
  try {
    let reg = await Product.findOne({ where: { id: req.params.id },include:ProductImage });
    if (!reg) return res.status(400).send(notFound);
    //console.log('logging reg', reg.dataValues);
    let aux = await createElementWithTypes(reg);
    //console.log('logging aux', aux);
    return res.send(aux);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function createProduct(req, res) {
  //console.log(req.body)
  const { name, description, price } = req.body;
  if (!name || !description || !price) return res.status(400).send(badReq);
  let obj = { name, description, price };
  const { stock, imgToUse, productTypes, animalTypes } = req.body;
  if (stock) obj.stock = stock;
  if (!productTypes || productTypes.length > 0) {
    obj.productTypes = ["Other"];
  } else {
    obj.productTypes = productTypes;
  }
  if (!animalTypes || animalTypes.length > 0) {
    obj.animalTypes = ["Other"];
  } else {
    obj.animalTypes = animalTypes;
  }
  
  try {
    let newProd = await Product.create(obj);
    if(imgToUse.length>0){
      let productImages=[];
      for (let i = 0; i < imgToUse.length; i++) {
          productImages.push({image:imgToUse[i].dataURL});  
        }
      let pictures = await ProductImage.bulkCreate(productImages)  
      let x = await newProd.addProductImages(pictures)
    }else{
      let d = await newProd.createProductImage({})
    }
    //const imgs = await Product.addImage
    for (let i = 0; i < obj.animalTypes.length; i++) {
      const aType = await Animal_type.findOne({
        where: { name: obj.animalTypes[i] },
      });
      const aux = await newProd.addAnimal_types(aType);
    }
    for (let i = 0; i < obj.productTypes.length; i++) {
      const pType = await Product_type.findOne({
        where: { name: obj.productTypes[i] },
      });
      const aux = await newProd.addProduct_types(pType);
    }
    const reg = await Product.findOne({ where: { name: obj.name } });
    return res.status(201).send(reg);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}

async function createElementWithTypes(element) {
  try{
    let productTypes = await element.getProduct_types();
    let animalTypes = await element.getAnimal_types();
    //console.log('the element content is as follows', element)
    //console.log('the productimage content is as follows', element.dataValues.productImages);
    //console.log('sub zero', element.dataValues.productImages[0]);
    //console.log('this is the failing product', element)
    //console.log('the image url should be this one ', element.dataValues.productImages[0].dataValues.image);
    element.dataValues.image = element.dataValues.productImages[0].dataValues.image;
    let value=0;
    let divideBy=0;
    let avg = await Review.findAll({where:{productId:element.id}})
    let revs;
    if (avg.length<1){
      revs=[];
    }else{
      revs=[...avg];
    }

    for (let i = 0; i < avg.length; i++) {
      divideBy++;
      value += avg[i].dataValues.score;
    }
    if(value!==0){
      avg = value / divideBy;
    }else{
      avg=0;
    }
    productTypes = productTypes.map((e) => e.dataValues.name);
    animalTypes = animalTypes.map((e) => e.dataValues.name);
    return {
      ...element.dataValues,
      productTypes,
      animalTypes,
      revs,
      avg
    };
  }catch(error){
    console.log(error)
    return false;
  }
}

async function updateProduct(req, res) {
  if (!req.params.id) return res.status(400).send(badReq);
  const { name, description, price } = req.body;
  if (!name || !description || !price) return res.status(400).send(badReq);
  let obj = { name, description, price };
  const { stock, image, productTypes, animalTypes } = req.body;
  if (stock) obj.stock = stock;
  if (image) obj.image = image;
  if (!productTypes || productTypes.length > 0) {
    obj.productTypes = ["Other"];
  } else {
    obj.productTypes = productTypes;
  }
  if (!animalTypes || animalTypes.length > 0) {
    obj.animalTypes = ["Other"];
  } else {
    obj.animalTypes = animalTypes;
  }
  try {
    const reg = await Product.findOne({ where: { id: req.params.id } });
    if (!reg) return res.status(400).send(notFound);
    const aux = await reg.update(obj);
    const prod = await Product.findOne({ where: { id: req.params.id } });
    await prod.setAnimal_types([]);
    await prod.setProduct_types([]);
    for (let i = 0; i < obj.animalTypes.length; i++) {
      const aType = await Animal_type.findOne({
        where: { name: obj.animalTypes[i] },
      });
      const aux = await prod.addAnimal_types(aType);
    }
    for (let i = 0; i < obj.productTypes.length; i++) {
      const pType = await Product_type.findOne({
        where: { name: obj.productTypes[i] },
      });
      const aux = await prod.addProduct_types(pType);
    }
    return res.send(prod);
  } catch (error) {
    return res.status(500).send(error);
  }
}

async function deleteProduct(req, res) {
  if (!req.params.id) return res.status(400).send(badReq);
  try {
    const prod = await Product.destroy({where:{id:req.params.id}})
    if(!prod) return res.status(404).send(notFound);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  getDetail,
  searchProducts,
  updateProduct,
  deleteProduct
};
