module.exports = app => {
    const ebook = require("../controllers/controller.js");
    var router = require("express").Router();

    // Add new ebook item
    router.post("/", ebook.create);

    // Retrieve all ebook
    router.get("/", ebook.findAll);

    // Retrieve a single ebook with id
    router.get("/:id", ebook.findOne);

    // Update a ebook with id
    router.put("/:id", ebook.update);

    // Delete a ebook with id
    router.delete("/:id", ebook.delete);

    // Delete all ebook
    router.delete("/", ebook.deleteAll);

    app.use('/api/ebook', router);
};