const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
var axios = require("axios");
// var url = "http://localhost:5000";
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

router.post("/", async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput = "INSERT INTO CART_DETAILS (Cust_ID, Cart_State) VALUES (?,?)";
  var values = [body.Cust_ID, "Current"];

  connection.query(sqlput, values, async function (error, results) {
    if (error) {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end(error.code);
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(results));
    }
  });
});

//Add API
router.post("/addtocart", async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput = "INSERT INTO CART (Cart_ID, Dish_ID VALUES (?,?)";
  var values = [body.Cart_ID, body.Dish_ID];

  connection.query(sqlput, values, async function (error, results) {
    if (error) {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end(error.code);
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end(JSON.stringify(results));
    }
  });
});

//Order

module.exports = router;

// onAdd

// axios("/")

// axios("/add")
