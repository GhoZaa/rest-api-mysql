const sql = require("./db.js");

// constructor
const History = function(history) {
  this.uuid = history.uuid;
  this.log = history.log;
};

History.create = (newItem, result) => {
  sql.query("INSERT INTO history SET ?", newItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created history item: ", { ...newItem });
    result(null, { ...newItem });
  });
};

History.findById = (uuid, result) => {
  sql.query(`SELECT * FROM history WHERE uuid = ${uuid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found history type: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found history with the uuid
    result({ kind: "not_found" }, null);
  });
};

History.getAll = (title, result) => {
  let query = "SELECT * FROM history";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("history: ", res);
    result(null, res);
  });
};

History.updateById = (uuid, history, result) => {
  sql.query(
    "UPDATE history SET log = ? WHERE uuid = ?",
    [history.log, uuid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found History with the uuid
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated history item: ", { uuid: uuid, ...history });
      result(null, { uuid: uuid, ...history });
    }
  );
};

History.remove = (uuid, result) => {
  sql.query("DELETE FROM history WHERE uuid = ?", uuid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found History with the uuid
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted history with uuid: ", uuid);
    result(null, res);
  });
};

History.removeAll = result => {
  sql.query("DELETE FROM history", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} history`);
    result(null, res);
  });
};

module.exports = History;
