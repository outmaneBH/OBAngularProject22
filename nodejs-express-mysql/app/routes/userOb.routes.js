module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();
    // Create a new user
    router.post("/add-user", users.create);

    // Retrieve a single user with dni
    router.get("/read-user/:dni", users.findOne);

    // Retrieve all users
    router.get("/", users.findAll);

    // Update a user with dni
    router.put("/update-user/:dni", users.update);

    // Delete a user with dni
    router.get("/delete-user/:dni", users.delete);

    app.use('/api/users', router);
};