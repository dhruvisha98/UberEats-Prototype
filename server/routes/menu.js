var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
const verify_token = require("../verifyToken").module;
const { cust_auth, rest_auth } = require("../authorization").module;

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
    "SELECT * FROM RESTAURANT_MENU WHERE RESTAURANT_ID='?'",
    [req.body.auth_user.id],
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

// router.get("/check/:type", async function (req, res) {
//   var type = req.params.type;
//   const sqlput = "SELECT * FROM RESTAURANT_DETAILS WHERE Restaurant_Type=?";
//   var values = type;
//   connection.query(sqlput, values, async function (error, results) {
//     if (error) {
//       res.writeHead(400, {
//         "Content-Type": "text/plain",
//       });
//       res.end(error.code);
//     } else {
//       console.log(results);
//       res.writeHead(200, {
//         "Content-Type": "text/plain",
//       });
//       res.end(JSON.stringify(results));
//     }
//   });
// });
router.get("/check/:type", verify_token, cust_auth, async function (req, res) {
  var type = req.params.type;
  console.log(type);
  await connection.query(
    "SELECT * FROM RESTAURANT_DETAILS WHERE Restaurant_Type = ?",
    type,
    async function (error, results) {
      if (error) {
        res.writeHead(404, {
          "Content-Type": "text/plain",
        });
        res.end(error.code);
      } else {
        // console.log("Hello\n\n\n\n");
        console.log(req.params.type);
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

router.get("/:rest_id", verify_token, cust_auth, async function (req, res) {
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
        console.log(req.params.rest_id);
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(JSON.stringify(results));
      }
    }
  );
});

router.post("/", verify_token, rest_auth, async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "INSERT INTO RESTAURANT_MENU (Dish_Name,Dish_Price, Ingredients, Dish_Description, Dish_Category, Restaurant_ID,Dish_Image) VALUES (?,?,?,?,?,?,?)";
  var values = [
    body.Dish_Name,
    body.Dish_Price,
    body.Ingredients,
    body.Dish_Description,
    body.Dish_Category,
    req.body.auth_user.id,
    body.Dish_Image,
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

router.put("/", verify_token, rest_auth, async function (req, res) {
  var body = req.body;
  console.log("Update", req.body);
  await connection.query(
    "UPDATE RESTAURANT_MENU SET Dish_Name='" +
      req.body.Dish_Name +
      "',Dish_Price='" +
      req.body.Dish_Price +
      "',Ingredients='" +
      req.body.Ingredients +
      "',Dish_Description='" +
      req.body.Dish_Description +
      "',Dish_Category='" +
      req.body.Dish_Category +
      "',Restaurant_ID='" +
      req.body.auth_user.id +
      "',Dish_Image='Image' WHERE Dish_ID=" +
      req.body.Dish_ID +
      "",
    async function (error, results) {
      if (error) {
        res.writeHead(200, {
          "Content-Type": "text/plain",
        });
        res.end(error.code);
        console.log(error);
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
