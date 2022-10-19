require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
//const Review = require('./models/Review');
const {
  DB_USER, DB_PASSWORD, DB_HOST,DB_NAME,
} = process.env;

let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
            
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
      host:'localhost',
      dialect:'postgres',
      dialectOptions:{
        useUTC: false
      },
      timeZone:'-03:00',
      logging:false,
    });

/*const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});*/
const basename = path.basename(__filename);

const modelDefiners = [];


fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Adoption_alta,
  Adoption_petition,
  Animal,
  AnimalImage,
  Animal_type,
  Cart_item, 
  Inquiry,
  Order_item,
  Product,
  Product_animal_type,
  Product_cart_item,
  ProductImage,
  Product_product_type,
  Product_type,
  Purchase_order,
  Review,
  User,
} = sequelize.models;

// Relations

Product.belongsToMany(Animal_type,{through:'product_animal_types'});
Animal_type.belongsToMany(Product,{through:'product_animal_types'});
Product.belongsToMany(Product_type,{through:'product_product_types'});
Product_type.belongsToMany(Product,{through:'product_product_types'});
/////////////
User.hasMany(Adoption_petition);
Adoption_petition.belongsTo(User);
////////////////////////////////////////
Animal.hasMany(Adoption_petition);
Adoption_petition.belongsTo(Animal);
//////////////////////////////////////
User.hasMany(Adoption_alta);
Adoption_alta.belongsTo(User);
/////////////////////////////////////
User.hasMany(Inquiry);
Inquiry.belongsTo(User);
/////////////////////////////////////
User.hasMany(Cart_item);
Cart_item.belongsTo(User);
/////////////////////////////////////
User.hasMany(Purchase_order);
Purchase_order.belongsTo(User);
// ////////////////////////////////////
//Animal_type.belongsToMany(Animal, {through: 'animal_animalsType'})
//Animal.belongsToMany(Animal_type, )
////////////////////////////////////
Purchase_order.hasMany(Order_item);
Order_item.belongsTo(Purchase_order);
////////////////////////////////////
User.hasMany(Review);
Review.belongsTo(User)
Product.hasMany(Review)
Review.belongsTo(Product)
////////////////////////////////////
Product.hasMany(ProductImage);
ProductImage.belongsTo(Product);
////////////////////////////////////
Animal_type.hasMany(Animal);
Animal.belongsTo(Animal_type);
////////////////////////////////////
Animal.hasMany(AnimalImage);
AnimalImage.belongsTo(Animal);
////////////////////////////////////
module.exports = {
  ...sequelize.models, 
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
