const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
var axios = require("axios");
const CartService = require("../services/CartService");
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
      if (response.message === "Cannot added dishes for multiple restaurants")
        return res.status(409).json({ message: response.message });
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
//Order
router.post("/order", verify_token, async function (req, res) {
  var body = req.body;
  console.log(req.body);

  const sqlput = "SELECT * FROM CART WHERE Cust_ID=? and Status='current'";
  var values = [req.body.auth_user.id];

  connection.query(sqlput, values, async function (error, results) {
    if (error) {
      res.writeHead(404, {
        "Content-Type": "text/plain",
      });
      res.end(error.code);
    } else {
      connection.query(
        "INSERT INTO ORDER_DETAILS(Delivery_Status,Order_Status,Cust_ID) VALUES (?,?,?)",
        ["Pending", "ordered", req.body.auth_user.id],

        async function (error, order_res) {
          data = [];
          results.map((r) => {
            data.push([order_res.insertId, r.Dish_ID]);
          });
          console.log(data);
          let insert_query =
            "INSERT INTO `ORDER` (order_detail_id,dish_id) VALUES ?";

          //var values = [order_res.insertId, r.Dish_ID];
          connection.query(
            insert_query,
            [data],
            async function (error, results) {
              console.log(results);
              if (error) {
                console.log(error);
                res.writeHead(404, {
                  "Content-Type": "text/plain",
                });
                res.end(error.code);
              } else {
                connection.query(
                  "UPDATE CART SET Status = 'ordered' WHERE Status = 'current'",
                  values,
                  async function (error, results) {
                    console.log(results);
                    if (error) {
                      console.log(error);
                      res.writeHead(404, {
                        "Content-Type": "text/plain",
                      });
                      res.end(error.code);
                    } else {
                      res.writeHead(200, {
                        "Content-Type": "text/plain",
                      });
                      res.send();
                    }
                  }
                );
              }
            }
          );
        }
      );
    }
  });
});

router.post("/resetCart", verify_token, async function (req, res) {
  const sqlput = "DELETE FROM CART WHERE Cust_ID=? and Status='current'";
  var values = [req.body.auth_user.id];

  const insert = "INSERT INTO CART (Cust_ID, Dish_ID, Status) VALUES (?,?,?)";

  var value = [req.body.auth_user.id, req.body.Dish_ID, "current"];

  console.log(req.body.Dish_ID);
  connection.query(sqlput, values, async function (error, results) {
    if (error) {
      res.send();
    } else {
      console.log("Deleted");
      // res.send({ message: "Deleted" });
      connection.query(insert, value, async function (error, result) {
        if (error) {
          console.log(error);
        } else {
          console.log("Added");
        }
      });
    }
  });
});

module.exports = router;

// onAdd

// axios("/")

// axios("/add")
