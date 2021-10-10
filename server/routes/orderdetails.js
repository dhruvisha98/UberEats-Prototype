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

router.get("/", verify_token, async function (req, res) {
  //console.log(req)
  console.log(req.body.auth_user.id);
  await connection.query(
    "SELECT GROUP_CONCAT(RESTAURANT_MENU.Dish_Name SEPARATOR ',') AS Dish_Names FROM ORDER_DETAILS JOIN `ORDER` ON ORDER_DETAILS.ORDER_ID = `ORDER`.order_detail_id JOIN RESTAURANT_MENU ON RESTAURANT_MENU.Dish_ID = `ORDER`.dish_id WHERE ORDER_DETAILS.Cust_ID =? GROUP BY ORDER_DETAILS.ORDER_ID",
    req.body.auth_user.id,
    async function (error, results) {
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
    }
  );
});
module.exports = router;
