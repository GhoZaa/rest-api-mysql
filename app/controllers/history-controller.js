const History = require("../models/history-model.js");

// Create and Save a new History
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Add new history
  const history = new History({
    uuid: req.body.uuid,
    log: req.body.log
  });

  // Save History in the database
  History.create(history, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while add new item."
      });
    else res.send(data);
  });
};

// Retrieve all History from the database (with condition).
exports.findAll = (req, res) => {
//   const title = req.query.title;

  History.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving history types."
      });
    else res.send(data);
  });
};

// Get history record size
exports.countHistory = (req, res) => {
    
    History.getHistoryCount((err, data) => {
    if (err)
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving history record size."
        });
    else res.send(data);
    });
};

// Find a single History by Id
exports.findOne = (req, res) => {
  History.findById(req.params.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found History with uuid ${req.params.uuid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving History with uuid " + req.params.uuid
        });
      }
    } else res.send(data);
  });
};

// Update a History identified by the uuid in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  History.updateById(
    req.params.uuid,
    new History(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found History with uuid ${req.params.uuid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating History with uuid " + req.params.uuid
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a History with the specified uuid in the request
exports.delete = (req, res) => {
  History.remove(req.params.uuid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found History with uuid ${req.params.uuid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete History with uuid " + req.params.uuid
        });
      }
    } else res.send({ message: `History with uuid ${req.params.uuid} was deleted successfully!` });
  });
};

// Delete all History data from the database.
exports.deleteAll = (req, res) => {
  History.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all data."
      });
    else res.send({ message: `All history data were deleted successfully!` });
  });
};
