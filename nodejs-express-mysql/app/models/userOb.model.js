const sql = require("./db.js");
// constructor
const User = function(user) {
  this.dni = user.dni;
  this.full_name = user.full_name;
  this.age = user.age;
  this.phone = user.phone;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};


User.findById = (dni, result) => {
  sql.query(`SELECT * FROM users WHERE dni = '${dni}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
User.getAll = (dni, result) => {
  let query = "SELECT * FROM users";
  if (dni) {
    query += ` WHERE dni LIKE '%${dni}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("User : ", res);
    result(null, res);
  });
};

User.updateById = (dni, user, result) => {
  sql.query(
    "UPDATE users SET full_name = ?, age = ?, phone = ? WHERE dni = ?",
    [user.full_name, user.age, user.phone, dni],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated user: ", { dni: dni, ...user });
      result(null, { dni: dni, ...user });
    }
  );
};
User.remove = (dni, result) => {
  sql.query("DELETE FROM users WHERE dni = ?", dni, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found User with the dni
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted user with dni: ", dni);
    result(null, res);
  });
};

module.exports = User;