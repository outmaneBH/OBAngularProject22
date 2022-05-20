const User = require("../models/userOb.model.js");

 // Create and Save a new User
exports.create = (req, res) => {
  
 const user = new User({
    dni: req.body.dni,
    full_name: req.body.full_name,
    age: req.body.age,
    phone: req.body.phone
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the new User."
      });
    else res.send(data);
  });

};
// Retrieve all users from the database (with condition).
exports.findAll = (req, res) => {
  const dni = req.query.dni;
  User.getAll(dni, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};
// Find a single user with a dni
exports.findOne = (req, res) => {
  User.findById(req.params.dni, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with dni ${req.params.dni}.`
        });
      }
    } else res.send(data);
  });

};

// Update a user identified by the dni in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.updateById(
    req.params.dni,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with dni ${req.params.dni}.`
          });
        }
      } else res.send(data);
    }
  );

};


// Delete a user with the specified dni in the request
exports.delete = (req, res) => {
  User.remove(req.params.dni, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with dni ${req.params.dni}.`
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  })

};


//error 500
// else {
//   res.status(500).send({
//     message: "Error retrieving User with dni " + req.params.dni
//   });
// }

// Validate request error 400
// if (!req.body) {
//   res.status(400).send({
//     message: "Content can not be empty!"
//   });
// }