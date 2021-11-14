const { query } = require("express");
var express = require("express");
var router = express.Router();
const { make_request } = require("../kafka/client");
const OrderService = require("../services/OrderService");
const verify_token = require("../verifyToken").module;

router.get("/getOrderDetails/:oid", verify_token, async function (req, res) {
  OrderService.getOrderById(req)
    .then((rests) => {
      res.status(200).send(rests);
    })
    .catch((err) => {
      console.log("err", err);
      res.sendStatus(400);
    });
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
      console.log("err", err);
      res.sendStatus(400);
    });
});

router.get("/placeOrder", verify_token, async function (req, res) {
  //console.log(req)
  var status = req.query.status;
  OrderService.getFilteredOrders(req)
    .then((rests) => {
      res.status(200).send(rests);
    })
    .catch((err) => {
      console.log("err", err);
      res.sendStatus(400);
    });
});

router.put("/updateOrder", verify_token, async function (req, res) {
  make_request(
    "customer.updateOrder",
    { body: req.body },
    (error, response) => {
      console.log(error);
      console.log(response);
      if (error || !response) {
        return res.status(404).json({ error });
      }
      return res.status(200).json({ response });
    }
  );
  //console.log(req)
  // var status = req.query.status;
  // OrderService.placeOrder(req)
  //   .then((rests) => {
  //     res.status(200).send(rests);
  //   })
  //   .catch((err) => {
  //     console.log("err", err);
  //     res.sendStatus(400);
  //   });
});
module.exports = router;
