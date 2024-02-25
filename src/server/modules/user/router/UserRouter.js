const express = require("express");
const router = express.Router();

const { getUsers, getUser } = require('./../model/UserModel');

router
    .get("/", (req, res) => {
        getUsers(req, res);
    })
    .get("/:userId", (req, res) => {
        getUser(req, res);
    })
    //Use api to reset password by passing on password
   
module.exports = router;