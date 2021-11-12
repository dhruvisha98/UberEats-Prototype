const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
var axios = require("axios");
const CartService = require("../services/CartService");
const OrderService = require("../services/OrderService");

const verify_token = require("../verifyToken").module;

// var url = "http://localhost:5000";
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
  // connectionLimit: 50,
});

//Get API
router.get("/get", verify_token, async function (req, res) {
  CartService.getCartById(req.body.auth_user.id)
    .then((rests) => {
      res.send(rests);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
});
//Add API
router.post("/", verify_token, async function (req, res) {
  CartService.addItemToCart(req)
    .then((response) => {
      console.log("response", response);
      if (response.message === "Cannot added dishes for multiple restaurants")
        return res.status(409).json(response);
      return res.status(200);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete Cart Item
router.put("/deleteCartItem", verify_token, async function (req, res) {
  CartService.deleteCartItem(req)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

//Update Quantity in Cart
router.put("/updateCartQuantity", verify_token, async function (req, res) {
  CartService.updateCartItems(req)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

router.post("/resetCart", verify_token, async function (req, res) {
  CartService.resetCart(req)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});

//Order
router.post("/order", verify_token, async function (req, res) {
  var body = req.body;
  // console.log(req.body);
  // console.log("GHSJSDHJSHD");
  OrderService.createOrder(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

module.exports = router;

// onAdd

// axios("/")

// axios("/add")
