const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
var axios = require("axios");
const verify_token = require("../verifyToken").module;
const { cust_auth } = require("../authorization").module;
const { CustomerService } = require("../services/");
const { CustomerDetails } = require("../models/CustomerDetails");
// var url = "http://localhost:5000";
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

router.get("/", verify_token, cust_auth, (req, res) => {
  var Cust_ID = req.body.auth_user.id;
  CustomerService.getFavouriteRestaurants(Cust_ID)
    .then((favourite) => {
      console.log("HELLLO");
      console.log(favourite);
      res.send(favourite);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});

router.post("/", verify_token, cust_auth, async function (req, res) {
  var body = req.body;
  var id = req.body.auth_user.id;
  console.log(req.body);
  CustomerService.addFavourite(id, body.Restaurant_ID)
    .then((resp) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

module.exports = router;
