module.exports = app => {
  const controllers = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", controllers.create);

  // Retrieve all controllers
  router.post("/findAllByPage", controllers.findAllByPage);

  router.post("/findByOwner", controllers.findByOwner);

  // // Retrieve all published controllers
  // router.get("/published", controllers.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", controllers.findOne);

  // // Update a Tutorial with id
  // router.put("/:id", controllers.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", controllers.delete);

  // // Create a new Tutorial
  // router.delete("/", controllers.deleteAll);

  app.use("/api/yeve", router);
};
