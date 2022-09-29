const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {writeProducts,getProducts} = require('./src/controllers/Product')

// Syncing all the models at once.
conn.sync({ force: true })
.then(()=>{return writeProducts()})
.then(() => {//Leave force true until we need to deploy. This way, testing datatypes and responses will be easier.
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
