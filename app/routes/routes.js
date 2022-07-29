module.exports = app => {
    const ebooks = require("../controllers/controller.js");
    var router = require("express").Router();

    // Add new ebook item
    router.post("/", ebooks.create);

    // Retrieve all ebook
    router.get("/", ebooks.findAll);

    // Retrieve a single ebook with id
    router.get("/:id", ebooks.findOne);

    // Update a ebook with id
    router.put("/:id", ebooks.update);

    // Delete a ebook with id
    router.delete("/:id", ebooks.delete);

    // Delete all ebook
    router.delete("/", ebooks.deleteAll);

    app.use('/api/ebooks', router);
};