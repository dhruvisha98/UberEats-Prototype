const { query } = require("express");
var express = require("express");
var router = express.Router();
const OrderService = require("../services/OrderService");
const verify_token = require("../verifyToken").module;

router.get("/", verify_token, async function (req, res) {
  //console.log(req)
  // console.log(req.body.auth_user);
  // if (req.body.auth_user.type === "customer")
  //   await connection.query(
  //     "SELECT * FROM ORDER_DETAILS JOIN `ORDER` ON ORDER_DETAILS.Order_ID = `ORDER`.order_detail_id JOIN RESTAURANT_MENU ON RESTAURANT_MENU.Dish_ID = `ORDER`.dish_id JOIN RESTAURANT_DETAILS ON RESTAURANT_MENU.Restaurant_ID = RESTAURANT_DETAILS.Restaurant_ID where ORDER_DETAILS.Cust_ID = ? ",
  //     req.body.auth_user.id,
  //     async function (error, results) {
  //       if (error) {
  //         res.writeHead(200, {
  //           "Content-Type": "text/plain",
  //         });
  //         res.end(error.code);
  //       } else {
  //         const orderMap = {};
  //         results.forEach((item) => {
  //           if (!orderMap[item.Order_ID]) orderMap[item.Order_ID] = [];
  //           orderMap[item.Order_ID].push(item);
  //         });
  //         const result = Object.values(orderMap).map((item) => {
  //           return {
  //             order_status: item[0]?.Order_Status,
  //             order_id: item[0]?.Order_ID,
  //             delivery_status: item[0]?.Delivery_Status,
  //             order_mode: item[0]?.Order_Mode,
  //             restaurant_name: item[0]?.Restaurant_Name,
  //             restaurant_desc: item[0]?.Restaurant_Description,
  //             restaurant_con: item[0]?.Restaurant_Contact,
  //             dishes: item,
  //           };
  //         });
  //         console.log(result);
  //         res.status(200).json(result);
  //       }
  //     }
  //   );
  // else {
  //   await connection.query(
  //     "SELECT * FROM ORDER_DETAILS JOIN `ORDER` ON ORDER_DETAILS.Order_ID = `ORDER`.order_detail_id JOIN RESTAURANT_MENU ON RESTAURANT_MENU.Dish_ID = `ORDER`.dish_id JOIN RESTAURANT_DETAILS ON RESTAURANT_MENU.Restaurant_ID = RESTAURANT_DETAILS.Restaurant_ID JOIN CUSTOMER_DETAILS ON ORDER_DETAILS.Cust_ID = CUSTOMER_DETAILS.Cust_ID where RESTAURANT_DETAILS.RESTAURANT_ID = ?",
  //     req.body.auth_user.id,
  //     async function (error, results) {
  //       if (error) {
  //         res.writeHead(200, {
  //           "Content-Type": "text/plain",
  //         });
  //         res.end(error.code);
  //       } else {
  //         const orderMap = {};
  //         results.forEach((item) => {
  //           if (!orderMap[item.Order_ID]) orderMap[item.Order_ID] = [];
  //           orderMap[item.Order_ID].push(item);
  //         });
  //         const result = Object.values(orderMap).map((item) => {
  //           return {
  //             order_status: item[0]?.Order_Status,
  //             order_id: item[0]?.Order_ID,
  //             delivery_status: item[0]?.Delivery_Status,
  //             order_mode: item[0]?.Order_Mode,
  //             restaurant_name: item[0]?.Restaurant_Name,
  //             restaurant_desc: item[0]?.Restaurant_Description,
  //             restaurant_con: item[0]?.Restaurant_Contact,
  //             customer_name: item[0]?.Cust_Name,
  //             dishes: item,
  //           };
  //         });
  //         console.log(result);
  //         res.status(200).json(result);
  //       }
  //     }
  //   );
  // }
});
router.post("/", verify_token, async function (req, res) {
  //console.log(req)
  // console.log(req.body.auth_user.id);

  // console.log("OSDSDSDSDSDS");
  OrderService.updateCartItems(req)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

router.get("/orderfilter?", verify_token, async function (req, res) {
  //console.log(req)
  var status = req.query.status;
  OrderService.getFilteredOrders(req)
    .then((rests) => {
      res.status(200).send(rests);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});
module.exports = router;
