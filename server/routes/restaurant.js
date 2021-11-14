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
const { IoTFleetHub } = require("aws-sdk");
const { RestaurantServices } = require("../services/index");
const { RestaurantDetails } = require("../models/RestaurantDetails");
const { make_request } = require("../kafka/client");

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
  make_request("restaurant.create", req.body, (error, response) => {
    console.log("create err", error);
    console.log("create res", response);
    if (error || !response) {
      return res.status(500).json({ error });
    }
    return res.status(200).json({ ...response.rest });
  });
});

router.post("/rlogin", (req, res) => {
  const Restaurant_Email = req.body.Restaurant_Email;
  const Restaurant_Password = req.body.Restaurant_Password;

  // make_request(
  //   "restaurant.login",
  //   { Restaurant_Email, Restaurant_Password },
  //   (error, response) => {
  //     console.log(error);
  //     console.log(response);
  //     if (error || !response) {
  //       return res.status(404).json({ error });
  //     }
  //     return res.status(200).json({ response });
  //   }
  // );
  RestaurantServices.RestaurantLogin(Restaurant_Email, Restaurant_Password)
    .then((resp) => {
      // console.log("hello");
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
  await RestaurantServices.searchRestaurant(
    req.query.searchvalue,
    req.query.resmode,
    req.query.restype
  )
    .then((resp) => {
      res.send(resp);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

module.exports = router;
