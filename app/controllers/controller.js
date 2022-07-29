const Ebook = require("../models/ebook-model.js");

// Create and Save a new Ebook
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Add new ebook
  const ebook = new Ebook({
    title: req.body.title,
    cover: req.body.cover,
    synopsis: req.body.synopsis,
    url: req.body.url || "",
    author: req.body.author,
    year: req.body.year
  });

  // Save Ebook in the database
  Ebook.create(ebook, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while add new item."
      });
    else res.send(data);
  });
};

// Retrieve all Ebook from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Ebook.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ebook types."
      });
    else res.send(data);
  });
};

// Find a single Ebook by Id
exports.findOne = (req, res) => {
  Ebook.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ebook with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Ebook with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Update a Ebook identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Ebook.updateById(
    req.params.id,
    new Ebook(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ebook with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Ebook with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Ebook with the specified id in the request
exports.delete = (req, res) => {
  Ebook.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ebook with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ebook with id " + req.params.id
        });
      }
    } else res.send({ message: `Ebook was deleted successfully!` });
  });
};

// Delete all Ebook data from the database.
exports.deleteAll = (req, res) => {
  Ebook.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all data."
      });
    else res.send({ message: `All ebook data were deleted successfully!` });
  });
};
