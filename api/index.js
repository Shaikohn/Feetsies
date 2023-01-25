const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const {
  writeAnimalTypes,
} = require("./src/controllers/Animals/Animal_type.controller");
const {
  writeProductTypes,
} = require("./src/controllers/Products/Product_type.controller");
const {
  loadAnimals,
  loadProducts,
  loadPetitions,
  loadUsers,
  loadAltas,
  loadInquiries,
  loadCarts,
} = require("./src/utils/mockLoad");

// Syncing all the models at once.
conn
  .sync({ force: false })
  /* .then(() => {
    return writeAnimalTypes();
  })
  .then(() => {
    return writeProductTypes();
  })
  .then(() => {
    console.log("+ Writing users in database...");
    return loadUsers();
  })
  .then(() => {
    console.log("- Wrote Users in database.");
    console.log("+ Writing products in database...");
    return loadProducts();
  })
 .then(() => {
    console.log("- Wrote Products in database.");
    console.log("+ Writing Animals in database...");
    return loadAnimals();
  })
  .then(async () => {
    console.log("- Wrote Animals in database."),
      console.log("+ Writing Adoption petitions in database...");
    await loadPetitions();
  })
  .then(async () => {
    console.log("- Wrote Adoption petitions in database."),
      console.log("+ Writing Adoption altas in database...");
    await loadAltas();
  })
  .then(async () => {
    console.log("- Wrote Adoption altas in database."),
      console.log("+ Writing Inquiries in database...");
    await loadInquiries();
  })
  .then(async () => {
    console.log("- Wrote Inquiries in database."),
      console.log("+ Writing Cart items in database...");
    await loadCarts();
  })
  .then(() => {
    console.log("- Wrote Cart items in database.");
  }) */
  .then(() => {
    //Leave force true until we need to deploy. This way, testing datatypes and responses will be easier.
    server.listen(process.env.PORT || 3001, () => {
      console.log("%s listening at 3001"); // eslint-disable-line no-console
    });
  });
