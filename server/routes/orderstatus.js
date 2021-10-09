const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
const verify_token = require("../verifyToken").module;

var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

router.put("/updateDeliveryStatus", verify_token, async function (req, res) {
  var body = req.body;
  const sqlput = "UPDATE ORDER_DETAILS SET Delivery_Status=? where Order_ID =?";
  var values = [body.Delivery_Status, body.Order_ID];

  connection.query(sqlput, values, async function (error, results) {
    console.log(query.toString);
    console.log(error);
    if (error) {
      res.writeHead(200, {
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

module.exports = router;
