const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {writeAnimalTypes} = require('./src/controllers/Animal_type.controller')
const {writeProductTypes} = require('./src/controllers/Product_type.controller')
const {userInitLoad} = require('./src/controllers/User.controller')
const {
  loadAnimals,
  loadProducts,
  loadPetitions,
  loadUsers,
  loadAltas,
  loadInquiries
} = require('./src/utils/mockLoad')

// Syncing all the models at once.
conn.sync({ force: true })
.then(()=>{return writeAnimalTypes()})
.then(()=>{return writeProductTypes()})
.then(()=>{console.log('+ Writing users in database...'); return loadUsers()})
.then(async ()=>{console.log('- Wrote Users in database.'); console.log('+ Writing products in database...'); await loadProducts()})
.then(()=>{console.log('- Wrote Products in database.'); console.log('+ Writing Animals in database...'); return loadAnimals()})
.then(async ()=>{console.log('- Wrote Animals in database.'),console.log('+ Writing Adoption petitions in database...'); await loadPetitions()})
.then(async ()=>{console.log('- Wrote Adoption petitions in database.'),console.log('+ Writing Adoption altas in database...'); await loadAltas()})
.then(async () => {console.log('- Wrote Adoption altas in database.'),console.log('+ Writing Inquiries in database...'); await loadInquiries()})
.then(() => {console.log('- Wrote Inquiries in database.')})
.then(() => {//Leave force true until we need to deploy. This way, testing datatypes and responses will be easier.
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
