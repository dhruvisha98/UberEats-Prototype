var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");

var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});
router.get("/", async function (req, res) {
  await connection.query(
    "SELECT * FROM CUSTOMER_DETAILS WHERE Cust_ID='" + req.body.Cust_ID + "'",
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

router.put("/", async function (req, res) {
  await connection.query(
    "UPDATE CUSTOMER_DETAILS SET Cust_Name='" +
      req.body.Cust_Name +
      "',Cust_DOB='" +
      req.body.Cust_DOB +
      "',Cust_City='" +
      req.body.Cust_City +
      "',Cust_State='" +
      req.body.Cust_State +
      "',Cust_Country='" +
      req.body.Cust_Country +
      "',Cust_Nickname='" +
      req.body.Cust_Nickname +
      "',Cust_Email='" +
      req.body.Cust_Email +
      "',Cust_Phone='" +
      req.body.Cust_Phone +
      "'WHERE Cust_Id='" +
      req.body.Cust_ID +
      "'",
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

router.post("/", async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "INSERT INTO CUSTOMER_DETAILS (Cust_Name, Cust_DOB,Cust_City,Cust_State,Cust_Country,Cust_Nickname,Cust_Email,Cust_Phone) VALUES (?,?,?,?,?,?,?,?)";
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

router.get("/order", async function (req, res) {
  //console.log(req)
  //console.log(res)
  await connection.query(
    "SELECT * FROM ORDER_DETAILS WHERE Cust_ID ='" + req.body.Cust_ID + "'",
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

module.exports = router;
