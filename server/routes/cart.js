const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
var axios = require("axios");
const verify_token = require("../verifyToken").module;

// var url = "http://localhost:5000";
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

// router.post("/", async function (req, res) {
//   var body = req.body;
//   console.log(req.body);
//   const sqlput = "INSERT INTO CART_DETAILS (Cust_ID, Cart_State) VALUES (?,?)";
//   var values = [body.Cust_ID, "Current"];

//   connection.query(sqlput, values, async function (error, results) {
//     if (error) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain",
//       });
//       res.end(error.code);
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(results));
//     }
//   });
// });

//Get API
router.get("/get", verify_token, async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "SELECT RESTAURANT_MENU.DISH_ID,RESTAURANT_MENU.DISH_Name,RESTAURANT_MENU.Dish_Price FROM CART JOIN RESTAURANT_MENU ON CART.Dish_ID = RESTAURANT_MENU.Dish_ID WHERE CART.Cust_ID = " +
    req.body.auth_user.id;
  var values = [1];

  connection.query(sqlput, values, async function (error, results) {
    if (error) {
      console.log("Hello-World!!!!");
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
router.post("/", verify_token, async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput = "INSERT INTO CART (Cust_ID, Dish_ID, Status) VALUES (?,?,?)";
  var values = [req.body.auth_user.id, body.Dish_ID, "current"];

  connection.query(sqlput, values, async function (error, results) {
    if (error) {
      console.log("Hello-World!!!!");
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end(error.code);
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("added");
    }
  });
});

//Order
router.post("/order", verify_token, async function (req, res) {
  var body = req.body;
  console.log(req.body);

  const sqlput = "SELECT * FROM CART WHERE  = Cust_ID=? and Status=?";
  var values = [req.body.auth_user.id, "current"];

  connection.query(sqlput, values, async function (error, results) {
    if (error) {
      res.writeHead(400, {
        "Content-Type": "text/plain",
      });
      res.end(error.code);
    } else {
      results.map((r) => {
        let insert_query =
          "INSERT INTO ORDER_DETAILS(Cust_ID, Dish_ID,Delivery_Status,Order_Status) VALUES (?,?,?,?)";

        var values = [r.Cust_ID, r.Dish_ID, "pending", "ordered"];
        connection.query(insert_query, values, async function (error, results) {
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
    }
  });
});

module.exports = router;

// onAdd

// axios("/")

// axios("/add")
