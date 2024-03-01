const Users = require("../models/users.model");

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a User
    const users = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        sex: req.body.sex,
        address: req.body.address,
        account_status: req.body.account_status || false
    });

    // Save User in the database
    Users.create(users, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
    const search_name = req.query.search_name;

    Users.getAll(search_name, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

exports.findAllActive = (req, res) => {
    Users.getAllActive((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        else res.send(data);
    });
};

// Find a single User with a id
exports.findOne = (req, res) => {

};

// find all published Users
exports.findAllActive = (req, res) => {

};

// Update a User identified by the id in the request
exports.update = (req, res) => {

};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

};