module.exports = app => {
    const flat = require("../controllers/flat.controller.js");

    var router = require("express").Router();

    // Create a new flat
    router.post("/", flat.create);

    // Retrieve all flat
    router.get("/", flat.findAll);

    router.get("/Ids",flat.findAllIds);

    // // Retrieve all published flat
    // router.get("/published", flat.findAllPublished);

    // Retrieve a single flat with fId
    router.get("/:fId", flat.findOne);

    // Update a flat with fId
    router.put("/:fId", flat.update);

    // Delete a flat with fId
    router.delete("/:fId", flat.delete);

    // 
    router.delete("/", flat.deleteAll);

    app.use('/api/flat', router);
};