const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
const bcrypt = require("bcrypt");
const verify_token = require("../verifyToken").module;
const jwt = require("jsonwebtoken");
const { cust_auth } = require("../authorization").module;
const saltRounds = 10;
let { Restaurant_Search } = require("../search.js");
const { IoTFleetHub } = require("aws-sdk");
const { RestaurantServices } = require("../services/index");
const { RestaurantDetails } = require("../models/RestaurantDetails");
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});
// console.log(verify_token);
router.get("/", verify_token, cust_auth, async function (req, res) {
  //console.log(req)
  //console.log(res)
  RestaurantServices.getAllRestaurants()
    .then((rests) => {
      res.send(rests);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

router.put("/", verify_token, async function (req, res) {
  console.log(req.body);
  RestaurantServices.updateRestaurantById(req.body.auth_user.id, req.body);
  res.sendStatus(200);
});

router.post("/", (req, res) => {
  const Restaurant_Name = req.body.Restaurant_Name;
  const Restaurant_Email = req.body.Restaurant_Email;
  const Restaurant_Description = req.body.Restaurant_Description;
  const Restaurant_Contact = req.body.Restaurant_Contact;
  const Restaurant_Type = req.body.Restaurant_Type;
  const Restaurant_Time = req.body.Restaurant_Time;
  const Restaurant_Delivery_Mode = req.body.Restaurant_Delivery_Mode;
  const Restaurant_Day = req.body.Restaurant_Day;
  const Restaurant_Location = req.body.Restaurant_Location;
  const Restaurant_Password = req.body.Restaurant_Password;

  bcrypt.hash(Restaurant_Password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    console.log(hash);
    RestaurantServices.createRestaurant(
      Restaurant_Name,
      Restaurant_Email,
      Restaurant_Description,
      Restaurant_Contact,
      Restaurant_Type,
      Restaurant_Delivery_Mode,
      Restaurant_Location,
      (RestaurantPassword = hash)
    )
      .then((rest) => {
        res.send(rest);
      })
      .catch((err) => {
        res.sendStatus(400);
      });
  });
});

router.post("/rlogin", (req, res) => {
  const Restaurant_Email = req.body.Restaurant_Email;
  const Restaurant_Password = req.body.Restaurant_Password;
  RestaurantServices.RestaurantLogin(Restaurant_Email, Restaurant_Password)
    .then((resp) => {
      console.log("hello");
      console.log(resp);
      return res.send({ ...resp, message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      console.log("Error");
      res.sendStatus(404);
    });
});

router.get("/search", async function (req, res) {
  console.log(req.query);
  RestaurantServices.searchRestaurant(req.query.searchvalue)
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

module.exports = router;
