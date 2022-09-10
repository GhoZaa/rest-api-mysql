module.exports = app => {
    const ebook = require("../controllers/controller.js");
    const history = require("../controllers/history-controller.js");
    var router = require("express").Router();

    // EBOOK
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

    // HISTORY
    // Add new history item
    router.post("/history/", history.create);

    // Retrieve all history
    router.get("/history/", history.findAll);

    // Retrieve a single history with uuid
    router.get("/history/:uuid", history.findOne);

    // Update a history with uuid
    router.put("/history/:uuid", history.update);

    // Delete a history with uuid
    router.delete("/history/:uuid", history.delete);

    // Delete all history
    router.delete("/history/", history.deleteAll);

    app.use('/api', router);
};