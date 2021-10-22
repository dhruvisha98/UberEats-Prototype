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
  // connectionLimit: 50,
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
  const sqlput = `SELECT 
    RESTAURANT_MENU.*
    FROM
    CART JOIN RESTAURANT_MENU ON
    CART.Dish_ID = RESTAURANT_MENU.Dish_ID WHERE CART.Cust_ID = ? AND
    CART.Status='current' GROUP BY 
    DISH_ID`;
  var values = [req.body.auth_user.id];

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
router.post("/", verify_token, async function (req, res) {
  var body = req.body;
  var newRestId;
  var oldRestId;
  console.log(req.body);
  var query1 =
    "select Restaurant_ID from CART join RESTAURANT_MENU on CART.Dish_ID = RESTAURANT_MENU.Dish_ID where CART.Cust_ID=" +
    req.body.auth_user.id +
    ' AND CART.Status="current" GROUP BY Restaurant_ID';

  var query2 =
    "select Restaurant_ID from RESTAURANT_MENU where Dish_ID=" + body.Dish_ID;

  const sqlput = "INSERT INTO CART (Cust_ID, Dish_ID, Status) VALUES (?,?,?)";

  var values = [req.body.auth_user.id, body.Dish_ID, "current"];
  var cartAddFlag = true;

  connection.query(query1, async function (error, results) {
    if (error) {
      console.log(error);
    } else {
      if (results.length === 0) {
        cartAddFlag = true;
      } else {
        console.log("old Rest ", results);
        oldRestId = results[0].Restaurant_ID;
        cartAddFlag = false;
        connection.query(query2, async function (error, results) {
          if (error) {
            console.log(error);
          } else {
            newRestId = results[0].Restaurant_ID;
            console.log("oldRest: ", oldRestId, " New Rest Id: ", newRestId);
            if (oldRestId !== newRestId) {
              cartAddFlag = false;
            } else {
              cartAddFlag = true;
            }
          }
        });
      }
      if (cartAddFlag === true) {
        connection.query(sqlput, values, async function (error, results) {
          if (error) {
            console.log(error);
          } else {
            // res.send({ message: "added" });
            console.log("Cart Updated");
          }
        });
      } else {
        console.log("FALSE LOOP");
        res
          .status(400)
          .send({ error: "Cannot Add Item of Different Restaurant" });
      }
    }
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
