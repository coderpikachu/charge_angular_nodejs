module.exports = app => {
    const dormitory = require("../controllers/dormitory.controller.js");

    var router = require("express").Router();

    // Create a new dormitory
    router.post("/", dormitory.create);

    // Retrieve all dormitory
    router.get("/", dormitory.findAll);

    // // Retrieve all published dormitory
    // router.get("/published", dormitory.findAllPublished);

    // Retrieve a single dormitory with dId
    router.get("/:dId", dormitory.findOne);

    // Update a dormitory with dId
    router.put("/:dId", dormitory.update);

    // Delete a dormitory with dId
    router.delete("/:dId", dormitory.delete);

    // 
    router.delete("/", dormitory.deleteAll);

    app.use('/api/dormitory', router);
};