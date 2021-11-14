var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
var { CustomerService } = require("../services/");
const verify_token = require("../verifyToken").module;
const { cust_auth } = require("../authorization").module;

var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});
router.get("/", verify_token, cust_auth, async function (req, res) {
  var customer = CustomerService.findCustomerById(req.body.Cust_ID);
  res.send(customer);
});

router.put("/", verify_token, async function (req, res) {
  console.log(req.body.Cust_Name);
  CustomerService.updateCustomerById(req.body.auth_user.id, req.body);
  res.sendStatus(200);
});

router.put("/addAddress", verify_token, async function (req, res) {
  CustomerService.updateCustomerById(req.body.auth_user.id, req.body);
});

router.get("/getAddress", verify_token, async function (req, res) {
  const customerAddress = await CustomerService.getAddress(
    req.body.auth_user.id
  );
  res.status(200).send(customerAddress);
});

router.post("/", async function (req, res) {
  var body = req.body;
  console.log(req.body);

  var values = [
    body.Cust_Name,
    body.Cust_DOB,
    body.Cust_City,
    body.Cust_State,
    body.Cust_Country,
    body.Cust_Nickname,
    body.Cust_Email,
    body.Cust_Phone,
  ];
  CustomerService.createCustomer(
    (name = body.Cust_Name),
    (email = body.Cust_Email)
  );
});

module.exports = router;
