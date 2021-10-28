const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const CustomerService = require("../services/CustomerService");

var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});
router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const dob = req.body.dob;
  const name = req.body.name;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const nickname = req.body.nickname;
  const phone = req.body.phone;

  CustomerService.createCustomer(
    (CustomerName = name),
    (CustomerEmail = username),
    (CustomerDob = dob),
    (CustomerNickname = nickname),
    (CustomerPhone = phone),
    (CustomerPassword = password),
    (CustomerCity = city),
    (CustomerState = state),
    (CustomerCountry = country)
  );
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM CUSTOMER_DETAILS WHERE Cust_email = ? ;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            let token = jwt.sign(
              {
                id: result[0].Cust_ID,
                email: result[0].Cust_Email,
                type: "customer",
              },
              constants.secret
            );
            res.send({ message: "Success", result: result[0], token });
          } else {
            res.send({ message: "Wrong Combination" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

module.exports = router;

// {
//   status: 0,
//     error : "Invalid/re"
// }

// {
//   status: 1,
//     userName; "",
//     MobileNo: "",
//   "email": "",
//     "b/
//   "
// }
