module.exports = app => {
    const ebook = require("../controllers/controller.js");
    var router = require("express").Router();

    // Add new ebook item
    router.post("/ebook/", ebook.create);

    // Retrieve all ebook
    router.get("/ebook/", ebook.findAll);

    // Retrieve a single ebook with id
    router.get("/ebook/:id", ebook.findOne);

    // Update a ebook with id
    router.put("/ebook/:id", ebook.update);

    // Delete a ebook with id
    router.delete("/ebook/:id", ebook.delete);

    // Delete all ebook
    router.delete("/ebook/", ebook.deleteAll);

    app.use('/api', router);
};