const { query } = require("express");
var express = require("express");
var router = express.Router();
var constants = require("../config.json");
var mysql = require("mysql");
var axios = require("axios");
// var url = "http://localhost:5000";
var connection = mysql.createPool({
  host: constants.DB.host,
  user: constants.DB.username,
  password: constants.DB.password,
  port: constants.DB.port,
  database: constants.DB.database,
});

// router.get("/", async function (req, res) {
//   //console.log(req)
//   //console.log(res)
//   await connection.query(
//     "SELECT Restaurant_ID FROM FAVOURITE_RESTAURANT WHERE Cust_ID ='1'",

//     async function (error, data) {
//       if (error) {
//         res.writeHead(200, {
//           "Content-Type": "text/plain",
//         });
//         res.end(error.code);
//       } else {
//         res.writeHead(200, {
//           "Content-Type": "text/plain",
//         });
//         console.log(data);

//         // res.end(JSON.stringify(data));
//       }
//     }
//   );
// });

router.get("/", (req, res) => {
  var Cust_ID = req.body.Cust_ID;
  let sql = "SELECT Restaurant_ID FROM FAVOURITE_RESTAURANT WHERE Cust_ID ='1'";
  connection.query(sql, async (err, result) => {
    if (err) {
      console.log(err);
      res.send([]);
    } else {
      var ResIds = [];
      for (i in result) {
        ResIds.push(result[i].Restaurant_ID);
      }
      let datas = await axios.get("http://localhost:5000/restaurant");
      let ans = [];
      for (j in datas.data) {
        console.log(datas.data[j].Restaurant_ID);
        if (ResIds.includes(datas.data[j].Restaurant_ID)) {
          await ans.push(datas.data[j]);
        }
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(JSON.stringify(ans));
    }
  });
});

router.post("/", async function (req, res) {
  var body = req.body;
  console.log(req.body);
  const sqlput =
    "INSERT INTO FAVOURITE_RESTAURANT (Cust_ID,Restaurant_ID) VALUES (1," +
    body.Restaurant_ID +
    ");";

  var values = [1, body.Restaurant_ID];
  console.log(sqlput);
  connection.query(sqlput, async function (error, results) {
    if (error) {
      console.log(error);
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

module.exports = router;