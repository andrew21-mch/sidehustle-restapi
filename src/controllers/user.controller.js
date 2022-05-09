const User = require("../models/user.model.js");
const { sign } = require("jsonwebtoken");
const { findByEmail } = require("../models/user.model.js");
const {compareSync} = require("bcrypt")

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const {id, email,first_name, last_name, password, phone, address, is_admin } = req.body;
  const user = new User(id, email, first_name, last_name, password, phone, address, is_admin);

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.status(200).send(data);
  });
};
//login using email and password
exports.login = (req, res) => {
  // Validate request
  $body = req.body;
  findByEmail($body.email, (err, user) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    }
    if(!user){
      res.status(404).send({
        message: "Invalid email or password"
      });
    }
    // const $result = compareSync($body.password, user.password);
    // if ($result) {
    //   user.password = undefined;

    const token = sign({$result: user}, "secretKey", 
    { expiresIn: "1h" }
    );
    return res.status(200).send({
      message: "Successfully logged in",
      token: token
    });
    // } else {
    //   return res.status(401).send({
    //     message: "Invalid email or password"
    //   });
    // }
  });

}





// Retrieve all users from the database
exports.findAll = (req, res) => {

  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};


// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  const { id, email, phone_number } = req.body;
  User.updateById(
    Number(req.params.id),
    new User(id, email, phone_number),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.delete(Number(req.params.id), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

