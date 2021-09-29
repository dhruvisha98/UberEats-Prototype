const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    connection.query(
      "INSERT INTO USERS (username,password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query(
    "SELECT * FROM USERS WHERE username = ? ;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            //console.log(JSON.stringify(response));
            console.log(result);
            res.send({ message: "Success" });
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
