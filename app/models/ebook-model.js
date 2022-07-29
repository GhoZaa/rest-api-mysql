const sql = require("./db.js");

// constructor
const Ebook = function(ebook) {
  this.title = ebook.title;
  this.cover = ebook.cover;
  this.synopsis = ebook.synopsis;
  this.url = ebook.url;
  this.author = ebook.author;
  this.year = ebook.year;
};

Ebook.create = (newItem, result) => {
  sql.query("INSERT INTO ebooks SET ?", newItem, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created ebook item: ", { id: res.insertId, ...newItem });
    result(null, { id: res.insertId, ...newItem });
  });
};

Ebook.findById = (id, result) => {
  sql.query(`SELECT * FROM ebooks WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ebook type: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found ebook with the id
    result({ kind: "not_found" }, null);
  });
};

Ebook.getAll = (title, result) => {
  let query = "SELECT * FROM ebooks";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("ebooks: ", res);
    result(null, res);
  });
};

Ebook.updateById = (id, ebook, result) => {
  sql.query(
    "UPDATE ebooks SET title = ?, cover = ?, synopsis = ?, url = ?, author = ?, year = ? WHERE id = ?",
    [ebook.title, ebook.cover, ebook.synopsis, ebook.url, ebook.author, ebook.year, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Ebook with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated ebook item: ", { id: id, ...ebook });
      result(null, { id: id, ...ebook });
    }
  );
};

Ebook.remove = (id, result) => {
  sql.query("DELETE FROM ebooks WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Ebook with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted ebook with id: ", id);
    result(null, res);
  });
};

Ebook.removeAll = result => {
  sql.query("DELETE FROM ebooks", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} ebooks`);
    result(null, res);
  });
};

module.exports = Ebook;
