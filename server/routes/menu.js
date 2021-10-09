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
  await connection.query(
    // "SELECT * FROM RESTAURANT_MENU WHERE RESTAURANT_ID='" +
    //   req.body.Restaurant_ID +
    //   "' ",
    "SELECT * FROM RESTAURANT_MENU WHERE RESTAURANT_ID='1'",
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

router.post("/", verify_token, async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "INSERT INTO RESTAURANT_MENU (Dish_Name,Dish_Price, Ingredients, Dish_Description, Dish_Category, Restaurant_ID,Dish_Iamge) VALUES (?,?,?,?,?,?,?)";
  var values = [
    body.Dish_Name,
    body.Dish_Price,
    body.Ingredients,
    body.Dish_Description,
    body.Dish_Category,
    1,
    body.Dish_image,
  ];

  connection.query(sqlput, values, async function (error, results) {
    // console.log(query.toString + "asdfg");
    // console.log(error + "mnbv");
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

router.put("/", verify_token, async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "Update RESTAURANT_MENU SET Dish_Name=?, Ingredients=?, Dish_Category=?, Dish_Description=?, Dish_Cost=?, Restaurant_Name=? WHERE Dish_ID=?";
  var values = [
    body.Dish_Name,
    body.Ingredients,
    body.Dish_Category,
    body.Dish_Description,
    body.Dish_Cost,
    body.Restaurant_Name,
    body.Dish_ID,
  ];

  connection.query(sqlput, values, async function (error, results) {
    console.log(query.toString + "asdfg");
    console.log(error + "mnbv");
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
