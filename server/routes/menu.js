var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
const verify_token = require("../verifyToken").module;
const {cust_auth,rest_auth} = require("../authorization").module;

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
    "SELECT * FROM RESTAURANT_MENU WHERE RESTAURANT_ID='?'",[req.body.auth_user.id],
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
router.get("/:rest_id",verify_token,cust_auth,async function(req,res){
  var rest_id = req.params.rest_id;
  //console.log(parseInt(rest_id))
  await connection.query(
    "SELECT * FROM RESTAURANT_MENU WHERE Restaurant_ID = ?",
    rest_id,
    async function (error, results) {
      if (error) {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.end(error.code);
      } else {
        console.log("Hello\n\n\n\n");
        console.log(req.params.rest_id)
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});
router.post("/", verify_token,rest_auth, async function (req, res) {
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
    body.auth_user.id,
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

router.put("/", verify_token,rest_auth, async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "Update RESTAURANT_MENU SET Dish_Name=?, Ingredients=?, Dish_Category=?, Dish_Description=?, Dish_Cost=?, Restaurant_Name=? WHERE Dish_ID=? AND Restaurant_ID=?";
  var values = [
    body.Dish_Name,
    body.Ingredients,
    body.Dish_Category,
    body.Dish_Description,
    body.Dish_Cost,
    body.Restaurant_Name,
    body.Dish_ID,
    body.auth_user.id
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
